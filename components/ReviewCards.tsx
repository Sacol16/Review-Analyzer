"use client";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface ReviewCardsProps {
  reviews: string[];
  onDelete?: (index: number) => void;
}

const ReviewCards: React.FC<ReviewCardsProps> = ({ reviews, onDelete }) => {
  return (
    <div className="w-full max-w-6xl px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="relative p-6 bg-white rounded-lg shadow-md text-black break-words"
          >
            <button
              onClick={() => onDelete?.(index)}
              className="absolute top-1 right-1 text-red-500 hover:text-red-700 text-lg"
              aria-label="Eliminar"
            >
              <FaTrash />
            </button>
            {review}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCards;
