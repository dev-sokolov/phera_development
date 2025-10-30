// import { useRef, useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import styles from "./CameraViewPage.module.css";
// import clickSoundFile from "../../assets/sounds/camera-click.mp3"; 

// const CameraViewPage = ({ onCapture, onExit }) => {
//   const webcamRef = useRef(null);
//   const [isReady, setIsReady] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const stopCamera = () => {
//     const video = webcamRef.current?.video;
//     const tracks = video?.srcObject?.getTracks();
//     tracks?.forEach((track) => track.stop());
//   };

//   const playClickSound = () => {
//     const audio = new Audio(clickSoundFile);
//     audio.play().catch(() => {}); // безопасно, если звук заблокирован
//   };

//   const handleCapture = () => {
//     playClickSound();
//     setIsProcessing(true);

//     // небольшая задержка, чтобы показать "анализ"
//     setTimeout(() => {
//       const imageSrc = webcamRef.current?.getScreenshot();
//       stopCamera();

//       if (imageSrc) onCapture(imageSrc);
//     }, 1500); // задержка в 1.5 сек для UX
//   };

//   const handleUserMedia = () => {
//     setTimeout(() => setIsReady(true), 150);
//   };

//   useEffect(() => stopCamera, []);

//   return (
//     <div className={styles.cameraContainer}>
//       {!isReady && <div className={styles.darkBackground}></div>}

//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/png"
//         videoConstraints={{ facingMode: "environment" }}
//         className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
//         onUserMedia={handleUserMedia}
//         playsInline
//       />

//       <div className={styles.overlay}>
//         <div className={styles.viewfinder}>
//           <div className={styles["bottom-left"]}></div>
//           <div className={styles["bottom-right"]}></div>
//         </div>
//       </div>

//       {/* Спиннер при анализе */}
//       {isProcessing && (
//         <div className={styles.spinnerOverlay}>
//           <div className={styles.spinner}></div>
//           <p>Analyzing pH strip...</p>
//         </div>
//       )}

//       <div className={styles.wrapBtn}>
//         {!isProcessing && (
//           <>
//             <button className={styles.btn} onClick={handleCapture}>
//               Scan pH strip
//             </button>
//             <button
//               className={styles.btn}
//               onClick={() => {
//                 stopCamera();
//                 onExit();
//               }}
//             >
//               Home
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraViewPage;

// --------------------------------------------------------------------------


import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import styles from "./CameraViewPage.module.css";
import clickSoundFile from "../../assets/sounds/camera-click.mp3";

const CameraViewPage = ({ onCapture, onExit }) => {
  const webcamRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  const stopCamera = () => {
    const video = webcamRef.current?.video;
    const tracks = video?.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
  };

  const playClickSound = () => {
    const audio = new Audio(clickSoundFile);
    audio.play().catch(() => {});
  };

  const handleCapture = () => {
    playClickSound();
    setIsProcessing(true);

    setTimeout(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      stopCamera();
      if (imageSrc) onCapture(imageSrc);
    }, 1500);
  };

  const handleUserMedia = () => {
    setTimeout(() => setIsReady(true), 150);
  };

  // ---- 🔍 "Псевдоанализ" изображения ----
  useEffect(() => {
    if (!webcamRef.current) return;

    const interval = setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Пример — берём центральный пиксель
        const centerX = img.width / 2;
        const centerY = img.height / 2;
        const pixel = ctx.getImageData(centerX, centerY, 1, 1).data;

        // Простая логика — если пиксель не белый и не чёрный
        const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;
        if (brightness > 50 && brightness < 220) {
          setIsDetected(true);
        } else {
          setIsDetected(false);
        }
      };
    }, 500); // проверка каждые полсекунды

    return () => clearInterval(interval);
  }, [webcamRef]);

  // -------------------------------------

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
        <div
          className={`${styles.viewfinder} ${
            isDetected ? styles.detected : ""
          }`}
        >
          <div className={styles["bottom-left"]}></div>
          <div className={styles["bottom-right"]}></div>
        </div>
      </div>

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