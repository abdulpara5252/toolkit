import React, { useState } from 'react';
import './VgSlider.scss';

export interface VgSliderProps {
  Title: string;
  Min?: number;
  Max?: number;
  Description?: string;
  DefaultValue?: number;
  OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VgSlider: React.FC<VgSliderProps> = ({
  Title,
  Min = 0,
  Max = 100,
  Description,
  DefaultValue = 50,
  OnChange = () => {},
}) => {
  const [value, setValue] = useState(DefaultValue);

  const getTooltipLeft = () => {
    const percent = (value - Min) / (Max - Min) * 100;
    let offset = -2;
    // return `calc(${percent}% ${offset >= 0 ? '+' : '-'} ${Math.abs(offset)}%)`;
    return `calc(${percent}%`
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setValue(newValue);
    if (OnChange) {
      OnChange(e);
    }
  };

  return (
    <div className="vg-slider">
      {Title && <h3 className="vg-slider__title">{Title}</h3>}
      {Description && (
        <div className="vg-slider__description">{Description}</div>
      )}
      <div className="vg-slider__range-container">
        <div className='vg-slider-arrow'>
        <div
          className="vg-slider__tooltip"
          style={{ left: getTooltipLeft() }}
        >
          <div className="vg-slider__tooltip-arrow"></div>
          <div className="vg-slider__tooltip-circle"></div>
          {value}
        </div>
        </div>
        <input
          type="range"
          min={Min}
          max={Max}
          value={value}
          onChange={handleChange}
          className="vg-slider__input"
        />
      </div>
    </div>
  );
};

export default VgSlider;