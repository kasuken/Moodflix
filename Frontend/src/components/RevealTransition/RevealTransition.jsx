import "./revealTransition.scss";
import {motion} from "framer-motion";
import {blackRevealBoxVariants, textContainerVariants, textVariants} from "../../motionUtils";

const RevealTransition = () => {
  return (
    <div className="reveal__wrp">
      <motion.div
        className="reveal__sheet"
        initial="initial"
        animate="animate"
        variants={blackRevealBoxVariants}
      >
        <motion.svg className="reveal__svg--wrp" variants={textContainerVariants}>
          <pattern
            id="pattern"
            patternUnits="userSpaceOnUse"
            width="100%"
            height="100%"
            className="reveal__svg--pattern"
          >
            <rect className="reveal__svg--pattern rect" />
            <motion.rect variants={textVariants} className="reveal__svg--pattern motion-rect" />
          </pattern>
          <text
            className="reveal__svg--text"
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)" }}
          >
            Moodflix
          </text>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default RevealTransition;