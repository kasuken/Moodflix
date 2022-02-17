import "./movies.scss";
import {useEffect, useState} from "react";
import Movie from "../../components/Movie/Movie";
import {useLocation} from "react-router-dom";
import axios from "axios";
import requests from "../../requests";
import {motion} from "framer-motion";
import {contentEasing} from "../../motionUtils";
import {evaluateEmotions} from "../../utils";
import img1 from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_happy.png";
import img2 from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_angry.png";
import img3 from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_sad.png";

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
      ease: contentEasing,
    },
  },
};

const Movies = () => {
  const [ movies, setMovies ] = useState();
  const { state: faceDetected } = useLocation();
  const prevalentEmotion = evaluateEmotions(faceDetected.emotion);

  let emoji;
  if (prevalentEmotion === "happiness") {
    emoji = img1;
  } else if (prevalentEmotion === "sadness") {
    emoji = img2;
  } else if (prevalentEmotion === "neutral") {
    emoji = img3;
  }

  useEffect(() => {
    axios.get(requests.retrieveBySentiment, {
      params: { emotion: prevalentEmotion }
    })
      .then(res => setMovies(res.data.movies))
      .catch(err => console.log(err));
  }, [prevalentEmotion]);

  return (
    <motion.section className="movies page" exit={{ opacity: 0 }}>
      <motion.div
        className="movies__container"
        initial="initial"
        animate="animate"
        variants={content}
      >
        <motion.h1 variants={title} className="movies__title">Your mood, Our suggestions</motion.h1>
        <motion.img src={emoji} className="movies__memoji" variants={title} />
        <motion.p variants={title} className="movies__subtitle">We analyzed your photo and we tried to detect your emotions. <br/>Since <span>your emotion score is 87</span>, these are the movies that might fit your current mood:</motion.p>

        <motion.div variants={moviesVariants} className="movies__wrp">
          {movies && movies.map(movie => <Movie key={movie.id} {...movie} /> )}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Movies;