import React, { ChangeEvent } from "react";
import "./VgStepper.scss";
export interface VgStepperProps {
    SetInterval: number;
    OnBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    MinimumValue?: number;
    MaximumValue?: number;
    SetValue?: number | null;
    Required?: boolean;
    CustomErrorMessage?: string;
    Disabled?: boolean;
    OnIncrement?: (event: ChangeEvent<HTMLInputElement>) => void;
    OnDecrement?: (event: ChangeEvent<HTMLInputElement>) => void;
    CustomIntervalText?: string;
    LabelText?: string;
    [key: string]: any;
}
declare const VgStepper: React.FC<VgStepperProps>;
export default VgStepper;
