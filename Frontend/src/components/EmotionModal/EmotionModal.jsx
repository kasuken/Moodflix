import "./emotionModal.scss";
import { useRef } from "react";
import { useModalValue } from "../../context/ModalProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import useDisableScroll from "../../hooks/useDisableScroll";
import { modalFadeInUpVariants, modalOverlayVariants, modalVariants, moviesPageTextVariants, staggerOne } from "../../motionUtils";
import { actionTypes } from "../../context/types";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";

const EmotionModal = () => {
  const emotionModalRef = useRef(null);
  const {dispatch, state: { isEmotionModalVisible, memojiSrc }} = useModalValue();
  const handleModalClose = () => dispatch({type: actionTypes.CLOSE_EMOTION_MODAL});
  useDisableScroll(isEmotionModalVisible);

  useOutsideClick(emotionModalRef, () => {
    if (isEmotionModalVisible) handleModalClose();
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {isEmotionModalVisible && (
        <>
          <motion.div
            key="modalOverlay"
            className={`emotionModal__overlay ${!isEmotionModalVisible && 'emotionModal__invisible'}`}
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              key="modal"
              ref={emotionModalRef}
              className={`emotionModal__wrp ${!isEmotionModalVisible && 'emotionModal__invisible'}`}
              variants={modalVariants}
            >
              <motion.button className="emotionModal__closebtn" onClick={handleModalClose}>
                <VscChromeClose />
              </motion.button>

              <motion.div className="modal__info--wrp" variants={staggerOne} initial="initial" animate="animate" exit="exit">
                <motion.h2 className="emotionModal__info--title" variants={modalFadeInUpVariants}>
                  Heeey! You curious?
                </motion.h2>
                {memojiSrc && (
                  <motion.img src={memojiSrc} variants={moviesPageTextVariants} />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EmotionModal;