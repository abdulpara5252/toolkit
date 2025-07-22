import React, { ReactNode } from "react";
import "./VgTooltip.scss";
export interface VgTooltipProps {
    TooltipText?: string;
    ScreenTitleForMobile?: string;
    Children?: ReactNode;
    Html?: boolean;
    TextAlign?: 'left' | 'center' | 'right';
    BeakPoint?: 'Up' | 'Down';
    BeakPosition?: 'Left' | 'Middle' | 'Right';
}
declare const VgTooltip: React.FC<VgTooltipProps>;
export default VgTooltip;
