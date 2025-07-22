import React from 'react';
import './VgInformationNote.scss';
export type VgInformationNoteVariant = 'information' | 'warning' | 'error';
export interface VgInformationNoteProps {
    Variant: VgInformationNoteVariant;
    Title?: string;
    Children: React.ReactNode;
    LinkText?: string;
    OnLinkClick?: () => void;
}
export declare const VgInformationNote: React.FC<VgInformationNoteProps>;
export default VgInformationNote;
