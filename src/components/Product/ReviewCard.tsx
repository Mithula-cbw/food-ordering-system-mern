import React from "react";
import { Review } from "../../types";
import RenderStars from "../Commons/RenderStars";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 max-w-sm mx-auto">
      <RenderStars rating={review.customerRating} />

      <p className="text-gray-800 text-base leading-relaxed mb-6 font-normal">
        {review.review}
      </p>

      {(review._id || review.customerName) && (
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-lg">
              {review.customerName || "Anonymous"}
            </span>
            <span className="text-white text-sm">
              {new Date(review._id).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
