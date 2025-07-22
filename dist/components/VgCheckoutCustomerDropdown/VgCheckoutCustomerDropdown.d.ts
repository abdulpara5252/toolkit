import React from "react";
import "../VgTextbox/VgTextbox.scss";
import "../VgCheckbox/VgCheckbox.scss";
import "../VgButton/VgButton.scss";
import "./VgCheckoutCustomerDropdown.scss";
import "../VgTooltip/VgTooltip.scss";
export type CustomerTab = "In Today" | "All Customers" | "Save For Later";
export interface CustomerData {
    ID: string;
    FN: string;
    C?: string;
    D?: string;
    N?: string;
    E?: string;
    DName?: string;
    profileImage?: string;
    points?: number;
    SaveForLaterId?: string;
    customerData?: any;
}
export interface VgCheckoutCustomerDropdownProps {
    ApiUrlInToday?: string;
    ApiRequestParams?: any;
    ClassNamePrefix?: string;
    CustomClassNamePrefix?: string;
    ShowCheckBox?: boolean;
    OpenDropdown?: boolean;
    SearchPlaceholder?: string;
    CloseFromOutSide?: boolean;
    DropdownClosed?: () => void;
    DropdownName?: string;
    DropdownClosingName?: string;
    IsSelect2OpenCallback?: boolean;
    Select2OpenCallback?: () => void;
    ShowCustomMessage?: string;
    onChange?: (data: any) => void;
    OnScrollPagination?: (e: React.UIEvent<HTMLDivElement>) => void;
    OnSearch?: (params: {
        searchValue?: string;
        search?: string | boolean;
    }) => void;
    RightSwipeEvent?: boolean;
    DropdownTitle?: string;
    DropdownId?: string;
    NativeActionValue?: number;
    ShowHideFooter?: number;
    CallBackTimeCount?: number;
    IsFullLength?: boolean;
    TabIndex?: number;
    VagaroToolkit?: Number;
    OpenFromBody?: boolean;
    OnClickOutside?: (params: {
        event: any;
        isClickOutside: boolean;
    }) => void;
    EnableTabs?: boolean;
    DropdownPlaceholder?: string;
    BusinessId: number;
    HasCustomerRight: boolean;
    LoginUserId?: number;
    DepositGroupID?: string;
    TransactionDate?: string;
    ShowCheckbox?: boolean;
    SelectedCustomer?: any;
    [key: string]: any;
}
export interface DropdownOption {
    value: string;
    label: string;
    email?: string;
    profileImage?: string;
    points?: number;
    SaveForLaterId?: string;
}
declare const VgCheckoutCustomerDropdown: React.FC<VgCheckoutCustomerDropdownProps>;
export default VgCheckoutCustomerDropdown;
