import "./selfieCamera.scss";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";
import requests from "../../requests";
import {camVariants} from "../../motionUtils";

const SelfieCamera = () => {
  const webcamRef = useRef(null);
  const [ photoTaken, setPhotoTaken ] = useState(false);
  const navigate = useNavigate();
  const videoConstraints = { width: 500, height: 500, facingMode: "user" };

  const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhotoTaken(true);

      const upload = imageSrc => {
        const imageFormatted = imageSrc.split(',')[1];
        axios.post(requests.analyzeSentiment, { base64photo: imageFormatted }
        ).then(res => {
          const faceAttributes = res.data.faceAttributes;
          navigate('/movies', {state: faceAttributes});
        }).catch(err => console.log(err));
      }
      upload(imageSrc);
    }, [webcamRef, navigate]
  );

  return (
    <motion.div className="selfieCamera" variants={camVariants}>
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
          mirrored={true}
          className="cam"
        />
      </div>
      <button className="button" onClick={capture}>Suggest me</button>
    </motion.div>
  );
}

export default SelfieCamera;