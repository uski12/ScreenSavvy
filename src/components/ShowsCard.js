import { Link } from "react-router-dom";
import { FaBookmark, FaStar, FaCheck } from "react-icons/fa";
import { useAuth } from "../AuthProvider";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = ({ image_src, image_alt, type, id, title, releaseDate, rating }) => {
    const auth = useAuth();
    const [watched, setWatched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/api/user/get", { params: { email: auth.user } });
            console.log(response);
            const isWatched = response.data.arr.some(item => item.id === id && item.type === type);
            setWatched(isWatched);
        };

        fetchData();
    }, [id, type, auth.user]);

    const handleWatchlistClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (watched) {
            const response = await axios.delete("http://localhost:5000/api/user/remove", {
                data: { email: auth.user, id: id, type: type }
            });
            console.log(auth.user, id);
            console.log(response);
        } else {
            const response = await axios.put("http://localhost:5000/api/user/add", { email: auth.user, id: id, type: type });
            console.log(auth.user, id);
            console.log(response);
        }

        setWatched(!watched);
    };

    return (
        <div className="flex flex-shrink-0 mx-2 my-4 cursor-pointer w-60 md:w-64 transform transition-transform duration-300 origin-bottom hover:scale-105">
        <Link to={`/${type}/${id}`} className="block relative overflow-hidden">
        <img
        className="h-80 md:h-96 rounded-md"
        src={image_src}
        alt={image_alt}
        />
        <div
        className="absolute top-2 right-2 size-8 bg-black/60 p-2 rounded-full text-lg hover:text-yellow-400"
        title="Add to Watchlist"
        onClick={handleWatchlistClick}
        >
        {watched ? <FaCheck className="text-green-500" /> : <FaBookmark />}
        </div>
        <div className="mt-2 text-center flex flex-col">
        <p className="text-white text-lg font-bold truncate">{title}</p>
        <div className="flex self-center items-center space-x-2">
        <p className="text-gray-400 text-sm">{releaseDate} |</p>
        <FaStar className="text-yellow-500" />
        <span>{rating.toFixed(1)}</span>
        </div>
        </div>
        </Link>
        </div>
    );
};

export default Card;
