export const LANG = "en-US";
const { REACT_APP_TMDB_API_KEY } = process.env;

const requests = {
    fetchSearchQuery: `/search/multi?api_key=${REACT_APP_TMDB_API_KEY}&language=${LANG}&query=`,
    fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`
};

export default requests;