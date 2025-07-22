import React from "react";
import './VgReviewRating.scss';
export interface VgReviewRatingProps {
    SetRating?: number;
    RatingSize?: string;
    OnClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, val: number) => void;
    ReadOnly?: boolean;
}
declare const VgReviewRating: React.FC<VgReviewRatingProps>;
export default VgReviewRating;
