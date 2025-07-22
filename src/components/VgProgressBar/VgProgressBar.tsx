import React, { useEffect, useState } from 'react';
import './VgProgressBar.scss';

export interface VgProgressBarProps {
    CurrentValue: number;
    MaxValue: number;
    Orientation?: 'horizontal' | 'vertical';
    ShowPoints?: boolean;
    Title?: string;
    ShowPointsBody?: { Body: React.ReactNode }[];
    BodyPosition?: 'top' | 'bottom';
}

const VgProgressBar: React.FC<VgProgressBarProps> = ({
    CurrentValue,
    MaxValue,
    Orientation = 'horizontal',
    Title,
    ShowPointsBody,
    BodyPosition = 'bottom',
    ShowPoints = false,
}) => {
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        const updateView = () => setIsMobileView(mediaQuery.matches);

        updateView();

        mediaQuery.addEventListener('change', updateView);
        return () => mediaQuery.removeEventListener('change', updateView);
    }, []);

    const isVertical = (Orientation === 'vertical') || (isMobileView && ShowPoints);
    const safeCurrentValue = Math.min(Math.max(CurrentValue, 0), MaxValue);

    const progressPercent = ShowPoints
        ? MaxValue > 1
            ? ((safeCurrentValue - 1) / (MaxValue - 1)) * 100
            : 0
        : (safeCurrentValue / MaxValue) * 100;

    const renderArrayBody = () => {
        if (!ShowPoints || !ShowPointsBody || !Array.isArray(ShowPointsBody)) return null;

        return (
            <div className={`vg-progress-hr-bar-body-array ${BodyPosition}`}>
                {ShowPointsBody.map((item, index) => (
                    <div
                        key={index}
                        className="vg-progress-bar-body-inline"
                        dangerouslySetInnerHTML={{ __html: item.Body as string }}
                    />
                ))}
            </div>
        );
    };

    const renderVerticalPointsWithBody = () => {
        return (
            <div className="vg-progress-bar-vertical-inline">
                <div className="vg-progress-bar-wrapper vertical points">
                    <div className="vg-progress-bar-track" />
                    <div
                        className="vg-progress-bar-fill-line"
                        style={{ height: `${progressPercent}%` }}
                    />
                    <div className="vg-progress-points">
                        {Array.from({ length: MaxValue }, (_, index) => (
                            <div
                                key={index}
                                className={`vg-progress-point ${index < CurrentValue ? 'filled' : ''}`}
                            >
                                <span className='vg-progress-dots'></span>
                                <div
                                    className="vg-progress-bar-body-inline"
                                    dangerouslySetInnerHTML={{ __html: ShowPointsBody?.[index]?.Body as string }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderHeaderBody = () => {
        return <div className="vg-progress-bar-header-body" dangerouslySetInnerHTML={{ __html: Title as string }} />
    };

    if (isVertical && ShowPoints) {
        return renderVerticalPointsWithBody()
    }

    return (
        <div className="vg-progress-bar">
            {/* Single Body on Top */}
            {BodyPosition === 'top' && renderHeaderBody()}

            {/* Array Body on Top */}
            {ShowPoints && BodyPosition === 'top' && renderArrayBody()}

            {/* Progress Line and Dots */}
            <div className={`vg-progress-bar-wrapper ${isVertical ? 'vertical' : 'horizontal'} ${ShowPoints ? 'points' : ''}`}>
                {ShowPoints ? (
                    <>
                        <div className="vg-progress-bar-track" />
                        <div
                            className="vg-progress-bar-fill-line"
                            style={{ width: `${progressPercent}%` }}
                        />
                        <div className="vg-progress-points">
                            {Array.from({ length: MaxValue }, (_, index) => (
                                <div
                                    key={index}
                                    className={`vg-progress-point ${index < CurrentValue ? 'filled' : ''}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div
                        className="vg-progress-bar-fill"
                        style={{ width: `${progressPercent}%` }}
                    />
                )}
            </div>

            {/* Single Body on Bottom */}
            {ShowPoints && BodyPosition === 'bottom' && renderArrayBody()}
            {BodyPosition === 'bottom' && renderHeaderBody()}
        </div>
    );
};

export default VgProgressBar;
