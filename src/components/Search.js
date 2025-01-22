import React, { useState, useEffect } from "react";
import axios from "../axios";
import Carousel from "./Carousel";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Search = ({ searchQuery, onReset }) => {
    const [searchResults, setSearchResults] = useState([]);

    const fetchSearchResults = async () => {
        if (!searchQuery) return;

        try {
            const [moviesResponse, tvResponse] = await Promise.all([
                axios.get(`search/movie?api_key=${API_KEY}&query=${searchQuery}`),
                axios.get(`search/tv?api_key=${API_KEY}&query=${searchQuery}`),
            ]);

            const movies = moviesResponse.data.results.map(movie => ({ ...movie, media_type: 'movie' }));
            const tvShows = tvResponse.data.results.map(tv => ({ ...tv, media_type: 'tv' }));
            console.log(movies, tvShows);

            setSearchResults([...movies, ...tvShows]);
            console.log(searchResults);

        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    useEffect(() => {
        fetchSearchResults();
    }, [searchQuery]);

    return (
        <div className="p-8 bg-gray-900">
            {searchResults.length > 0 ? (
                <Carousel title="Search Results" items={searchResults} />
            ) : (
                <div className="text-center text-white">
                    {searchQuery ? "No results found." : "Start typing to search..."}
                </div>
            )}
            <button onClick={onReset} className="mt-4 text-yellow-500 underline">
                Clear Search
            </button>
        </div>
    );
};

export default Search;
