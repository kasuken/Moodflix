import "./revealTransition.scss";
import {motion} from "framer-motion";

const blackBox = {
  initial: {
    height: "100vh",
    top: 0,
  },
  animate: {
    height: 0,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const RevealTransition = () => {
  return (
    <div className="reveal__wrp">
      <motion.div
        className="reveal__sheet"
        initial="initial"
        animate="animate"
        variants={blackBox}
      />
    </div>
  );
};

export default RevealTransition;