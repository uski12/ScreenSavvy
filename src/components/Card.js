import { Link } from "react-router-dom";


const Card = ({ image_src, image_alt, id, movieTitle, type }) => {

    return (
        <div className="flex flex-shrink-0 mx-2 cursor-pointer w-40 md:w-50 transform transition-transform duration-300 origin-bottom hover:scale-105 first:ml-10 last:mr-10" >
            <Link to={`/${type}/${id}`} className="block truncate">
                <img
                    className="h-40 md:h-56 rounded-md shadow-lg shadow-black/40"
                    src={image_src}
                    alt={image_alt}
                />
                <p className="mt-2 text-white text-center text-sm">
                    {movieTitle}
                </p>
            </Link>

        </div>
    );
};

export default Card;
