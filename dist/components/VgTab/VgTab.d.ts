import React, { ReactNode } from 'react';
import "./VgTab.scss";
export interface VgTabProps {
    onClick?: (tabId: number, tabName: string, e: React.MouseEvent<HTMLElement>) => void;
    Name?: {
        id: number;
        name: string;
        IconSVG?: ReactNode;
    }[];
    ActiveTab?: number;
    NoOfTab: string;
    TabVariant?: "vertical" | "horizontal";
    TabPosition?: "left" | "right" | "center";
    TabSize?: "small" | "medium" | "large";
    BottomBorder?: boolean;
}
declare const VgTab: React.FC<VgTabProps>;
export default VgTab;
