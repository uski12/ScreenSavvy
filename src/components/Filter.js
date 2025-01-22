import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ list, selectedValue, onValueChange, label, placeholder }) => {
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredList = list.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleItemClick = (item) => {
        onValueChange(item.id); // assuming each item has an 'id' field for unique identification
        setIsOpen(false);
    };
    // console.log("List:", list);
    // console.log("Filtered List:", filteredList);


    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-black text-white py-2 px-4 rounded-full focus:outline-none flex items-center"
            >
                {label}: {list.find((i) => i.id === selectedValue)?.name || "All"}
                <FaChevronDown className="text-sm ml-4" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 bg-black text-white w-48 rounded shadow-lg z-50 overflow-hidden">
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-black text-gray-300 border-b border-gray-700 focus:outline-none"
                    />
                    <ul className="max-h-48 overflow-y-auto">
                        {filteredList.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Filter;
