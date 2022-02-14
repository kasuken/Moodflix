import "./movies.scss";
import {useEffect, useState} from "react";
import instance from "../../instance";
import requests from "../../requests";
import {motion} from "framer-motion";

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
      ease: [0.6, -0.05, 0.01, 0.99],
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
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const Movies = () => {
  const [ movies, setMovies ] = useState()
  useEffect(() => {
    instance.get(requests.fetchTrendingAll)
      .then(res => setMovies(res.data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <motion.section className="movies page" exit={{ opacity: 0 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={content}
      >
        <motion.h1 variants={title} className="movies__title">
          Hello Moodflixer
        </motion.h1>

        <motion.div variants={moviesVariants} className="movies__wrp">
          {movies && movies.map(movie => (
            <motion.p key={movie.id} className="movies__item">
              {movie.title || movie.name}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Movies;