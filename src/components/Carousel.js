import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from './CarouselCard';

const basePosterUrl = "https://image.tmdb.org/t/p/original/";

function Carousel({ title, items, type }) {
    const carouselRef = useRef(null);
    const [showLeftChevron, setShowLeftChevron] = useState(false);
    const [showRightChevron, setShowRightChevron] = useState(false);
    console.log(items);

    const scrollCarousel = (direction) => {
        const { current } = carouselRef;
        if (current) {
            const scrollAmount = direction === "right" ? current.offsetWidth : -current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        const { current } = carouselRef;
        if (current) {
            setShowLeftChevron(current.scrollLeft > 0);
            setShowRightChevron(current.scrollLeft + current.offsetWidth < current.scrollWidth);
        }
    };

    useEffect(() => {
        handleScroll(); // Check scroll visibility on mount
    }, [items]);


    return (
        <div className="relative my-4 overflow-hidden">
            <style>
                {`
                    .scrollbar-hidden::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hidden {
                        scrollbar-width: none; /* Firefox */
                    }
                `}
            </style>

            {title && <h2 className="text-2xl font-bold text-white ml-10 mb-4">{title}</h2>}

            <div className="flex items-center relative group" onMouseEnter={handleScroll}>
                {showLeftChevron && (
                    <FaChevronLeft
                        className="absolute left-2 top-1/2 w-12 h-12 transform -translate-y-1/2 bg-black bg-opacity-70 text-white rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity duration-300 z-10"
                        onClick={() => scrollCarousel("left")}
                    />
                )}
                <div ref={carouselRef} onScroll={handleScroll} className="flex overflow-x-scroll scrollbar-hidden py-2">
                    {items.map((item) => (
                        (item.poster_path || item.backdrop_path) && (
                            <Card
                                key={item.id}
                                image_src={`${basePosterUrl}${item.poster_path || item.backdrop_path}`}
                                image_alt={item.title || item.name}
                                id={item.id}
                                Title={item.title || item.name}
                                type={item.media_type || type}
                            />
                        )
                    ))}
                </div>
                {showRightChevron && (
                    <FaChevronRight
                        className="absolute right-2 top-1/2 w-12 h-12 transform -translate-y-1/2 bg-black bg-opacity-70 text-white rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-opacity-90 transition-opacity duration-300 z-10"
                        onClick={() => scrollCarousel("right")}
                    />
                )}
            </div>
        </div>
    );
}

export default Carousel;
