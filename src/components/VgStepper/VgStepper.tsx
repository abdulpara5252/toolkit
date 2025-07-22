import React, { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./VgStepper.scss";

export interface VgStepperProps {
  SetInterval: number;
  OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  MinimumValue?: number;
  MaximumValue?: number;
  SetValue?: number | null;
  Required?: boolean;
  CustomErrorMessage?: string;
  Disabled?: boolean;
  OnIncrement?:(event: ChangeEvent<HTMLInputElement>) => void
  OnDecrement?:(event: ChangeEvent<HTMLInputElement>) => void;
  CustomIntervalText?: string;
  LabelText?: string;
  [key: string]: any;
}

interface VgStepperRef {
  validate: () => any;
}

const VgStepper: React.FC<VgStepperProps> = forwardRef<
  VgStepperRef,
  VgStepperProps
>(
  (
    {
      SetValue,
      SetInterval,
      OnBlur,
      OnChange,
      MinimumValue = 0,
      MaximumValue = 120,
      Required,
      CustomErrorMessage,
      Disabled,
      OnIncrement,
      OnDecrement,
      CustomIntervalText,
      LabelText = "",
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState<number | null>(SetValue ?? null);
    const [isCheckRequired, setIsCheckRequired] = useState<boolean>(false);

    useEffect(() => {
      setCurrentValue(SetValue ?? null);
    }, [SetValue]);

  const roundToInterval = (value: number) => {
    if (value > 0 && value < SetInterval) {
      return SetInterval;
    }
    return Math.ceil(value / SetInterval) * SetInterval;
  };

    const increment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setCurrentValue((prev) => {
        const prevValue = typeof prev === "number" ? prev : MinimumValue;
        if (prevValue < SetInterval) {
          return SetInterval;
        }
        const newValue = prevValue + SetInterval;
        return Math.min(newValue, MaximumValue);
      });
      if (OnIncrement) {
        const value = (typeof currentValue === "number" ? currentValue : MinimumValue) < SetInterval 
          ? SetInterval 
          : Math.min((typeof currentValue === "number" ? currentValue : MinimumValue) + SetInterval, MaximumValue);
        const customEvent = {
          ...e,
          target: { ...e.target, value: value.toString() },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        OnIncrement(customEvent);
      }
    };

    const decrement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setCurrentValue((prev) => {
        const prevValue = typeof prev === "number" ? prev : MinimumValue;
        const currentRounded = roundToInterval(prevValue);
        const newValue = currentRounded - SetInterval;
        return Math.max(newValue, MinimumValue);
      });
      if (OnDecrement) {
        const currentRounded = roundToInterval(typeof currentValue === "number" ? currentValue : MinimumValue);
        const newValue = currentRounded - SetInterval;
        const customEvent = {
          ...e,
          target: { ...e.target, value: Math.max(newValue, MinimumValue).toString() },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        OnDecrement(customEvent);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "") {
        setCurrentValue(null); // Allow empty input
      } else {
        const numericValue = Number(value);
        if (!isNaN(numericValue) && numericValue >= MinimumValue && numericValue <= MaximumValue) {
          setCurrentValue(numericValue);
        }
      }

      if (OnChange) {
        OnChange(e);
      }
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: number | null = currentValue;

      if (currentValue === null && Required) {
        setIsCheckRequired(true);
        newValue = MinimumValue; // Default to MinimumValue if required and empty
      } else if (currentValue !== null) {
        const roundedValue = roundToInterval(currentValue);
        newValue = Math.min(Math.max(roundedValue, MinimumValue), MaximumValue);
        setIsCheckRequired(false);
      }

      setCurrentValue(newValue);

    if (OnBlur) {
      OnBlur(e);
    }
  };

  const processCustomIntervalText = (placeholder?: string): string | null => {
    if (!placeholder) return null;
  
    // Check if the placeholder contains only numeric characters
    const alphabeticRegex = /^[A-Za-z]+$/;
    if (alphabeticRegex.test(placeholder)) {
      // Return only the first 3 characters
      return placeholder.slice(0, 3);
    }
  
    return null;
  };
  const processedPlaceholder = processCustomIntervalText(CustomIntervalText);

    const validation = () => {
      let validateObject = {
        IsValidate: true,
        IsRequired: Required,
      };

      if (Required && currentValue === null) {
        setIsCheckRequired(true);
        validateObject.IsValidate = false;
      }

      return validateObject;
    };

  useImperativeHandle(ref, () => ({
    validate: () => validation(),
  }));
  return (
    <>
    <div className="vg-stepper-main">
      {LabelText?.length > 0 && (
        <label className="vg-input-label" htmlFor="exampleFormControlTextarea1">
          <>{LabelText}</>
        </label>
      )}
      <div className={`vg-stepper-control ${CustomIntervalText === '' ? 'vg-stepper-customtime' : ''}` }>
        <input
          type="text"
          className={` ${isCheckRequired && Required && !Disabled ? 'vg-input-control-error' : Disabled ? 'vg-input-control-disabled' : ''  } vg-input-control vg-ritextcontrol`}
          value={currentValue !== null ? currentValue : ""}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={Disabled}
        />
        {processedPlaceholder && <span className="vg-min-text"> {processedPlaceholder}</span> }
        
        <button className="vg-ricontrol vg-riDown" onClick={decrement}  disabled={Disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path>
          </svg>
        </button>

        <button className="vg-ricontrol vg-riUp"  onClick={increment}  disabled={Disabled}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z">
            </path>
          </svg>
        </button>

      </div>
      {isCheckRequired && Required && !Disabled && (
        <span className="vg-input-control-error-msg">
          {CustomErrorMessage}
        </span>
      )}
    </div>
    </>
  );
});

export default VgStepper;