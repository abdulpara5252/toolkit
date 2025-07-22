import './VgTextEditor.scss';
export interface VgTextEditorProps {
    Title?: string;
    Style?: boolean;
    PlaceHolder?: string;
    OnChange?: (e: any) => void;
    OnClickCancle?: () => void;
    OnClickClose?: () => void;
    OnClickUseThisText?: (e: any) => void;
    OnChangeRange?: (e: any) => void;
    OnChangeTone?: (e: any) => void;
    OnClickNext?: (e: any) => void;
    OnClickPrevious?: (e: any) => void;
    OnClickRegenerate?: (e: any) => void;
    AiControlPopup: boolean;
    MaximumLength?: number;
    MaximumLengthForAi?: number;
    ToolbarRawData?: {
        Fontfamily: boolean;
        Fontsize: boolean;
        Bold: boolean;
        Fontcolor: boolean;
        BackgroundColor: boolean;
        Link: boolean;
        Underline: boolean;
        Alignment: boolean;
        Italic: boolean;
        Strikethrough: boolean;
        Clear: boolean;
        InsertNames: boolean;
        Undo: boolean;
        Redo: boolean;
        NumberListButton: boolean;
        BulletListButton: boolean;
    };
    ToneMetadata?: any;
    RawData?: Array<{
        Index: number;
        InputDescription: string;
        Tone: string;
        Range: number;
    }>;
    SetValue?: string;
}
interface VgTextEditorRef {
    validate: () => any;
}
export declare const VgTextEditor: import("react").ForwardRefExoticComponent<VgTextEditorProps & import("react").RefAttributes<VgTextEditorRef>>;
export default VgTextEditor;
