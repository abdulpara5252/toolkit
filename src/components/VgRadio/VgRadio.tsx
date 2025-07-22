import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import './VgRadio.scss';
import Svg from '../VgSvg/Svg';

interface RadioData {
  id?: number;
  title?: string;
  description?: string;
  icon?: any;
  htmlRender?: React.ReactNode
}

export interface VgRadioProps {
  RowData: RadioData[];
  RadioId: string; // Made required
  Variants: 'Normal' | 'SquareBlock';
  OnChange?: (selectedIndex: number, selectedData: RadioData) => void;
  Title: string;
  selectedIndex?: number | null;
  RadioVariant?: 'horizontal' | 'vertical';
  RadioTickMark?: 'dot' | 'tickMark';
  Required?: boolean;
  CustomErrorMessage?: string;
}

interface VgRadioRef {
  validate: () => any;
}

const VgRadio = forwardRef<VgRadioRef, VgRadioProps>(
  (
    {
      RowData,
      RadioId,
      Variants,
      OnChange,
      Title,
      selectedIndex = 0,
      RadioVariant,
      RadioTickMark = '',
      Required,
      CustomErrorMessage,
    },
    ref
  ) => {
    const [selectedIndexState, setSelectedIndexState] = useState<number | null>(selectedIndex);
    const [isValidationError, setIsValidationError] = useState(false);

    useEffect(() => {
      setSelectedIndexState(selectedIndex);
    }, [selectedIndex]);

    const handleChange = (index: number) => {
      setSelectedIndexState(index);
      setIsValidationError(false);
      if(OnChange){
        OnChange(index, RowData[index]);
      }
    };

    const variantClassMap: { [key: string]: string } = {
      Normal: '',
      SquareBlock: 'squareblock',
    };

    const variantClass = variantClassMap[Variants];

    const validation = () => {
      const isValid = !Required || selectedIndexState !== null;
      setIsValidationError(!isValid);

      return {
        IsValid: isValid,
        Required: isValid ? false : Required,
        ErrorMessage: isValid ? '' : CustomErrorMessage,
      };
    };

    useImperativeHandle(ref, () => ({
      validate: () => validation(),
    }));

    return (
      <div
        className={`vg-radio-selection-tiles ${Variants?.toLowerCase()} ${
          RadioVariant === 'horizontal' ? 'horizontal' : 'vertical'
        }`}
      >
        {Title?.length > 0 && <div className="vg-radio-label">{Title}</div>}
        <div className="vg-radio-selection-tiles-options">
          {RowData?.map((item, index) => (
            <label
              key={index}
              htmlFor={`radio-${RadioId}-${index}`}
              className={`vg-radio-selection-tiles-option ${variantClass} ${
                selectedIndexState === index ? 'vg-radio-selection-checked' : ''
              } ${isValidationError ? 'vg-input-control-error' : ''}`}
            >
              <input
                type="radio"
                id={`radio-${RadioId}-${index}`}
                name={`vg-radio-group-${RadioId}`} // Updated to use unique name
                checked={selectedIndexState === index}
                onChange={() => handleChange(index)}
                className="vg-radio-selection-control"
              />
              <div
                className={`vg-radio-selection-tiles-group ${RadioTickMark === 'dot' ? 'default' : ''}`}
              >
                {item?.htmlRender ? (<>
                  {/* <div className='vg-html-render'> */}
                    {item?.htmlRender}
                  {/* </div> */}
                </>) : (
                  <>
                    {Variants === 'SquareBlock' && typeof item?.icon === 'string' ? (
                      <div className="vg-radio-selection-tiles-icon">
                        <Svg name={item?.icon} />
                      </div>
                    ) : Variants === 'SquareBlock' ? (
                      <div className="vg-radio-selection-tiles-icon">{item?.icon}</div>
                    ) : null}
                    <div className="vg-radio-selection-tiles-content">
                      <div className="vg-radio-selection-tiles-title">{item?.title}</div>
                      {Variants === 'SquareBlock' && (
                        <span className="vg-radio-selection-tiles-description">{item?.description}</span>
                      )}
                    </div>
                  </>)}
              </div>
            </label>
          ))}
        </div>
        {isValidationError && (
          <div className="vg-input-control-error-msg">{CustomErrorMessage}</div>
        )}
      </div>
    );
  }
);

export default VgRadio;