import "./selfieCamera.scss";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: "50%",
  height: "auto",
  facingMode: "user"
};

const SelfieCamera = () => {
  const webcamRef = useRef(null);
  const [ image, setImage ] = useState('');
  const capture = useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    },
    [webcamRef]
  );

  return (
    <div className="selfieCamera">
      <Webcam
        ref={webcamRef}
        width="50%"
        height="auto"
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        audio={false}
      />
      <button onClick={capture}>Capture photo</button>

      {image && <img src={image} alt="Selfie" />}
    </div>
  );
}

export default SelfieCamera;