import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./VgLoginInput.scss";
import { handleAutoFocus } from "../../utils/utils";
import VgInput from "../VgTextbox/VgTextbox";
import VgPhoneControl from "../VgPhoneControl/VgPhoneControl";

export interface VgLoginInputProps {
  InputTitle?: string;
  PlaceHolder?: string;
  Required?: boolean;
  CustomErrorMessage?: string;
  [key: string]: any;
  InputId?: string;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnPhoneControlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  OnClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  customClassName?: string;
  SetValue?: string;
  Name?: string;
  InputText?: string;
  AutoFocus?: boolean;
  Type?: string;
  OnKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  OnPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  AllCountry?: boolean;
  CountryDropdown?: boolean;
  ShowRequiredFieldMark?: boolean;
}

interface VgInputRef {
  validate: () => any;
}

const VgLoginInput: React.FC<VgLoginInputProps> = forwardRef<
  VgInputRef,
  VgLoginInputProps
>(
  (
    {
      InputTitle,
      PlaceHolder,
      Required = false,
      CustomErrorMessage,
      FocusBorder,
      InputDisable,
      OnBlur,
      InputId = "",
      customClassName = "",
      SetValue = "",
      Name = "vg-input",
      InputText,
      AutoFocus,
      OnFocus,
      OnClick,
      OnKeyUp,
      Type = "text",
      OnKeyDown,
      OnPaste,
      AllCountry,
      CountryDropdown,
      OnInputChange,
      OnPhoneControlChange,
      ShowRequiredFieldMark,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>(SetValue || "");
    const [isPhoneControl, setIsPhoneControl] = useState(false);
    const [shouldValidate, setShouldValidate] = useState(false);

    const loginInputRef = React.useRef<{ [key: string]: any | null }>({});
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (value.length === 2) {
        if (!isNaN(Number(value[1]))) {
          setIsPhoneControl(true);
        } else {
          setIsPhoneControl(false);
        }
      }
      if (OnInputChange) OnInputChange(e);
    };

    const handleBlur = (e?: React.ChangeEvent<HTMLInputElement>) => {
      setShouldValidate(true);
      if (OnBlur) OnBlur(e);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
     
      // Check if value is empty or contains non-numeric characters (except + at beginning)
      if (
        value.length === 0 || // Empty after backspace
        (value.length === 1 && value !== '+') || // Single character that's not +
        /[a-zA-Z@!#$%^&*_={}\[\]:;"'<>,.?/~`]/.test(value) // Contains non-numeric characters
      ) {
        setIsPhoneControl(false);
      } else {
        setIsPhoneControl(true);
      }
      
      if (OnPhoneControlChange) OnPhoneControlChange(e);
    };


    const validation = () => {
      // Focus the input if AutoFocus is true and validation fails
      if (Required && !inputValue.trim()) {
        handleAutoFocus(AutoFocus, loginInputRef?.current?.Inputphonecontrol);
        
        // For phone input, focus on phone control instead
        if (isPhoneControl && loginInputRef?.current?.Inputphonecontrol) {
          handleAutoFocus(AutoFocus, loginInputRef?.current?.Inputphonecontrol);
        }
      }
      console.log("InputId", InputId)
      // Create validation object
      let validateObject = {
        [InputId]: loginInputRef?.current?.Inputphonecontrol?.validate()?.[InputId],
        value: loginInputRef?.current?.Inputphonecontrol?.validate()?.[InputId],
        IsValidate: loginInputRef?.current?.Inputphonecontrol?.validate()?.IsValidate,
        Required: Required,
        id: InputId,
        checkcontrol: loginInputRef?.current?.Inputphonecontrol?.validate()?.checkcontrol,
      };
      
      return validateObject;
    };
    
    // Update the useImperativeHandle hook
    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    return (
      <div className={`vg-login-input ${customClassName}`}>
        {isPhoneControl ? (
          <VgPhoneControl
            ref={(data: any) =>
              loginInputRef.current["Inputphonecontrol"] = data
            }
            AllCountry={AllCountry}
            CloseBackTitle=""
            CurrentCountry={1}
            Footer={2}
            CountryDropdown={CountryDropdown}
            Name=""
            NativeActionVal={13}
            OnBlur={OnBlur}
            OnChange={(e: any) => handlePhoneChange(e)}
            OnClick={OnClick}
            PhoneControlId={InputId}
            PlaceHolder="Enter Phone Number"
            SetValue={inputValue}
            TimerCount={1000}
            Title={InputTitle}
            VagaroToolkit={1}
            CheckPhoneControl="FromLogin"
            Validation="Default"
            AutoFocus={AutoFocus}
            Required={Required}
            ShowRequiredFieldMark={ShowRequiredFieldMark}
            OnKeyUp={OnKeyUp}
          />
        ) : (
            <VgInput
              ref={(data: any) => {
                loginInputRef.current['Inputphonecontrol'] = data;
              }}
              InputTitle={InputTitle}
              PlaceHolder={isPhoneControl ? "Email" : PlaceHolder}
              InputId={InputId}
              Name={Name}
              SetValue={inputValue}
              Type={Type}
              OnChange={handleInputChange}
              OnBlur={handleBlur}
              OnFocus={OnFocus}
              OnClick={OnClick}
              Validation={shouldValidate ? "email" : "none"}
              InfoTooltipMessage=""
              CustomErrorMessage={CustomErrorMessage}
              Required={Required}
              AutoFocus={AutoFocus}
              InputDisable={InputDisable}
            />
        )}
      </div>
    );
  }
);

export default VgLoginInput;