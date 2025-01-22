import React, { useState, useEffect } from "react";
import Card from "../components/ShowsCard";
import Filter from "../components/Filter";
import SortButtons from "../components/SortButtons";
import Navbar from "../components/Navbar";
import axios from "../axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const basePosterUrl = "https://image.tmdb.org/t/p/original/";

const fetchGenres = async (type) => {
    const response = await axios.get(`genre/${type}/list?api_key=${API_KEY}`);
    return response.data.genres;
};

const fetchLanguages = async () => {
    const response = await axios.get(`configuration/languages?api_key=${API_KEY}`);
    return response.data;
};

const ShowsPage = ({ type }) => {
    
    const [allShows, setAllShows] = useState([]);
    const [cachedShows, setCachedShows] = useState({});
    const [filteredShows, setFilteredShows] = useState([]);
    const [pageShows, setPageShows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [selectedLanguage, setSelectedLanguage] = useState("All");
    const [sortBy, setSortBy] = useState("Release Date");
    const [loading, setLoading] = useState(true); 
    
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchAllShows = async () => {
            setLoading(true);
            const today = new Date().toISOString().split("T")[0];
            const releaseDate = type === "movie" ? "release_date" : "first_air_date";
    
            // If data is already cached for this type, use it
            if (cachedShows[type]) {
                const { shows, genres, languages } = cachedShows[type];
                setAllShows(shows);
                setGenres(genres || []);
                setLanguages(languages || []);
                setFilteredShows(shows);
                setLoading(false);
                return;
            }
    
            try {
                // Fetch genres, languages, and shows concurrently
                const [genresResponse, languagesResponse, showsResponse] = await Promise.all([
                    axios.get(`genre/${type}/list?api_key=${API_KEY}`),
                    axios.get(`configuration/languages?api_key=${API_KEY}`),
                    (async () => {
                        const shows = [];
                        let page = 1;
                        const totalPages = 20;
    
                        while (page <= totalPages) {
                            const response = await axios.get(
                                `discover/${type}?api_key=${API_KEY}&page=${page}&${releaseDate}.lte=${today}&sort_by=${releaseDate}.desc`
                            );
                            shows.push(...response.data.results);
                            page++;
                        }
                        return shows;
                    })(),
                ]);

                // Process genres
                const genresData = genresResponse.data.genres;
                const combinedGenres = [{ id: "All", name: "All" }, ...genresData];
                setGenres(combinedGenres);
    
                // Deduplicate and process shows
                const showsData = showsResponse.filter(
                    show => show.poster_path && show.backdrop_path // Ensure both poster and banner are present
                );
    
                const uniqueShows = Array.from(
                    new Map(showsData.map(show => [show.id, show])).values()
                );
    
                // Extract unique language codes from shows
                const uniqueLanguages = [...new Set(uniqueShows.map(show => show.original_language))];
    
                // Filter and process languages
                const languagesData = languagesResponse.data.map(language => ({
                    id: language.iso_639_1,
                    name: language.english_name,
                }));
                const filteredLanguages = languagesData.filter(language =>
                    uniqueLanguages.includes(language.id)
                );
                const combinedLanguages = [{ id: "All", name: "All" }, ...filteredLanguages];
                setLanguages(combinedLanguages);
    
                // Cache data
                const updatedCache = {
                    shows: uniqueShows,
                    genres: combinedGenres,
                    languages: combinedLanguages,
                };
                setCachedShows((prev) => ({ ...prev, [type]: updatedCache }));
    
                // Set state
                setAllShows(uniqueShows);
                setFilteredShows(uniqueShows);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
    
        setSelectedGenre("All");
        setSelectedLanguage("All");
        setSortBy("Release Date");
        
        fetchAllShows();
    }, [type]);
    

    useEffect(() => {
        const filterAndSortShows = () => {
            let filtered = allShows;

            // Genre filter
            filtered = filtered.filter(
                (show) => selectedGenre === "All" || show.genre_ids.includes(parseInt(selectedGenre))
            );
            
            // Language filter
            filtered = filtered.filter(
                (show) => selectedLanguage === "All" || show.original_language === selectedLanguage
            );

            // Sorting
            filtered = filtered.sort((a, b) => {
                if (sortBy === "Release Date") {
                    return new Date(b[type === "movie" ? "release_date" : "first_air_date"]) - 
                           new Date(a[type === "movie" ? "release_date" : "first_air_date"]);
                }
                if (sortBy === "Rating") return b.vote_average - a.vote_average;
                return b.popularity - a.popularity;  // Default: Popularity
            });
            setFilteredShows(filtered);
            setCurrentPage(1);
        };

        filterAndSortShows();
    }, [selectedGenre, selectedLanguage, sortBy, allShows, type]);

    // Paginate shows
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPageShows(filteredShows.slice(startIndex, endIndex));
    }, [currentPage, filteredShows]);

    const totalPages = Math.ceil(filteredShows.length / itemsPerPage);

    return (
        <>
        <Navbar/>
        <div className="main-page-layout bg-green-900 text-white p-5">
            <div className="filters-and-sorting flex justify-between items-center mb-5">
                <div className="flex space-x-4">
                    <Filter
                        list={genres}
                        selectedValue={selectedGenre}
                        onValueChange={setSelectedGenre}
                        label="Genre"
                        placeholder={"Search a genre..."}
                    />
                    <Filter
                        list={languages}
                        selectedValue={selectedLanguage}
                        onValueChange={setSelectedLanguage}
                        label="Language"
                        placeholder={"Search a language..."}
                    />
                </div>
                <SortButtons onSortChange={setSortBy} sortBy={sortBy}/>
            </div>

            {loading ? (
                <div className="loading-indicator text-center text-xl">
                    <p>Loading...</p>
                </div>
            ) : (
            <>
            <div className="Shows-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageShows.map((show, index) => (
                    <Card
                        key={`${show.id}-${index}`}
                        image_src={`${basePosterUrl}${show.poster_path || show.backdrop_path}`}
                        image_alt={show.title || show.name}
                        type={type}
                        id={show.id}
                        title={show.title || show.name}
                        releaseDate={show.release_date || show.first_air_date}
                        rating={show.vote_average}
                    />
                ))}
            </div>
            
            <div className="pagination flex justify-between items-center mt-5">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-white bg-gray-700 px-4 py-2 rounded"
                >
                    <FaChevronLeft />
                </button>
                <span>
                    Page {!totalPages? 0:currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-white bg-gray-700 px-4 py-2 rounded"
                >
                    <FaChevronRight />
                </button>
            </div>
            </>
            )}
        </div>
        </>
    );
};

export default ShowsPage;
