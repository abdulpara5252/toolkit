import React from "react";
import "./VgLoginInput.scss";
export interface VgLoginInputProps {
    InputTitle?: string;
    PlaceHolder?: string;
    Required?: boolean;
    CustomErrorMessage?: string;
    [key: string]: any;
    InputId?: string;
    OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnPhoneControlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    OnClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    customClassName?: string;
    SetValue?: string;
    Name?: string;
    InputText?: string;
    AutoFocus?: boolean;
    Type?: string;
    OnKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    OnPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    AllCountry?: boolean;
    CountryDropdown?: boolean;
    ShowRequiredFieldMark?: boolean;
}
declare const VgLoginInput: React.FC<VgLoginInputProps>;
export default VgLoginInput;
