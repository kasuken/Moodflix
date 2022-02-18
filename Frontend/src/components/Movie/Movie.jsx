import "./movie.scss"
import Fallback from "../Fallback/Fallback";
import requests, { BASE_IMG_URL } from "../../requests";
import axios from "axios";
import {useModalValue} from "../../context/ModalProvider";
import {actionTypes} from "../../context/types";

const Movie = (props) => {
  const { id, title, original_name, original_title, name, voteAverage, posterPath } = props;
  let fallbackTitle = title || original_title || name || original_name;
  const { dispatch } = useModalValue();

  const handleClick = () => {
    let movieDetails;
    axios.get(requests.retrieveById, { params: { id }})
      .then(res => {
        movieDetails = res.data;
        console.log(movieDetails)
      })
      .catch(err => console.log(err));

    handleModalOpening(movieDetails);
  }

  const handleModalOpening = (movieDetails) => {
    dispatch({
      type: actionTypes.OPEN_MODAL,
      payload: { fallbackTitle, movieDetails }
    })
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