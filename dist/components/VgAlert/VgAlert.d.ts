import React from "react";
import "./VgAlert.scss";
export interface VgAlertProps {
    Icon?: "none" | "warning" | "success" | "delete";
    Title?: string;
    Description?: string;
    ConfirmText?: string;
    CancelText?: string;
    OnConfirm?: () => void;
    OnCancel?: () => void;
    OnClose?: () => void;
    ShowFooter?: boolean;
    Duration?: number;
}
declare const VgAlert: React.FC<VgAlertProps>;
export default VgAlert;
