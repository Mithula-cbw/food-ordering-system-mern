import React from "react";
import { Review } from "../../types";
import ReviewCard from "./ReviewCard";

interface ReviewsTabProps {
  reviews: Review[];
  loading: boolean;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ reviews, loading }) => {
  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
        <p className="text-center text-gray-500">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
        <p className="text-gray-500 mb-6">
          Be the first to share your thoughts about this product!
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
          Write a Review
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Customer Reviews ({reviews.length})
      </h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
