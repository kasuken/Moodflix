import "./movies.scss";
import {useEffect, useState} from "react";
import Movie from "../../components/Movie/Movie";
import {useLocation} from "react-router-dom";
import axios from "axios";
import requests from "../../requests";
import {motion} from "framer-motion";
import {contentEasing} from "../../motionUtils";

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
  const { state: emotion } = useLocation();

  useEffect(() => {
    axios.get(requests.retrieveBySentiment, {
      params: { emotion: emotion }
    })
      .then(res => {
        console.log("emotion => ", emotion);
        console.log("res.data => ", res.data);
        setMovies(res.data)
      })
      .catch(err => console.log(err));
  }, [emotion]);

  return (
    <motion.section className="movies page" exit={{ opacity: 0 }}>
      <motion.div
        className="movies__container"
        initial="initial"
        animate="animate"
        variants={content}
      >
        <motion.h1 variants={title} className="movies__title">Your mood, Our suggestions</motion.h1>
        <motion.p variants={title} className="movies__subtitle">We analyzed your photo and we tried to detect your emotions. <br/>Since <span>your emotion score is 87</span>, these are the movies that might fit your current mood:</motion.p>

        <motion.div variants={moviesVariants} className="movies__wrp">
            {movies && movies.map((movie, idx) => <Movie key={idx} {...movie} /> )}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Movies;