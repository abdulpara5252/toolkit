import React from "react";
import './VgDragList.scss';
interface Options {
    id: string;
    name: string;
    selected: boolean;
}
export interface VgDragListProps {
    ShowEditSave?: boolean;
    ParentCheckboxTitle?: string;
    RawData?: Options[];
    onChange?: (options: Options[]) => void;
    OnEditSave?: (isEditing: boolean, options: Options[]) => void;
}
declare const VgDragList: React.FC<VgDragListProps>;
export default VgDragList;
