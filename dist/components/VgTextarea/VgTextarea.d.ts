import React from "react";
import "./VgTextarea.scss";
import "../../App.css";
import 'emoji-picker-element';
export interface VgTextareaProps {
    TextareaVariant?: "Default" | "RequiredText" | "FileUploader";
    SetValue?: string;
    LabelText?: string;
    TextAreaDisable?: boolean;
    PlaceHolder?: string;
    FocusBorder?: boolean;
    AiClickEvent?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    Error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    OnBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    AlertPassiveMessage?: boolean;
    MaximumLength?: number;
    TextareaLength?: number;
    MinimumLength?: number;
    AiControlPopup?: boolean;
    ReviewPopup?: boolean;
    RawData?: Array<{
        Index: number;
        InputDescription: string;
        Tone: string;
        Range: number;
    }>;
    VagaroToolkit?: number;
    NativeAction?: number;
    Footer?: number;
    TimerCount?: number;
    FullLength?: boolean;
    CloseBackTitle?: string;
    AiControlId?: string;
    CharacterCountEnableForAi?: boolean;
    MaximumLengthForAi?: number;
    ToneMetadata?: any;
    OnClickCancle?: () => void;
    OnClickClose?: () => void;
    OnClickUseThisText?: (e: any, data: any) => void;
    OnChangeRange?: (e: any) => void;
    OnChangeTone?: (e: any, data: any) => void;
    OnClickNext?: (e: any) => void;
    OnClickPrevious?: (e: any) => void;
    OnClickRegenerate?: (e: any) => void;
    Name?: string;
    CharacterCountEnable?: boolean;
    [key: string]: any;
    DialogShowHide?: boolean;
    AutoFocus?: boolean;
    ReviewSection?: boolean;
    ReviewSectionBody?: any;
    EmojiButton?: boolean;
    CrossButton?: boolean;
    TickButton?: boolean;
    OnEmojiClick?: (e: any) => void;
    OnCrossClick?: (e: any) => void;
    OnTickClick?: (e: any, inputValue: string) => void;
    IsHtml?: boolean;
    ShowRequiredFieldMark?: boolean;
    AutoHeight?: boolean;
}
declare global {
    interface Window {
        setMobileDataVagaroAI?: (sJSON: string) => void;
    }
}
declare const VgTextarea: React.FC<VgTextareaProps>;
export default VgTextarea;
