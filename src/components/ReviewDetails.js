import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewDetails = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-black text-white p-4 rounded-md shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{review.author}</h3>
        <p className="text-sm text-gray-400">{review.created_at.split("T")[0]}</p>
      </div>
      <div className="flex items-center space-x-1 mb-2">
        <FaStar className="text-md"/> 
        <p>{review.author_details.rating}</p>
        </div>
      <p className="text-gray-300">
        {expanded ? review.content : `${review.content.slice(0, 100)}...`}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-400 hover:underline mt-2"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default ReviewDetails;
