import React from "react";
import "./VgDatePicker.scss";
import "../VgButton/VgButton.scss";
import "../VgTextbox/VgTextbox.scss";
export interface VgDatePickerProps {
    Title?: string;
    DefaultDate?: "today" | "firstDateOfMonth" | "clear" | "none" | string | Date | null;
    Onchange: (date: Date | null) => void;
    OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    SelectAnytime?: boolean;
    Mindate?: Date | string;
    Maxdate?: Date | string;
    DatePickerOpen?: boolean;
    isPastDateDisable?: boolean;
    DatePickerVariant?: "small" | "regular";
    isFutureDateDisable?: boolean;
    Placeholder?: string;
    Disabled?: boolean;
    Disableddates?: Date[] | string[];
    DateRequired?: boolean;
    EmptyInputValue?: boolean;
    FocusBorder?: boolean;
    VagaroToolkit?: number;
    DatePickerName?: string;
    DatePickerId?: string;
    Country?: "U.S.A" | "U.K." | "Canada" | "Australia";
    [key: string]: any;
    EnvironmentUrlDp?: string;
    ShowRequiredFieldMark?: boolean;
    SetValue?: Date | string;
    AutoFocus?: boolean;
    SetControlonRight?: boolean;
    CrossIcon?: boolean;
    CloseDatepickerOnSelect?: boolean;
    DateFormat?: string;
    HideCalendarIcon?: boolean;
    ShowIcon?: string;
    AnyTimeClick?: boolean;
}
declare global {
    interface Window {
        _countryDateFormat: any;
    }
}
declare const VgDatePicker: React.FC<VgDatePickerProps>;
export default VgDatePicker;
