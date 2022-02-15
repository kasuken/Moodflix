import "./movie.scss"
import { BASE_IMG_URL } from "../../utils";
import Fallback from "../Fallback/Fallback";

const Movie = ({ item }) => {
  const { title, original_name, original_title, name, vote_average, poster_path } = item;
  let fallbackTitle = title || original_title || name || original_name;

  // STILL NEED TO WORK ON THIS
  // Also need to decide if we want to use the backdrop_path or the poster_path
  return (
    <div className='movie'>
      {poster_path ? (
        <img src={`${BASE_IMG_URL}/${poster_path}`} alt={fallbackTitle} />
      ) : (
        <Fallback title={fallbackTitle} />
      )}
      <div className="movie__info">
        <div className="movie__info--title">{fallbackTitle}</div>
        <div className="movie__info--vote">{vote_average}</div>
      </div>
    </div>
  )
}

export default Movie;