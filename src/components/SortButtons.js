import React, { useState } from "react";

const SortButtons = ({ onSortChange, sortBy }) => {

    const handleSortClick = (sortType) => {
        onSortChange(sortType);
    };

    const sorts = ["Release Date", "Rating","Popularity"];

    return (
        <div className="flex space-x-4 items-center">
            <label>Sort: </label>
            {sorts.map((sort) => (
                <button
                    key={sort}
                    onClick={() => handleSortClick(sort)}
                    className={`py-2 px-4 rounded-full text-white ${
                        sortBy === sort ? "bg-green-600" : "bg-gray-600"
                    }`}
                >
                    {sort}
                </button>
            ))}
        </div>
    );
};

export default SortButtons;
