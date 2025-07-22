import { LexicalEditor } from "lexical";
import { Dispatch } from "react";
interface ToolbarPluginProps {
    editor: LexicalEditor;
    activeEditor: LexicalEditor;
    setActiveEditor: Dispatch<LexicalEditor>;
    setIsLinkEditMode: Dispatch<boolean>;
    ToolbarRawData: {
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
    RawData?: Array<{
        Index: number;
        InputDescription: string;
        Tone: string;
        Range: number;
    }>;
    isEditable: boolean;
    floatingAnchorElem: HTMLDivElement | null;
    setFloatingAnchorElem: Dispatch<React.SetStateAction<HTMLDivElement | null>>;
    isSmallWidthViewport: boolean;
    setIsSmallWidthViewport: Dispatch<React.SetStateAction<boolean>>;
    activeTab: 'text' | 'style';
    setActiveTab: (tab: 'text' | 'style') => void;
}
export default function ToolbarPlugin({ editor, activeEditor, setActiveEditor, setIsLinkEditMode, ToolbarRawData, RawData, activeTab, setActiveTab, floatingAnchorElem, setFloatingAnchorElem, isSmallWidthViewport, setIsSmallWidthViewport, }: ToolbarPluginProps): JSX.Element;
export {};
