import React from 'react';
import './VgCheckbox.scss';
export interface VgCheckboxProps {
    CheckboxLabel?: string;
    LableDescription?: string;
    Disable?: boolean;
    SetValue?: boolean;
    PartialChecked?: boolean;
    CheckboxVariation?: 'Checkbox-Simple' | 'Checkbox-w-Header' | 'Checkbox-w-Image';
    OnChange?: (SetValue: boolean, e: any) => void;
    OnHover?: (isHovered: boolean) => void;
    CheckBoxId?: string;
    Required?: boolean;
    Name?: string;
    [key: string]: any;
    RawDataWithImage?: {
        imgSource?: string;
        title: string;
    }[];
}
declare const VgCheckbox: React.FC<VgCheckboxProps>;
export default VgCheckbox;
