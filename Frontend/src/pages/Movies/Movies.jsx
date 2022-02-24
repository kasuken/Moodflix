import "./movies.scss";
import {useEffect, useState} from "react";
import Movie from "../../components/Movie/Movie";
import useImage from "../../hooks/useImage";
import {NavLink, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import axios from "axios";
import requests from "../../requests";
import {evaluateEmotions, returnPercentage, returnRange} from "../../utils";
import {moviesPageContentVariants, moviesPageTextVariants, moviesStaggerVariants} from "../../motionUtils";
import { memojiConfig } from "../../memojiConfig";
import { useSidebarValue } from "../../context/SidebarProvider";
import { actionTypes } from '../../context/types';

const Movies = () => {
  const [ movies, setMovies ] = useState();
  const { state: faceDetected } = useLocation();
  const { emotionType, emotionValue } = evaluateEmotions(faceDetected?.emotion);
  const { dispatch } = useSidebarValue();

  let memojiSrc;
  if ((faceDetected?.age) &&
      (faceDetected?.gender === 0 || faceDetected?.gender === 1) &&
      (faceDetected?.glasses === 0 || faceDetected?.glasses === 1)
    ) {
    let genderPortion = faceDetected?.gender === 0 ? memojiConfig["male"] : memojiConfig["female"];
    let agePortion = genderPortion[returnRange(faceDetected?.age)];
    let memojiObj = faceDetected?.glasses === 0 ? agePortion["noglasses"] : agePortion["glasses"];
    memojiSrc = memojiObj[emotionType];
  }
  const { imageSrc, fallbackSrc } = useImage(memojiSrc);

  useEffect(() => {
    axios.get(requests.retrieveBySentiment, {
      params: { emotion: emotionType }
    }).then(res => setMovies(res.data.movies))
      .catch(err => console.log(err));
  }, [emotionType]);

  const handleSidebarOpening = () => {
    dispatch({ 
      type: actionTypes.OPEN_SIDEBAR,
      payload: {
        memojiSrc: imageSrc,
        faceDetected
      }
    })
  };

  return (
    <motion.section className="movies page" exit={{ opacity: 0 }}>
      <motion.div
        className="movies__container"
        initial="initial"
        animate="animate"
        variants={moviesPageContentVariants}
      >
        {(faceDetected?.age) &&
        (faceDetected?.gender === 0 || faceDetected?.gender === 1) &&
        (faceDetected?.glasses === 0 || faceDetected?.glasses === 1) ? (
          <>
            <motion.h1 variants={moviesPageTextVariants} className="movies_title_">Your mood, Our suggestions</motion.h1>
            <motion.img src={imageSrc} onClick={handleSidebarOpening} className="movies__memoji" variants={moviesPageTextVariants} />
            <motion.p variants={moviesPageTextVariants} className="movies__subtitle">We analyzed your photo and we tried to detect your emotions. <br/>Since the highest emotion we calculated is <span>{emotionType}</span> with a value of {`${returnPercentage(emotionValue)}%`}, these are the movies that might fit your current mood:</motion.p>

            <motion.div variants={moviesStaggerVariants} className="movies__wrp">
              {movies && movies.map(movie => <Movie key={movie.id} {...movie} /> )}
            </motion.div>
          </>
        ) : (
          <>
            <motion.img src={fallbackSrc} className="movies__memoji" variants={moviesPageTextVariants} />
            <motion.h1 variants={moviesPageTextVariants} className="movies__title">Oops! Please, try again.</motion.h1>
            <motion.p variants={moviesPageTextVariants} className="movies__subtitle error">We're sorry for the incovenience but we cannot determine all the necessary parameters with the picture you have submitted.</motion.p>
            <motion.button variants={moviesPageTextVariants} className="button">
              <NavLink to="/">Try again</NavLink>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.section>
  )
}

export default Movies;