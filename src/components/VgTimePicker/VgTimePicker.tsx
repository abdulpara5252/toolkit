import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import "./VgTimePicker.scss";
import Portal from "../../common/Portal";
import { handleAutoFocus, PortalEnum, utils } from "../../utils/utils";
import Svg from "../VgSvg/Svg";

export interface VgTimePickerProps {
  Title?: string;
  Disable?: boolean;
  Focus?: boolean;
  Required?: boolean;
  TimePickerId?: string;
  [key: string]: any;
  OnSelect?: (time: string, elementId?: string) => void;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnChange?: (time: string) => void;
  CustomErrorMessage?: string;
  Placeholder?: string;
  SetValue?: string;
  ShowRequiredFieldMark?: boolean;
  Name?: string;
  DropdownPosition?: string;
  VagaroToolkit?: number
  AutoFocus?: boolean;
  TimePickerOpen?: boolean;
  OnIconClick?: (event: React.MouseEvent<HTMLInputElement>, isOpen: boolean) => void,
}

interface VgTimePickerRef {
  validate: () => {
    [key: string]: any;
    IsValidate: boolean;
    Required: boolean;
    id: string;
  };
  getData: () => {
    [key: string]: string;
  };
}

const VgTimePicker: React.FC<VgTimePickerProps> = forwardRef<
  VgTimePickerRef,
  VgTimePickerProps
>(
  (
    {
      Title,
      Disable,
      Focus,
      Required,
      TimePickerId = "",
      OnSelect,
      OnBlur = () => { },
      OnChange,
      CustomErrorMessage = "",
      Placeholder = "Open",
      SetValue,
      ShowRequiredFieldMark = false,
      DropdownPosition = "Left",
      Name = "vg-time-picker",
      VagaroToolkit = 1,
      AutoFocus = false,
      TimePickerOpen = false,
      OnIconClick = (event: React.MouseEvent<HTMLInputElement>, isOpen: boolean) => { },
    },
    ref
  ) => {
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    const [isTouched, setIsTouched] = useState<boolean>(true);
    const [isCheckValidation, setIsCheckValidation] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const timeDropdownRef = useRef<HTMLUListElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [lastValidTime, setLastValidTime] = useState(selectedTime);

    const isandroidiospro = utils.CheckIsFromProAppWithoutState();
    const NativeData: string =
      (document.getElementById(TimePickerId) as HTMLInputElement | null)
        ?.value || "";
    useEffect(() => {
      setIsOpen(TimePickerOpen)
    }, [TimePickerOpen])

    useEffect(() => {
      setSelectedTime(SetValue);
    }, [SetValue]);

    useEffect(() => {
      if (isandroidiospro) {
        setIsOpen(false);
        setIsTouched(false);
      }
    }, [isandroidiospro]);



    useEffect(() => {
      const handleNativeTimeSelection = (event: CustomEvent) => {
        const { time, elementId } = event.detail;
        if (elementId === TimePickerId) {
          setSelectedTime(time);
          if (OnSelect) {
            OnSelect(time, elementId);
          }
        }
      };
      window.addEventListener('nativeTimeSelected', handleNativeTimeSelection as EventListener);
      return () => {
        window.removeEventListener('nativeTimeSelected', handleNativeTimeSelection as EventListener);
      };
    }, [TimePickerId, OnSelect]);

    useEffect(() => {
      const handleScroll = () => {
        if (timeDropdownRef.current) {
          timeDropdownRef.current.style.display = 'none';
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const CloseDropdown = () => {
      if (isOpen === true) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isandroidiospro) {
        setIsOpen(false);
      }
      const regex = /^[A-Za-z]+$/;

      if (
        (timeDropdownRef.current &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node) &&
          !timeDropdownRef.current.contains(event.target as Node)) ||
        regex.test(selectedTime)
      ) {
        setIsOpen(false);
      }
    };

    const handleTrimmedTime = (time: string) => {
      const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)?$/i;
      if (timePattern.test(time)) {
        setErrorMessage("");
        setSelectedTime(time);
        if (OnChange) {
          OnChange(time);
        }
      } else {
        setErrorMessage(CustomErrorMessage);
      }
    }

    const handleBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      if (OnBlur) {
        OnBlur(e);
      }

      let trimTime = selectedTime?.replace(/\s+/g, "").trim();

      // Case when the user types '2am' or '2am' without a colon
      if (/^\d{1,2}[apm]{2}$/i.test(trimTime)) {
        trimTime = trimTime?.replace(/(\d{1,2})([apm]{2})/i, "$1:00 $2").toUpperCase();
      }

      if (
        trimTime === "0" ||
        trimTime === "24" ||
        trimTime === "24:00" ||
        trimTime?.match(/^24:00.*$/i) ||
        trimTime?.match(/^24.*$/i)
      ) {
        trimTime = "12:00 AM";
        if (OnChange) {
          OnChange(trimTime);
        }
        setSelectedTime(trimTime);
        setErrorMessage("");
        return;
      }

      const digitOnlyLength = trimTime?.replace(/[^0-9]/g, "").length;

      if (digitOnlyLength > 6) {
        setErrorMessage(CustomErrorMessage);
        return;
      }

      const normalizeHour = (hour: number) => {
        while (hour >= 24) {
          hour -= 24;
        }
        return hour;
      };

      if (/^\d{6}$/.test(trimTime)) {
        let hour = parseInt(trimTime.slice(0, 2), 10);
        let minutes = parseInt(trimTime.slice(2, 4), 10);
        let seconds = parseInt(trimTime.slice(4, 6), 10);

        if (seconds >= 60) {
          setErrorMessage(CustomErrorMessage);
          return;
        }

        hour = normalizeHour(hour);
        const period = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 === 0 ? 12 : hour % 12;

        trimTime = `${hour}:${minutes.toString().padStart(2, "0")} ${period}`;
        if (OnChange) {
          OnChange(trimTime);
        }
        setSelectedTime(trimTime);
        setErrorMessage("");
        return;
      }

      // Handle 3- or 4-digit numbers
      if (/^\d{3,4}$/.test(trimTime)) {
        const hourPart = parseInt(trimTime.slice(0, -2), 10);
        const minutePart = parseInt(trimTime.slice(-2), 10);
        if (minutePart > 59) {
          setErrorMessage(CustomErrorMessage);
          return;
        }

        const normalizedHour = normalizeHour(hourPart);

        const period = normalizedHour >= 12 ? "PM" : "AM";
        const formattedHour =
          normalizedHour % 12 === 0 ? 12 : normalizedHour % 12;

        trimTime = `${formattedHour}:${minutePart
          .toString()
          .padStart(2, "0")} ${period}`;
        if (OnChange) {
          OnChange(trimTime);
        }
        setSelectedTime(trimTime);
        setErrorMessage("");
        return;
      }

      if (/^\d{1,2}$/.test(trimTime)) {
        let hour = parseInt(trimTime, 10);
        hour = normalizeHour(hour);

        const period = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 === 0 ? 12 : hour % 12;

        trimTime = `${hour}:00 ${period}`;
        if (OnChange) {
          OnChange(trimTime);
        }
        setSelectedTime(trimTime);
        setErrorMessage("");
        return;
      }

      if (/^(\d{1,2})\s*[APap]$/.test(trimTime)) {
        const hour = parseInt(trimTime, 10);
        const period = trimTime.toLowerCase().includes("p") ? "PM" : "AM";

        trimTime = `${hour}:00 ${period}`;
        if (OnChange) {
          OnChange(trimTime);
        }
        setSelectedTime(trimTime);
        setErrorMessage("");
        return;
      }

      if (/:/.test(trimTime)) {
        let [hourStr, minuteStr] = trimTime.split(":");

        const invalidCharMatch = minuteStr.match(/[^0-9apAPamPM]/);
        if (invalidCharMatch) {
          setSelectedTime(trimTime);
          if (OnChange) {
            OnChange(trimTime);
          }
          setErrorMessage(CustomErrorMessage);
          return;
        }

        const periodCount = (minuteStr.match(/a|p|am|pm/gi) || []).length;
        if (periodCount > 1) {
          setErrorMessage(
            "Invalid period format. Only one 'a', 'p', 'am', or 'pm' is allowed."
          );
          return;
        }

        const periodMatch = minuteStr.match(/(am|pm|a|p)$/i);
        let period = "";

        if (periodMatch) {
          period = periodMatch[0].toLowerCase().includes("p") ? "PM" : "AM";
          minuteStr = minuteStr.replace(/(am|pm|a|p)$/i, "");
        }
        if (minuteStr.length === 1) {
          setSelectedTime(trimTime);
          if (OnChange) {
            OnChange(trimTime);
          }
          setErrorMessage("");
          return;
        }

        let hour = parseInt(hourStr, 10);
        hour = normalizeHour(hour);
        hourStr = (hour % 12 === 0 ? 12 : hour % 12).toString();
        if (!minuteStr) {
          minuteStr = "00";
        }

        if (parseInt(minuteStr, 10) >= 60) {
          setErrorMessage(CustomErrorMessage);
          return;
        }

        if (!period) {
          period = hour >= 12 ? "PM" : "AM";
        }

        trimTime = `${hourStr}:${minuteStr.padStart(2, "0")} ${period}`;
        handleTrimmedTime(trimTime)
        return;
      }
      handleTrimmedTime(trimTime);
    };


    const addDocumentListener = () => {
      document.addEventListener("mousedown", handleClickOutside);
    };

    const removeDocumentListener = () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    useEffect(() => {
      addDocumentListener();

      return removeDocumentListener;
    }, [selectedTime]);

    useEffect(() => {
      handleAutoFocus(AutoFocus && Boolean(Required && !inputRef?.current?.value), inputRef)
    }, [AutoFocus])

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
      if (isandroidiospro) {
        setIsOpen(false);
      }
      setSelectedTime(time);
      setIsTouched(true);
      setIsOpen(false);
      setLastValidTime(time);
      setErrorMessage("");

      if (OnSelect) {
        OnSelect(time);
      }
      if (Required && time) {
        setIsCheckValidation(false);
      }
    };

    const IsValidOrNot = () => {
      if (isCheckValidation) {
        return false;
      } else {
        return true;
      }
    };

    const validation = () => {
      if (Required && !selectedTime) {
        setIsCheckValidation(true);
      }
      handleAutoFocus(AutoFocus && Boolean(errorMessage), inputRef)
      let validateObject = {
        [TimePickerId]: inputRef?.current?.value || selectedTime,
        IsValidate: !Boolean(errorMessage),
        Required: Required,
        id: TimePickerId,
      };

      return validateObject;
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
      getData: () => {
        return {
          [TimePickerId]: inputRef?.current?.value || selectedTime,
        };
      }
    }) as VgTimePickerRef);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (OnChange) {
        OnChange(newValue);
      }

      setSelectedTime(newValue);

      if (newValue === "") {
        setErrorMessage("");
        setIsCheckValidation(false);
      }
    };

    const handleTouch = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsTouched(false);
    };

    const handleClick = (value: any) => {
      if (isandroidiospro) {
        var obj: any = {};
        obj.time = selectedTime || "4:00 AM"
        obj.actionTag = 1;
        obj.callFromLocation = TimePickerId;
        obj.VagaroToolkit = VagaroToolkit
        var messageObj: any = {};
        messageObj.message = "";
        messageObj.messageType = 0;
        messageObj.screenTitle = Title;
        messageObj.screenType = 0;
        messageObj.navType = 0;
        messageObj.action = "78|~|" + JSON.stringify(obj);
        utils.ToolkitSendCallbacktoMobile(5006, JSON.stringify(messageObj));
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isandroidiospro) {
        e.preventDefault();
      }
    };

    const handleIconClick = (event: React.MouseEvent<HTMLSpanElement>) => {
      if (!isandroidiospro) {
        setIsOpen(!isOpen);
      }
      if (OnIconClick) {
        OnIconClick(event, !isOpen)
      }
    };

    return (
      <>
        {Title && (
          <div className="vg-input-label">
            {ShowRequiredFieldMark && Required ? (
              <span className="required-input-mark">*</span>
            ) : (
              ""
            )}
            {Title}
          </div>
        )}
        <div
          className="vg-time-picker"
        >
          <div className="input-container">
            {isandroidiospro ? (
              <>
                <input
                  autoComplete="off"
                  aria-label="In Time / Out Time"
                  className={`vg-input-timeslot vg-input-control 
                    ${Focus ? "vg-input-control-focus" : ""} 
                  ${Disable ? "vg-input-control-disabled" : ""} 
                  ${errorMessage ? "vg-input-control-error" : ""}
                  ${isCheckValidation && isTouched
                      ? "vg-input-control-error"
                      : ""
                    } `}
                  id={TimePickerId}
                  ref={inputRef}
                  value={Disable ? "" : NativeData}
                  readOnly={true}
                  onClick={(e) => handleClick(e)}
                  type="text"
                  autoFocus={AutoFocus}
                  onFocus={handleFocus}
                  onChange={handleInputChange}
                  placeholder={Placeholder}
                  name={Name}
                  disabled={Disable}
                />
              </>
            ) : (
              <>
                <input
                  autoComplete="off"
                  aria-label="In Time / Out Time"
                  className={`vg-input-timeslot vg-input-control ${Focus ? "vg-input-control-focus" : ""
                    } ${Disable ? "vg-input-control-disabled" : ""}  ${errorMessage ? "vg-input-control-error" : ""
                    }${isCheckValidation && isTouched && selectedTime === ""
                      ? "vg-input-control-error"
                      : ""
                    }`}
                  id={TimePickerId}
                  ref={inputRef}
                  value={Disable ? "" : selectedTime}
                  onClick={handleClick}
                  type="text"
                  autoFocus={AutoFocus}
                  onFocus={handleFocus}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder={Placeholder}
                  name={Name}
                  disabled={Disable}
                />
              </>
            )}
            <span className="clock-icon" onClick={handleIconClick}>
              <Svg name="clock" />
            </span>
          </div>
          {isCheckValidation && isTouched && selectedTime === "" && (
            <span className="vg-input-control-error-msg">Error Reason</span>
          )}
          {errorMessage && (
            <span className="vg-input-control-error-msg">
              {CustomErrorMessage}
            </span>
          )}

          {isOpen && !Disable && (
            <>
              <Portal wrapperElementId="timepicker" inputRef={inputRef} type={DropdownPosition === 'Right' ? PortalEnum.timePickerRight : null}>
                <ul className="vg-time-picker-dropdown" ref={timeDropdownRef}>
                  {timeSlots.map((time, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleTimeSelect(time);
                      }}
                      className={`vg-time-slot ${selectedTime === time ? "selected" : ""
                        }`}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </Portal>
            </>
          )}
        </div>
        <input
          type="hidden"
          onClick={() => CloseDropdown()}
          id={TimePickerId}
        />
      </>
    );
  }
);

export default VgTimePicker;
