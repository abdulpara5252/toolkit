import React from "react";
import "./VgMapControl.scss";
import "../VgPopup/VgPopup.scss";
export interface MapProps {
    Latitude: number;
    Longitude: number;
    Radius: number;
    FixIncorrectMarker: boolean;
    markerIcon?: string;
    onMarkerDragEnd?: (lat: number, lng: number) => void;
    MapHeight: string;
    MapWidth: string;
    MapControlId?: string;
    VagaroToolkit?: Number;
    NativeAction?: number;
    Footer?: number;
    TimerCount?: number;
    IsFullLength?: boolean;
    CloseBackTitle?: string;
}
declare const VgMapControl: React.FC<MapProps>;
export default VgMapControl;
