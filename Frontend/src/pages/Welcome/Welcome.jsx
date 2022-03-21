import "./welcome.scss";
import RevealTransition from "../../components/RevealTransition/RevealTransition";
import SelfieCamera from "../../components/SelfieCamera/SelfieCamera";
import Footer from "../../components/Footer/Footer";
import { motion } from "framer-motion";
import { welcomePageContentVariants, welcomePageTextVariants } from "../../motionUtils";

const Welcome = () => {
  return (
    <motion.div initial="initial" animate="animate" variants={welcomePageContentVariants}>
      <motion.section className="welcome page" exit={{ opacity: 0 }}>
          <RevealTransition />
          <motion.h1 variants={welcomePageTextVariants}>Welcome to Moodflix</motion.h1>
          <motion.p variants={welcomePageTextVariants}>Don't know which or series film to watch? <br/>Activate your camera and let us suggest you something based on your actual mood.</motion.p>
          <SelfieCamera />
      </motion.section>
      <Footer />
    </motion.div>
  )
}

export default Welcome;