// import { useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import styles from "./CameraViewPage.module.css";

// const CameraViewPage = ({ onCapture, onExit }) => {
//   const webcamRef = useRef(null);

//   const stopCamera = () => {
//     const video = webcamRef.current?.video;
//     const tracks = video?.srcObject?.getTracks();
//     tracks?.forEach((track) => track.stop());
//   };

//   const handleCapture = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     stopCamera();
//     if (imageSrc) onCapture(imageSrc);
//   };

//   useEffect(() => stopCamera, []);

//   return (
//     <div className={styles.wrapCamera}>
//       <div className={styles.webcam}>
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           screenshotFormat="image/png"
//           videoConstraints={{ facingMode: "environment" }}
//           width={window.innerWidth}
//           height={window.innerHeight * 0.5}
//           playsInline//////////////////////////////////
//         />
//       </div>
//       <div className={styles.wrapBtn}>
//         <button className={styles.btn} onClick={handleCapture}>Scan pH strip</button>
//         <button className={styles.btn} onClick={() => { stopCamera(); onExit(); }}>Home</button>
//       </div>
//     </div>
//   );
// };

// export default CameraViewPage;


// import { useRef, useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import styles from "./CameraViewPage.module.css";

// const CameraViewPage = ({ onCapture, onExit }) => {
//     const webcamRef = useRef(null);
//     const [isReady, setIsReady] = useState(false);

//     const stopCamera = () => {
//         const video = webcamRef.current?.video;
//         const tracks = video?.srcObject?.getTracks();
//         tracks?.forEach((track) => track.stop());
//     };

//     const handleCapture = () => {
//         const imageSrc = webcamRef.current?.getScreenshot();
//         stopCamera();
//         if (imageSrc) onCapture(imageSrc);
//     };

//     useEffect(() => stopCamera, []);

//     return (
//         <div className={styles.cameraContainer}>
//             <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 screenshotFormat="image/png"
//                 videoConstraints={{ facingMode: "environment" }}
//                 className={styles.webcamVideo}
//                 playsInline
//             />

//             {/* Затемнение поверх камеры */}
//             <div className={styles.overlay}>
//                 <div className={styles.viewfinder}>
//                     <div className={styles["bottom-left"]}></div>
//                     <div className={styles["bottom-right"]}></div>
//                 </div>
//             </div>

//             {/* Кнопки под окном */}
//             <div className={styles.wrapBtn}>
//                 <button className={styles.btn} onClick={handleCapture}>Scan pH strip</button>
//                 <button className={styles.btn} onClick={() => { stopCamera(); onExit(); }}>Home</button>
//             </div>
//         </div>
//     );
// };

// export default CameraViewPage;

import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import styles from "./CameraViewPage.module.css";

const CameraViewPage = ({ onCapture, onExit }) => {
    const webcamRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    const stopCamera = () => {
        const video = webcamRef.current?.video;
        const tracks = video?.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        stopCamera();
        if (imageSrc) onCapture(imageSrc);
    };

    // Плавное появление камеры
    const handleUserMedia = () => {
        // небольшая задержка, чтобы поток стабилизировался
        setTimeout(() => setIsReady(true), 150);
    };

    useEffect(() => stopCamera, []);

    return (
        <div className={styles.cameraContainer}>
            {!isReady && <div className={styles.darkBackground}></div>}
            {/* Видео */}
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={{ facingMode: "environment" }}
                className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                onUserMedia={handleUserMedia}
            />

            {/* Overlay */}
            <div className={styles.overlay}>
                <div className={styles.viewfinder}>
                    <div className={styles["bottom-left"]}></div>
                    <div className={styles["bottom-right"]}></div>
                </div>
            </div>

            {/* Кнопки */}
            <div className={styles.wrapBtn}>
                <button className={styles.btn} onClick={handleCapture}>
                    Scan pH strip
                </button>
                <button
                    className={styles.btn}
                    onClick={() => {
                        stopCamera();
                        onExit();
                    }}
                >
                    Home
                </button>
            </div>
        </div>
    );
};

export default CameraViewPage;