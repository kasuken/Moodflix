import "./welcome.scss";
import RevealTransition from "../../components/RevealTransition/RevealTransition";
import {motion} from "framer-motion";

const content = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 1.2 },
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

const Welcome = () => {
  return (
    <motion.section className="welcome page" exit={{ opacity: 0 }}>
      <RevealTransition />

      <motion.div
        initial="initial"
        animate="animate"
        variants={content}
      >
        <motion.h1 variants={title}>Welcome to Moodflix</motion.h1>

      </motion.div>
    </motion.section>
  )
}

export default Welcome;