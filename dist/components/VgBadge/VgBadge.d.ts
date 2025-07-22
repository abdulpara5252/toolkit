import React from 'react';
import './VgBadge.scss';
export interface VgBadgeProps {
    BadgeText?: string;
    BadgeVariation?: string;
    BadgeSize?: 'inline' | 'large' | 'overlay';
    Children?: React.ReactNode;
    BadgeColorVariant?: string;
}
declare const VgBadge: React.FC<VgBadgeProps>;
export default VgBadge;
