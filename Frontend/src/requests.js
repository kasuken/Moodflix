const GITHUB_ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Moodflix"
export const ENDPOINT_BASE_URL = "https://moodflix.azurewebsites.net";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const FALLBACK_POSTER_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_Poster_Placeholder.png`;
export const FALLBACK_BACKDROP_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_Backdrop_Placeholder.png`;
export const LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_logo.png`;
export const LANG = "en-US";
const { REACT_APP_TMDB_API_KEY } = process.env;

const requests = {
    fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_TMDB_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
    analyzeSentiment: `${ENDPOINT_BASE_URL}/MapAnalyseSentimentFromPhoto`,
    retrieveBySentiment: `${ENDPOINT_BASE_URL}/RetrieveMoviesBySentiment`,
};

export default requests;