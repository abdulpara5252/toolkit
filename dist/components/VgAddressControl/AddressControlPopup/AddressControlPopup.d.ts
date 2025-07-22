import React, { ChangeEvent } from "react";
import "../VgAddressControl.scss";
import "./AddressControlPopup.scss";
interface AddressControlPopupProps {
    show: boolean;
    popupValue: string;
    setPopupValue: string | undefined | any;
    onClose: () => void;
    onSelect?: (address: any, value: string) => void;
    SetValue?: string;
    TitleAddressline1: string;
    TitleAddressline2: string;
    PlaceHolderAddressline1: string;
    PlaceHolderAddressline2: string;
    currentSelectedCountry: number;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setAddress?: (val: any) => void;
    AddressOnChange: (data: any, selectAddressValue: string) => void;
    handleChangeAddressLine2: (e: ChangeEvent<HTMLInputElement>) => void;
    handleCountryChange: (data: any) => void;
    setVerifyAddress: any;
    verifyAddressCountryDropdown: boolean;
}
declare const AddressControlPopup: React.FC<AddressControlPopupProps>;
export default AddressControlPopup;
