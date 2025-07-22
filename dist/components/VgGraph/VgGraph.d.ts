import React from "react";
import "./VgGraph.scss";
type SeriesItem = {
    name?: string;
    data?: any[];
    type?: string;
};
type GraphDataItem = {
    series: number[] | SeriesItem[];
    labels?: any[];
    colors?: string[];
    name?: string;
    total?: string;
    growth?: string;
    growthText?: string;
    edit?: boolean;
    order?: string;
    title?: string;
    tooltip?: boolean;
    totalText?: string;
};
interface PrefixPostFix {
    prefix?: string;
    suffix?: string;
    enabled?: boolean;
}
export interface VgGraphProps {
    GraphType?: "bar" | "stackedbar" | "horizontalbar" | "groupedbar" | "area" | "donut" | "line" | "linebar" | "pie";
    Size?: "x-small" | "small" | "medium" | "large";
    [key: string]: any;
    GraphData?: GraphDataItem[];
    DataPointSelection?: (event: any, chartContext: any, config: any) => void;
    ShowLegend?: boolean;
    PrefixPostFix?: PrefixPostFix;
    DataPointMouseEnter?: (event: any, chartContext: any, config: any) => void;
    DataPointMouseLeave?: (event: any, chartContext: any, config: any) => void;
    XAxisLabelClick?: (event: any, chartContext: any, config: any) => void;
    Selection?: (event: any, chartContext: any, config: any) => void;
    GraphTab?: boolean;
    ShowDataLabelText?: boolean;
    ShowYaxisLabels?: boolean;
    LinkLabelText?: string;
    OnClick?: () => void;
}
declare const VgGraph: React.FC<VgGraphProps>;
export default VgGraph;
