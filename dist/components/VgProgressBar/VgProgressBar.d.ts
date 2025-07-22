import React from 'react';
import './VgProgressBar.scss';
export interface VgProgressBarProps {
    CurrentValue: number;
    MaxValue: number;
    Orientation?: 'horizontal' | 'vertical';
    ShowPoints?: boolean;
    Title?: string;
    ShowPointsBody?: {
        Body: React.ReactNode;
    }[];
    BodyPosition?: 'top' | 'bottom';
}
declare const VgProgressBar: React.FC<VgProgressBarProps>;
export default VgProgressBar;
