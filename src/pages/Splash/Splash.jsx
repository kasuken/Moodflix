import "./splash.scss";
import {motion} from "framer-motion";

const content = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 1.15 },
  },
};

const Splash = () => {
  return (
    <motion.section className="splash page" exit={{ opacity: 0 }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={content}
      >

      </motion.div>
    </motion.section>
  );
}

export default Splash;