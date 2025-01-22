import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import request from '../request'
import axios from '../axios';
import { useAuth } from "../AuthProvider"

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Home = () => {
  const auth = useAuth();

  const [watchList, setWatchList] = useState([]);
  const [detailedWatchList, setDetailedWatchList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [trendingResponse, comedyResponse, userResponse] = await Promise.all([
        axios.get(request.fetchTrending),
        axios.get(request.fetchComedyMovies),
        axios.get("http://localhost:5000/api/user/get", { params: { email: auth.user } }),
      ]);
      setTrendingMovies(trendingResponse.data.results);
      setComedyMovies(comedyResponse.data.results);

      const List = userResponse.data.arr;
      console.log(List);
      setWatchList(List);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailedWatchList = async () => {
    if (watchList.length === 0) return;

    try {
      setLoading(true);
      const detailsRequests = watchList.map(item =>
      axios.get(`${item.type}/${item.id}?api_key=${API_KEY}`)
      );
      const detailsResponses = await Promise.all(detailsRequests);

      const details = detailsResponses.map((response, index) => ({
        ...response.data,
        media_type: watchList[index].type,
      }));
      setDetailedWatchList(details);
    } catch (error) {
      console.error("Failed to fetch watchlist details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [auth.user]);

  useEffect(() => {
    fetchDetailedWatchList();
  }, [watchList]);

  if (loading) {
    return (
      <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="loader">Loading...</div>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    {detailedWatchList.length > 0 && <Carousel title="Watch List" items={detailedWatchList} />}
    <Carousel title="Trending Movies & Shows" items={trendingMovies} />
    <Carousel title="Comedy Movies" items={comedyMovies} type="movie" />
    </>
  );
};

export default Home;
