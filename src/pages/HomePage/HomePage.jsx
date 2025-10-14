import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
// import CapturedImage from "../../components/CapturedImage/CapturedImage";
import Button from "../../components/Button/Button";

import styles from "./HomePage.module.css";

const HomePage = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    // const [capturedImage, setCapturedImage] = useState(null);

    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const handleStartCamera = () => {
        // setCapturedImage(null);
        setIsCameraOn(true);
    };

    const stopCamera = () => {
        const video = webcamRef.current?.video;
        const tracks = video?.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
    }

    const handleStopCamera = () => {
        stopCamera();
        setIsCameraOn(false);
    };

    const handleCapture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            // setCapturedImage(imageSrc);
            // handleStopCamera();
            stopCamera();

            // Переход на страницу результатов
            navigate("/result", { state: { capturedImage: imageSrc } });
        }
    };

    // const handleReset = () => {
    //     stopCamera();
    //     setCapturedImage(null);
    //     setIsCameraOn(false);
    // };

    return (
        <>
            {!isCameraOn && (     // Camera off        
                <div className={styles.wrapHomePage}>
                    <h2 className={styles.title}>Home page</h2>
                    <div className={styles.wrapBtn}>
                        <Button onClick={handleStartCamera}>Turn on the camera</Button>
                    </div>
                </div>
            )}

            {isCameraOn && (     // Camera on
                <div className={styles.wrapCamera}>
                    <div className={styles.webcam}>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/png"
                            imageSmoothing={false}
                            videoConstraints={{ facingMode: "environment" }}
                            width={window.innerWidth}
                            height={window.innerHeight * 0.5} // под 80vh
                            playsInline
                        />
                    </div>
                    <div className={styles.wrapBtn}>
                        <Button onClick={handleCapture}>Scan pH strip</Button>
                        <Button onClick={handleStopCamera}>Home</Button>
                    </div>
                </div>
            )}

            {/* {capturedImage && (
                <>
                    <div className={styles.wrapGreeting}>
                        <p className={styles.greeting}>Result page</p>
                    </div>
                    <CapturedImage
                        src={capturedImage}
                        handleStartCamera={handleStartCamera}
                        handleReset={handleReset}
                    />
                </>

            )} */}
        </>
    )
}

export default HomePage;