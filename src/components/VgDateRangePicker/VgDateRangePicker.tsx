import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "../VgDatePicker/VgDatePicker.scss";
import "../VgTextbox/VgTextbox.scss";
import "./VgDateRangePicker.scss";
import Portal from "../../common/Portal";
import { handleAutoFocus, utils } from "../../utils/utils";
import moment from "moment";


const formatDate = (date: Date | null, DateFormat: string): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate());
  if (DateFormat === "YYYY, DD MM") {
    return `${year}, ${day} ${month}`;
  } else if (DateFormat === "YYYY, MM DD") {
    return `${year}, ${month} ${day}`;
  }else if(DateFormat === "DD MM, YYYY"){
    return `${day} ${month}, ${year}`
  } else {
    return `${month} ${day}, ${year}`;
  }
};
const parseDate = (inputValue: string): Date | null => {
  if (!inputValue || inputValue.trim() === "") {
    return null;
  }
  const normalizedInput = inputValue.trim();
  const date = new Date(normalizedInput);
  if (isNaN(date.getTime())) {
    return null;
  }
  date.setHours(0, 0, 0, 0);
  return date;
};

const areDatesEqual = (date1: Date | null, date2: Date | null): boolean => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getDaysInMonth = (date: Date | null) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return [];
  const days = [];
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const startDayOfWeek = firstDay.getDay();
  if (startDayOfWeek > 0) {
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    for (
      let d = prevMonthLastDay.getDate() - startDayOfWeek + 1;
      d <= prevMonthLastDay.getDate();
      d++
    ) {
      days.push(new Date(date.getFullYear(), date.getMonth() - 1, d));
    }
  }

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const endDayOfWeek = lastDay.getDay();
  if (endDayOfWeek < 6) {
    for (let d = 1; d <= 6 - endDayOfWeek; d++) {
      days.push(new Date(date.getFullYear(), date.getMonth() + 1, d));
    }
  }

  return days;
};

const isValidDate = (date: Date | null) => {
  return date instanceof Date && !isNaN(date.getTime());
};

export interface VgDateRangePickerProps {
  Title?: string;
  DefaultStartDate?: Date | "today" | "firstDateOfMonth" | null | "none";
  DefaultEndDate?: Date | "endDateOfMonth" | null | "none";
  MinDate?: Date | null;
  MaxDate?: Date | null;
  Placeholder?: string;
  DateFormat?: string;
  Disabled?: boolean;
  DisabledDates?: Date[];
  Required?: boolean;
  OnChange?: (event : any , startDate: Date | null, endDate: Date | null , Type : string | null | number) => void;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnClick?: (e: React.MouseEvent<HTMLInputElement> , lastDate : Date | null , date : Date | null ,value : string | null ) => void;
  [key: string]: any;
  DateRangeName: string;
  DateRangePickerId?: string | number ;
  ButtonPrimary?: string;
  ButtonSecondary?: string;
  ButtonThird?: string;
  EmptyInputValue?: boolean;
  VagaroToolkit?: Number;
  DefaultOption?: "Today" | "Yesterday" | "Last 7 Days" | "Last 30 Days" | "This Month" | "Last Month" | "This Year" | "Last Year" | "none",
  ShowRequiredFieldMark?:boolean,
  StartDateInputName?: string,
  EndDateInputName?: string,
  AutoFocus?:boolean,
  DateRangePickerPosition?: 'left' | 'right' | 'auto' | string,
  SetControlonRight?: boolean;
  ClearButtonCallback?: boolean;
  SetValue ?: string
}

interface VgDateRangePickerRef {
  validate: () => any;
}
const VgDateRangePicker: React.FC<VgDateRangePickerProps> = forwardRef<
  VgDateRangePickerRef,
  VgDateRangePickerProps
>(
  (
    { Title,
      DefaultStartDate = null,
      DefaultEndDate = null,
      OnChange = () => { },
      OnClick = () => { },
      MinDate = new Date(),
      MaxDate = new Date(),
      Placeholder = "Select Date",
      DateFormat = "YYYY/MM/DD",
      Disabled = false,
      DisabledDates = [],
      Required = false,
      DateRangeName = "",
      DateRangePickerId = "daterangepicker",
      OnBlur = () => { },
      ButtonPrimary = 'Submit',
      ButtonSecondary = 'Clear',
      ButtonThird = 'Cancel',
      DefaultOption = "Last 30 Days",
      EmptyInputValue = false,
      ShowRequiredFieldMark = false,
      VagaroToolkit = 1,
      StartDateInputName = "vg-start-date",
      EndDateInputName = "vg-end-date",
      AutoFocus=false,
      DateRangePickerPosition = '',
      SetControlonRight = false,
      ClearButtonCallback = false,
      SetValue = ''
    },
    ref
  ) => {
    const [showStartDateCalendar, setShowStartDateCalendar] =
      useState<boolean>(false);
    const [showEndDateCalendar, setShowEndDateCalendar] =
      useState<boolean>(false);
    const [showFromToInput, setShowFromToInput] = useState<boolean>(false);
    const [showToday, setToday] = useState<boolean>(false);
    const [showLast7Days, setshowLast7Days] = useState<boolean>(false);
    const [showLast30Days, setshowLast30Days] = useState<boolean>(false);
    const [showLastMonth, setshowLastMonth] = useState<boolean>(false);
    const [showThisYear, setshowThisYear] = useState<boolean>(false);
    const [showLastYear, setshowLastYear] = useState<boolean>(false);
    const [showYesterday, setShowYesteday] = useState<boolean>(false);
    const [showThisMonth, setShowThisMonth] = useState<boolean>(false);
    const [activeRange, setActiveRange] = useState<string | null>(null);
    const [hoveredStartDate, setHoveredStartDate] = useState<Date | null>(null);
    const [hoveredEndDate, setHoveredEndDate] = useState<Date | null>(null);
      const [displayedMonth, setDisplayedMonth] = useState(new Date());
      const [displayedEndMonth, setDisplayedEndMonth] = useState(new Date());
    const [emptyValue, setEmptyValue] = useState<boolean>(EmptyInputValue)

    const calendarRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); // Change to HTMLInputElement
    const currentDate = new Date();
    const getStartOfMonth = () =>
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const getEndOfMonth = () =>
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const [startDate, setStartDate] = useState<Date | null>(emptyValue ? new Date() : getStartOfMonth());
    const [endDate, setEndDate] = useState<Date | null>(emptyValue ? new Date() : getEndOfMonth());
    const [inputValue, setInputValue] = useState<string>('');
    const [inputValueFromDate, setInputValueFromDate] = useState<any>(
      hoveredStartDate
        ? formatDate(hoveredStartDate, DateFormat)
        : formatDate(startDate, DateFormat)
    );
    const [inputValueEndDate, setInputValueEndDate] = useState<any>(
      hoveredEndDate
        ? formatDate(hoveredEndDate, DateFormat)
        : formatDate(endDate, DateFormat)
    );
   
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const storedData = localStorage.getItem('dateRangeData');
    const isandroidiospro = utils.CheckIsFromProAppWithoutState();
    const isAndroidiOSProWithTablet = utils.CheckIsFromIpadAndroidTabWithoutParm();
    const isPaydesk = utils.CheckIsFromPaydeskWithoutParm();
    const isPayPro = utils.CheckIsPayProDevice();
    const IpadAndroidPaypro = utils.CheckIsFromIpadAndroidPayproWithoutParm();
    
     
    const [showStartMonthDropdown, setShowStartMonthDropdown] = useState(false);
    const [showEndMonthDropdown, setShowEndMonthDropdown] = useState(false);
    const [showStartYearDropdown, setShowStartYearDropdown] = useState(false);
    const [showEndYearDropdown, setShowEndYearDropdown] = useState(false);
  
    const selectedStartMonthRef = useRef<HTMLDivElement | null>(null);
    const selectedEndMonthRef = useRef<HTMLDivElement | null>(null);
    const selectedStartYearRef = useRef<HTMLDivElement | null>(null);
    const selectedEndYearRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
      if (storedData) {
        const parsededData = JSON.parse(storedData);
        const value = `${parsededData.formattedStartDate} + - + ${parsededData.formattedEndDate}`
        setInputValue(value)
      }
    }, [])

    useEffect(() => {
      if(AutoFocus) {
        handleAutoFocus(AutoFocus, inputRef)
      }
    }, [AutoFocus])

    useEffect(() => {
      if (showStartMonthDropdown && selectedStartMonthRef.current) {
        selectedStartMonthRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, [showStartMonthDropdown]);

    useEffect(() => {
      if (showEndMonthDropdown && selectedEndMonthRef.current) {
        selectedEndMonthRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, [showEndMonthDropdown]);

    useEffect(() => {
      if (showStartYearDropdown && selectedStartYearRef.current) {
        selectedStartYearRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, [showStartYearDropdown]);

    useEffect(() => {
      if (showEndYearDropdown && selectedEndYearRef.current) {
        selectedEndYearRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, [showEndYearDropdown]);

    useEffect(() => {
      if (isandroidiospro || isAndroidiOSProWithTablet || isPaydesk || isPayPro || IpadAndroidPaypro) {
        setShowCalendar(false);
      }
    }, [isandroidiospro, isAndroidiOSProWithTablet, isPaydesk, isPayPro , IpadAndroidPaypro]);

    const ClearButtonCallbackProp = ClearButtonCallback ? 5 : 4; 

    const handleClick = () => {

      const isDeviceSpecificConditionTrue =
        isandroidiospro ||
        isAndroidiOSProWithTablet ||
        isPaydesk ||
        isPayPro ||
        IpadAndroidPaypro;
    
      if (isDeviceSpecificConditionTrue) {
        // If any condition is true, ensure the calendar is closed
        setShowCalendar(false);
      } else {
        // For web environments, toggle the calendar state
        setShowCalendar((prev) => !prev);
      }
      if (isDeviceSpecificConditionTrue) {
        var startdate = moment(startDate).format("MM D, YYYY") as any;
        var enddate = moment(endDate).format("MM D, YYYY") as any;

        var selectedAction = localStorage.getItem("ActionTagForDate");
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        if (selectedAction == null || selectedAction == undefined) {
          selectedAction = "5";
        } else if (
          startdate == moment(firstDay).format("MM D, YYYY") &&
          enddate == moment(lastDay).format("MM D, YYYY")
        ) {
          selectedAction = "5";
        }

        let currentSelectedAction;
        if (selectedAction == "9") {
          currentSelectedAction = updateActiveRangeBasedOnDates(startDate, endDate);
        } else {
          currentSelectedAction = selectedAction;
        }

        var obj: any = {};
        obj.alertTitle = "Date Range";
        obj.popupActionType = "5002";
        obj.isFromOther = ClearButtonCallbackProp;
        obj.VagaroToolkit = VagaroToolkit;
        obj.callFromLocation = DateRangePickerId + "|#|ReactToolKit";
        obj.alertMessage = "";
        obj.ReactReportIndex = 25000;
        obj.selectedActionTag = currentSelectedAction; // Use the current value instead of state
        obj.startDate = moment(startDate).format("MM D, YYYY");
        obj.endDate = moment(endDate).format("MM D, YYYY");
        obj.alertActions = [
          { name: "Today", actionTag: "1" },
          { name: "Yesterday", actionTag: "2" },
          { name: "Last 7 Days", actionTag: "3" },
          { name: "Last 30 Days", actionTag: "4" },
          { name: "This Month", actionTag: "5" },
          { name: "Last Month", actionTag: "6" },
          { name: "This Year", actionTag: "7" },
          { name: "Last Year", actionTag: "8" },
          { name: "Custom", actionTag: "9" },
        ];

        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;

        messageObj.screenTitle = "";
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "52|~|" + JSON.stringify(obj);
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
      setShowStartDateCalendar(true);
      setShowEndDateCalendar(true);
      setToday(true);
      setshowLast7Days(true);
      setshowLast30Days(true);
      setshowLastMonth(true);
      setshowThisYear(true);
      setShowYesteday(true);
      setShowThisMonth(true);
      setshowLastYear(true);
      setShowFromToInput(true);
    };

    useEffect(() => {
      const handleOutsideEvent = (event: Event) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
          !inputRef?.current?.contains(event.target as Node)
        ) {
          setShowCalendar(false);
          setShowStartMonthDropdown(false);
          setShowEndMonthDropdown(false);
          setShowStartYearDropdown(false);
          setShowEndYearDropdown(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideEvent);
      document.addEventListener("scroll", handleOutsideEvent, true);

      return () => {
        document.removeEventListener("mousedown", handleOutsideEvent);
        document.removeEventListener("scroll", handleOutsideEvent, true);
      };
    }, []);


    useEffect(() => {
      const parsedStartDate = transformDate(DefaultStartDate);
      const parsedEndDate = transformDate(DefaultEndDate);
      if (
        (DefaultStartDate as any) === "none" ||
        (DefaultEndDate as any) === "none"
      ) {
        setStartDate(null);
        setEndDate(null);
        OnChange(null, null);
      } else {
        if(parsedStartDate || parsedEndDate){
           setStartDate(parsedStartDate);
           setEndDate(parsedEndDate);
        }else{
          setStartDate(DefaultStartDate)
          setEndDate(DefaultEndDate)
        }
       
      }
    }, [DefaultStartDate, DefaultEndDate]);


    useEffect(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
    
      const isTodaySelected =
        startDate?.toDateString() === today.toDateString() &&
        endDate?.toDateString() === today.toDateString();
    
      
      if (isTodaySelected) {
        setActiveRange("today");
      }
      if ((startDate === null && endDate === null) || emptyValue) {
        setInputValue(""); 
      } else {
        const defaultEndDate = endDate === null ? today : endDate;
    
        const formattedStartDate = formatDate(startDate || today, DateFormat);
        const formattedEndDate = formatDate(defaultEndDate, DateFormat);
    
        setInputValue(`${formattedStartDate} - ${formattedEndDate}`);
      }
    }, [startDate, endDate, DateFormat, DefaultOption, emptyValue]);


    useEffect(() => {
      if (showStartDateCalendar && !startDate) {
        const currentDate = new Date();
        setStartDate(currentDate);
      }
      if (showEndDateCalendar && !endDate) {
        const currentDate = new Date();
        setEndDate(currentDate);
      }
    }, [showStartDateCalendar, startDate, showEndDateCalendar, endDate]);

    useEffect(() => {
      const dateToFormat = hoveredStartDate || startDate;
      setInputValueFromDate(formatDate(dateToFormat, DateFormat));
    }, [hoveredStartDate, startDate, DateFormat]);

    useEffect(() => {
      const dateToFormat = hoveredEndDate || endDate;
      setInputValueEndDate(formatDate(dateToFormat, DateFormat));
    }, [hoveredEndDate, endDate, DateFormat]);

    const transformDate = (value: Date | null | string) => {
      const today = new Date();
      switch (value) {
        case "today":
          return today;
        case "firstDateOfMonth":
          return new Date(today.getFullYear(), today.getMonth(), 1);
        case "endDateOfMonth":
          return new Date(today.getFullYear(), today.getMonth() + 1, 0);
        case "none":
        default:
          return null;
      }
    };

    const [date, setDate] = useState<Date | null | string >(transformDate(""));

    // #region: Form validations.
    const validation = () => {
      let validateObject = {
        [DateRangePickerId]: inputValue,
        IsValidate: (Required && !inputRef.current?.value) ? false : true,
        IsRequired: Required,
        id: DateRangePickerId,
      };
      handleAutoFocus(Required && !inputRef.current?.value, inputRef)
      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));
    //#endregion

    const handleInputChangeFromDate = (e: any) => {
      setInputValueFromDate(e.target.value);
    };

    const handleInputChangeEndDate = (e: any) => {
      setInputValueEndDate(e.target.value);
    };

    const updateActiveRangeBasedOnDates = (
      startDate: Date | null,
      endDate: Date | null
    ) => {
      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
      const firstDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      const firstDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      );
      const lastDayOfLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );
      const firstDayOfThisYear = new Date(today.getFullYear(), 0, 1);
      const firstDayOfLastYear = new Date(today.getFullYear() - 1, 0, 1);
      const lastDayOfLastYear = new Date(today.getFullYear() - 1, 11, 31);

      let actionTag;
      if (areDatesEqual(startDate, today) && areDatesEqual(endDate, today)) {
        setActiveRange("today");
        actionTag = "1";
      } else if (
        areDatesEqual(startDate, yesterday) &&
        areDatesEqual(endDate, yesterday)
      ) {
        setActiveRange("yesterday");
        actionTag = "2";
      } else if (
        areDatesEqual(startDate, last7Days) &&
        areDatesEqual(endDate, today)
      ) {
        setActiveRange("last7Days");
        actionTag = "3";
      } else if (
        areDatesEqual(startDate, last30Days) &&
        areDatesEqual(endDate, today)
      ) {
        setActiveRange("last30Days");
        actionTag = "4";
      } else if (
        areDatesEqual(startDate, firstDayOfThisMonth) &&
        areDatesEqual(endDate, lastDayOfThisMonth)
      ) {
        setActiveRange("thisMonth");
        actionTag = "5";
      } else if (
        areDatesEqual(startDate, firstDayOfLastMonth) &&
        areDatesEqual(endDate, lastDayOfLastMonth)
      ) {
        setActiveRange("lastMonth");
        actionTag = "6";
      } else if (
        areDatesEqual(startDate, firstDayOfThisYear) &&
        areDatesEqual(endDate, today)
      ) {
        setActiveRange("thisYear");
        actionTag = "7";
      } else if (
        areDatesEqual(startDate, firstDayOfLastYear) &&
        areDatesEqual(endDate, lastDayOfLastYear)
      ) {
        setActiveRange("lastYear");
        actionTag = "8";
      } else {
        setActiveRange("");
        actionTag = "9";
      }
      return actionTag; // Return the action tag immediately
    };

    const handleDateChange = (
      date: Date,
      type: "start" | "end",
      dateSelection = false
    ) => {
      setShowStartMonthDropdown(false);
      setShowStartYearDropdown(false); 
      setShowEndMonthDropdown(false);
      setShowEndYearDropdown(false);
      const newDateWithoutTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      if (type === "start") {
        setStartDate(newDateWithoutTime);
        setDisplayedMonth(newDateWithoutTime);
        updateActiveRangeBasedOnDates(newDateWithoutTime, endDate!);
        if (newDateWithoutTime > endDate!) {
          setEndDate(newDateWithoutTime);
        }
      } else if (type === "end") {
        if (dateSelection! && newDateWithoutTime < startDate!) {
        } else {
          setEndDate(newDateWithoutTime);
          setDisplayedEndMonth(newDateWithoutTime);
          updateActiveRangeBasedOnDates(startDate!, newDateWithoutTime);
        }
      }
    };

    const handleInputChange = (event: { target: { value: any } }) => {
      const inputValue = event.target.value;
      setInputValue(inputValue);
      if (!inputValue || inputValue.trim() === "") {
        setStartDate(null);
        setEndDate(null);
        setInputValue("");
        OnChange(null, null);
        return;
      }

      const [startDateString = "", endDateString = ""] =
        inputValue.split(" - ");

      if (startDateString === "none" && endDateString === "none") {
        setStartDate(null);
        setEndDate(null);
        setInputValue("");
        OnChange(null, null);
      } else {
        const startDateParsed = parseDate(startDateString);
        const endDateParsed = parseDate(endDateString);

        if (startDateParsed) handleDateChange(startDateParsed, "start");
        if (endDateParsed) handleDateChange(endDateParsed, "end");
      }
    };

    const handleMonthChange = (increment: number, type: "start" | "end") => {
      if (type === "start") {
        setDisplayedMonth(
          (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment)
        );
      } else if (type === "end") {
        setDisplayedEndMonth(
          (prev) => new Date(prev.getFullYear(), prev.getMonth() + increment)
        );
      }
    };

    const handleYearChange = (newYear: number, type: "start" | "end") => {
      if (type === "start") {
        setDisplayedMonth((prev) => new Date(newYear, prev.getMonth()));
      } else if (type === "end") {
        setDisplayedEndMonth((prev) => new Date(newYear, prev.getMonth()));
      }
    };

    const isDisabled = (day: Date | null) => {
      if (!isValidDate(day)) return true;

      const isInDisabledDates = DisabledDates.some((disabledDate: any) =>
        areDatesEqual(new Date(disabledDate), day)
      );

      return !(
        !Disabled &&
        day! >= MinDate! &&
        day! <= MaxDate! &&
        !isInDisabledDates
      );
    };

    const renderCalendarHeader = (type: "start" | "end") => {
      const currentDate = type === "start" ? displayedMonth : displayedEndMonth;

      if (!isValidDate(currentDate)) {
        return null;
      }

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let currentYear =
        currentDate!.getFullYear() < new Date().getFullYear()
          ? currentDate!.getFullYear()
          : new Date().getFullYear();
      const startYear = type === "end" ? currentYear : 2009;
      const endYear = currentDate!.getFullYear() + 5;
      const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
      );

      const handleStartShowMonth = () => {
        setShowStartMonthDropdown((prev) => !prev);
        setShowStartYearDropdown(false);
        setShowEndMonthDropdown(false)
        setShowEndYearDropdown(false)
      }

      const handleEndShowMonth = () => {
        setShowEndMonthDropdown((prev) => !prev);
        setShowEndYearDropdown(false);
        setShowStartMonthDropdown(false);
        setShowStartYearDropdown(false)
      }
  
      const handleShowEndYear = () => {
        setShowEndYearDropdown((prev) => !prev);
        setShowStartMonthDropdown(false);
        setShowEndMonthDropdown(false);
        setShowStartYearDropdown(false)
      }

      const handleShowStartYear = () => {
        setShowStartYearDropdown((prev) => !prev);
        setShowEndMonthDropdown(false);
        setShowStartMonthDropdown(false);
        setShowEndYearDropdown(false)
      }
      if (type === "start") {
      return (
        <div className="calendar-header">
          <button
            className="arrow-btn-pre"
            onClick={() => handleMonthChange(-1, type)}
          ></button>

          <div className={`vg-cale-dropdwon month  ${showStartMonthDropdown ? 'show' : '' } `}> 
          <div
              className={`dropdown-container`}
              onClick={handleStartShowMonth}
            >
              {months[currentDate?.getMonth()]}
            </div>
            {showStartMonthDropdown  && (
              <div className="dropdown-options">
              {months.map((month, index) => (
                  <div
                    key={month}
                    className={`dropdown-option ${
                      index === currentDate.getMonth() ? "selected" : ""
                    }`}
                    ref={index === displayedMonth.getMonth() ? selectedStartMonthRef : null}
                    onClick={(e: any) => {
                      const increment = index - currentDate.getMonth();
                      handleMonthChange(
                        increment,
                        type
                      )
                      setShowStartMonthDropdown(false);
                    }}
                  >
                  {month}
                  </div>
              ))}
              </div>
            )}
          </div>
          <div className={`vg-cale-dropdwon year ${showStartYearDropdown ? 'show' : '' } `}>
          <div
              className={`dropdown-container`}
              onClick={handleShowStartYear}
            >
              {displayedMonth.getFullYear()}
            </div>
            {showStartYearDropdown  && (
              <div className="dropdown-options">
              {years.map((year, index) => (
                  <div
                    key={year}
                    className={`dropdown-option ${
                      year === displayedMonth.getFullYear() ? "selected" : ""
                    }`}
                    ref={year === displayedMonth.getFullYear() ? selectedStartYearRef : null}
                    onClick={(e: any) => {
                      const increment = index - currentDate.getFullYear();
                      handleYearChange(year, "start"); 
                      setShowStartYearDropdown(false);
                    }}
                  >
                  {year}
                  </div>
              ))}
              </div>
            )}
          </div>
          <button
            className="arrow-btn-next"
            onClick={() => handleMonthChange(1, type)}
          ></button>
        </div>
      );
    }
    else if(type === "end" ){
      return (
        <div className="calendar-header">
          <button
            className="arrow-btn-pre"
            onClick={() => handleMonthChange(-1, type)}
          ></button>

          <div className={`vg-cale-dropdwon month ${showEndMonthDropdown ? 'show' : '' } `}> 
          <div
              className={`dropdown-container`}
              onClick={handleEndShowMonth}
            >
              {months[currentDate?.getMonth()]}
            </div>
            {showEndMonthDropdown  && (
              <div className="dropdown-options">
              {months.map((month, index) => (
                  <div
                    key={month}
                    className={`dropdown-option ${
                      index === currentDate.getMonth() ? "selected" : ""
                    }`}
                    ref={index === displayedEndMonth.getMonth() ? selectedEndMonthRef : null}
                    onClick={(e: any) => {
                      const increment = index - currentDate.getMonth();
                      handleMonthChange(
                        increment,
                        type
                      )
                      setShowEndMonthDropdown(false);
                    }}
                  >
                  {month}
                  </div>
              ))}
              </div>
            )}
          </div>
          <div className={`vg-cale-dropdwon year ${showEndYearDropdown ? 'show' : '' } `}>
          <div
              className={`dropdown-container`}
              onClick={handleShowEndYear}
            >
              {displayedEndMonth.getFullYear()}
            </div>
            {showEndYearDropdown  && (
              <div className="dropdown-options">
              {years.map((year, index) => (
                  <div
                    key={year}
                    className={`dropdown-option ${
                      year === displayedEndMonth.getFullYear() ? "selected" : ""
                    }`}
                    ref={year === displayedEndMonth.getFullYear() ? selectedEndYearRef : null}
                    onClick={(e: any) => {
                      const increment = index - currentDate.getFullYear();
                      handleYearChange(year, "end"); 
                      setShowEndYearDropdown(false);
                    }}
                  >
                  {year}
                  </div>
              ))}
              </div>
            )}
          </div>
          
          <button
            className="arrow-btn-next"
            onClick={() => handleMonthChange(1, type)}
          ></button>
        </div>
      );
    }
    };

    useEffect(() => {
      if (DefaultOption === "Today") {
        const today = new Date();
        setStartDate(today);
        setEndDate(today);
        setActiveRange("today");
        setHoveredStartDate(today);
        setHoveredEndDate(today);
        setDisplayedMonth(today)
        setDisplayedEndMonth(today)
      } else if (DefaultOption === "Yesterday") {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
        setActiveRange("yesterday");
        setHoveredStartDate(yesterday);
        setHoveredEndDate(yesterday);
        setDisplayedMonth(yesterday)
        setDisplayedEndMonth(yesterday)
      } else if (DefaultOption === "Last 7 Days") {
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 6);
        setStartDate(last7Days);
        setEndDate(today);
        setActiveRange("last7Days");
        setHoveredStartDate(last7Days);
        setHoveredEndDate(today);
       setDisplayedMonth(last7Days)
        setDisplayedEndMonth(today)
      } else if (DefaultOption === "Last 30 Days") {
        const today = new Date();
        const last30Days = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000); // 30 days back from today
        setStartDate(last30Days);
        setEndDate(today);
        setActiveRange("last30Days");
        setHoveredStartDate(last30Days);
        setHoveredEndDate(today);
        setDisplayedMonth(last30Days)
        setDisplayedEndMonth(today)
      } else if (DefaultOption === "This Month") {
        const today = new Date();
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        setStartDate(firstDayOfMonth);
        setEndDate(lastDayOfMonth);
        setActiveRange("thisMonth");
        setHoveredStartDate(firstDayOfMonth);
        setHoveredEndDate(lastDayOfMonth);
        setDisplayedMonth(firstDayOfMonth)
        setDisplayedEndMonth(lastDayOfMonth)
      } else if (DefaultOption === "Last Month") {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        setStartDate(lastMonth);
        setEndDate(lastDayOfLastMonth); 
        setActiveRange("lastMonth");
        setHoveredStartDate(lastMonth);
        setHoveredEndDate(lastDayOfLastMonth);
        setDisplayedMonth(lastMonth)
        setDisplayedEndMonth(lastDayOfLastMonth)
      } else if (DefaultOption === "This Year") {
        const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const lastDayOfYear = today;
      setStartDate(firstDayOfYear);
      setEndDate(lastDayOfYear);
      setActiveRange("thisYear");
      setHoveredStartDate(firstDayOfYear);
      setHoveredEndDate(lastDayOfYear);
      setDisplayedMonth(firstDayOfYear)
      setDisplayedEndMonth(lastDayOfYear)
      } else if (DefaultOption === "Last Year") {
      const today = new Date();
      const lastYear = today.getFullYear() - 1;

      const startOfLastYear = new Date(lastYear, 0, 1);
      const endOfLastYear = new Date(lastYear, 11, 31);
      setStartDate(startOfLastYear);
      setEndDate(endOfLastYear);
      setActiveRange("lastYear");
      setHoveredStartDate(startOfLastYear);
      setHoveredEndDate(endOfLastYear);
      setDisplayedMonth(startOfLastYear)
      setDisplayedEndMonth(endOfLastYear)
      } else if(DefaultOption === "none"){
        const parsedStartDate = transformDate(DefaultStartDate);
        const parsedEndDate = transformDate(DefaultEndDate);
      if (
        (DefaultStartDate as any) === "none" ||
        (DefaultEndDate as any) === "none"
      ) {
        setStartDate(null);
        setEndDate(null);
        OnChange(null, null);
      } else {
        if(parsedStartDate || parsedEndDate){
          if(DefaultStartDate === "firstDateOfMonth" && DefaultEndDate === "endDateOfMonth")
            {
              setActiveRange("thisMonth")
            }
           setStartDate(parsedStartDate);
           setEndDate(parsedEndDate);
           setHoveredStartDate(parsedStartDate);
           setHoveredEndDate(parsedEndDate);
        }else{
          setStartDate(DefaultStartDate)
          setEndDate(DefaultEndDate)
           setDisplayedMonth(DefaultStartDate)
          setDisplayedEndMonth(DefaultEndDate)
        } } 
      }


    }, [DefaultOption]);

    const handleToday = (e: React.MouseEvent<HTMLInputElement>) => {
      const today = new Date();
      if (!areDatesEqual(startDate, today) || !areDatesEqual(endDate, today)) {
        setEmptyValue(false);
        handleDateChange(today, "start");
        handleDateChange(today, "end");
        setActiveRange("today");
        setHoveredStartDate(today);
        setHoveredEndDate(today);
        setShowCalendar(false);
      }
      OnClick(e, today , today , 'today');
    };

    const handleYesterday = (e: React.MouseEvent<HTMLInputElement>) => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (
        !areDatesEqual(startDate, yesterday) ||
        !areDatesEqual(endDate, yesterday)
      ) {
        setEmptyValue(false);
        handleDateChange(yesterday, "start");
        handleDateChange(yesterday, "end");
        setActiveRange("yesterday");
        setHoveredStartDate(yesterday);
        setHoveredEndDate(yesterday);
        setShowCalendar(false);
      }
      OnClick(e, yesterday , yesterday , 'yesterday');
    };

    const handleLast7Days = (e: React.MouseEvent<HTMLInputElement>) => {
      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 6);

      if (!areDatesEqual(startDate, last7Days) || !areDatesEqual(endDate, today)) {
        setEmptyValue(false);
        handleDateChange(last7Days, "start");
        handleDateChange(today, "end");

        setActiveRange("last7Days");
        setHoveredStartDate(last7Days);
        setHoveredEndDate(today);
        setShowCalendar(false);
      }
      OnClick(e,  last7Days, today , 'last7Days');
    };


    const handleLast30Days = (e: React.MouseEvent<HTMLInputElement>) => {
      const today = new Date();
      const last30Days = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000); // 30 days back from today

      const isStartDateEqual = areDatesEqual(startDate, last30Days);
      const isEndDateEqual = areDatesEqual(endDate, today);

      if (!isStartDateEqual || !isEndDateEqual) {
        setEmptyValue(false);
        handleDateChange(last30Days, "start");
        handleDateChange(today, "end");
        setActiveRange("last30Days");

        setHoveredStartDate(last30Days);
        setHoveredEndDate(today);
        setShowCalendar(false);
      }
      OnClick(e, last30Days, today , 'last30Days');
    };

      const handleThisMonth = (e: React.MouseEvent<HTMLInputElement>) => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        );

        // Apply current time to both dates
        firstDayOfMonth.setHours(
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        );
        lastDayOfMonth.setHours(
          now.getHours(),
          now.getMinutes(),
          now.getSeconds(),
          now.getMilliseconds()
        );

        if (
          !areDatesEqual(startDate, firstDayOfMonth) ||
          !areDatesEqual(endDate, lastDayOfMonth)
        ) {
          setEmptyValue(false);
          handleDateChange(firstDayOfMonth, "start");
          handleDateChange(lastDayOfMonth, "end");
          setActiveRange("thisMonth");
          setHoveredStartDate(firstDayOfMonth);
          setHoveredEndDate(lastDayOfMonth);
          setShowCalendar(false);
        }

        OnClick(e, firstDayOfMonth, lastDayOfMonth , 'thisMonth');
      };

      const handleLastMonth = (e: React.MouseEvent<HTMLInputElement>) => {
        const today = new Date();
        const timeParts: [number, number, number, number] = [
          today.getHours(),
          today.getMinutes(),
          today.getSeconds(),
          today.getMilliseconds(),
        ];

        const firstDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );

        // Set current time to both
        firstDayOfLastMonth.setHours(...timeParts);
        lastDayOfLastMonth.setHours(...timeParts);

        if (
          !areDatesEqual(startDate, firstDayOfLastMonth) ||
          !areDatesEqual(endDate, lastDayOfLastMonth)
        ) {
          setEmptyValue(false);
          handleDateChange(firstDayOfLastMonth, "start");
          handleDateChange(lastDayOfLastMonth, "end");
          setActiveRange("lastMonth");
          setHoveredStartDate(firstDayOfLastMonth);
          setHoveredEndDate(lastDayOfLastMonth);
          setShowCalendar(false);
        }

        OnClick(e, firstDayOfLastMonth, lastDayOfLastMonth , 'lastMonth');
      };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isandroidiospro || isAndroidiOSProWithTablet || isPaydesk || isPayPro) {
        e.preventDefault();
      }
    };

      const handleThisYear = (e: React.MouseEvent<HTMLInputElement>) => {
        const today = new Date();
        const timeParts: [number, number, number, number] = [
          today.getHours(),
          today.getMinutes(),
          today.getSeconds(),
          today.getMilliseconds(),
        ];

        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        firstDayOfYear.setHours(...timeParts);
        const lastDayOfYear = today;
        if (
          !areDatesEqual(startDate, firstDayOfYear) ||
          !areDatesEqual(endDate, lastDayOfYear)
        ) {
          setEmptyValue(false);
          handleDateChange(firstDayOfYear, "start");
          handleDateChange(lastDayOfYear, "end");
          setActiveRange("thisYear");
          setHoveredStartDate(firstDayOfYear);
          setHoveredEndDate(lastDayOfYear);
          setShowCalendar(false);
        }
        OnClick(e, firstDayOfYear, lastDayOfYear , 'thisYear');
      };

      const handleLastYear = (e: React.MouseEvent<HTMLInputElement>) => {
        const today = new Date();
        const timeParts: [number, number, number, number] = [
          today.getHours(),
          today.getMinutes(),
          today.getSeconds(),
          today.getMilliseconds(),
        ];
        const lastYear = today.getFullYear() - 1;

        const startOfLastYear = new Date(lastYear, 0, 1);
        const endOfLastYear = new Date(lastYear, 11, 31);
        startOfLastYear.setHours(...timeParts);
        endOfLastYear.setHours(...timeParts);

        if (
          !areDatesEqual(startDate, startOfLastYear) ||
          !areDatesEqual(endDate, endOfLastYear)
        ) {
          setEmptyValue(false);
          handleDateChange(startOfLastYear, "start");
          handleDateChange(endOfLastYear, "end");
          setActiveRange("lastYear");
          setHoveredStartDate(startOfLastYear);
          setHoveredEndDate(endOfLastYear);
          setShowCalendar(false);
        }
        OnClick(e, startOfLastYear, endOfLastYear , 'lastYear');
      };

    const handleCancel = () => {
      setInputValue('')
      setShowStartDateCalendar(false);
      setShowEndDateCalendar(false);
      setShowFromToInput(false);
      setShowCalendar(false);
      setActiveRange("")
      setStartDate(null);
      setEndDate(null);
    };

      const handleClose = () => {
        setShowCalendar(false);
      }  

      const handleSubmit = (e: any) => {
        if (startDate && endDate) {
          const now = new Date();
          const value = activeRange ? activeRange : "CustomDateRange"
          const updatedStartDate = new Date(startDate);
          const updatedEndDate = new Date(endDate);

          updatedStartDate.setHours(
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
          );
          updatedEndDate.setHours(
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds()
          );

          setInputValue(
            `${formatDate(updatedStartDate, DateFormat)} - ${formatDate(
              updatedEndDate,
              DateFormat
            )}`
          );

          OnClick(e,updatedStartDate, updatedEndDate , value );
        } else {
          setInputValue("");
          OnClick(e,startDate, endDate , '');
        }
        setShowStartDateCalendar(false);
        setShowEndDateCalendar(false);
        setShowFromToInput(false);
        setShowCalendar(false);
      };


    const haadalechnge = () => { }

    const isInRange = (day: Date) => {
      if (!startDate || !endDate) return false;

      const dayWithoutTime = new Date(day.setHours(0, 0, 0, 0));
      const startWithoutTime = new Date(startDate.setHours(0, 0, 0, 0));
      const endWithoutTime = new Date(endDate.setHours(0, 0, 0, 0));

      return (
        dayWithoutTime >= startWithoutTime && dayWithoutTime <= endWithoutTime
      );
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (OnBlur) {
        OnBlur(e)
      }
    }

    useEffect(() => {
      const handleDateRangeSelection = (event: CustomEvent) => {
        const { formattedStartDate, formattedEndDate, elementId, ActionTagForDate} = event.detail;
        if (elementId == DateRangePickerId) {
          let date = `${formattedStartDate} - ${formattedEndDate}`;

          setInputValue(date);
          if (OnChange && 
            (isandroidiospro  || isAndroidiOSProWithTablet ||
                isPaydesk ||
                isPayPro ||
                IpadAndroidPaypro)) { 
            const parsedStartDate = moment(formattedStartDate, "MMM DD, YYYY").toDate();
            const parsedEndDate = moment(formattedEndDate, "MMM DD, YYYY").toDate();
            setStartDate(parsedStartDate);
            setEndDate(parsedEndDate);
            let strActionTagForDate="thisMonth";
            switch (ActionTagForDate) {
              case 1:
                strActionTagForDate="today";
                break;
              case 2:
                strActionTagForDate="yesterday";
                break;
              case 3:
                strActionTagForDate="last7Days";
                break;
              case 4:
                strActionTagForDate="last30Days";
                break;
              case 5:
                strActionTagForDate="thisMonth";
                break;
              case 6:
                strActionTagForDate="lastMonth";
                break;
              case 7:
                strActionTagForDate="thisYear";
                break;
              case 8:
                strActionTagForDate="lastYear";
                break;
              case 9:
                strActionTagForDate = "";
                break;
              default:
                break;
            }
            OnChange(event, parsedStartDate, parsedEndDate, strActionTagForDate);
          }
        }
      };
      window.addEventListener('nativeDateRangepickerSelected', handleDateRangeSelection as EventListener);
      return () => {
        window.removeEventListener('nativeDateRangepickerSelected', handleDateRangeSelection as EventListener);
      };
    }, [DateRangePickerId, OnChange]);
    


    useEffect(() => {
    if (SetValue && typeof SetValue === "string") {
    let start: Date | null = null;
    let end: Date | null = null;
    if (SetValue.includes(",")) {
      const [startStr, endStr] = SetValue.split(",");
      start = new Date(startStr.trim());
      end = new Date(endStr.trim());

    }
    else if (SetValue.includes(" - ")) {
      const [startStr, endStr] = SetValue.split(" - ");
      start = new Date(startStr.trim());
      end = new Date(endStr.trim());
      if (isNaN(start.getTime())) {
        const mStart = moment(startStr.trim(), DateFormat);
        start = mStart.isValid() ? mStart.toDate() : null;
      }
      if (isNaN(end.getTime())) {
        const mEnd = moment(endStr.trim(), DateFormat);
        end = mEnd.isValid() ? mEnd.toDate() : null;
      }
    }
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
    setStartDate(start);
    setEndDate(end);
    setInputValue(`${formatDate(start, DateFormat)} - ${formatDate(end, DateFormat)}`);
    handleDateChange(start, "start");
    handleDateChange(end, "end");
    updateActiveRangeBasedOnDates(start, end);
  }
    
  }
}, [SetValue, DateFormat]);
    return (
      <>
        <div className={`vg-input-control-group ${SetControlonRight ? "vg-daterangepicker-native-pro" : "vg-daterangepicker-group"}`}>
        {Title?.length > 0 && (<label className="vg-input-label">{ShowRequiredFieldMark && Required ? <span className="required-input-mark">*</span> : ''}{Title}</label>)}
          <div className="vg-input-container">
            <div
              className={`vg-daterangepicker ${Disabled ? "vg-disabled" : ""}`}
            >
              {isandroidiospro || isAndroidiOSProWithTablet || isPaydesk || isPayPro ? (<>
                <input
                  type="text"
                  id={DateRangePickerId}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={Placeholder}
                  disabled={Disabled}
                  readOnly={true}
                  onFocus={handleFocus}
                  onClick={handleClick}
                  ref={inputRef}
                  className="vg-input-control vg-date-picker-input"
                  onBlur={handleBlur}
                  name={StartDateInputName}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  onClick={handleClick}
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
                </svg>
              </>) : (<>
                <input
                  type="text"
                  id={DateRangePickerId}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={Placeholder}
                  disabled={Disabled}
                  onFocus={handleFocus}
                  onClick={handleClick}
                  ref={inputRef}
                  className="vg-input-control vg-date-picker-input"
                  onBlur={handleBlur}
                  readOnly={emptyValue}
                  name={EndDateInputName}
                  autoFocus={AutoFocus}
                  tabIndex={0}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  onClick={handleClick}
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z" />
                </svg>
              </>)}
              {showCalendar && (
                <>
                  <Portal
                    wrapperElementId="daterangepicker"
                    inputRef={inputRef}
                    type={DateRangePickerPosition === '' || null || undefined || DateRangePickerPosition.toLowerCase() === 'left' ? 1  :  DateRangePickerPosition.toLowerCase() === 'auto' ? 6 : DateRangePickerPosition.toLowerCase() === 'right' ? 7 : 1 } 
                  >
                    <div
                      className="vg-daterangepicker-dropdown"
                      ref={calendarRef}
                    >
                      <div className="vg-daterangepicker-calenders">
                        <div className="vg-daterangepicker-cale-wrapper">
                          <div className="vg-daterangepicker-cale-left">
                            <div className="vg-daterangepicker-calender">
                              <div className="vg-reacttk-calendar">
                                {renderCalendarHeader("start")}
                                <div className="calendar-week">
                                  <span>Su</span>
                                  <span>Mo</span>
                                  <span>Tu</span>
                                  <span>We</span>
                                  <span>Th</span>
                                  <span>Fr</span>
                                  <span>Sa</span>
                                </div>
                                <div className="calendar-dates-grid">
                                  {getDaysInMonth(displayedMonth)?.map((day) => {
                                    const isDisabledDay = isDisabled(day);
                                    const isStartDate = areDatesEqual(
                                      day,
                                      startDate
                                    );
                                    const isEndDate = areDatesEqual(
                                      day,
                                      endDate
                                    );
                                    const isDayInRange = isInRange(day);

                                    return (
                                      <div
                                        key={day.toISOString()}
                                        className={`date ${isDisabledDay ? "disabled" : ""
                                          } 
                            ${isStartDate ? "selected start-date" : ""} 
                            ${isDayInRange ? "in-range" : ""}
                            ${isStartDate === isEndDate ? "end-date" : ""} `}
                                        onMouseEnter={() =>
                                          setHoveredStartDate(day)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredStartDate(null)
                                        }
                                        onClick={() =>
                                          !isDisabledDay &&
                                          handleDateChange(day, "start", true)
                                        }
                                        tabIndex={-1}
                                      >
                                        <span>{day.getDate()}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="vg-daterangepicker-cale-right">
                            <div className="vg-daterangepicker-calender">
                              <div className="vg-reacttk-calendar">
                                {renderCalendarHeader("end")}
                                <div className="calendar-week">
                                  <span>Su</span>
                                  <span>Mo</span>
                                  <span>Tu</span>
                                  <span>We</span>
                                  <span>Th</span>
                                  <span>Fr</span>
                                  <span>Sa</span>
                                </div>
                                <div className="calendar-dates-grid">
                                  {getDaysInMonth(displayedEndMonth)?.map(
                                    (day) => {
                                      const isDisabledDay = isDisabled(day);
                                      const isEndDate = areDatesEqual(
                                        day,
                                        endDate
                                      );
                                      const isDayInRange = isInRange(day);
                                      const isStartDate = areDatesEqual(
                                        day,
                                        startDate
                                      );

                                      return (
                                        <div
                                          key={day.toISOString()}
                                          className={`date ${isDisabledDay ? "disabled" : ""
                                            } 
                            ${isEndDate ? "selected end-date" : ""} 
                            ${isStartDate === isEndDate ? "start-date" : ""} 
                            ${isDayInRange ? "in-range" : ""}`}
                                          onMouseEnter={() =>
                                            setHoveredEndDate(day)
                                          }
                                          onMouseLeave={() =>
                                            setHoveredEndDate(null)
                                          }
                                          onClick={() =>
                                            !isDisabledDay &&
                                            handleDateChange(day, "end", true)
                                          }
                                          tabIndex={1}
                                        >
                                          <span>{day.getDate()}</span>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="vg-daterangepicker-cale-input">
                            <div className="vg-input-control-group  form-inline-left">
                              <label
                                className="vg-input-label"
                                htmlFor="daterangepicker_start"
                              >
                                From
                              </label>
                              <div className="vg-input-container">
                                <input
                                  className="vg-input-control"
                                  type="text"
                                  name={StartDateInputName}
                                  value={inputValueFromDate}
                                  onChange={handleInputChangeFromDate}
                                  onBlur={(e) => {
                                    const parsedDate = parseDate(
                                      e.target.value
                                    );
                                    if (parsedDate) {
                                      handleDateChange(parsedDate, "start");
                                    } else {
                                      console.error(
                                        "Invalid date input. Please enter a valid date DateFormat (e.g., 'Oct 2, 2024')."
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="vg-input-control-group  form-inline-left">
                              <label
                                className="vg-input-label"
                                htmlFor="daterangepicker_end"
                              >
                                To
                              </label>
                              <input
                                className="vg-input-control"
                                type="text"
                                name={EndDateInputName}
                                value={inputValueEndDate}
                                onChange={handleInputChangeEndDate}
                                onBlur={(e) => {
                                  const parsedDate = parseDate(e.target.value);
                                  if (parsedDate) {
                                    handleDateChange(parsedDate, "end");
                                  } else {
                                    console.error("Invalid date input");
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="vg-daterangepicker-range">
                          <ul>
                            {showToday && (
                              <li
                                className={
                                  activeRange === "today" ? "active" : ""
                                }
                                onClick={(e: any) => {
                                  e.stopPropagation()
                                  handleToday(e)
                                }}
                                onMouseEnter={() => {
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0); // Normalize today's date
                                  setHoveredStartDate(today);
                                  setHoveredEndDate(today);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null); // Reset the hovered dates when leaving
                                  setHoveredEndDate(null);
                                }}
                              >
                                Today
                              </li>
                            )}
                            {showYesterday && (
                              <li
                                className={
                                  activeRange === "yesterday" ? "active" : ""
                                }
                                onClick={(e: any) => {
                                  e.stopPropagation()
                                  handleYesterday(e)
                                }}
                                onMouseEnter={() => {
                                  const yesterday = new Date();
                                  yesterday.setDate(yesterday.getDate() - 1);
                                  yesterday.setHours(0, 0, 0, 0);
                                  setHoveredStartDate(yesterday);
                                  setHoveredEndDate(yesterday);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                Yesterday
                              </li>
                            )}
                            {showLast7Days && (
                              <li
                                className={
                                  activeRange === "last7Days" ? "active" : ""
                                }
                                onClick={(e: any) => {
                                  e.stopPropagation()
                                  handleLast7Days(e)
                                }}
                                onMouseEnter={() => {
                                  const end = new Date();
                                  const start = new Date();
                                  start.setDate(end.getDate() - 6);
                                  start.setHours(0, 0, 0, 0);
                                  end.setHours(23, 59, 59, 999);
                                  setHoveredStartDate(start);
                                  setHoveredEndDate(end);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                Last 7 Days
                              </li>
                            )}
                            {showLast30Days && (
                              <li
                                className={
                                  activeRange === "last30Days" ? "active" : ""
                                }
                                onClick={(e: any) => {
                                  e.stopPropagation()
                                  handleLast30Days(e)
                                }}
                                onMouseEnter={() => {
                                  const end = new Date();
                                  const start = new Date();
                                  start.setDate(end.getDate() - 29);
                                  start.setHours(0, 0, 0, 0);
                                  end.setHours(23, 59, 59, 999);
                                  setHoveredStartDate(start);
                                  setHoveredEndDate(end);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                Last 30 Days
                              </li>
                            )}
                            {showThisMonth && (
                              <li
                                className={
                                  activeRange === "thisMonth" ? "active" : ""
                                }
                                onClick={(e: any) => {
                                  e.stopPropagation()
                                  handleThisMonth(e)
                                }}
                                onMouseEnter={() => {
                                  const today = new Date();
                                  const start = new Date(today.getFullYear(), today.getMonth(), 1);
                                  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                                  setHoveredStartDate(start);
                                  setHoveredEndDate(end);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                This Month
                              </li>
                            )}
                            {showLastMonth && (
                              <li
                                className={
                                  activeRange === "lastMonth" ? "active" : ""
                                }
                                onClick={(e: any) => {  
                                  e.stopPropagation()
                                  handleLastMonth(e)
                                }}
                                onMouseEnter={() => {
                                  const today = new Date();
                                  const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                                  const end = new Date(today.getFullYear(), today.getMonth(), 0);
                                  setHoveredStartDate(start);
                                  setHoveredEndDate(end);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                Last Month
                              </li>
                            )}
                            {showThisYear && (
                              <li
                                className={
                                  activeRange === "thisYear" ? "active" : ""
                                }
                                onClick={ (e: any) => {   
                                  e.stopPropagation()
                                  handleThisYear(e)
                                }
                                }
                                onMouseEnter={() => {
                                  const today = new Date();
                                  const start = new Date(today.getFullYear(), 0, 1);
                                  const end = new Date(today.getFullYear(), 11, 31);
                                  setHoveredStartDate(start);
                                  setHoveredEndDate(end);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                This Year
                              </li>
                            )}
                            {showLastYear && (
                              <li
                                className={
                                  activeRange === "lastYear" ? "active" : ""
                                }
                                onClick={ (e: any) => {
                                  e.stopPropagation()
                                  handleLastYear(e)
                                }}
                                onMouseEnter={() => {
                                  const today = new Date();
                                  const start = new Date(today.getFullYear() - 1, 0, 1);
                                  const end = new Date(today.getFullYear() - 1, 11, 31);
                                  setHoveredStartDate(start);
                                  setHoveredEndDate(end);
                                }}
                                onMouseLeave={() => {
                                  setHoveredStartDate(null);
                                  setHoveredEndDate(null);
                                }}
                              >
                                Last Year
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="vg-daterangepicker-action">
                        <div className="range_inputs clearfix">
                          {ButtonSecondary && (
                          <button
                            className="vg-tk-btn vg-btn-secondary"
                            onClick={handleCancel}
                          >
                            {ButtonSecondary}
                          </button>
            )}
                          {ButtonThird && (
                            <button
                              className="vg-tk-btn vg-btn-secondary"
                              onClick={handleClose}
                            >
                              {ButtonThird}
                            </button>
                          )}
                          <button
                            className="vg-tk-btn vg-btn-primary"
                            onClick={handleSubmit}
                          >
                            {ButtonPrimary}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Portal>
                  <input type="hidden" id={DateRangePickerId} />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default VgDateRangePicker;