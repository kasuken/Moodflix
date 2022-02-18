import "./modal.scss";
import { useRef } from "react";
import { useModalValue } from "../../context/ModalProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import {modalFadeInUpVariants, modalOverlayVariants, modalVariants, staggerOne} from "../../motionUtils";
import {FALLBACK_BACKDROP_IMG_URL} from "../../requests";

const Modal = () => {
  const modalRef = useRef(null);
  const {dispatch, state: { isModalVisible, modalData }} = useModalValue();
  const { fallbackTitle } = modalData;
  const handleModalClose = () => dispatch({type: "CLOSE_MODAL"});

  useOutsideClick(modalRef, () => {
    if (isModalVisible) handleModalClose();
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalVisible && (
        <>
          <motion.div
            key="modalOverlay"
            className={`modal__overlay ${!isModalVisible && 'modal__invisible'}`}
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              key="modal"
              ref={modalRef}
              className={`modal__wrp ${!isModalVisible && 'modal__invisible'}`}
              variants={modalVariants}
            >
              <motion.button className="modal__closebtn" onClick={handleModalClose}>
                <VscChromeClose />
              </motion.button>

              <div className="modal__image--wrp">
                <div className="modal__image--shadow" />
                <img className="modal__image--img" src={FALLBACK_BACKDROP_IMG_URL} alt={fallbackTitle} />
              </div>

              <motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit" className="modal__info--wrp">
                <motion.h3 variants={modalFadeInUpVariants} className="modal__info--title">{fallbackTitle}</motion.h3>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;