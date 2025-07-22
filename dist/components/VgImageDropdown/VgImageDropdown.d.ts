import React from "react";
import "./VgImageDropdown.scss";
interface ImageDropdownOption {
    label: string;
    value: string;
    imageUrl: string;
    category?: string;
    source?: string;
    barcodeId?: string;
}
export interface VgImageDropdownProps {
    RawData: ImageDropdownOption[];
    Placeholder?: string;
    Searchable?: boolean;
    Multi?: boolean;
    Required?: boolean;
    OnChange?: (selected: ImageDropdownOption[]) => void;
    OnSearch?: (searchTerm: string) => void;
    OnScroll?: (page: number) => void;
    DropdownTitle?: string;
    Icon?: boolean;
    DropdownInnerTitle?: string;
    inputId?: string;
    OnFocus?: React.FocusEventHandler<HTMLInputElement>;
    OnBlur?: React.FocusEventHandler<HTMLInputElement>;
    OnKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    OnPaste?: React.ClipboardEventHandler<HTMLInputElement>;
    AutoComplete?: boolean;
    AutoCorrect?: boolean;
    MaxLength?: number;
    DefaultBorderShow?: boolean;
    ActiveState?: boolean;
}
declare const VgImageDropdown: React.FC<VgImageDropdownProps>;
export default VgImageDropdown;
