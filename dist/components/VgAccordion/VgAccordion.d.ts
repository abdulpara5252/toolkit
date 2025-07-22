import React from 'react';
import './VgAccordion.scss';
export interface VgAccordionProps {
    Title: string;
    Body: React.ReactNode | string;
    OpenIcon?: React.ReactNode | string;
    CloseIcon?: React.ReactNode | string;
    AccordionId?: string;
    IsOpen?: boolean;
    OnToggle?: (id: string) => void;
}
declare const VgAccordion: React.FC<VgAccordionProps>;
export default VgAccordion;
