import "./movies.scss";
import {useEffect, useState} from "react";
import Movie from "../../components/Movie/Movie";
import useImage from "../../hooks/useImage";
import {NavLink} from "react-router-dom";
import requests from "../../requests";
import {evaluateEmotions, returnRange} from "../../utils";
import {contentEasing} from "../../motionUtils";
import { memojiConfig } from "../../memojiConfig";
import {useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import axios from "axios";

const content = {
  animate: {
    transition: { staggerChildren: 0.25, delayChildren: .75 },
  },
};
const title = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: contentEasing,
    },
  },
};
const moviesVariants = {
  initial: { y: -20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: contentEasing
    },
  },
};

const Movies = () => {
  const [ movies, setMovies ] = useState();
  const { state: faceDetected } = useLocation();
  const { gender, age, glasses } = faceDetected
  const { emotionType, emotionValue} = evaluateEmotions(faceDetected.emotion);

  let memojiSrc;
  if (gender && age && glasses) {
    let genderPortion = gender === 0 ? memojiConfig["male"] : memojiConfig["female"];
    let agePortion = genderPortion[returnRange(age)];
    let memojiObj = glasses === 0 ? agePortion["noglasses"] : agePortion["glasses"];
    memojiSrc = memojiObj[emotionType];
  }

  const { imageSrc, fallbackSrc } = useImage(memojiSrc);

  useEffect(() => {
    axios.get(requests.retrieveBySentiment, {
      params: { emotion: emotionType }
    }).then(res => setMovies(res.data.movies))
      .catch(err => console.log(err));
  }, [emotionType]);

  return (
    <motion.section className="movies page" exit={{ opacity: 0 }}>
      <motion.div
        className="movies__container"
        initial="initial"
        animate="animate"
        variants={content}
      >
        {gender && age && glasses ? (
          <>
            <motion.h1 variants={title} className="movies__title">Your mood, Our suggestions</motion.h1>
            <motion.img src={imageSrc} className="movies__memoji" variants={title} />
            <motion.p variants={title} className="movies__subtitle">We analyzed your photo and we tried to detect your emotions. <br/>Since the highest emotion we calculated is <span>{emotionType}</span> with a value of {`${(emotionValue*100).toFixed(1)}%`}, these are the movies that might fit your current mood:</motion.p>

            <motion.div variants={moviesVariants} className="movies__wrp">
              {movies && movies.map(movie => <Movie key={movie.id} {...movie} /> )}
            </motion.div>
          </>
        ) : (
          <>
            <motion.img src={fallbackSrc} className="movies__memoji" variants={title} />
            <motion.h1 variants={title} className="movies__title">Oops! Please, try again.</motion.h1>
            <motion.p variants={title} className="movies__subtitle error">We're sorry for the incovenience but we cannot determine all the necessary parameters with the picture you have submitted.</motion.p>
            <motion.button variants={title} className="button">
              <NavLink to="/">Try again</NavLink>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.section>
  )
}

export default Movies;