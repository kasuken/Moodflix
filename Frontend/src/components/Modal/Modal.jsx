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
import imagePositive from "../../images/emotions/reviews/emoji_review_positive.png";
import imageNeutral from "../../images/emotions/reviews/emoji_review_neutral.png";
import imageNegative from "../../images/emotions/reviews/emoji_review_negative.png";

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
                              <div className="modal__review--img-wrp">
                                {review.sentiment === "Negative" ? (
                                  <>
                                    <img src={imageNegative} className="modal__review--img" alt="Negative review"/>
                                    <p>Didn't liked</p>
                                  </>
                                ) : review.sentiment === "Positive" ? (
                                  <>
                                    <img src={imagePositive} className="modal__review--img" alt="Positive review"/>
                                    <p>Wow!</p>
                                  </>
                                ) : (
                                  <>
                                    <img src={imageNeutral} className="modal__review--img" alt="Neutral review"/>
                                    <p>Not bad!</p>
                                  </>
                                )}
                              </div>
                              <p className="modal__review--content">{truncate(review.content, 450)}</p>
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