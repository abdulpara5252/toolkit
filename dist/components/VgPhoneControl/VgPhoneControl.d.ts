import React from "react";
import "./VgPhoneControl.scss";
import "../VgTextbox/VgTextbox.scss";
export interface PhoneControlProps {
    Title: string;
    PlaceHolder?: string;
    Validation: string;
    CustomErrorMessage?: string;
    Disable?: boolean;
    FocusBorder?: boolean;
    Required?: boolean;
    CurrentCountry: number;
    isDisabled?: boolean;
    Footer?: number;
    TimerCount?: number;
    FullLength?: boolean;
    CloseBackTitle?: string;
    OnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnKeyUp: (e: React.MouseEvent<HTMLInputElement>) => void;
    OnClick: (e: React.MouseEvent<HTMLInputElement>) => void;
    OnBlur: (e: React.MouseEvent<HTMLInputElement>) => void;
    OnValidation?: (isValid: boolean, errorMessage?: string) => void;
    PhoneControlId?: string;
    [key: string]: any;
    VagaroToolkit: Number;
    MaximumLength?: number;
    SetValue?: string;
    Value?: string;
    CountryDropdown?: boolean;
    ShowRequiredFieldMark?: boolean;
    Name?: string;
    AutoFocus?: boolean;
    AllCountry?: boolean;
    CheckPhoneControl?: string;
    OnCountryChange?: (countryId: number) => void;
    SearchCountry?: boolean;
}
interface RefProps {
    validate: () => any;
    closeDropdown: () => any;
}
declare const VgPhoneControl: React.ForwardRefExoticComponent<Omit<PhoneControlProps, "ref"> & React.RefAttributes<RefProps>>;
export default VgPhoneControl;
