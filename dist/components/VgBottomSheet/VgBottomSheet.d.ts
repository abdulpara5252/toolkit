import React from "react";
import "./VgBottomSheet.scss";
import "../VgButton/VgButton.scss";
export interface VgBottomSheetProps {
    Id?: number;
    Description?: string;
    NativeAction?: number;
    Footer?: number;
    TimerCount?: number;
    IsFullLength?: boolean;
    CloseBackTitle?: string;
    BottomsheetData?: any;
    BottomSheetId?: string;
    OnClick?: (e: any, selectMenuList?: any) => void;
    OnClickPrimary?: (e: any) => void;
    OnClickSecondary?: (e: any) => void;
    VagaroToolkit?: Number;
    PopupTitle?: string;
}
declare const VgBottomSheet: React.FC<VgBottomSheetProps>;
export default VgBottomSheet;
