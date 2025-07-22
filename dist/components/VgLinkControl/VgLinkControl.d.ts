import React from 'react';
import './VgLinkControl.scss';
export interface VgLinkControlProps {
    URL?: string;
    LinkControlText?: React.ReactNode;
    UnderLine?: 'always' | 'onhover' | 'none';
    Icon?: 'plus' | 'leftarrow';
    OnClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    Disable?: boolean;
}
declare const VgLinkControl: React.FC<VgLinkControlProps>;
export default VgLinkControl;
