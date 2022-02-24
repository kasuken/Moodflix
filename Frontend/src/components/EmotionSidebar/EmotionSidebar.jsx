import "./emotionSidebar.scss";
import { useRef } from "react";
import { useSidebarValue } from "../../context/SidebarProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import useDisableScroll from "../../hooks/useDisableScroll";
import { modalFadeInUpVariants, modalOverlayVariants, sidebarVariants, staggerOne } from "../../motionUtils";
import { actionTypes } from "../../context/types";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";

const EmotionSidebar = () => {
  const sidebarRef = useRef(null);
  const {dispatch, state: { isSidebarVisible, memojiSrc }} = useSidebarValue();
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
            <motion.div
              key="sidebar"
              ref={sidebarRef}
              className={`emotionSidebar__wrp ${!isSidebarVisible && 'emotionSidebar__invisible'}`}
              variants={sidebarVariants}
            >
              <motion.button className="emotionSidebar__closebtn" onClick={handleSidebarClose}>
                <VscChromeClose />
              </motion.button>

              <motion.div className="emotionSidebar__info--wrp" variants={staggerOne} initial="initial" animate="animate" exit="exit">
                <motion.h2 className="emotionSidebar__info--title" variants={modalFadeInUpVariants}>Heeey! You curious?</motion.h2>
                <motion.img src={memojiSrc} className="emotionSidebar__info--memoji" variants={modalFadeInUpVariants} />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EmotionSidebar;