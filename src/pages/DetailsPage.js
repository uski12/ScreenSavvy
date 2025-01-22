import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from '../axios'
import ShowDetails from "../components/ShowDetails";
import ReviewDetails from "../components/ReviewDetails"
import Navbar from "../components/Navbar";


const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const DetailsPage = () => {
    const { type, id } = useParams({});
    const [showDetails, setShowDetails] = useState([]);
    const [reviews, setReviews] = useState({ total_reviews: 0, sorted_reviews: [] });
    const [trailer, setTrailer] = useState();
    const [loading, setLoading] = useState(true); // Manage loading state


    useEffect(() => {
        if (!type || !id) {
            console.warn("Invalid type or ID, skipping fetch.");
            return;
        }
        const fetchShowData = async () => {
            setLoading(true); // Start loading
            try {
                const [detailsResponse, reviewsResponse, trailerResponse] = await Promise.all([
                    axios.get(`/${type}/${id}?api_key=${API_KEY}&language=en-US`),
                    axios.get(`/${type}/${id}/reviews?api_key=${API_KEY}&language=en-US`),
                    axios.get(`/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`)
                ]);

                const sortedReviews = {
                    total_reviews: reviewsResponse.data.total_results,
                    sorted_reviews: reviewsResponse.data.results.sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    ),
                };

                const videoResults = trailerResponse.data.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

                setShowDetails(detailsResponse.data);
                setReviews(sortedReviews);
                setTrailer(videoResults);
            } catch (error) {
                console.error("Failed to fetch details:", error.response || error.message);
            }
            finally {
                setLoading(false); // End loading
            }
        };

        fetchShowData();
    }, [id, type]);


    if (loading) {
        return (
            <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <p className="text-xl">Loading...</p>
            </div>
            </>
        );
    }

    if (!showDetails) {
        return (
            <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <p className="text-xl">Failed to load movie details.</p>
            </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center bg-green-900 text-white">
                <ShowDetails showDetails={showDetails} trailer={trailer} type={type}/>

                <div className="my-10 w-4/5 space-y-4">
                    <label className="text-3xl font-bold">Reviews ({reviews.total_reviews})</label>
                    {reviews.sorted_reviews.map((review, index) => (
                        <ReviewDetails key={index} review={review} />
                    ))}
                    {!reviews.sorted_reviews.length && <p>There are no reviews for {showDetails.title || showDetails.name}.</p>}
                </div>
            </div>

        </>
    );
};

export default DetailsPage
