import React, {
  useState,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import "./VgTextbox.scss";
import VgPassiveNotification from "../VgPassiveNotification/VgPassiveNotification";
import Svg from "../VgSvg/Svg";
import VgTooltip from "../VgTooltip/VgTooltip";
import { handleAutoFocus, utils } from "../../utils/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
export interface VgInputProps {
  InputTitle?: string;
  PlaceHolder?: string;
  Password?: boolean;
  MaximumLength?: Number;
  InfoTooltipMessage?: string;
  TooltipScreenTitleForMobile?: string;
  InputDescription?: string;
  UrlPrefix?: string;
  Required?: boolean;
  CustomErrorMessage?: string;
  Validation?: "none" | "numeric" | "email" | "phone" | "regex";
  PrefixIcon?:
    | "email"
    | "password"
    | "gap"
    | "SearchInputControl"
    | "$"
    | "none"
    | "CustomMsgPrefix";
  SuffixIcon?: "hrs" | "ClearSearch" | "CustomMsgSuffix" | "none";
  RegexPattern?: string;
  RegexErrorMessage?: string;
  AlertPassiveMessage?: boolean;
  [key: string]: any;
  InputId?: string;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  OnClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  OnInputDrop?: (e: React.MouseEvent<HTMLInputElement>) => void;
  NotificationData?: object;
  customClassName?: string;
  Protocol?: string;
  SetValue?: any;
  ShowRequiredFieldMark?: boolean;
  Name?: string;
  InputDrop?: boolean;
  DropInValue?: string;
  InputText?: string;
  isIconBody?: ReactNode;
  SuffixCustomMsg?: string;
  PrefixCustomMsg?: string;
  AutoFocus?: boolean;
  BeakPosition?: "Left" | "Middle" | "Right";
  Type?: string;
  EnableOnChangeValidation?: boolean;
  OnKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  OnPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  InputMode?: "text" | "decimal" | "numeric" | string;
  min?: number;
  max?: number;
  EnableBody?: boolean;
  OnInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  OnBlurValidation?: boolean;
  SetControlonRight?: boolean;
  TagTextbox?:  boolean;
  OnValidation?: (isValid: boolean, errorMessage?: string) => void;
  FocusBorder?: 'none' | 'blue' | 'green' | 'yellow' | 'orange' | 'red',
  MobileViewSearch?: boolean;
}

interface VgInputRef {
  validate: () => any;
}

const VgInput: React.FC<VgInputProps> = forwardRef<
  VgInputRef,
  VgInputProps
>(
  (
    {
      InputTitle,
      PlaceHolder,
      Password,
      MaximumLength,
      UrlPrefix,
      PrefixIcon,
      Required = false,
      CustomErrorMessage,
      InputDescription,
      Validation,
      InfoTooltipMessage,
      RegexPattern,
      RegexErrorMessage,
      AlertPassiveMessage,
      FocusBorder,
      InputDisable,
      OnChange,
      OnBlur,
      InputId = "",
      NotificationData,
      customClassName = "",
      Protocol,
      SetValue = "",
      ShowRequiredFieldMark = false,
      EnableOnChangeValidation = true,
      Name = "vg-input",
      InputDrop,
      DropInValue,
      InputText,
      PrefixCustomMsg,
      SuffixCustomMsg,
      isIconBody,
      AutoFocus,
      OnFocus,
      OnClick,
      EnableBody,
      OnInputDrop,
      SuffixIcon,
      OnKeyUp,
      BeakPosition = "Middle",
      Type = "text",
      OnKeyDown,
      OnPaste,
      InputMode,
      min,
      max,
      OnInput,
      TooltipScreenTitleForMobile,
      OnBlurValidation = true,
      SetControlonRight = false,
      TagTextbox = false,
      OnValidation ,
      MobileViewSearch = false,
    },
    ref
  ) => {
    let computedWidth: number | undefined;
    const [validateInputErrorMessage, setValidateInputErrorMessage] =
      useState<string>("");
    const [inputValue, setInputValue] = useState<string>("");
    const [isCheckValidate, setIsCheckValidate] = useState<boolean>(true);
    const [passiveAlertVisible, setPassiveAlertVisible] =
      useState<boolean>(false);

    const [dropInValue, setDropInValue] = useState<boolean>(false);
    const [handleClickFlag, SetHandleClickFlag] = useState<boolean>(false);
    const [isFocused, setIsfocused] = useState<boolean>(false);
    const [valueChange, setValueChange] = useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    const [words, setWords] = useState<string[]>([]); // Store words as spans
    const containerRef = useRef<HTMLDivElement>(null);

    // Match any non-alphanumeric character
    const SPECIAL_CHAR_REGEX = /[^a-zA-Z0-9\\^$\*\+\?\|\(\)\[\]\{\}]/g;
    const isAndroidiOSPro = utils.CheckIsFromProAppWithoutState();
    const TRAILING_SLASH_REGEX = /^\/|\/$/g;
    const wordContainerRef = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    
    useEffect(() => {
      if (AutoFocus) {
        const delay = /iPad|iPhone|iPod/.test(navigator.userAgent) ? 300 : 100;
        handleAutoFocus(true, inputRef, delay);
        setIsfocused(true);
      }
    }, [AutoFocus]);

    useEffect(() => {
      if ((isAndroidiOSPro && PrefixCustomMsg) && SetControlonRight ) {
        // Handle prefix properly - only add if there's a value
        if (SetValue !== undefined && SetValue !== null && (typeof SetValue === 'string' ? SetValue.trim() !== "" : true)) {
          // Check if SetValue already has the prefix to avoid duplication
          const valueWithoutPrefix = (typeof SetValue === 'string' && SetValue.startsWith(PrefixCustomMsg))
            ? SetValue
            : PrefixCustomMsg + SetValue;
          setInputValue(valueWithoutPrefix);
        } else {
          setInputValue(""); // Clear completely when no value
        }
      } else {
        setInputValue(SetValue !== undefined && SetValue !== null ? SetValue : "");
      }
    }, [SetValue]);

     useEffect(() => {
      if (AutoFocus) {
        handleAutoFocus(true, inputRef);
        setIsfocused(true);
      }
    }, [AutoFocus]);

    const validate = (value: string): { isValid: boolean; errorMessage?: string } => {
  if (!value && Required) {
    return { isValid: false, errorMessage: CustomErrorMessage || "" };
  }

  if (value) {
    if (Validation === "numeric") {
      const isNumeric = /^[0-9]*$/.test(value);
      if (!isNumeric) {
        return { isValid: false, errorMessage: CustomErrorMessage || "Only numeric values are allowed." };
      }
    }

    if (Validation === "email") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        return { isValid: false, errorMessage: CustomErrorMessage || "Invalid email format." };
      }
    }

    if (Validation === "phone") {
      const isValidPhone = /^[1-9][0-9]{9}$/.test(value);
      if (!isValidPhone) {
        return { isValid: false, errorMessage: CustomErrorMessage || "Invalid phone number." };
      }
    }

    if (Validation === "regex" && RegexPattern) {
      const regex = new RegExp(RegexPattern);
      if (!regex.test(value)) {
        return { isValid: false, errorMessage: RegexErrorMessage || "Invalid format." };
      }
    }

    return { isValid: true };
  } else {
    if (!Required) {
      return { isValid: true };
    }
    return { isValid: true };
  }
};

    const extractAllowedSymbols = (pattern: string): string => {
      const sanitizedPattern = pattern.replace(TRAILING_SLASH_REGEX, ""); // Remove leading and trailing slashes

      const match = sanitizedPattern.match(SPECIAL_CHAR_REGEX);
      if (match) {
        // Use a Set to remove duplicates and join the unique symbols back into a string
        const uniqueSymbols = Array.from(new Set(match));
        return uniqueSymbols.join("");
      }
      return "";
    };

    const generateRegexFromAllowedCharacters = (
      allowedCharacters: string
    ): RegExp => {
      // Escape special characters in the allowedCharacters string
      const escapedCharacters = allowedCharacters.replace(
        /[-/\\^$*+?()|[\]{}]/g,
        "\\$&"
      );
      // Create the regex
      return new RegExp(`^[a-zA-Z0-9\\s${escapedCharacters}]*$`);
    };

    const handleChange = (
  e: ChangeEvent<HTMLInputElement> | React.ClipboardEvent<HTMLInputElement>
) => {
  let value: string = (e.target as HTMLInputElement).value;
  if (EnableOnChangeValidation) {
    const { isValid, errorMessage } = validate(value);
    setIsCheckValidate(isValid);
    setValidateInputErrorMessage(errorMessage || "");
    const isRequiredError = !value && Required;
    const overallValid = isValid && !isRequiredError;

    if (typeof OnValidation === "function") {
      OnValidation(overallValid, overallValid ? "" : errorMessage || (isRequiredError ? CustomErrorMessage || "This field is required." : ""));
    }
  }
  if (e.type === "paste") {
    e.preventDefault();
    let pastedValue = (e as React.ClipboardEvent<HTMLInputElement>).clipboardData.getData("text");
    if (UrlPrefix) {
      pastedValue = pastedValue.replace(/\s+/g, "");
    }
    value = pastedValue;
  }

  if (UrlPrefix) {
    value = value.replace(/\s+/g, "");
  }

  if (Validation === "numeric") {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue !== value) {
      return;
    }
    value = numericValue;
  }

  if (OnChange) {
    setValueChange(true);
    if (EnableOnChangeValidation) {
      const { isValid, errorMessage } = validate(value);
      setIsCheckValidate(isValid);
      setValidateInputErrorMessage(errorMessage || "");

          if (Validation === "regex" && RegexPattern) {
            const allowedSymbols = extractAllowedSymbols(RegexPattern);
            const regex = generateRegexFromAllowedCharacters(allowedSymbols);
            if (!regex.test(value)) {
              return false;
            }
          }

          if (MaximumLength > 0 && value.length >= MaximumLength) {
            setPassiveAlertVisible(true);
          } else {
            setPassiveAlertVisible(false);
          }

          if (MaximumLength < 0) {
            setInputValue("");
          }
        }

        if (isAndroidiOSPro && PrefixCustomMsg && SetControlonRight) {
          if (value.startsWith(PrefixCustomMsg)) {
            value = value.slice(PrefixCustomMsg.length);
          }

          // value = PrefixCustomMsg.concat(value);
           if (value?.trim().length > 0) {
             value = PrefixCustomMsg + value;
           } else {
             value = ""; // Clear everything including prefix
           }

          if (value === PrefixCustomMsg) {
            value = PrefixCustomMsg;
          }
        }
        setInputValue(value);
        OnChange(e);
      }
    };

    const handlevalidate = (value: string) => {
      const { isValid, errorMessage } = validate(value);
      setIsCheckValidate(isValid);
      setValidateInputErrorMessage(errorMessage || "");
      return isValid;
    };


    const handleBlur = (e?: React.FocusEvent<HTMLInputElement>) => {
      if(!OnBlurValidation) return ;
      setIsfocused(false);
      if (handleClickFlag && inputValue !== "") {
        SetHandleClickFlag(false);
        return;
      }
      if (e && e.target) {
        // const value = e.target.value;
        let value = e.target.value;
        let numericValue = parseFloat(value); // Convert input value to a number
        const maxValue = max ; // Use OnScrollMax or fallback to 100
        const minValue = min; // Use OnScrollMin or fallback to 0

        // Clamp numeric value if it exceeds OnScrollMax or is below OnScrollMin
        if (Type === "number" && !isNaN(numericValue)) {
          if (numericValue > maxValue) {
            value = maxValue.toString(); // Clamp to max value
            setInputValue(value); // Update state with clamped value
            // Optionally, set an error message
            // setValidateInputErrorMessage(`Value cannot exceed ${maxValue}`);
          } else if (numericValue < minValue) {
            value = minValue.toString(); // Clamp to min value
            setInputValue(value);
            // Optionally, set an error message
            // setValidateInputErrorMessage(`Value cannot be less than ${minValue}`);
          }
        }
        if (InputDrop) {
          setDropInValue(false);

          if (e.target.value === "" && InputDrop) {
            setInputValue(InputText);
          }

          if (e.target.value === DropInValue) {
            setInputValue("");
          }

          if (InputDrop) {
            if (/^[^0-9]/.test(e.target.value)) {
              setInputValue(InputText);
            }
          }
        }
      }
      if (typeof inputValue === 'string' && inputValue?.trim() && TagTextbox) {
        const newWords = inputValue
            .split(',')
            .map(word => word?.trim())
            .filter(word => word?.length > 0);
            setWords((prevWords) => [...prevWords, ...newWords]); 
            setInputValue(""); // Clear input field
    }
    
      if (OnBlur) {
        OnBlur(e);
      }

  const value = e?.target?.value || inputValue;
  const { isValid, errorMessage } = validate(value);
  const isRequiredError = Required && !value;
  const overallValid = isValid && !isRequiredError;

  setIsCheckValidate(overallValid);
  setValidateInputErrorMessage(errorMessage || (isRequiredError ? CustomErrorMessage || "This field is required." : ""));
  if (typeof OnValidation === "function") {
    OnValidation(overallValid, overallValid ? "" : errorMessage || (isRequiredError ? CustomErrorMessage || "This field is required." : ""));
  }
  return overallValid;
};


    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (OnKeyUp) {
        OnKeyUp(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (OnKeyDown) {
        OnKeyDown(e);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (OnPaste) {
        OnPaste(e);
      }
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      if (OnInput) {
        OnInput(e);
      }
    };

    const handleFocus = () => {
      if (!inputValue && words.length > 0) {
        // Re-populate the input with the concatenated words
        setInputValue(words.join(", "));
        setWords([]); // Clear the words array temporarily
      }
    };

    // Handle removing a word
    const handleRemoveWord = (index: number) => {
      setWords((prevWords) => prevWords.filter((_, i) => i !== index));
    };

    // const validation = () => {
    //   handleAutoFocus(AutoFocus && !handleBlur(), inputRef);
    //   let validateObject = {
    //     [InputId]: inputValue,
    //     IsValidate: OnBlurValidation ? handleBlur() : handlevalidate(inputValue),
    //     Required: !inputValue && Required ? true : false,
    //     errorMessage: validateInputErrorMessage,
    //     id: InputId,
    //     checkcontrol: "InputControl",
    //   };
    //   return validateObject;
    // };

   const validation = () => {
     handleAutoFocus(AutoFocus && !isFocused, inputRef);
     const { isValid, errorMessage } = validate(inputValue);
     const isRequiredError = !inputValue && Required;
     const overallValid = isValid && !isRequiredError;
     const finalErrorMessage =
       errorMessage ||
       (isRequiredError ? CustomErrorMessage || "This field is required." : "");

     setValidateInputErrorMessage(finalErrorMessage);
     setIsCheckValidate(overallValid);

     if (typeof OnValidation === "function") {
       OnValidation(overallValid, overallValid ? "" : finalErrorMessage);
     }

     const validateObject = {
       [InputId]: inputValue,
       IsValidate: overallValid,
       Required: isRequiredError,
       errorMessage: finalErrorMessage,
       id: InputId,
       checkcontrol: "InputControl",
     };
     return validateObject;
   };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    const handleDropIn = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (InputDrop) {
        if (!/^[0-9]/.test(inputValue)) {
          setInputValue("");
        }
        setDropInValue(!dropInValue);
      }
      if (OnFocus) {
        OnFocus(e);
      }
      if (!inputValue && words.length > 0 && TagTextbox) {
        // Re-populate the input with the concatenated words
        setInputValue(words.join(", "));
        setWords([]); // Clear the words array temporarily
      }
    };

    const handleClick = () => {
      setIsfocused(true);
    };

    const handleSpanClick = (e: React.MouseEvent<HTMLInputElement>) => {
      SetHandleClickFlag(true);
      setInputValue(InputText);
      setDropInValue(!dropInValue);
      OnClick(e);

      const customEvent = {
        target: {
          value: InputText,
        },
      };

      OnBlur(customEvent);

      if (OnInputDrop) {
        OnInputDrop(e);
      }
    };

    const handleClearClick = (e: any) => {
      if (OnClick) {
        setInputValue("");
        setValueChange(false);
        OnClick(e);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
   
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 767);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const prefixRef = useRef<HTMLSpanElement>(null);
    const postfixRef = useRef<HTMLSpanElement>(null);
    const [prefixWidth, setPrefixWidth] = useState(0);
    const [postfixWidth, setPostfixWidth] = useState(0);
    const [prefixExists, setPrefixExists] = useState(false);
    const [postfixExists, setPostfixExists] = useState(false);

    useEffect(() => {
      const updatePadding = () => {
        const prefixEl = prefixRef.current;
        const postfixEl = postfixRef.current;

        setPrefixExists(!!prefixEl);
        setPostfixExists(!!postfixEl);

        setPrefixWidth(prefixEl?.offsetWidth || 0);
        setPostfixWidth(postfixEl?.offsetWidth || 0);
      };

      // Run initially
      updatePadding();

      // Observer to detect changes in width
      const observer = new ResizeObserver(updatePadding);
      if (prefixRef.current) observer.observe(prefixRef.current);
      if (postfixRef.current) observer.observe(postfixRef.current);

      return () => observer.disconnect();
    }, []);

    const getContainerStyle = () => {
      if (!isMobile || SuffixIcon === "none") {
        return {};
      }

      const postfixElement = postfixRef.current;
      const actualWidth = postfixElement?.offsetWidth || 0;

      const paddingRight = actualWidth + 4;

      const shouldAddExtraPadding =
        InputDisable && SuffixCustomMsg !== "" && SetValue;

      if (SetControlonRight && shouldAddExtraPadding) {
        return { paddingRight: `${paddingRight + 10}px` };
      }

      if (SetControlonRight) {
        return { paddingRight: `${paddingRight}px` };
      }

      return {};
    };


  const checkOverflow = () => {
    const container = wordContainerRef.current;
    if (container) {
      const isOverflowing = container.scrollWidth > container.clientWidth;
      setIsOverflowing(isOverflowing);
    }
  };

  useEffect(() => {
    checkOverflow();
  }, [words]);

  useEffect(() => {
    const observer = new ResizeObserver(checkOverflow);
    if (wordContainerRef.current) {
      observer.observe(wordContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);


    return (
      <div
        className={`vg-input-control-group ${
          passiveAlertVisible ? "vg-blur-background" : ""
        }${!isCheckValidate ? "isvalidate" : ""} ${
           SetControlonRight  ? "vg-input-native-pro" : ""
        }`}
      >
        <div className={`vg-segment-label`}>
        {InputTitle?.length > 0 && (
          <label className="vg-input-label">
            {ShowRequiredFieldMark && Required ? (
              <span className="required-input-mark">*</span>
            ) : (
              ""
            )}
            {InputTitle}
          </label>
          )}
          {InfoTooltipMessage && InfoTooltipMessage !== "" && (
            <span className="vg-lbl-infochip">
              <VgTooltip
                BeakPoint="Up"
                BeakPosition={BeakPosition}
                ScreenTitleForMobile={TooltipScreenTitleForMobile}
                Children={
                  <div className="vg-tooltiptext">
                    <Svg name="info_circle" />
                  </div>
                }
                TextAlign="center"
                TooltipText={InfoTooltipMessage}
                Html
              />
            </span>
          )}
        </div>
        <div
          className={`vg-input-container ${MobileViewSearch ? 'vg-input-mobile' : ''} ${
            UrlPrefix ? "vg-url-section" : ""
          } ${
            PrefixIcon === "SearchInputControl"
              ? "search-input-prefix-space"
              : ""
          } ${
            PrefixIcon && PrefixIcon !== "none" ? "vg-icon-prefix-space" : ""
          }`}
          data-index={0}
          style={getContainerStyle()}
        >
          {UrlPrefix && (
            <span className="vg-input-url-prefix">{UrlPrefix}</span>
          )}
          {PrefixIcon === "$" && (
            <span className="vg-input-control-prefix" ref={prefixRef}>
              {"$"}
            </span>
          )}
          {PrefixIcon === "CustomMsgPrefix" && (
            <span className="vg-input-control-prefix" ref={prefixRef}>
              {PrefixCustomMsg.slice(0, 1)}
            </span>
          )}
          {PrefixIcon === "isIconBody" && SuffixIcon != "isIconBody" && (
            <span className="vg-input-control-prefix" ref={prefixRef}>
              {isIconBody}
            </span>
          )}

          {SuffixIcon === "hrs" && (
            <span className="vg-input-control-postfix" ref={postfixRef}>
              {"hrs"}
            </span>
          )}

          {SuffixIcon === "CustomMsgSuffix" && (
            <span className="vg-input-control-postfix" ref={postfixRef}>
              {SuffixCustomMsg}
            </span>
          )}
          {SuffixIcon === "isIconBody" && PrefixIcon != "isIconBody" && (
            <span className="vg-input-control-postfix" ref={postfixRef}>
              {isIconBody}
            </span>
          )}

          {PrefixIcon === "SearchInputControl" && (
            <span
              className="vg-input-control-prefix vg-search-input-control"
              ref={prefixRef}
            >
              <Svg name="search" />
            </span>
          )}

          {PrefixIcon &&
            PrefixIcon !== "none" &&
            PrefixIcon !== "gap" &&
            PrefixIcon !== "SearchInputControl" &&
            PrefixIcon !== "$" &&
            PrefixIcon !== "ClearSearch" &&
            PrefixIcon !== "CustomMsgPrefix" &&
            PrefixIcon !== "CustomMsgSuffix" &&
            PrefixIcon !== "isIconBody" &&
            SuffixIcon != "isIconBody" && (
              <span
                className="vg-input-control-prefix vg-icon-input-control vg-input-login-icon"
                ref={prefixRef}
              >
                <Svg name={PrefixIcon === "email" ? "email" : "lock"} />
              </span>
            )}
          {PrefixIcon && PrefixIcon === "gap" && (
            <span
              className="vg-input-control-prefix vg-icon-input-control"
              ref={prefixRef}
            >
              <span className="vg-input-gap-resIsymbol">G</span>
            </span>
          )}
          {SuffixIcon === "ClearSearch" && valueChange && inputValue !== "" && (
            <span
              className="vg-input-control-postfix vg-search-input-control"
              onClick={(e) => {
                handleClearClick(e);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 8.00098C0 3.59473 3.5625 0.000976562 8 0.000976562C12.4062 0.000976562 16 3.59473 16 8.00098C16 12.4385 12.4062 16.001 8 16.001C3.5625 16.001 0 12.4385 0 8.00098ZM5.46875 6.53223L6.9375 8.00098L5.46875 9.46973C5.15625 9.78223 5.15625 10.251 5.46875 10.5322C5.75 10.8447 6.21875 10.8447 6.5 10.5322L7.96875 9.06348L9.46875 10.5322C9.75 10.8447 10.2188 10.8447 10.5 10.5322C10.8125 10.251 10.8125 9.78223 10.5 9.46973L9.03125 8.00098L10.5 6.53223C10.8125 6.25098 10.8125 5.78223 10.5 5.46973C10.2188 5.18848 9.75 5.18848 9.46875 5.46973L7.96875 6.96973L6.5 5.46973C6.21875 5.18848 5.75 5.18848 5.46875 5.46973C5.15625 5.78223 5.15625 6.25098 5.46875 6.53223Z"></path>
              </svg>
            </span>
          )}
          {Password && inputValue.length > 0 && (
            <span
              className="vg-input-control-postfix vg-input-password-toggle"
              onClick={togglePasswordVisibility}
            >
              {!showPassword ? (
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="currentColor"
                >
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                </svg>
              )}
            </span>
          )}

          {TagTextbox && words.length > 0 && (
            <div className="vg-input-words-wrapper" ref={wordContainerRef}>
              {isOverflowing ? (
                <div className="vg-input-words-container">
                  <Swiper
                    key={words.length}
                    spaceBetween={5}
                    slidesPerView="auto"
                    direction="horizontal"
                    className="vg-input-swiper"
                    modules={[Navigation]}
                    navigation={{
                      enabled: isOverflowing,
                      prevEl: ".swiper-button-prev",
                      nextEl: ".swiper-button-next",
                      disabledClass: "disabled_swiper_button",
                    }}
                  >
                    {words.map((word, index) => (
                      <SwiperSlide key={index} className="vg-input-word-slide">
                        <span className="vg-input-word">
                          {word}
                          <button
                            type="button"
                            className="vg-input-word-remove"
                            onClick={() => handleRemoveWord(index)}
                          >
                            <Svg name="cross" />
                          </button>
                        </span>
                      </SwiperSlide>
                    ))}

                    {/* Navigation Arrows */}
                    <div className="swiper-button-prev custom-nav-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width={16}
                      >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                      </svg>
                    </div>
                    <div className="swiper-button-next custom-nav-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        width={16}
                      >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                      </svg>
                    </div>
                  </Swiper>
                </div>
              ) : (
                <div className="vg-input-words-static">
                  {words.map((word, index) => (
                    <span key={index} className="vg-input-word">
                      {word}
                      <button
                        type="button"
                        className="vg-input-word-remove"
                        onClick={() => handleRemoveWord(index)}
                      >
                        <Svg name="cross" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
          <input
            id={InputId}
            type={Password ? (showPassword ? "text" : "password") : Type}
            placeholder={PlaceHolder}
            value={inputValue}
            className={`vg-input-control 
               ${
                 !(AutoFocus && inputValue) && (
                   validateInputErrorMessage ||
                   (CustomErrorMessage && !isCheckValidate && !isFocused) ||
                   (!isCheckValidate && !isFocused)
                 )
                   ? "vg-input-control-error"
                   : ""
               } 
            ${
              PrefixIcon === "CustomMsgPrefix" ||
              PrefixIcon === "$" ||
              PrefixIcon === "SearchInputControl" ||
              PrefixIcon === "gap" ||
              PrefixIcon === "password" ||
              PrefixIcon === "email" ||
              (PrefixIcon && PrefixIcon !== "none" && !SuffixIcon)
                ? isIconBody
                  ? "vg-svg-icon vg-input-control-prefix-left-padding"
                  : "vg-input-control-prefix-left-padding"
                : ""
            }
            ${
              SuffixIcon === "CustomMsgSuffix" ||
              SuffixIcon === "hrs" ||
              SuffixIcon === "ClearSearch"
                ? "vg-input-control-suffix-right-padding"
                : " "
            }
            ${FocusBorder === 'blue' ? "vg-input-control-focus" :  FocusBorder === 'green' ? "vg-input-control-green" : ''}
            ${UrlPrefix ? "vg-input-control-url" : ""}
            ${InputDisable ? "vg-input-control-disabled cursor-not-allowed" : ""}
            ${prefixExists ? `inputPaddingLeft-${prefixWidth + 13}` : ""}
            ${postfixExists ? `inputPaddingRight-${postfixWidth + 13}` : ""}`}
              maxLength={MaximumLength}
              onChange={(e) => {
                handleChange(e);
              }}
              onBlur={handleBlur}
              name={Name}
              onFocus={handleDropIn}
              autoFocus={AutoFocus}
              onClick={handleClick}
              autoComplete="off"
              onKeyUp={handleKeyUp}
              ref={inputRef}
              disabled={InputDisable}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              step="any" // Allows decimal values
              onPaste={handlePaste}
              pattern={RegexPattern}
              inputMode={InputMode}
              min={min}
              max={max}
              onInput={handleInput}
              aria-autocomplete="none"
              autoCorrect="off"
              spellCheck={false}
            />
        </div>
        {!isCheckValidate && !inputValue && !isFocused && (
          <span className="vg-input-control-error-msg">
            {CustomErrorMessage ? CustomErrorMessage : "required"}
          </span>
        )}
        {InputDescription && (
          <div className="vg-input-text">{InputDescription}</div>
        )}

        {validateInputErrorMessage &&
          !isCheckValidate &&
          inputValue &&
          (CustomErrorMessage || RegexErrorMessage) && (
            <span className="vg-input-control-error-msg">
              {validateInputErrorMessage}
            </span>
          )}

        {UrlPrefix && (
          <span className="vg-input-url-preview">
            {Protocol != "none" ? Protocol : ""}
            {UrlPrefix}
            {inputValue.toLowerCase()}
          </span>
        )}

        {AlertPassiveMessage?.length && passiveAlertVisible && (
          <VgPassiveNotification
            Duration={NotificationData[0]?.Duration}
            NotificationTitle={NotificationData[0]?.NotificationTitle}
            types={
              NotificationData[0].types as "error" | "positive" | "warning"
            } // Type assertion to match exact type
          />
        )}

        {InputDrop && dropInValue && (
          <div onMouseDown={handleSpanClick}>
            <span className="downtooltip">
              <span>{DropInValue}</span>
            </span>
          </div>
        )}
      </div>
    );
  }
);

export default VgInput;
