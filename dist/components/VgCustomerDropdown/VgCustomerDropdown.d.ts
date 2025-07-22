import React from "react";
import './VgCustomerDropdown.scss';
type CustomerOptionType = {
    value: number;
    label: string;
    name: string;
    phone: string;
    email: string;
};
interface VgCustomerDropdownProps {
    onChange?: (selectedOption: CustomerOptionType | null) => void;
}
interface VgCustomerDropdownRef {
    validate: () => {
        isValid: boolean;
        value?: CustomerOptionType | null;
        error?: string;
    };
}
declare const VgCustomerDropdown: React.ForwardRefExoticComponent<VgCustomerDropdownProps & React.RefAttributes<VgCustomerDropdownRef>>;
export default VgCustomerDropdown;
