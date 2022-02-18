import "./modal.scss";
import {AnimatePresence, motion} from "framer-motion";
import {useModalValue} from "../../context/ModalProvider";
import {useRef} from "react";

const Modal = () => {
  const modalRef = useRef(null);
  const {dispatch, state: {isModalVisible}} = useModalValue();
  const handleModalClose = () => dispatch({type: "CLOSE_MODAL"});

  return (
    <AnimatePresence exitBeforeEnter>
      {isModalVisible && (
        <>
          {/*Overlay*/}
          <motion.div key="modalOverlay" className={`modal__overlay ${!isModalVisible && 'modal__invisible'}`}>

            {/*Content*/}
            <motion.div key="modal" ref={modalRef} className={`modal__wrp ${!isModalVisible && 'modal__invisible'}`}>

              <motion.button className="modal__closebtn" onClick={handleModalClose}>
                {/*<VscChromeClose />*/}
              </motion.button>

            </motion.div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;