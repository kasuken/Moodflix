import "./movies.scss";
import {useEffect, useState} from "react";
import Movie from "../../components/Movie/Movie";
import {useLocation} from "react-router-dom";
import axios from "axios";
import requests from "../../requests";
import {motion} from "framer-motion";
import {contentEasing} from "../../motionUtils";
import {evaluateEmotions} from "../../utils";
import happinessMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_happy.png";
import sadnessMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_sad.png";
import angerMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_angry.png";
import neutralMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_neutral.png";
import contemptMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_contempt.png";
import disgustMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_disgust.png";
import fearMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_fear.png";
import surpriseMemoji from "../../images/emotions/male/30/glasses/emoji_male_30_glasses_surprise.png";

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
  const { emotionType, emotionValue} = evaluateEmotions(faceDetected.emotion);

  let emoji;
  if (emotionType === "happiness") {
    emoji = happinessMemoji;
  } else if (emotionType === "sadness") {
    emoji = sadnessMemoji;
  } else if (emotionType === "neutral") {
    emoji = neutralMemoji;
  } else if (emotionType === "anger") {
    emoji = angerMemoji;
  } else if (emotionType === "contempt") {
    emoji = contemptMemoji;
  } else if (emotionType === "fear") {
    emoji = fearMemoji;
  } else if (emotionType === "disgust") {
    emoji = disgustMemoji;
  } else if (emotionType === "surprise") {
    emoji = surpriseMemoji;
  }

  useEffect(() => {
    axios.get(requests.retrieveBySentiment, {
      params: { emotion: emotionType }
    })
      .then(res => setMovies(res.data.movies))
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
        <motion.h1 variants={title} className="movies__title">Your mood, Our suggestions</motion.h1>
        <motion.img src={emoji} className="movies__memoji" variants={title} />
        <motion.p variants={title} className="movies__subtitle">We analyzed your photo and we tried to detect your emotions. <br/>Since the highest emotion we calculated is <span>{emotionType}</span> with a value of {`${emotionValue*100}%`}, these are the movies that might fit your current mood:</motion.p>

        <motion.div variants={moviesVariants} className="movies__wrp">
          {movies && movies.map(movie => <Movie key={movie.id} {...movie} /> )}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Movies;