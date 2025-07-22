import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from 'react';
import './VgCheckbox.scss';

export interface VgCheckboxProps {
  CheckboxLabel?: string;
  LableDescription?: string;
  Disable?: boolean;
  SetValue?: boolean;
  PartialChecked?: boolean;
  CheckboxVariation?: 'Checkbox-Simple' | 'Checkbox-w-Header' | 'Checkbox-w-Image' ;
  OnChange?: (SetValue: boolean, e: any) => void;
  OnHover?: (isHovered: boolean) => void;
  CheckBoxId?: string;
  Required?: boolean;
  Name?:string
  [key: string]: any;
  RawDataWithImage?: { imgSource?: string; title: string; }[];
  IsCheck?: boolean;
}

interface VgCheckboxRef {
  validate: () => any;
}

const VgCheckbox: React.FC<VgCheckboxProps> = forwardRef<VgCheckboxRef, VgCheckboxProps>(({
  OnChange,
  OnHover,
  CheckboxLabel,
  LableDescription,
  Disable = false,
  SetValue = false,
  PartialChecked = false,
  CheckboxVariation = 'Checkbox-Simple',
  CheckBoxId = '', 
  Required = false,
  IsCheck = true,
  Name="vg-checkbox",
 RawDataWithImage = [
        { title: 'Briogeo', imgSource: 'https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg' },
        { title: 'Clairol', imgSource: '' },
        { title: 'Clairol Professional', imgSource: '' },
        { title: 'good hair day', imgSource: 'https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg' },
        { title: 'Karlius Professional', imgSource: '' },
        { title: 'Kadus', imgSource: 'https://1a96a36bae7c8550901a-274b8a70320bb26e7a1e0ea7836ee429.ssl.cf2.rackcdn.com/Images/av-img.jpg' },
      ],
}, ref) => {


  const [isChecked, setIsChecked] = useState<boolean>(SetValue);
  const [isPartialChecked, setIsPartialChecked] = useState<boolean>(PartialChecked);
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>(
    RawDataWithImage.reduce((acc: { [key: string]: boolean }, item: any, index: number) => ({ ...acc, [`${CheckBoxId}-${index}`]: SetValue }), {})
  );

  useEffect(() => {
    if (IsCheck) {
      setIsChecked(SetValue);
      setIsPartialChecked(PartialChecked);
    }
  }, [SetValue, PartialChecked]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = PartialChecked;
    }
  }, [PartialChecked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id?: string) => {
    const newChecked = event.target.checked;
    if (!IsCheck) {
      if (OnChange) {
      OnChange(event);
      return;
    }
    }

  if (CheckboxVariation === 'Checkbox-w-Image' && id !== undefined) {
    setCheckedStates((prev) => ({
      ...prev,
      [id]: newChecked,
    }));

    if (OnChange) {
      OnChange(event);
    }
  } else {
    // Handle simple checkbox logic
    if (checkboxRef.current?.indeterminate) {
      setIsPartialChecked(false);
      setIsChecked(true);
    } else if (PartialChecked) {
      setIsChecked(!isChecked);
      setIsPartialChecked(!isPartialChecked);
    } else {
      setIsChecked(newChecked); // Use newChecked instead of !isChecked
      setIsPartialChecked(false);
    }

    if (OnChange) {
      OnChange(newChecked, event);
    }
  }
};

   const renderCheckbox = (id: string, label: string, imageSrc?: string, textPlaceholder?: string, index?: number) => (
    <div  className={`vg-form-check checkbox-with-image ${
      checkedStates[id] ? 'selected' : ''
    }`} key={index ?? id}>
      <input
        type="checkbox"
        id={`${CheckboxVariation}-${id}`}
        className={`vg-form-check-input ${Required && !isChecked ? 'vg-input-control-error-msg' : ''}`}
        disabled={Disable}
        checked={CheckboxVariation === 'Checkbox-w-Image' ? checkedStates[id] : isChecked}
        ref={checkboxRef}
        onChange={(e) => handleCheckboxChange(e, id)}
        name={Name}
      />
      <label className="check-box-with-img" htmlFor={`${CheckboxVariation}-${id}`}>
        <span  className="vg-check-label">
          {label}
          {CheckboxVariation === 'Checkbox-w-Header' && LableDescription && (
            <div className="vg-check-description">{LableDescription}</div>
          )}
        </span>
        {CheckboxVariation === 'Checkbox-w-Image' && imageSrc && <img src={imageSrc} alt={label} />}
        {/* {CheckboxVariation === 'Checkbox-w-Image' && textPlaceholder && !imageSrc && (
          <span className="image-placeholder">{textPlaceholder}</span>
        )} */}
    </label>

      </div>
  );

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isPartialChecked;
    }
  }, [isPartialChecked]);

  useEffect(() => {
  setCheckedStates(
    RawDataWithImage.reduce((acc: { [key: string]: boolean }, item: any, index: number) => 
      ({ ...acc, [`${CheckBoxId}-${index}`]: SetValue }), {})
  );
}, []);
  

  const handleCheckboxHover = (isHovered: boolean) => {    
    if (OnHover) {
      OnHover(isHovered);  // Call OnHover with the hover state
    }
  };

 
  const validation = () => {

    let validateObject = {
      [CheckBoxId]: isChecked,
      IsValidate: true,
      IsRequired: Required
    }
    return validateObject;
  }

  useImperativeHandle(ref, () => ({
    validate: () => validation(),
  }));

  return (
    <div
      className={`${
        CheckboxVariation != "Checkbox-w-Image" ? "vg-form-check" : ""
      }`}
      onMouseEnter={() => handleCheckboxHover(true)}
      onMouseLeave={() => handleCheckboxHover(false)}
    >
      {CheckboxVariation === "Checkbox-Simple" && (
        <div className="vg-checkbox">
          <input
            type="checkbox"
            id={`check-simple-${CheckBoxId}`}
            className={`vg-form-check-input  ${
              Required ? "vg-input-control-error-msg" : ""
            }`}
            disabled={Disable}
            checked={isChecked}
            ref={checkboxRef}
            onChange={(e) => OnChange && handleCheckboxChange(e)}
            name={Name}
          />
          <label
            className="vg-check-label"
            htmlFor={`check-simple-${CheckBoxId}`}
          >
            {CheckboxLabel}
          </label>
        </div>
      )}

      {CheckboxVariation === "Checkbox-w-Header" && (
        <div className="vg-checkbox">
          <input
            type="checkbox"
            id={`check-header-${CheckBoxId}`}
            className="vg-form-check-input"
            disabled={Disable}
            checked={isChecked}
            ref={checkboxRef}
            onChange={(e) => OnChange && handleCheckboxChange(e)}
            name={Name}
          />
          <>
            <label
              className="vg-check-label"
              htmlFor={`check-header-${CheckBoxId}`}
            >
              {CheckboxLabel}
              <div className="vg-check-description"> {LableDescription} </div>
            </label>
          </>
        </div>
      )}

      {CheckboxVariation === "Checkbox-w-Image" && (
        <>
          {RawDataWithImage.length > 0
            ? RawDataWithImage.map((item: any, index: number) =>
                renderCheckbox(
                  `${CheckBoxId}-${index}`,
                  item.title,
                  item.imgSource
                )
              )
            : null}
        </>
      )}

      {!isChecked && Required && (
        <span className="vg-input-control-error-msg">{"required"}</span>
      )}
    </div>
  );
});

export default VgCheckbox;