import React from "react";
import "./VgNestedDropdown.scss";
interface OptionType {
    label: string;
    value: string;
    hasSubmenu?: boolean;
    children?: Array<{
        label: string;
        value: string;
    }>;
}
interface SelectedValueType {
    label: string;
    value: string | number;
    subOption?: string | boolean;
}
export interface VgNestedDropdownProps {
    VariantType?: "Default" | "NestedDropDown" | "NestedButton";
    ButtonText?: string;
    ButtonVariant?: "primary" | "secondary" | "theme" | "default";
    DefaultValue?: SelectedValueType | SelectedValueType[];
    OnChange?: (value: SelectedValueType) => void;
    OnClick?: (event: React.MouseEvent, value: SelectedValueType) => void;
    OnClickOutside?: () => void;
    Width?: string;
    RowData?: OptionType[];
    SubmenuOptionPosition?: "Right" | "Left";
}
interface VgNestedDropdownRef {
    validate: () => boolean;
    getValue: () => SelectedValueType;
}
declare const VgNestedDropdown: React.ForwardRefExoticComponent<VgNestedDropdownProps & React.RefAttributes<VgNestedDropdownRef>>;
export default VgNestedDropdown;
