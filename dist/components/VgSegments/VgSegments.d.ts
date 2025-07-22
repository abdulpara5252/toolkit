import React from "react";
import "./VgSegments.scss";
export interface VgSegmentsProps {
    Title?: string;
    onClick?: (tabId: number, tabName: string, e: React.MouseEvent<HTMLElement>) => void;
    Name?: {
        id: number;
        name: string;
    }[];
    ActiveSegment?: number | number[] | null | string;
    NoOfSegments: string;
    TabSegment?: "vertical" | "horizontal";
    InfoTooltipMessage?: string;
    BeakPosition?: "Left" | "Middle" | "Right";
    Multi?: boolean;
    Html?: boolean;
    TextAlignment?: "center" | "left" | "right";
    TabDesign?: boolean;
    FullWidth?: boolean;
    Required?: boolean;
    CustomErrorMessage?: string;
}
interface VgSegmentsRef {
    validate: () => any;
}
declare const VgSegments: React.ForwardRefExoticComponent<VgSegmentsProps & React.RefAttributes<VgSegmentsRef>>;
export default VgSegments;
