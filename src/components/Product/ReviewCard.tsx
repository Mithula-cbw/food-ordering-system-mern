import React from "react";
import { Review } from "../../types";
import RenderStars from "../Commons/RenderStars";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const userInitial = review.customerName.split("")[0].toUpperCase();

  return (
    <div className="bg-white rounded-2xl drop-shadow-lg border-4 border-gray-200 p-6 mb-6 w-[70%]">
      <div className="flex flex-row justify-start items-center gap-2">
        <RenderStars rating={review.customerRating} />
        <span className="text-gray-600/80">({review.customerRating})</span>
      </div>

      <p className="text-gray-800 text-base leading-relaxed mb-6 font-normal pl-4 pt-2 max-w-[80%]">
        {review.review}
      </p>

      {(review._id || review.customerName) && (
        <div className="bg-gradient-to-r from-app-main to-orange-500 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-row justify-start items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={""} alt={review._id} />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <span className="text-white font-semibold text-lg">
                {review.customerName || "Anonymous"}
              </span>
            </div>

            {/* Helpful buttons */}
            <div className="flex flex-col items-end justify-center gap-2 pr-4">
              <span className="text-sm font-light text-white">Was this Helpful?</span>
              <div className="flex items-center gap-4 text-white/90 text-sm font-semibold">
                <button
                  aria-label="Thumbs up"
                  className="hover:text-white transition-colors"
                >
                  <FaThumbsUp className="h-3 w-3" />
                </button>
                <button
                  aria-label="Thumbs down"
                  className="hover:text-white transition-colors"
                >
                  <FaThumbsDown className="h-3 w-3"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
