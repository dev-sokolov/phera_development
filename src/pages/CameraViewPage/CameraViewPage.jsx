import { useRef, useState, useEffect } from "react";
// import Lottie from "lottie-react";
import Webcam from "react-webcam";
import { addImage } from "../../shared/api/images-api.js";
import styles from "./CameraViewPage.module.css";
// import notificationSound from "../../assets/sounds/notification.mp3";
// import processing_6 from "../../assets/lottie/processing_6.json";
import alertCircle from "../../assets/icons/alertCircle.svg";

const CameraViewPage = ({ onCapture, onExit }) => {
    const webcamRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [hasFourMarkers, setHasFourMarkers] = useState(false);
    const [buttonText, setButtonText] = useState("Simulate auto-capture");

    const stopCamera = () => {
        const video = webcamRef.current?.video;
        const tracks = video?.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
    };

    // const playClickSound = () => {
    //     const audio = new Audio(notificationSound);
    //     audio.play().catch(() => { });
    // };

    const handleCapture = async () => {
        if (!webcamRef.current || !hasFourMarkers || isProcessing) return;

        setIsProcessing(true);
        setButtonText("Capturing...");
        // playClickSound();

        try {
            // await new Promise(resolve => setTimeout(resolve, 1700));
            const screenshot = webcamRef.current.getScreenshot({
                width: 1920,
                height: 1080,
            });

            if (!screenshot) throw new Error("Failed to capture image");

            // конвертируем screenshot (dataURL) → blob
            const blob = await fetch(screenshot).then(r => r.blob());

            const formData = new FormData();
            formData.append("image", blob, "capture.png");

            // 📤 отправляем на backend
            const result = await addImage(formData);

            // ✓ в result будет то, что вернул backend
            stopCamera();
            onCapture(result);

        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUserMedia = () => setTimeout(() => setIsReady(true), 200);

    useEffect(() => {
        if (!isReady) return;

        const video = webcamRef.current?.video;
        if (!video) return;

        const checkReady = setInterval(() => {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                clearInterval(checkReady);
                startDetection(video);
            }
        }, 300);

        return () => clearInterval(checkReady);
    }, [isReady]);

    function startDetection(video) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const src = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
        const gray = new cv.Mat();
        const thresh = new cv.Mat();
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();

        const interval = setInterval(() => {
            if (!video || video.videoWidth === 0) return;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            src.data.set(imgData.data);

            try {
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
                cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
                cv.adaptiveThreshold(
                    gray,
                    thresh,
                    255,
                    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                    cv.THRESH_BINARY_INV,
                    15,
                    4
                );

                cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                const squares = [];
                for (let i = 0; i < contours.size(); i++) {
                    const cnt = contours.get(i);
                    const approx = new cv.Mat();
                    cv.approxPolyDP(cnt, approx, 0.02 * cv.arcLength(cnt, true), true);

                    if (approx.rows === 4 && cv.contourArea(approx) > 1000) {
                        const rect = cv.boundingRect(approx);
                        const aspect = rect.width / rect.height;
                        if (aspect > 0.6 && aspect < 1.4) squares.push(rect);
                    }

                    approx.delete();
                }

                setHasFourMarkers(squares.length >= 4);
            } catch (e) {
                console.warn("OpenCV detection error:", e);
            }
        }, 700);

        return () => {
            clearInterval(interval);
            src.delete();
            gray.delete();
            thresh.delete();
            contours.delete();
            hierarchy.delete();
        };
    }

    useEffect(() => {
        return () => stopCamera();
    }, []);

    useEffect(() => {
        if (hasFourMarkers && navigator.vibrate) navigator.vibrate(100);
    }, [hasFourMarkers]);

    return (
        <div className={styles.cameraContainer}>
            <div className={`${styles.overlayBackground} ${hasFourMarkers ? styles.focused : ""}`}></div>

            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={{ facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } }}
                className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                onUserMedia={handleUserMedia}
                playsInline
            />

            {/* Верхние кнопки */}
            <div className={styles.topControls}>
                <button
                    className={styles.exitBtn}
                    onClick={() => {
                        stopCamera();
                        onExit();
                    }}
                    aria-label="Exit to home"
                >
                    X
                </button>
            </div>

            {/* Рамка фокуса */}
            <div className={`${styles.viewfinder} ${hasFourMarkers ? styles.detected : ""}`}>
                <div className={styles["bottom-left"]}></div>
                <div className={styles["bottom-right"]}></div>
            </div>

            <div className={styles.hintMessage}>
                <div className={styles.hintMessageImg}><img src={alertCircle} alt="AlertCircle" /></div>
                <div>
                    <p className={styles.hintMessageTitle}>Align the test card in the frame</p>
                    {/* <p className={styles.hintMessageText}>Avoid colored light, fill the frame, hold steady. We will capture automatically.</p> */}
                </div>

            </div>

            {/* Кнопка сканирования */}
            <div className={styles.wrapBtn}>
                <button
                    className={`${styles.scanBtn} ${hasFourMarkers ? styles.detected : ""}`}
                    onClick={handleCapture}
                    disabled={!hasFourMarkers || isProcessing}
                    style={{
                        opacity: hasFourMarkers ? 1 : 0.5,
                        cursor: (!hasFourMarkers || isProcessing) ? 'not-allowed' : 'pointer'
                    }}
                >{buttonText}</button>
            </div>
        </div>
    );
};

export default CameraViewPage;
