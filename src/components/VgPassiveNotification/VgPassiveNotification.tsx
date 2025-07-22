import React, { useState, useEffect } from 'react';
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

const VgPassiveNotification: React.FC<VgPassiveNotificationProps> = ({
    NotificationTitle,
    Icon = false,
    types = 'positive',
    Duration = 0,
    show = false,
    TopMessage = false,
    OnClose,
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    const notification = types === "positive" ? 
    'vg-banner-success-master' 
    : types === "warning" ?
    'vg-banner-warning-master' 
    : 'vg-banner-fail-master';

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (show || TopMessage) {
            setIsVisible(true);
            const timeoutDuration = Duration > 0
                ? Duration
                : NotificationTitle
                    ? NotificationTitle.length < 50
                        ? 2000
                        : NotificationTitle.length < 100
                            ? 3000
                            : NotificationTitle.length < 200
                                ? 4000
                                : 7000
                    : 3000;

            timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(() => {
                    if (OnClose) OnClose();
                }, 300);
            }, timeoutDuration);
        } else {
            setIsVisible(false)
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [show, NotificationTitle, Duration, TopMessage, OnClose]);

    return (
        <>
            <div className='passinvmessageblock'>
                <div className={`${notification} ${isVisible ? (TopMessage ? 'showmsgTop' : '') : ''}`}>
                    {Icon && (
                        <div className="icon-banner">
                            
                        </div>
                    )}
                    <div className="text-block-28">{NotificationTitle}</div>
                </div>
            </div>
        </>
    );
};

export default VgPassiveNotification;