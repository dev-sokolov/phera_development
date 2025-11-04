import { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import Webcam from "react-webcam";
import styles from "./CameraViewPage.module.css";
import notificationSound from "../../assets/sounds/notification.mp3";
import processing_6 from "../../assets/lottie/processing_6.json";

const CameraViewPage = ({ onCapture, onExit }) => {
    const webcamRef = useRef(null);
    const frameRef = useRef(null); // ref для cropFrame
    const [isReady, setIsReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const stopCamera = () => {
        const video = webcamRef.current?.video;
        const tracks = video?.srcObject?.getTracks();
        tracks?.forEach((track) => track.stop());
    };

    const playClickSound = () => {
        const audio = new Audio(notificationSound);
        audio.play().catch(() => { });
    };

    // const handleCapture = () => {
    //     setIsProcessing(true);

    //     setTimeout(() => playClickSound(), 1000);

    //     // ⏳ делаем задержку для анимации (2.3 секунды)
    //     setTimeout(() => {
    //         const video = webcamRef.current?.video;
    //         if (!video) {
    //             console.error("Video element not found");
    //             setIsProcessing(false);
    //             return;
    //         }

    //         // ✅ Захватываем кадр напрямую из видео в полном разрешении
    //         const canvasFull = document.createElement("canvas");
    //         canvasFull.width = video.videoWidth;
    //         canvasFull.height = video.videoHeight;

    //         const ctxFull = canvasFull.getContext("2d");
    //         ctxFull.drawImage(video, 0, 0, canvasFull.width, canvasFull.height);

    //         // Получаем полное изображение в base64
    //         const imageSrc = canvasFull.toDataURL("image/png");

    //         // Создаём Image, чтобы обрезать нужную часть
    //         const img = new Image();
    //         img.src = imageSrc;

    //         img.onload = () => {
    //             const frame = document.querySelector(`.${styles.cropFrame}`);
    //             if (!frame) {
    //                 console.error("Crop frame not found");
    //                 setIsProcessing(false);
    //                 return;
    //             }

    //             const videoRect = video.getBoundingClientRect();
    //             const frameRect = frame.getBoundingClientRect();

    //             // 📐 Рассчитываем относительные координаты рамки
    //             const relX = (frameRect.left - videoRect.left) / videoRect.width;
    //             const relY = (frameRect.top - videoRect.top) / videoRect.height;
    //             const relW = frameRect.width / videoRect.width;
    //             const relH = frameRect.height / videoRect.height;

    //             // 🔢 Переводим в реальные пиксели изображения
    //             const cropX = img.width * relX;
    //             const cropY = img.height * relY;
    //             const cropWidth = img.width * relW;
    //             const cropHeight = img.height * relH;

    //             // ✂️ Создаём временный canvas под область обрезки
    //             const canvasCrop = document.createElement("canvas");
    //             canvasCrop.width = cropWidth;
    //             canvasCrop.height = cropHeight;
    //             const ctxCrop = canvasCrop.getContext("2d");

    //             ctxCrop.drawImage(
    //                 img,
    //                 cropX, cropY, cropWidth, cropHeight,
    //                 0, 0, cropWidth, cropHeight
    //             );

    //             // 🎨 Получаем финальное обрезанное изображение
    //             const croppedImage = canvasCrop.toDataURL("image/png");

    //             // 🛑 Останавливаем камеру и передаём результат
    //             stopCamera();
    //             onCapture(croppedImage);
    //             setIsProcessing(false);
    //         };
    //     }, 2300);
    // };

    // const handleCapture = () => {
    //     setIsProcessing(true);

    //     setTimeout(() => playClickSound(), 1000);

    //     setTimeout(() => {
    //         const video = webcamRef.current?.video;
    //         if (!video) return;

    //         // 1️⃣ Захват кадра из видео
    //         const canvas = document.createElement("canvas");
    //         canvas.width = video.videoWidth;
    //         canvas.height = video.videoHeight;
    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //         const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //         // 2️⃣ Загружаем в OpenCV
    //         const src = cv.matFromImageData(imgData);
    //         const gray = new cv.Mat();
    //         const thresh = new cv.Mat();

    //         // 3️⃣ Конвертируем в grayscale и бинаризуем
    //         cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    //         // cv.threshold(gray, thresh, 80, 255, cv.THRESH_BINARY_INV + cv.THRESH_OTSU);////////

    //         cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    //         cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
    //         cv.adaptiveThreshold(
    //             gray,
    //             thresh,
    //             255,
    //             cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    //             cv.THRESH_BINARY_INV,
    //             11,
    //             2
    //         );

    //         // 4️⃣ Находим контуры
    //         const contours = new cv.MatVector();
    //         const hierarchy = new cv.Mat();
    //         cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    //         const squares = [];

    //         // 5️⃣ Фильтруем небольшие квадратные контуры
    //         for (let i = 0; i < contours.size(); i++) {
    //             const cnt = contours.get(i);
    //             const approx = new cv.Mat();
    //             cv.approxPolyDP(cnt, approx, 0.02 * cv.arcLength(cnt, true), true);

    //             // if (approx.rows === 4 && cv.contourArea(approx) > 1000) {

    //             for (let i = 0; i < contours.size(); i++) {
    //                 const cnt = contours.get(i);
    //                 cv.drawContours(src, contours, i, new cv.Scalar(255, 0, 0, 255), 2);
    //             }
    //             cv.imshow("debugCanvas", src);
    //             if (approx.rows === 4 && cv.contourArea(approx) > 200) {

    //                 const rect = cv.boundingRect(approx);
    //                 const aspect = rect.width / rect.height;
    //                 if (aspect > 0.8 && aspect < 1.2) {
    //                     squares.push(rect);
    //                 }
    //             }

    //             cnt.delete();
    //             approx.delete();
    //         }

    //         // 6️⃣ Проверяем, нашли ли 4 маркера
    //         if (squares.length === 4) {
    //             // Сортируем по положению: top-left, top-right, bottom-right, bottom-left
    //             squares.sort((a, b) => a.y - b.y || a.x - b.x);

    //             const topLeft = squares[0];
    //             const topRight = squares[1];
    //             const bottomLeft = squares[2];
    //             const bottomRight = squares[3];

    //             // Центры этих квадратов
    //             const srcPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
    //                 topLeft.x + topLeft.width / 2, topLeft.y + topLeft.height / 2,
    //                 topRight.x + topRight.width / 2, topRight.y + topRight.height / 2,
    //                 bottomRight.x + bottomRight.width / 2, bottomRight.y + bottomRight.height / 2,
    //                 bottomLeft.x + bottomLeft.width / 2, bottomLeft.y + bottomLeft.height / 2
    //             ]);

    //             // 7️⃣ Целевая "ровная" форма
    //             const width = 600;
    //             const height = 200;
    //             const dstPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
    //                 0, 0,
    //                 width, 0,
    //                 width, height,
    //                 0, height
    //             ]);

    //             // 8️⃣ Вычисляем матрицу преобразования и выравниваем
    //             const M = cv.getPerspectiveTransform(srcPts, dstPts);
    //             const warped = new cv.Mat();
    //             cv.warpPerspective(src, warped, M, new cv.Size(width, height));

    //             // 9️⃣ Преобразуем результат в base64
    //             const outputCanvas = document.createElement("canvas");
    //             outputCanvas.width = width;
    //             outputCanvas.height = height;
    //             cv.imshow(outputCanvas, warped);

    //             const croppedImage = outputCanvas.toDataURL("image/png");
    //             onCapture(croppedImage);

    //             // Очистка
    //             warped.delete();
    //             M.delete();
    //             srcPts.delete();
    //             dstPts.delete();
    //         } else {
    //             console.warn("Не удалось найти 4 маркера. Используется fallback.");
    //             const fallback = canvas.toDataURL("image/png");
    //             onCapture(fallback);
    //         }

    //         // Очистка памяти
    //         src.delete();
    //         gray.delete();
    //         thresh.delete();
    //         contours.delete();
    //         hierarchy.delete();

    //         stopCamera();
    //         setIsProcessing(false);
    //     }, 2300);
    // };

    const handleCapture = () => {
        setIsProcessing(true);

        // 🔊 звук через 1 секунду
        setTimeout(() => playClickSound(), 1000);

        // ⏳ задержка под анимацию (2.3 сек)
        setTimeout(() => {
            const video = webcamRef.current?.video;
            if (!video) return;

            // 1️⃣ Захват кадра из видео (в полном разрешении)
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // 2️⃣ Загружаем изображение в OpenCV
            const src = cv.matFromImageData(imgData);
            const gray = new cv.Mat();
            const thresh = new cv.Mat();

            // 3️⃣ Преобразуем в ч/б и делаем бинаризацию
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
            cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
            cv.adaptiveThreshold(
                gray,
                thresh,
                255,
                cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                cv.THRESH_BINARY_INV,
                11,
                2
            );

            // 4️⃣ Находим контуры
            const contours = new cv.MatVector();
            const hierarchy = new cv.Mat();
            cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

            const squares = [];

            // 5️⃣ Фильтруем контуры, похожие на маркеры (почти квадратные, с подходящей площадью)
            for (let i = 0; i < contours.size(); i++) {
                const cnt = contours.get(i);
                const approx = new cv.Mat();
                cv.approxPolyDP(cnt, approx, 0.02 * cv.arcLength(cnt, true), true);

                if (approx.rows === 4 && cv.contourArea(approx) > 200) {
                    const rect = cv.boundingRect(approx);
                    const aspect = rect.width / rect.height;
                    if (aspect > 0.8 && aspect < 1.2) {
                        squares.push(rect);
                    }
                }

                cnt.delete();
                approx.delete();
            }

            // 🧪 Отладка — визуализируем найденные контуры на копии изображения
            const debugImg = src.clone();
            cv.drawContours(debugImg, contours, -1, new cv.Scalar(255, 0, 0, 255), 2);
            cv.imshow("debugCanvas", debugImg);
            debugImg.delete();

            // 6️⃣ Проверяем, нашли ли 4 маркера
            if (squares.length === 4) {
                console.log("✅ Найдены 4 маркера:", squares);

                // сортируем по положению — чтобы выровнять правильно
                squares.sort((a, b) => a.y - b.y || a.x - b.x);

                const topLeft = squares[0];
                const topRight = squares[1];
                const bottomLeft = squares[2];
                const bottomRight = squares[3];

                // Центры квадратов
                const srcPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
                    topLeft.x + topLeft.width / 2, topLeft.y + topLeft.height / 2,
                    topRight.x + topRight.width / 2, topRight.y + topRight.height / 2,
                    bottomRight.x + bottomRight.width / 2, bottomRight.y + bottomRight.height / 2,
                    bottomLeft.x + bottomLeft.width / 2, bottomLeft.y + bottomLeft.height / 2
                ]);

                // Целевая выровненная область
                const width = 600;
                const height = 200;
                const dstPts = cv.matFromArray(4, 1, cv.CV_32FC2, [
                    0, 0,
                    width, 0,
                    width, height,
                    0, height
                ]);

                // 7️⃣ Преобразование перспективы
                const M = cv.getPerspectiveTransform(srcPts, dstPts);
                const warped = new cv.Mat();
                cv.warpPerspective(src, warped, M, new cv.Size(width, height));

                // 8️⃣ Получаем результат как base64
                const outputCanvas = document.createElement("canvas");
                outputCanvas.width = width;
                outputCanvas.height = height;
                cv.imshow(outputCanvas, warped);
                const croppedImage = outputCanvas.toDataURL("image/png");

                // 🛑 Останавливаем камеру и передаём результат
                stopCamera();
                onCapture(croppedImage);

                // Очистка
                warped.delete();
                M.delete();
                srcPts.delete();
                dstPts.delete();
            } else {
                console.warn("⚠️ Не удалось найти 4 маркера. Используем fallback.");
                const fallback = canvas.toDataURL("image/png");
                onCapture(fallback);
            }

            // 🧹 Очистка памяти
            src.delete();
            gray.delete();
            thresh.delete();
            contours.delete();
            hierarchy.delete();

            stopCamera();
            setIsProcessing(false);
        }, 2300);
    };

    const handleUserMedia = () => {
        // camera ready
        setTimeout(() => setIsReady(true), 150);
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    return (
        <div className={styles.cameraContainer}>
            {!isReady && <div className={styles.darkBackground}></div>}
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={{
                    facingMode: "environment",
                    width: { ideal: 1920 }, // можно попросить более высокое разрешение
                    height: { ideal: 1080 },
                }}
                className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                onUserMedia={handleUserMedia}
                playsInline
            />
            <canvas id="debugCanvas" width="400" height="300" style={{ position: "absolute", bottom: 10, left: 10, border: "1px solid red" }}></canvas>
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

            <div className={styles.overlay}>
                <div className={styles.viewfinder}>
                    <div className={styles["bottom-left"]}></div>
                    <div className={styles["bottom-right"]}></div>

                    {/* Привязываем ref к cropFrame */}
                    <div ref={frameRef} className={styles.cropFrame}></div>
                </div>
            </div>

            <div className={styles.wrapBtn}>
                <button
                    className={styles.scanBtn}
                    onClick={handleCapture}
                    style={{ opacity: isProcessing ? 0 : 1 }}
                ></button>

                <Lottie
                    key={isProcessing ? "processing" : "idle"}
                    animationData={processing_6}
                    loop={false}
                    style={{
                        width: "80px",
                        height: "80px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: isProcessing ? 1 : 0,
                        pointerEvents: "none",
                        filter: "brightness(0) invert(1)",
                    }}
                />
            </div>
        </div>
    );
};

export default CameraViewPage;




