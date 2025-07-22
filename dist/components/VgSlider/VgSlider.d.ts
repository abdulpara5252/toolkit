import React from 'react';
import './VgSlider.scss';
export interface VgSliderProps {
    Title: string;
    Min?: number;
    Max?: number;
    Description?: string;
    DefaultValue?: number;
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const VgSlider: React.FC<VgSliderProps>;
export default VgSlider;
