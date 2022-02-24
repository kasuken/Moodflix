import "./emotionSidebar.scss";
import { useRef } from "react";
import { useSidebarValue } from "../../context/SidebarProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import useDisableScroll from "../../hooks/useDisableScroll";
import { modalFadeInUpVariants, modalOverlayVariants, sidebarVariants, staggerOne } from "../../motionUtils";
import { returnPercentage } from "../../utils";
import { actionTypes } from "../../context/types";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";

const EmotionSidebar = () => {
  const sidebarRef = useRef(null);
  const {dispatch, state: { isSidebarVisible, memojiSrc, faceDetected }} = useSidebarValue();
  const handleSidebarClose = () => dispatch({type: actionTypes.CLOSE_SIDEBAR});
  useDisableScroll(isSidebarVisible);

  useOutsideClick(sidebarRef, () => {
    if (isSidebarVisible) handleSidebarClose();
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {isSidebarVisible && (
        <>
          <motion.div
            key="modalOverlay"
            className={`emotionSidebar__overlay ${!isSidebarVisible && 'emotionSidebar__invisible'}`}
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.nav
              key="sidebar"
              ref={sidebarRef}
              className={`emotionSidebar__wrp ${!isSidebarVisible && 'emotionSidebar__invisible'}`}
              variants={sidebarVariants}
            >
              <motion.button className="emotionSidebar__closebtn" onClick={handleSidebarClose}><VscChromeClose /></motion.button>

              <motion.div className="emotionSidebar__info--wrp" variants={staggerOne} initial="initial" animate="animate" exit="exit">
                <motion.h2 className="emotionSidebar__info--title" variants={modalFadeInUpVariants}>Heeey! You curious?</motion.h2>
                <motion.img src={memojiSrc} className="emotionSidebar__info--memoji" variants={modalFadeInUpVariants} />
                <motion.p className="emotionSidebar__info--description" variants={modalFadeInUpVariants}>The memoji above is not random: it's the result of the analysis made on the picture you took. We detected the following data:</motion.p>
                
                <motion.div className="emotionSidebar__info-detection--wrp" variants={staggerOne} initial="initial" animate="animate" exit="exit">
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Gender</span>
                    <span className="emotionSidebar__info-detection--value">{faceDetected?.gender === 0 ? "Male" : "Female"}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Age</span>
                    <span className="emotionSidebar__info-detection--value">{faceDetected?.age}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Glasses</span>
                    <span className="emotionSidebar__info-detection--value">{faceDetected?.glasses === 1 ? "Yes" : "No"}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Happiness</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.happiness)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Neutral</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.neutral)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Sadness</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.sadness)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Anger</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.anger)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Fear</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.fear)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Disgust</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.disgust)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Surprise</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.surprise)}%`}</span>
                  </motion.div>
                  <motion.div className="emotionSidebar__info-detection--item" variants={modalFadeInUpVariants}>
                    <span className="emotionSidebar__info-detection--label">Contempt</span>
                    <span className="emotionSidebar__info-detection--value">{`${returnPercentage(faceDetected?.emotion.contempt)}%`}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EmotionSidebar;