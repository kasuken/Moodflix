import "./modal.scss";
import {useState, useEffect, useRef} from "react";
import { useModalValue } from "../../context/ModalProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import axios from "axios";
import { modalOverlayVariants, modalVariants } from "../../motionUtils";
import requests, {BASE_IMG_URL, FALLBACK_BACKDROP_IMG_URL} from "../../requests";
import {dateToYearOnly, truncate} from "../../utils";

 // TODO: COMPLETE REFACTOR

const Modal = () => {
  const modalRef = useRef(null);
  const {dispatch, state: { isModalVisible, id }} = useModalValue();
  const [ results, setResults ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const handleModalClose = () => dispatch({type: "CLOSE_MODAL"});

  useOutsideClick(modalRef, () => {
    if (isModalVisible) handleModalClose();
  });

  useEffect(() => {
    setIsLoading(true);
    setResults(null);

    if (isModalVisible) {
      axios.get(requests.retrieveById, {params: id })
        .then(res => {
          setResults(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setError(true);
          setIsLoading(false);
        });
    }
  }, [isModalVisible, id]);

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

              {error && <span>ERROR!!!</span>}
              {/*{isLoading && !error && !results && <span>Loading...</span>}*/}

              {!isLoading && !error && results && (
                <>
                  <img className="modal__image" src={results.movie.backdropPath ? `${BASE_IMG_URL}/${results.movie.backdropPath}` : FALLBACK_BACKDROP_IMG_URL} alt="" />
                  <motion.div className="modal__info--wrp">
                    <motion.h3 className="modal__info--title">
                      {results.movie.title}&nbsp;
                      <span>({dateToYearOnly(results.movie.releaseDate)})</span>
                    </motion.h3>
                    <motion.p className="modal__info--description">{results.movie.overview}</motion.p>
                    <motion.h5 className="modal__section--title">Keywords</motion.h5>
                    <motion.div className="modal__section--wrp">
                      {results.movieKeywords[0].keywords.length === 0 ? (
                        <p>This movie has no related keywords yet.</p>
                      ) : (
                        <>{results.movieKeywords[0].keywords.map((keyword, idx) => <span key={idx} className="modal__keyword">{keyword.toLowerCase()}</span> )}</>
                      )}
                    </motion.div>
                    <motion.h5 className="modal__section--title">Reviews</motion.h5>
                    <motion.div className="modal__section--wrp">
                      {results.reviews.length === 0 ? (
                        <p>This movie has no reviews yet.</p>
                      ) : (
                        <>
                          {results.reviews.map((review, idx) => (
                            <div key={idx} className="modal__review">
                              <span className="modal__review--title">{review.sentiment}</span>
                              <p className="modal__content">{truncate(review.content, 350)}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;