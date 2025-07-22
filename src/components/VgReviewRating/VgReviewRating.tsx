    import React, { useEffect, useState } from "react";
    import './VgReviewRating.scss'

    export interface VgReviewRatingProps {
    SetRating?: number;
    RatingSize?: string;
    OnClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, val: number) => void;
    ReadOnly?: boolean;
    }

    const VgReviewRating: React.FC<VgReviewRatingProps> = ({
    SetRating,
    RatingSize = 'Large',
    OnClick = () => {},
    ReadOnly = false,
    }) => {

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        if (SetRating !== undefined) {
          setRating(SetRating); // Set initial rating from SetRating
        }        
      }, [SetRating]);

    const handleRatingChange = (selectedRating: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setRating(selectedRating);
        if(OnClick){
            OnClick(e, selectedRating)
        }
    };

    const getStarClass = (star: number) => {
      // If the rating has a decimal (e.g. 1.5, 2.5), we need to apply the half-star logic
      if (hoverRating > 0) {
        return star <= hoverRating ? "vg-text-yellow" : "vg-text-gray";
      }
      else if (rating >= star) {
        return "vg-text-yellow"; // Full star
      }
       else {
          return "vg-text-gray"; // Empty star
      }
  };

 
    return (
      <>
        <div className='vg-review-rating'>
          <div className={`vg-review-star ${ReadOnly ? 'vg-readonly' : ''}`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                onMouseEnter={!ReadOnly ? () => setHoverRating(star) : undefined}
                onMouseLeave={!ReadOnly ? () => setHoverRating(0) : undefined}
                onClick={!ReadOnly ? (e) => handleRatingChange(star, e) : undefined}
                aria-readonly={ReadOnly}
              >
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                  className={`w-8 h-8 ${getStarClass(star)} vg-star-svg ${RatingSize === 'Small' ? 'vg-small' : RatingSize === 'Medium' ? 'vg-medium' : RatingSize === 'Large' ? 'vg-large' : ''  } `}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </>
    );
    };

export default VgReviewRating;