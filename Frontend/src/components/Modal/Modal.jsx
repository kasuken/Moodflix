import "./modal.scss";
import { useRef } from "react";
import { useModalValue } from "../../context/ModalProvider";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import { defaultEasing } from "../../motionUtils";
import useOutsideClick from "../../hooks/useOutsideClick";

export const modalVariants = {
  hidden: { opacity: 0, top: "100%", transition: { duration: .6, ease: defaultEasing } },
  visible: { opacity: 1, top: "50%", transition: { duration: .8, ease: defaultEasing } }
}

export const modalOverlayVariants = {
  hidden: { opacity: 0, transition: { duration: .2, delay: .5 } },
  visible: { opacity: 1, transition: { duration: .2 } }
}

const Modal = () => {
  const modalRef = useRef(null);
  const {dispatch, state: {isModalVisible}} = useModalValue();
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
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;