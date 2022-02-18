import "./movie.scss"
import Fallback from "../Fallback/Fallback";
import { BASE_IMG_URL } from "../../requests";
import {useModalValue} from "../../context/ModalProvider";
import {actionTypes} from "../../context/types";

const Movie = (props) => {
  const { id, title, original_name, original_title, name, voteAverage, posterPath } = props;
  let fallbackTitle = title || original_title || name || original_name;
  const { dispatch } = useModalValue();

  const handleClick = () => handleModalOpening(id);
  const handleModalOpening = (id) => {
    dispatch({
      type: actionTypes.OPEN_MODAL,
      payload: { id }
    });
  };

  return (
    <div className='movie' onClick={handleClick}>
      {posterPath ? (
        <img src={`${BASE_IMG_URL}/${posterPath}`} alt={fallbackTitle} />
      ) : (
        <Fallback title={fallbackTitle} type="backdrop" />
      )}
      <div className="movie__info">
        <div className="movie__info--title">{fallbackTitle}</div>
        <div className="movie__info--vote">{voteAverage}</div>
      </div>
    </div>
  )
}

export default Movie;