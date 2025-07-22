import React from 'react';
import './VgBadge.scss';

export interface VgBadgeProps {
    BadgeText?: string;
    BadgeVariation?: string;
    BadgeSize?: 'inline' | 'large' | 'overlay';
    Children?: React.ReactNode;
    BadgeColorVariant?: string;
}

const VgBadge: React.FC<VgBadgeProps> = ({
    BadgeText = 'Input Badge',
    BadgeVariation = '',
    BadgeSize,
    Children,
    BadgeColorVariant,
}) => {
    const baseClass = 'vg-badge';

    const badgeClass = [
        baseClass,
        `${baseClass}--${BadgeSize}`,
        `${baseClass}-${BadgeVariation}`,
        BadgeVariation === 'none' && BadgeColorVariant ? `${baseClass}-color-${BadgeColorVariant}` : ''
    ].join(' ').trim();

    return (
        <>
            <div
                className={badgeClass}
                onClick={() =>{}}
            >
                {BadgeVariation === 'custom' && typeof Children === 'string' ? (
                    <span dangerouslySetInnerHTML={{ __html: Children }} />
                ) : BadgeVariation === 'custom' ? (
                    Children
                ) : (
                    BadgeText
                )}
            </div>
        </>
    );
};

export default VgBadge;