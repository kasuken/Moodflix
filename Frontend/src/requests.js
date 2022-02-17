const GITHUB_ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Moodflix"
export const ENDPOINT_BASE_URL = "https://moodflix-api.azurewebsites.net";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const FALLBACK_POSTER_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_Poster_Placeholder.png`;
export const FALLBACK_BACKDROP_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_Backdrop_Placeholder.png`;
export const LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_logo.png`;
export const WHITE_LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Moodflix_logo_white.png`;
export const LANG = "en-US";

const requests = {
    analyzeSentiment: `${ENDPOINT_BASE_URL}/MapAnalyseSentimentFromPhoto`,
    retrieveBySentiment: `${ENDPOINT_BASE_URL}/RetrieveMoviesBySentiment`,
    retrieveById: `${ENDPOINT_BASE_URL}/RetrieveMoviesById/`
};

export default requests;