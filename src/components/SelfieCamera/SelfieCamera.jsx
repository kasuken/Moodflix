import "./selfieCamera.scss";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {contentEasing} from "../../motionUtils";
import {evaluateEmotions} from "../../utils";
import requests from "../../requests";

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: "user"
};

const SelfieCamera = () => {
  const webcamRef = useRef(null);
  const [ image, setImage ] = useState('');
  const [ photoTaken, setPhotoTaken ] = useState(false);
  const navigate = useNavigate();

  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setPhotoTaken(true);
    },
    [webcamRef]
  );

  const upload = () => {
    const imageFormatted = image.split(',')[1];
    axios.post(requests.analyzeSentiment, {
      base64photo: imageFormatted
    }).then(res => {
      const prevalentEmotion = evaluateEmotions(res.data.faceAttributes.emotion);
      navigate('/movies', { state: prevalentEmotion });
    })
      .catch(err => console.log(err));
  }

  const cam = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: contentEasing,
      },
    },
  };

  return (
    <motion.div className="selfieCamera" variants={cam}>
      <div className={`cam__wrp ${photoTaken ? "recorded" : ""}`}>
        <Webcam
          ref={webcamRef}
          width="100%"
          height="100%"
          minScreenshotHeight={videoConstraints.height}
          minScreenshotWidth={videoConstraints.width}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          screenshotQuality={1}
          audio={false}
          className="cam"
        />
      </div>

      <div className="btn__wrp">
        <button className="button" onClick={capture}>Capture photo</button>
        <button className="button" onClick={upload}>Upload photo</button>
      </div>
    </motion.div>
  );
}

export default SelfieCamera;