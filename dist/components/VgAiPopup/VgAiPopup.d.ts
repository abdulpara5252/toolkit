import React from "react";
import "./VgAiPopup.scss";
import "../VgPopup/VgPopup.scss";
import "../VgBottomSheet/VgBottomSheet.scss";
export interface AiPopupData {
    Tone: string;
    Range: number;
    rangeLabel: string;
    InputDescription: string;
    Index: number;
}
export interface VgAiPopupProps {
    RawData?: Array<{
        Index: number;
        InputDescription: string;
        Tone: string;
        Range: number;
    }>;
    VagaroToolkit?: number;
    MaximumLength?: number;
    CharacterCountEnable?: boolean;
    NativeAction?: number;
    Footer?: number;
    TimerCount?: number;
    IsFullLength?: boolean;
    CloseBackTitle?: string;
    AiControlId?: string;
    ToneMetadata?: any;
    Disable: boolean;
    OnClickClose?: (e: any) => void;
    OnClickCancle?: (e: any) => void;
    OnClickUseThisText?: (e: any, data: AiPopupData) => void;
    OnChangeRange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLInputElement>, data: AiPopupData) => void;
    OnChangeTone?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, data: AiPopupData) => void;
    OnClickRegenerate?: (e: any, data: AiPopupData) => void;
    OnClickNext?: (e: any, data: any) => void;
    OnClickPrevious?: (e: any, data: any) => void;
    AiControl?: boolean;
    [key: string]: any;
    OnBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    Name?: string;
    SetIndex?: number;
    ReviewSection?: boolean;
    ReviewSectionBody?: any;
    AiPopupSetValue?: {
        Index: number;
        InputDescription: string;
        Tone: string;
        Range: number;
    };
}
declare const VgAiPopup: React.FC<VgAiPopupProps>;
export default VgAiPopup;
