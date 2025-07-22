import React from "react";
import "./VgColorPicker.scss";
import "../../utils/codemirror-colorpiker.scss";
import '../VgButton/VgButton.scss';
export interface VgColorPickerProps {
    OnChange: (colorCode: string) => void;
    Title?: string;
    NativeActionVal?: number;
    Footer?: number;
    TimerCount?: number;
    IsFullLength?: boolean;
    CloseBackTitle?: string;
    ColorPickerId?: string;
    DefaultColor?: string;
    VagaroToolkit?: Number;
}
declare const VgColorPicker: React.FC<VgColorPickerProps>;
export default VgColorPicker;
