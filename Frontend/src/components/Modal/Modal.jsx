import "./modal.scss";
import {useState, useEffect, useRef} from "react";
import SkeletonModal from "../SkeletonModal/SkeletonModal";
import { useModalValue } from "../../context/ModalProvider";
import useOutsideClick from "../../hooks/useOutsideClick";
import useDisableScroll from "../../hooks/useDisableScroll";
import { AnimatePresence, motion } from "framer-motion";
import { VscChromeClose } from "react-icons/vsc";
import axios from "axios";
import {
  modalFadeInUpVariants, modalScaleAndFadeInVariants,
  modalOverlayVariants,
  modalScaleUpVariants,
  modalVariants,
  staggerOne
} from "../../motionUtils";
import {actionTypes} from "../../context/types";
import requests, {BASE_IMG_URL, FALLBACK_BACKDROP_IMG_URL} from "../../requests";
import {dateToYearOnly, truncate} from "../../utils";
import imagePositive from "../../assets/images/emotions/reviews/emoji_review_positive.png";
import imageNeutral from "../../assets/images/emotions/reviews/emoji_review_neutral.png";
import imageNegative from "../../assets/images/emotions/reviews/emoji_review_negative.png";

 // TODO: COMPLETE REFACTOR

const Modal = () => {
  const modalRef = useRef(null);
  const {dispatch, state: { isModalVisible, id }} = useModalValue();
  const [ results, setResults ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const handleModalClose = () => dispatch({type: actionTypes.CLOSE_MODAL});
  useDisableScroll(isModalVisible);

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

  // TODO: COMPLETE REFACTOR
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

              {error && <span>We're sorry but we can't load the data you have requested.</span>}
              {isLoading && <SkeletonModal />}

              {!isLoading && !error && results && (
                <>
                  <motion.img variants={modalScaleAndFadeInVariants} className="modal__image" src={results.movie.backdropPath ? `${BASE_IMG_URL}/${results.movie.backdropPath}` : FALLBACK_BACKDROP_IMG_URL} alt="" />

                  <motion.div className="modal__info--wrp" variants={staggerOne} initial="initial" animate="animate" exit="exit">
                    <motion.h3 className="modal__info--title" variants={modalFadeInUpVariants}>
                      {results.movie.title}&nbsp;
                      <span>({dateToYearOnly(results.movie.releaseDate)})</span>
                    </motion.h3>
                    <motion.p className="modal__info--description" variants={modalFadeInUpVariants}>{results.movie.overview}</motion.p>
                    <motion.h5 className="modal__section--title" variants={modalFadeInUpVariants}>Keywords</motion.h5>
                    <motion.div className="modal__section--wrp">
                      {results.movieKeywords[0].keywords.length === 0 ? (
                        <motion.p variants={modalFadeInUpVariants}>This movie has no related keywords yet.</motion.p>
                      ) : (
                        <>{results.movieKeywords[0].keywords.map((keyword, idx) => <motion.span variants={modalScaleUpVariants} key={idx} className="modal__keyword">{keyword.toLowerCase()}</motion.span> )}</>
                      )}
                    </motion.div>
                    <motion.h5 className="modal__section--title" variants={modalFadeInUpVariants}>Reviews</motion.h5>
                    <motion.div className="modal__section--wrp">
                      {results.reviews.length === 0 ? (
                        <motion.p variants={modalFadeInUpVariants}>This movie has no reviews yet.</motion.p>
                      ) : (
                        <>
                          {results.reviews.map((review, idx) => (
                            <motion.div key={idx} className="modal__review" variants={modalFadeInUpVariants}>
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
                              <p className="modal__review--content" dangerouslySetInnerHTML={{  __html: truncate(review.content, 450) }} />
                            </motion.div>
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