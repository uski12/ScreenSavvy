import YouTube from "react-youtube";
import { useState, useEffect } from "react";
import { FaPlay, FaPlus, FaStar, FaCheck } from 'react-icons/fa'
import axios from "axios";
import { useAuth } from "../AuthProvider";
import { NavLink } from "react-router-dom";

const basePosterUrl = "https://image.tmdb.org/t/p/original/";



const ShowDetails = ({ showDetails, trailer, type }) => {


    const user = useAuth();
    const [watched, setWatched] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/api/user/get", {params: {email: user.user}});
            console.log(response);
            const ye = response.data.arr.some(item =>
            item.id === showDetails.id && item.type === type
            );
            setWatched(ye);
        };

        fetchData();
    }, []);

    const [trailerUrl, setTrailerUrl] = useState("");

    const handlePlayTrailer = () => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else if (trailer) {
            setTrailerUrl(trailer.key);
        }
    };
    const poster = showDetails.poster_path ? `${basePosterUrl}${showDetails.poster_path}` : null;
    const banner = showDetails.backdrop_path ? `${basePosterUrl}${showDetails.backdrop_path}` : poster;
    const genres = showDetails.genres || [];
    const releaseYear = showDetails.release_date ? showDetails.release_date.split("-")[0] : "";
    const firstAirYear = showDetails.first_air_date ? showDetails.first_air_date.split("-")[0] : "";

    return (
        <div
            className="relative flex items-center p-4 bg-cover bg-top bg-no-repeat text-white shadow-md shadow-black"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative flex w-full m-10">
                <div className="w-1/4 flex justify-center items-center">
                    <img
                        src={poster || banner}
                        alt={showDetails.title || showDetails.name}
                        className="rounded-md shadow-lg object-cover"
                    />
                </div>
                <div className="w-3/4 p-6 space-y-4">
                    <h6 className="text-gray-400 text-sm"><NavLink to={type==="tv"? "/tv":"/movies"}>{type==="tv"? "TV":"Movie"}</NavLink> > {showDetails.title || showDetails.name}</h6>

                    <h1 className="text-4xl font-bold">{showDetails.title || showDetails.name}</h1>
                    <p className="text-gray-300 text-sm">
                    {releaseYear || firstAirYear || "Unknown"} | {genres.map((g) => g.name).join(", ")}
                    {showDetails.runtime && ` | ${Math.floor(showDetails.runtime / 60)}h ${showDetails.runtime % 60}m`}
                    </p>

                    <div className="flex items-center space-x-2">
                        <FaStar className="text-lg"/>
                        <p className="text-lg font-bold">{showDetails.vote_average}</p>
                        <p className="text-sm text-gray-400">({showDetails.vote_count} ratings)</p>
                    </div>
                    {showDetails.number_of_seasons && showDetails.number_of_episodes && (
                        <p className="text-gray-300 text-sm">
                        {showDetails.number_of_seasons} season{showDetails.number_of_seasons > 1 ? "s" : ""}, {showDetails.number_of_episodes} episode{showDetails.number_of_episodes > 1 ? "s" : ""}
                        </p>
                    )}
                    <p className="text-gray-300">{showDetails.overview}</p>
                    <div className="flex space-x-4">
                        <button onClick={handlePlayTrailer} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white">
                            <FaPlay className="mr-2" /> Trailer
                        </button>
                        <button className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white" onClick={ async () => {
                            if(watched) {
                                const response = await axios.delete("http://localhost:5000/api/user/remove", {data: { email: user.user, id: showDetails.id, type: type}});
                                console.log(user.user, showDetails.id);
                                console.log(response);
                            } else {
                                const response = await axios.put("http://localhost:5000/api/user/add", { email: user.user, id: showDetails.id, type: type });
                                console.log(user.user, showDetails.id);
                                console.log(response);
                            }

                            setWatched(!watched);
                        } }>
                        {watched? <FaCheck className="text-green-500 mr-2" />
                            : <FaPlus className="mr-2" /> } Watchlist
                        </button>



                    </div>
                </div>
                {trailerUrl && (
                    <div className="absolute inset-0 flex items-start justify-end">
                        <YouTube
                            videoId={trailerUrl}
                            opts={{ height: '700', width: '1050', playerVars: { autoplay: 1 } }}
                        />
                        <button onClick={() => setTrailerUrl("")} className="text-white text-2xl">
                        ✕
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowDetails;
