import React from "react";
import "./VgTimePicker.scss";
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
    VagaroToolkit?: number;
    AutoFocus?: boolean;
    TimePickerOpen?: boolean;
    OnIconClick?: (event: React.MouseEvent<HTMLInputElement>, isOpen: boolean) => void;
}
declare const VgTimePicker: React.FC<VgTimePickerProps>;
export default VgTimePicker;
