import React from "react";
import "../VgAddressControl/VgAddressControl.scss";
import "../VgPhoneControl/VgPhoneControl.scss";
import "../VgTextbox/VgTextbox.scss";
export interface VgAddressControlProps {
    TitleAddressline1?: string;
    TitleAddressline2?: string;
    PlaceHolderAddressline1?: string;
    PlaceHolderAddressline2?: string;
    onSelect?: (address: any, value: string) => void;
    OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    AddressControlId?: string;
    [key: string]: any;
    NativeActionValue?: number;
    CountryDropdownOpenName?: string;
    ShowHideFooter?: number;
    CallBackTimeCount?: number;
    IsFullLenght?: boolean;
    EnvironmentUrl?: string;
    VagaroToolkit?: number;
    Orientation?: "vertical" | "horizontal";
    Required?: boolean;
    CountryDropdown?: boolean;
    ShowRequiredFieldMark?: boolean;
    AddressLine1InputName?: string;
    AddressLine2InputName?: string;
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnChangeAddressLine2?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    SetValue?: string;
    CurrentCountry?: number;
    AutoFocus?: boolean;
    ManualAddress?: boolean;
    ShouldVerifyAddress?: boolean;
    OnCountryChange?: (countryId: number) => void;
    SetAddresLine2Value?: string;
    AllCountry?: boolean;
    Show_Address_line2?: boolean;
    Disabled?: boolean;
    ClearIcon?: boolean;
    VerifyAddressCountryDropdown?: boolean;
    OnValidation?: (isValid: boolean, errorMessage: string) => void;
}
interface VgAddressControlRef {
    validate: () => any;
}
declare global {
    interface Window {
        CountryDropdownOpen: (data: any) => any;
        CountryDropdownClose: (data: any) => any;
        AddressCallBackOpen: () => any;
    }
}
declare const VgAddressControl: React.ForwardRefExoticComponent<Omit<VgAddressControlProps, "ref"> & React.RefAttributes<VgAddressControlRef>>;
export default VgAddressControl;
