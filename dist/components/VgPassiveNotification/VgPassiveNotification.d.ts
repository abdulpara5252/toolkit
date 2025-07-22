import React from 'react';
import './VgPassiveNotification.scss';
export interface VgPassiveNotificationProps {
    NotificationTitle?: string;
    Icon?: boolean;
    show?: boolean;
    Duration?: number;
    types?: 'positive' | 'warning' | 'error';
    TopMessage?: boolean;
    OnClose?: () => void;
}
declare const VgPassiveNotification: React.FC<VgPassiveNotificationProps>;
export default VgPassiveNotification;
