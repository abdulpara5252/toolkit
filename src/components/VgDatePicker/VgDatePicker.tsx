import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from "react";
import "./VgDatePicker.scss";
import "../VgButton/VgButton.scss";
import "../VgTextbox/VgTextbox.scss";
import Portal from "../../common/Portal";
import { handleAutoFocus, PortalEnum, utils } from "../../utils/utils";
import moment from "moment";
import Svg from "../VgSvg/Svg";
import VgButton from "../VgButton/VgButton";

export interface VgDatePickerProps {
  Title?: string;
  DefaultDate?: "today" | "firstDateOfMonth" | "clear" | "none" | string | Date | null;
  Onchange: (date: Date | null) => void;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  SelectAnytime?: boolean;
  Mindate?: Date | string;
  Maxdate?: Date | string;
  DatePickerOpen?: boolean;
  isPastDateDisable?: boolean,
  DatePickerVariant?: "small" | "regular";
  isFutureDateDisable?: boolean,
  Placeholder?: string;
  Disabled?: boolean;
  Disableddates?: Date[] | string[];
  DateRequired?: boolean;
  EmptyInputValue?: boolean,
  FocusBorder?: boolean;
  VagaroToolkit?: number
  DatePickerName?: string;
  DatePickerId?: string;
  Country?: "U.S.A" | "U.K." | "Canada" | "Australia";
  [key: string]: any;
  EnvironmentUrlDp?: string;
  ShowRequiredFieldMark?:boolean;
  SetValue?: Date | string;
  AutoFocus?:boolean;
  SetControlonRight?: boolean;
  CrossIcon?: boolean;
  CloseDatepickerOnSelect?: boolean;
  DateFormat?: string;
  HideCalendarIcon?: boolean;
  ShowIcon?: string;
  AnyTimeClick?: boolean;
}

interface VgDatePickerRef {
  validate: () => any;
}

declare global {
  interface Window {
    _countryDateFormat: any;
  }
}

const formatDate = (date: Date | string | any, format: string): any => {
  const selectDate = moment(date);
  return selectDate.isValid() ? selectDate.format(format) : "";
};
const parseDate = (inputValue: string): Date | null => {
  const parts = inputValue.split("/");
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return isNaN(date.getTime()) ? null : date;
};

const areDatesEqual = (date1: any, date2: any): boolean => {
  const parsedDate1 = moment(date1);
  const parsedDate2 = moment(date2);

  if (!parsedDate1.isValid() || !parsedDate2.isValid()) return false;

  return (
    parsedDate1.year() === parsedDate2.year() &&
    parsedDate1.month() === parsedDate2.month() &&
    parsedDate1.date() === parsedDate2.date()
  );
};

const getDaysInMonth = (date: Date | string): Date[] => {
  let workingDate: Date;

  if (typeof date === "string") {
    const momentDate = moment(
      date,
      formats,
      true
    );
    if (!momentDate.isValid()) return [];
    workingDate = momentDate.toDate();
  } else if (date instanceof Date && !isNaN(date.getTime())) {
    workingDate = date;
  } else {
    return [];
  }

  const days: Date[] = [];
  const firstDay = new Date(
    workingDate.getFullYear(),
    workingDate.getMonth(),
    1
  );
  const lastDay = new Date(
    workingDate.getFullYear(),
    workingDate.getMonth() + 1,
    0
  );

  const startDayOfWeek = firstDay.getDay();
  if (startDayOfWeek > 0) {
    const prevMonthLastDay = new Date(
      workingDate.getFullYear(),
      workingDate.getMonth(),
      0
    );
    for (
      let d = prevMonthLastDay.getDate() - startDayOfWeek + 1;
      d <= prevMonthLastDay.getDate();
      d++
    ) {
      days.push(
        new Date(workingDate.getFullYear(), workingDate.getMonth() - 1, d)
      );
    }
  }

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const endDayOfWeek = lastDay.getDay();
  if (endDayOfWeek < 6) {
    for (let d = 1; d <= 6 - endDayOfWeek; d++) {
      days.push(
        new Date(workingDate.getFullYear(), workingDate.getMonth() + 1, d)
      );
    }
  }

  return days;
};

const isValidDate = (date: any): boolean => {
  return moment(date).isValid();
};

const normalizeDate = (date: any): moment.Moment => {
  const normalized = moment(date);
  return normalized.startOf("day");
};

const formats = [
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  "YYYY-MM-DD",
  "DD MMM YYYY",
  "D MMM YYYY",
  "MMM DD YYYY",
  "MMM D YYYY",
  "DD/MM/YYYY",
  "MM/DD/YYYY",
];
const VgDatePicker: React.FC<VgDatePickerProps> = forwardRef<
  VgDatePickerRef,
  VgDatePickerProps
>(
  (
    {
      Title,
      DefaultDate = null,
      Onchange = () => { },
      SelectAnytime = false,
      OnBlur = () => {},
      Mindate = "",
      Maxdate = "",
      Placeholder = "Select Date",
      Country = "U.S.A",
      Disabled = false,
      Disableddates = [],
      isPastDateDisable = false,
      isFutureDateDisable = false,
      EmptyInputValue,
      DatePickerOpen = false,
      DateRequired = false,
      FocusBorder = false,
      DatePickerVariant = "regular",
      VagaroToolkit = 1,
      DatePickerName = "",
      DatePickerId = "",
      EnvironmentUrlDp = "",
      ShowRequiredFieldMark = false,
      SetValue = "",
      AutoFocus=false,
      SetControlonRight = false,
      CrossIcon = false,
      CloseDatepickerOnSelect = false,
      DateFormat = "",
      HideCalendarIcon = false,
      ShowIcon = "",
      AnyTimeClick = false,
    },
    ref
  ) => {
    const initializeDate = (): Date | null | string => {
      const currentDate = new Date();
      if (DefaultDate === "today") {
        return currentDate;
      } else if (DefaultDate === "firstDateOfMonth") {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      } else if (DefaultDate === "none") {
        return null;
      } else if (
        typeof DefaultDate === "string" &&
        DefaultDate !== "today" &&
        DefaultDate !== "firstDateOfMonth" &&
        DefaultDate !== "none" &&
        DefaultDate !== "clear"
      ) {
        let cleanedDefaultDate = DefaultDate.toString()?.replace(
          /,\s*(?=\d{4})/,
          " "
        ).replace(/,\s*(?=\d{1,2}:\d{2})/, " ");
        //remove time part if exists
          cleanedDefaultDate = cleanedDefaultDate
            .replace(/\s*\d{1,2}:\d{2}\s*(AM|PM)/i, "")
            .trim();
        const parsedDate = moment(cleanedDefaultDate, formats, true);

        if (parsedDate.isValid()) {
          return parsedDate.format("YYYY-MM-DD");
        }
      } else if (DefaultDate instanceof Date && !isNaN(DefaultDate.getTime())) {
        if (DefaultDate >= Mindate && DefaultDate <= Maxdate) {
          return DefaultDate;
        }
      }

      return null;
    };
    interface CountryDropItem {
      countryId: number;
      dateFormat: string;
      dateFormatId: string;
      jsDateFormat: string
    }
    const [countryDrop, setCountryDrop] = useState<CountryDropItem[]>([]);
    const [dateFormat, setDateFormat] = useState<any>("MMM D, YYYY");
    const [date, setDate] = useState<Date | null | string>(initializeDate());
    const [emptyValue, setEmptyValue] = useState<boolean>(EmptyInputValue);
    const [inputValue, setInputValue] = useState<string>(
      formatDate(initializeDate()!, dateFormat)
    );
    const [error, setError] = useState<string>("");
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement >(null);
    const timeDropdownRef = useRef<HTMLUListElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const calendarIconRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef<boolean>(false);
    const selectedMonthRef = useRef<HTMLDivElement | null>(null);
    const selectedYearRef = useRef<HTMLDivElement | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [touched, setTouched] = useState(false);
    const groupID = "/us02";
    const path = "/api/v2/merchants/dateformat";
    const defaultEnvironmentUrl = "https://api.vagaro.com" + groupID + path;
     const [showYearDropdown, setShowYearDropdown] = useState(false);
     const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const isandroidiospro = utils.CheckIsFromProAppWithoutState();
    const isAndroidiOSProWithTablet = utils.CheckIsFromIpadAndroidTabWithoutParm();
    const isPaydesk = utils.CheckIsFromPaydeskWithoutParm();
    const isPayPro = utils.CheckIsPayProDevice();
    const IpadAndroidPaypro = utils.CheckIsFromIpadAndroidPayproWithoutParm();
    const [dateClick , SetDateClick] = useState(false);
    const monthDropdownOptionsRef = useRef<HTMLDivElement>(null);
    const yearDropdownOptionsRef = useRef<HTMLDivElement>(null);
    const [clickOnAnyTime , setClickOnAnyTime] = useState(false);
    const [showTime , SetShowTime] = useState("");
    const hasScrolledToSelectedTimeRef = useRef(false);

    const formatOfDate = (dateString: string | number | Date) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };
    const generateTimeSlots = (): string[] => {
      const times: string[] = [];
      let startTime = 0;
      for (let i = 0; i < 48; i++) {
        const hours = Math.floor(startTime / 60);
        const minutes = startTime % 60;
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedTime = `${displayHours}:${minutes
          .toString()
          .padStart(2, "0")} ${period}`;
        times.push(formattedTime);
        startTime += 30;
      }
      return times;
    };
    const timeSlots = generateTimeSlots();
    const handleTimeSelect = (time: string) => {
      setSelectedTime(time);
      SetShowTime(time);
      setClickOnAnyTime(false);
    };
    const today = new Date();
    
    // Handle clear DefaultDate
    useEffect(() => {
      if (DefaultDate === "clear" && !SetValue) {
        handleClear();
      }
    }, [DefaultDate, SetValue]);
   

    const parseTimeString = (timeString: string) => {
      const regex12 = /(\d{1,2}):(\d{2})\s*(AM|PM)/i;
      const regex24 = /(\d{1,2}):(\d{2}):?(\d{2})?/;

      const match12 = timeString.match(regex12);
      if (match12) {
        return {
          hours: parseInt(match12[1]),
          minutes: parseInt(match12[2]),
          period: match12[3].toUpperCase(),
        };
      }

      const match24 = timeString.match(regex24);
      if (match24) {
        const hours = parseInt(match24[1]);
        const minutes = parseInt(match24[2]);
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;

        return {
          hours: displayHours,
          minutes: minutes,
          period: period,
        };
      }

      return null;
    };

    const findClosestTimeSlot = (hour24: number, minutes: number): number => {
      const timeSlots = generateTimeSlots();
      let minDiff = Infinity;
      let closestIndex = 0;

      timeSlots.forEach((slot, index) => {
        const slotTime = parseTimeString(slot);
        if (slotTime) {
          let slotHour24 = slotTime.hours;
          if (slotTime.period === "PM" && slotTime.hours !== 12) slotHour24 += 12;
          if (slotTime.period === "AM" && slotTime.hours === 12) slotHour24 = 0;

          const slotTotalMinutes = slotHour24 * 60 + slotTime.minutes;
          const inputTotalMinutes = hour24 * 60 + minutes;

          const diff = Math.abs(slotTotalMinutes - inputTotalMinutes);

          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        }
      });

      return closestIndex;
    };
    useEffect(() => {
      if (
        SelectAnytime &&
        (typeof SetValue === "string" || typeof DefaultDate === "string")
      ) {
        const currentTimeMatch = (SetValue || DefaultDate)
          ?.toString()
          ?.match(/(\d{1,2}:\d{2}:\d{2})|(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
        const currentTime = currentTimeMatch?.[1] || currentTimeMatch?.[2];

        const normalizedTimes = generateTimeSlots().map((t) => t.toUpperCase());        if (currentTime) {
          const timeComponents = parseTimeString(currentTime);

          if (timeComponents) {
            const { hours, minutes, period } = timeComponents;
            let hour24 = hours;
            if (period === "PM" && hours !== 12) hour24 += 12;
            if (period === "AM" && hours === 12) hour24 = 0;

            const roundedMinutes5 = Math.ceil(minutes / 5) * 5;
            let showHour = hour24;
            let showMinutes = roundedMinutes5;

            if (showMinutes >= 60) {
              showHour += 1;
              showMinutes = 0;
            }

            if (showHour >= 24) {
              showHour = 0;
            }

            const showPeriod = showHour >= 12 ? "PM" : "AM";
            const showDisplayHour = showHour % 12 === 0 ? 12 : showHour % 12;
            const showTimeString = `${showDisplayHour}:${showMinutes
              .toString()
              .padStart(2, "0")} ${showPeriod}`;

            const roundedMinutes30 = Math.ceil(minutes / 30) * 30;
            let finalHour = hour24;
            let finalMinutes = roundedMinutes30;

            if (finalMinutes >= 60) {
              finalHour += 1;
              finalMinutes = 0;
            }

            if (finalHour >= 24) {
              finalHour = 0;
            }

            const finalPeriod = finalHour >= 12 ? "PM" : "AM";
            const displayHour = finalHour % 12 === 0 ? 12 : finalHour % 12;
            const roundedTimeString = `${displayHour}:${finalMinutes
              .toString()
              .padStart(2, "0")} ${finalPeriod}`;

            SetShowTime(showTimeString);
            const roundedTimeUpper = roundedTimeString.toUpperCase();
            const idx = normalizedTimes.indexOf(roundedTimeUpper);

            if (idx !== -1) {
              setSelectedTime(generateTimeSlots()[idx]);
            } else {
              const closestTimeIndex = findClosestTimeSlot(
                finalHour,
                finalMinutes
              );
              setSelectedTime(generateTimeSlots()[closestTimeIndex]);
            }
          } else {
            setSelectedTime(generateTimeSlots()[0]);
          }
        } else {
          setSelectedTime(generateTimeSlots()[0]);
          SetShowTime(generateTimeSlots()[0]);
        }
      }
    }, [SelectAnytime, SetValue]);
   
    useEffect(() => {
      if (SetValue) {
        let newDate;
        if (SetValue instanceof Date) {
          if (!isNaN(SetValue.getTime())) {
            newDate = moment(SetValue);
          }
        }
        else if (typeof SetValue === 'string') {
          let cleanedSetValue = SetValue.toString().replace(/,\s*(?=\d{4})/, ' ').replace(/,\s*(?=\d{1,2}:\d{2})/, ' ');
          cleanedSetValue = cleanedSetValue.replace(/\s*\d{1,2}:\d{2}\s*(AM|PM)/i, '').trim();
          newDate = moment(cleanedSetValue, formats, true);
          if (!newDate.isValid()) {
            newDate = moment(cleanedSetValue);
          }
        }
        else {
          newDate = moment(SetValue);
        }
        if (newDate && newDate.isValid()) {
          setDate(newDate.format("YYYY-MM-DD"));
          setInputValue(formatDate(newDate, dateFormat));
          setEmptyValue(false);
          hasInitialized.current = true;
          if (DefaultDate === "none") {
            SetDateClick(true);
          }
        }
    }
       
    }, [SetValue, Country, dateFormat]);
    const handleDateChange = (selectedDate: Date): void => {
      if(DefaultDate === "none") {
        SetDateClick(true)
      }
      setShowYearDropdown(false);
      setShowMonthDropdown(false);
      setEmptyValue(false)
      setDate(selectedDate);
      setInputValue(formatDate(selectedDate, dateFormat));
      Onchange(selectedDate);
      if(SelectAnytime) {
       Onchange(selectedDate + selectedTime);
      }
      if(CloseDatepickerOnSelect) {
        setShowCalendar(false);
      }
      if(clickOnAnyTime){
        setClickOnAnyTime(false)
      }
    };

    useEffect(() => {
      const storedData = localStorage.getItem("dateRangeData");
      if (storedData) {
        const parsedDatas = JSON.parse(storedData);
        const value = `${parsedDatas.formattedStartDate} + - + ${parsedDatas.formattedEndDate}`;
        setInputValue(value);
      }
    }, []);

    const isCountryDateFormatInvalid = (format: string | null) => {
      return typeof format === "undefined" || format === null || format === "";
    };


    useEffect(() => {
      if(DateFormat){
        setDateFormat(DateFormat)
      }
    },[DateFormat])
    useEffect(() => {
      if(DateFormat) return ;
      const countryDropdown = async () => {
        try {
          const urlToUse =
            EnvironmentUrlDp.length > 0
              ? `${EnvironmentUrlDp}us02/api/v2/merchants/dateformat`
              : defaultEnvironmentUrl;

          const response = await fetch(urlToUse);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const res = await response.json();
          setCountryDrop(res.Data);
        } catch (error) {
          console.error(error);
        }
      };

      if (isCountryDateFormatInvalid(window._countryDateFormat)) {
        countryDropdown();
      } else {
        const _countryDateFormat = window._countryDateFormat
        setCountryDrop(_countryDateFormat);
      }
    }, [EnvironmentUrlDp, window._countryDateFormat]);

    useEffect(() => {
      if(DateFormat) return;
      if (countryDrop.length > 0) {
        const countryId =
          Country === "U.S.A"
            ? 1
            : Country === "U.K."
              ? 2
              : Country === "Canada"
                ? 1
                : Country === "Australia"
                  ? 1
                  : "";
        if (countryId) {
          const format = countryDrop.filter(
            (item: any) => item.countryId === countryId
          );
          const filteredOnbj = format.find((item) => item.dateFormatId == '1')
          setDateFormat(filteredOnbj?.jsDateFormat)
        }
      }
    }, [countryDrop, Country , SetValue]);
    
    useEffect(() => {
      if (isandroidiospro || isAndroidiOSProWithTablet || isPaydesk || isPayPro || IpadAndroidPaypro) {
        setShowCalendar(false);
      }
    }, [isandroidiospro, isAndroidiOSProWithTablet, isPaydesk, isPayPro, IpadAndroidPaypro]);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
          !inputRef?.current?.contains(event.target as Node) &&
          !calendarIconRef.current?.contains(event.target as Node)
        ) {
          setShowCalendar(false);
          setShowMonthDropdown(false);
          setShowYearDropdown(false);
          setTouched(true);
          const isEmpty = !inputRef.current?.value?.trim();
          if (DateRequired && isEmpty) {
            setError("required");
          } else {
            setError("");
          }
          validation();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // PRIORITY 2: Initialize default values only if SetValue is not provided
    useEffect(() => {
      if (!hasInitialized.current && !SetValue) {
        const newDate = initializeDate();
        setDate(newDate);
        setInputValue(formatDate(newDate!, dateFormat));
        hasInitialized.current = true;
      }
    }, [DefaultDate, Mindate, Maxdate, dateFormat, Country, SetValue]);

    useEffect(() => {
      if (date && !emptyValue) {
        const formattedDate = formatDate(date, dateFormat);
        if (SelectAnytime && inputValue !== '') {
          setInputValue(`${formattedDate} - ${showTime}`);
        } else if(SelectAnytime && inputValue !== '') { 
          setInputValue(formattedDate);
        }
      } else if(DefaultDate === "clear" && date && SelectAnytime ) {
        const formattedDate = formatDate(date, dateFormat);
        setInputValue(`${formattedDate} - ${selectedTime}`);
      }
    }, [dateFormat, SelectAnytime, emptyValue, selectedTime , inputValue]);

    useEffect(() => {
      if (DefaultDate === "today" && !SetValue) {
        const currentDate = new Date();
        setDate(currentDate);
        setInputValue(formatDate(currentDate, dateFormat));
      }
    }, [DefaultDate, Country, dateFormat, SetValue]);

    useEffect(() => {
      if (DefaultDate === "none" && !SetValue) {
        handleClear();
      }
    }, [DefaultDate, SetValue]);

    useEffect(() => {
      if (DefaultDate === "firstDateOfMonth" && !SetValue) {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );

        setDate(firstDayOfMonth);
        setInputValue(formatDate(firstDayOfMonth, dateFormat));
      } else if (
        typeof DefaultDate === "string" &&
        DefaultDate !== "today" &&
        DefaultDate !== "firstDateOfMonth" &&
        DefaultDate !== "none" &&
        DefaultDate !== "clear" &&
        !SetValue
      ) {
        const parsedDate = moment(DefaultDate, formats, true);
        if (parsedDate.isValid()) {
          setDate(parsedDate.format("YYYY-MM-DD"));
          setInputValue(formatDate(parsedDate, dateFormat));
        }
      }
    }, [DefaultDate, dateFormat, Country, SetValue]);

    useEffect(() => {
      handleAutoFocus(AutoFocus && Boolean(DateRequired && (!date || !inputRef.current?.value)), inputRef)
    }, [AutoFocus]);

    useEffect(() => {
      if (showMonthDropdown && selectedMonthRef.current) {
        const dropdown = selectedMonthRef.current.closest('.dropdown-options');
        if (dropdown) {
          dropdown.scrollTop = selectedMonthRef.current.offsetTop;
        }
      }
    }, [showMonthDropdown]);

    useEffect(() => {
      if (showYearDropdown && selectedYearRef.current) {
        const dropdown = selectedYearRef.current.closest('.dropdown-options');
        if (dropdown) {
          dropdown.scrollTop = selectedYearRef.current.offsetTop;
        }
      }
    }, [showYearDropdown]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const inputValue = event.target.value;
      setInputValue(inputValue);
      const newDate = parseDate(inputValue);
      if (newDate && !isNaN(newDate.getTime())) {
        const newDateWithoutTime = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          0,
          0,
          0
        );
        handleDateChange(newDateWithoutTime);
      } else {
        setError("Invalid date format");
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isandroidiospro || isAndroidiOSProWithTablet || isPaydesk || isPayPro || IpadAndroidPaypro) {
        e.preventDefault();
      }
    };

    const handleClear = (): void => {
      setInputValue("");
      setDate(null);
      setTouched(true)
      setError(DateRequired ? "required" : "");
      Onchange(null);
      setShowCalendar(false);
      setSelectedTime('');
      const currentDate = new Date();
      setDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    };

    const handleMonthChange = (increment: number): void => {
      setClickOnAnyTime(false);
      const parsedDate = moment(date);
      if (!parsedDate.isValid()) return;
      const newDate = parsedDate.clone().add(increment, "months");
      setDate(newDate.toDate());
    };

    const handleYearChange = (newYear: number): void => {
      setClickOnAnyTime(false);
      const parsedDate = moment(date);
      if (!parsedDate.isValid()) return;
      const newDate = parsedDate.clone().year(newYear);
      setDate(newDate.toDate());
    };

    const isDisabled = (day: any): boolean => {
      const parsedDay = moment(day);
      if (!isValidDate(parsedDay)) return true;

      const isInDisabledDates = Disableddates.some((disabledDate: any) =>
        areDatesEqual(moment(disabledDate), parsedDay)
      );

      // Create today's date with time set to 00:00:00 for proper comparison
      const today = moment().startOf("day");
      const dayToCompare = parsedDay.clone().startOf("day");

      const normalizedMinDate = normalizeDate(moment(Mindate));
      const normalizedMaxDate = normalizeDate(moment(Maxdate));

      if (isFutureDateDisable && dayToCompare.isAfter(today)) {
        return true;
      }

      if (isPastDateDisable && dayToCompare.isBefore(today)) {
        return true;
      }

      return (
        Disabled ||
        dayToCompare.isBefore(normalizedMinDate) ||
        dayToCompare.isAfter(normalizedMaxDate) ||
        isInDisabledDates
      );
    };

    const handleMonthWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (

      (monthDropdownOptionsRef.current &&
        monthDropdownOptionsRef.current.contains(e.target as Node)) ||
      (yearDropdownOptionsRef.current &&
        yearDropdownOptionsRef.current.contains(e.target as Node))
    ) {
      return;
    }
    const delta = e.deltaY;
    if (delta > 0) {
      handleMonthChange(1); // Scroll down: next month
    } else if (delta < 0) {
      handleMonthChange(-1); // Scroll up: previous month
    }
  };

    const renderCalendarHeader = (): JSX.Element | null => {
      const parsedDate = moment(date);

      if (!parsedDate.isValid()) {
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
      const startYear = 2009;
      const endYear = parsedDate.year() + 5;
      const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
      );

      const handleShowMonth = () => {
        setShowMonthDropdown((prev: boolean) => !prev);
        setShowYearDropdown(false);
      };

      const handleShowYear = () => {
        setShowYearDropdown((prev: boolean) => !prev);
        setShowMonthDropdown(false);
      };

      return (
        <div className="calendar-header">
          <button
            className="arrow-btn-pre"
            onClick={() => handleMonthChange(-1)}
          ></button>
          <div
            className={`vg-cale-dropdwon month ${
              showMonthDropdown ? "show" : ""
            }`}
          >
            <div className="dropdown-container" onClick={handleShowMonth}>
              {months[parsedDate.month()]}
            </div>
            {showMonthDropdown && (
              <div className="dropdown-options" ref={monthDropdownOptionsRef}>
                {months.map((month, index) => (
                  <div
                    key={month}
                    className={`dropdown-option ${
                      index === parsedDate.month() ? "selected" : ""
                    }`}
                    ref={index === parsedDate.month() ? selectedMonthRef : null}
                    onClick={() => {
                      const increment = index - parsedDate.month();
                      handleMonthChange(increment);
                      setShowMonthDropdown(false);
                    }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            className={`vg-cale-dropdwon year ${
              showYearDropdown ? "show" : ""
            }`}
          >
            <div className="dropdown-container" onClick={handleShowYear}>
              {parsedDate.year()}
            </div>
            {showYearDropdown && (
              <div className="dropdown-options" ref={yearDropdownOptionsRef}>
                {years.map((year) => (
                  <div
                    key={year}
                    className={`dropdown-option ${
                      year === parsedDate.year() ? "selected" : ""
                    }`}
                    ref={year === parsedDate.year() ? selectedYearRef : null}
                    onClick={() => {
                      handleYearChange(year);
                      setShowYearDropdown(false);
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
            onClick={() => handleMonthChange(1)}
          ></button>
        </div>
      );
    };

    const inputClassName = `
    vg-input-control 
    ${Disabled ? "vg-input-control-disabled" : ""}
    ${FocusBorder ? "vg-input-control-focus" : ""}
    ${!inputValue && DateRequired && touched ? "vg-input-control-error" : ""}
  `.trim();

    // #region  Form control.
    const validation = () => {
      if(DateRequired){
        setTouched(true);
        const isValid = !(DateRequired && (!date || !inputRef.current?.value));
        const errorMsg = isValid ? "" : "required";
        setError(errorMsg);
      }
      handleAutoFocus(AutoFocus && DateRequired && (!date || !inputRef.current?.value), inputRef)

      let validateObject = {
        [DatePickerId]: inputValue,
        IsValidate: DateRequired && (!date || !inputRef.current?.value) ? false:true,
        IsRequired: DateRequired,
        id: DatePickerId,
      };
      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));
    // #endregion


    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    
      // Check if any of the device-specific conditions are true
      const isDeviceSpecificConditionTrue =
        isandroidiospro ||
        isAndroidiOSProWithTablet ||
        isPaydesk ||
        isPayPro ||
        IpadAndroidPaypro;
    
      if (isDeviceSpecificConditionTrue) {
        // If any condition is true, ensure the calendar is closed
        setShowCalendar(false);
      }
      else if (SelectAnytime) {
        setShowCalendar(true);
      }
      else {
        // For web environments, toggle the calendar state
        setShowCalendar((prev) => !prev);
      }
    
      // Additional logic for mobile devices
      if (isDeviceSpecificConditionTrue) {
        var isFutureDate = isFutureDateDisable;
        var startdate =
          inputValue != "" && inputValue != undefined && inputValue != null
            ? moment(inputValue).format("MMM DD, YYYY")
            : moment(new Date()).format("MMM D, YYYY");
        var isPastDate = isPastDateDisable;
        var obj: any = {};
        obj.name = "Monday";
        obj.VagaroToolkit = VagaroToolkit;
        obj.callFromLocation = DatePickerId + "|#|ReactToolKit";
        obj.isOpen = 1;
        obj.time = startdate;
        obj.isPastDate = isPastDate;
        obj.isFutureDate = isFutureDate;
        obj.settingPageIndex = 25000;
        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = "";
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "79|~|" + JSON.stringify(obj);
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
    };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (OnBlur) {
      OnBlur(e as any);
    }
  }


    useEffect(() => {
          const handleDateRangeSelection = (event: CustomEvent) => {
            const { date, elementId } = event.detail;
            if (elementId === DatePickerId) {
              setInputValue(date);
              if (Onchange) {
                Onchange(date, elementId);
              }
            }
          };
          window.addEventListener('nativeDateRangeSelected', handleDateRangeSelection as EventListener);
          return () => {
            window.removeEventListener('nativeDateRangeSelected', handleDateRangeSelection as EventListener);
          };
    }, [DatePickerId, Onchange]);


    const handleCrossIcon = () => {
      handleClear();
    }



    // currently there is no need for this feature
    // useEffect(() => {
    //   if (
    //     inputValue === "" &&
    //     !SetValue &&
    //     (DefaultDate === "" || !DefaultDate)
    //   ) {
    //     let newDate;
    //     if (Mindate instanceof Date) {
    //       newDate = new Date(Mindate);
    //     } else {
    //       let cleanedDefaultDate = Mindate.replace(
    //         /,\s*(?=\d{4})/,
    //         " "
    //       ).replace(/,\s*(?=\d{1,2}:\d{2})/, " ");

    //       cleanedDefaultDate = cleanedDefaultDate
    //         .replace(/\s*\d{1,2}:\d{2}\s*(AM|PM)/i, "")
    //         .trim();

    //       newDate = moment(cleanedDefaultDate, formats, true).toDate();
    //     }
    //     newDate.setMonth(newDate.getMonth());
    //     setDate(newDate);
    //   }
    // }, [Mindate]);

    useEffect(() => {
      if (SelectAnytime && showCalendar && selectedTime) {
        if (!hasScrolledToSelectedTimeRef.current) {
          const timeout = setTimeout(() => {
            if (timeDropdownRef.current) {
              const listItems = timeDropdownRef.current.querySelectorAll("li");
              const target = Array.from(listItems).find(
                (item) => item.textContent?.trim() === selectedTime.trim()
              );

              if (target instanceof HTMLElement) {
                timeDropdownRef.current.scrollTop = target.offsetTop;
              }

              hasScrolledToSelectedTimeRef.current = true;
            }
          }, 0);

          return () => clearTimeout(timeout);
        }
      } else if (!showCalendar) {
        hasScrolledToSelectedTimeRef.current = false;
      }
    }, [SelectAnytime, showCalendar, selectedTime]);


    const handleClickOnAnyTime = () => {
      setClickOnAnyTime(true);
    }
    useEffect(() => {
      const handleWheelEvent = (e: any) => {
        e.preventDefault();
      };

      setTimeout(() => {
        const calendarEl = document.querySelector(
          ".vg-schedular-datepicker-section"
        );
        const monthEl = document.querySelector(".dropdown-options");
        if (calendarEl) {
          calendarEl.removeEventListener("wheel", handleWheelEvent);
        }
        if (monthEl) {
          monthEl.addEventListener(
            "wheel",
            function (e) {
              e.stopPropagation();
            },
            { passive: false }
          );
        }
        if (calendarEl) {
          calendarEl.addEventListener("wheel", handleWheelEvent, {
            passive: false,
          });
        }
      }, 0);
      return () => {
        const calendarEl = document.querySelector(
          ".vg-schedular-datepicker-section"
        );
        const monthEl = document.querySelector(".dropdown-options");

        if (calendarEl) {
          calendarEl.removeEventListener("wheel", handleWheelEvent);
        }
        if (monthEl) {
          monthEl.removeEventListener("wheel", handleWheelEvent);
        }
      };
    }, [showCalendar, showMonthDropdown, showYearDropdown]);

    // need to discuss this functionlity to show current month and year when calander open

    // useEffect(() => {
    //   if(inputValue){
    //     setDate(moment(inputValue, dateFormat).toDate());
    //   }
    // },[showCalendar])
    
    return (
      <Fragment>
        {!DatePickerOpen && (
          <div
            className={`${
              SetControlonRight ? "vg-datepicker-native-pro" : ""
            } vg-reacttk-d-flex`}
          >
            {Title?.length > 0 && (
              <label className="vg-input-label">
                {ShowRequiredFieldMark && DateRequired ? (
                  <span className="required-input-mark">*</span>
                ) : (
                  ""
                )}
                {Title}
              </label>
            )}
            <div className={`vg-date-container ${SetControlonRight ? 'vg-mobile-date-container' : ''}`}>
              {isandroidiospro ||
              isAndroidiOSProWithTablet ||
              isPaydesk ||
              isPayPro ||
              IpadAndroidPaypro ? (
                <>
                  <input
                    type="text"
                    id={DatePickerId}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={Placeholder}
                    disabled={Disabled}
                    onClick={handleClick}
                    readOnly={true}
                    ref={inputRef}
                    className={inputClassName}
                    onFocus={handleFocus}
                    name={DatePickerName}
                    autoFocus={AutoFocus}
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    id={DatePickerId}
                    value={emptyValue ? "" : inputValue}
                    onChange={handleInputChange}
                    placeholder={Placeholder}
                    disabled={Disabled}
                    onClick={handleClick}
                    readOnly
                    ref={inputRef}
                    className={inputClassName}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    name={DatePickerName}
                    autoFocus={AutoFocus}
                  />
                </>
              )}

              <div
                className={`vg-check-cal-icon ${Disabled ? "disabled" : ""}`}
                aria-hidden="true"
                ref={calendarIconRef}
                onClick={() => {
                  !isandroidiospro &&
                    !SelectAnytime &&
                    setShowCalendar(!showCalendar);
                }}
              >
                {/* {(CrossIcon) &&  ( */}
                <>
                  {!Disabled &&
                    CrossIcon &&
                    inputValue !== "" &&
                    (!SetControlonRight ? (
                      <Svg name="cross" onClick={handleCrossIcon} />
                    ) : (
                      <svg
                        onClick={handleCrossIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                      </svg>
                    ))}
                  {!HideCalendarIcon && SelectAnytime && <Svg name="clock" />}
                </>
                {/* )} */}
                {!SetControlonRight && !HideCalendarIcon && (
                  <Svg name="calendar" onClick={handleClick} />
                )}
                {HideCalendarIcon && ShowIcon && (
                  <span
                    onClick={handleClick}
                    dangerouslySetInnerHTML={{
                      __html: ShowIcon,
                    }}
                  />
                )}
              </div>
            </div>
            {touched && DateRequired && error && !inputValue && (
              <span className="vg-input-control-error-msg">{"required"}</span>
            )}
          </div>
        )}
        {DatePickerOpen ? (
          <>
            <div className={`vg-group ${Disabled ? "disabled" : ""}`}>
              <div className={`vg-reacttk-calendar ${DatePickerVariant === "regular" ? "" : "small"}`} ref={calendarRef}>
                {renderCalendarHeader()}
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
                  {getDaysInMonth(date!).map((day) => {
                    const isDisabledDay = isDisabled(day);
                    return (
                      <div
                        key={day.toISOString()}
                        className={`date ${isDisabledDay ? "disabled" : ""}
                        } ${areDatesEqual(day, date) && (DefaultDate !== "none" || dateClick) ? "selected" : ""}`}
                        onClick={() => !isDisabledDay && handleDateChange(day)}
                        tabIndex={-1}
                      >
                        <span>{day.getDate()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <input type="hidden" id={DatePickerId} />
          </>
        ) : (
          <>
            {showCalendar && !Disabled && (
              <>
                <Portal
                  wrapperElementId="daterpicker"
                  wrapperElement="div"
                  inputRef={inputRef}
                  type={1}
                >
                  <div className={`vg-group ${Disabled ? "disabled" : ""}`}>
                    <div
                      className={`vg-reacttk-calendar ${
                        SelectAnytime ? "vg-schedular-datepicker" : ""
                      }`}
                      ref={calendarRef}
                    >
                      <div className="vg-schedular-wrapper">
                        <div
                          className="vg-schedular-datepicker-section"
                          onWheel={handleMonthWheel}
                        >
                          {renderCalendarHeader()}
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
                            {getDaysInMonth(date!).map((day) => {
                              const isDisabledDay = isDisabled(day);
                              const isToday = areDatesEqual(day, new Date().setHours(0, 0, 0, 0));
                              return (
                                <div
                                  key={day.toISOString()}
                                  className={`date ${
                                    isDisabledDay ? "disabled" : ""
                                  }
                               ${
                                areDatesEqual(day, date) &&
                                (DefaultDate !== "none" || dateClick) &&
                                inputValue !== "" && !clickOnAnyTime
                                  ? "selected"
                                  : ""
                              } ${
                                    AnyTimeClick && isToday
                                      ? "today-anytime"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    !isDisabledDay && handleDateChange(day)
                                  }
                                  tabIndex={-1}
                                >
                                  <span>{day.getDate()}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {SelectAnytime && (
                          <div className="vg-time-picker-container">
                            {AnyTimeClick ? (
                              <div className={`vg-time-slot vg-time-slot-anytime ${clickOnAnyTime ? "selected" : ""}`} onClick={handleClickOnAnyTime}>
                                Anytime
                              </div>
                            ) : (
                              <div className="vg-date-anytime-text">
                                Anytime
                              </div>
                            )}
                            {/*  */}
                            <ul
                              className="vg-time-picker-dropdown"
                              ref={timeDropdownRef}
                            >
                              {timeSlots.map((time, index) => (
                                <li
                                  key={index}
                                  onClick={() => {
                                    handleTimeSelect(time);
                                    Onchange(time);
                                  }}
                                  className={`vg-time-slot ${
                                    (selectedTime === time && !clickOnAnyTime) ? "selected" : ""
                                  }`}
                                >
                                  {time}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {SelectAnytime && (
                        <div className="vg-schedular-btn-wrapper">
                          <VgButton
                            ButtonVariant="secondary"
                            ButtononClick={() => {
                              setShowCalendar(false);
                            }}
                            ButtononHover={() => {}}
                            onClick={() => {}}
                          >
                            Cancel
                          </VgButton>
                          <VgButton
                            ButtonVariant="theme"
                            ButtononClick={() => {
                              setShowCalendar(false);
                            }}
                            ButtononHover={() => {}}
                            onClick={() => {}}
                          >
                            OK
                          </VgButton>
                        </div>
                      )}
                    </div>
                  </div>
                </Portal>
                <input type="hidden" id={DatePickerId} />
              </>
            )}
          </>
        )}
      </Fragment>
    );
  }
);

export default VgDatePicker;