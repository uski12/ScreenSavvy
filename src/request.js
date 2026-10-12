const requests = {
    fetchTrending: `/trending/all/week?language=en-US`,
    fetchTopRated: `/movie/top_rated?language=en-US`,
    fetchRomanceMovies: `/discover/movie?with_genres=10749`,
    fetchThrillerMovies: `/discover/movie?with_genres=53`,
    fetchComedyMovies: `/discover/movie?with_genres=35`,
    fetchActionMovies: `/discover/movie?with_genres=28`,
    fetchHorrorMovies: `/discover/movie?with_genres=27`,
    fetchDocumentaries: `/discover/movie?with_genres=99`,
    fetchAdventureMovies: `/discover/movie?with_genres=12`,
    fetchFantasyMovies: `/discover/movie?with_genres=14`,
    fetchMysteryMovies: `/discover/movie?with_genres=9648`,
    fetchDramaMovies: `/discover/movie?with_genres=18`,
    fetchCrimeMovies: `/discover/movie?with_genres=80`,
}
export default requests;
