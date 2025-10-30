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

// ------------------------------

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

//     // Плавное появление камеры
//     const handleUserMedia = () => {
//         // небольшая задержка, чтобы поток стабилизировался
//         setTimeout(() => setIsReady(true), 150);
//     };

//     useEffect(() => stopCamera, []);

//     return (
//         <div className={styles.cameraContainer}>
//             {!isReady && <div className={styles.darkBackground}></div>}
//             {/* Видео */}
//             <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 screenshotFormat="image/png"
//                 videoConstraints={{ facingMode: "environment" }}
//                 className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
//                 onUserMedia={handleUserMedia}
//             />

//             {/* Overlay */}
//             <div className={styles.overlay}>
//                 <div className={styles.viewfinder}>
//                     <div className={styles["bottom-left"]}></div>
//                     <div className={styles["bottom-right"]}></div>
//                 </div>
//             </div>

//             {/* Кнопки */}
//             <div className={styles.wrapBtn}>
//                 <button className={styles.btn} onClick={handleCapture}>
//                     Scan pH strip
//                 </button>
//                 <button
//                     className={styles.btn}
//                     onClick={() => {
//                         stopCamera();
//                         onExit();
//                     }}
//                 >
//                     Home
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default CameraViewPage;

// ------------------------

import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import styles from "./CameraViewPage.module.css";
import clickSoundFile from "../../assets/sounds/camera-click.mp3"; // добавь звук

const CameraViewPage = ({ onCapture, onExit }) => {
  const webcamRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const stopCamera = () => {
    const video = webcamRef.current?.video;
    const tracks = video?.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
  };

  // щелчок камеры
  const playClickSound = () => {
    const audio = new Audio(clickSoundFile);
    audio.play().catch(() => {}); // безопасно, если звук заблокирован
  };

  const handleCapture = () => {
    playClickSound();
    setIsProcessing(true);

    // небольшая задержка, чтобы показать "анализ"
    setTimeout(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      stopCamera();

      if (imageSrc) onCapture(imageSrc);
    }, 1500); // задержка в 1.5 сек для UX
  };

  const handleUserMedia = () => {
    setTimeout(() => setIsReady(true), 150);
  };

  useEffect(() => stopCamera, []);

  return (
    <div className={styles.cameraContainer}>
      {!isReady && <div className={styles.darkBackground}></div>}

      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={{ facingMode: "environment" }}
        className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
        onUserMedia={handleUserMedia}
        playsInline
      />

      <div className={styles.overlay}>
        <div className={styles.viewfinder}>
          <div className={styles["bottom-left"]}></div>
          <div className={styles["bottom-right"]}></div>
        </div>
      </div>

      {/* Спиннер при анализе */}
      {isProcessing && (
        <div className={styles.spinnerOverlay}>
          <div className={styles.spinner}></div>
          <p>Analyzing pH strip...</p>
        </div>
      )}

      <div className={styles.wrapBtn}>
        {!isProcessing && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CameraViewPage;