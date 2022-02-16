export const ENDPOINT_BASE_URL = "https://moodflix.azurewebsites.net";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const FALLBACK_IMG_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_readme.png";
export const LANG = "en-US";
const { REACT_APP_TMDB_API_KEY } = process.env;

const requests = {
    fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
    analyzeSentiment: `${ENDPOINT_BASE_URL}/MapAnalyseSentimentFromPhoto`,
    retrieveBySentiment: `${ENDPOINT_BASE_URL}/RetrieveMoviesBySentiment`,
};

export default requests;