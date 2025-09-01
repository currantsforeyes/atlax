
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Icon } from './Icon';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  interactive = false,
  onRatingChange,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  // The rating to display, prioritizing hover state for visual feedback
  const displayRating = hoverRating || rating;

  return (
    <div
      className={`flex items-center ${interactive ? 'cursor-pointer' : ''}`}
      onMouseLeave={() => interactive && setHoverRating(0)}
    >
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const isHoveringPotentialRating = starValue <= hoverRating;

        return (
          <span
            key={index}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onClick={() => interactive && onRatingChange?.(starValue)}
          >
            <Icon
              svg={ICONS.star}
              className={`h-4 w-4 transition-all duration-150 ease-in-out ${
                starValue <= displayRating ? 'text-yellow-400' : 'text-gray-600'
              } ${
                isHoveringPotentialRating ? 'scale-125 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]' : ''
              }`}
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
