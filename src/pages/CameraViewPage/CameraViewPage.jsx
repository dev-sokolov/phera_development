// import { useRef, useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import Webcam from "react-webcam";
// import styles from "./CameraViewPage.module.css";
// import clickSoundFile from "../../assets/sounds/camera-click.mp3";
// import notificationSound from "../../assets/sounds/notification.mp3";
// import scanning from "../../assets/lottie/scanning.json";
// import scanning_2 from "../../assets/lottie/scanning_2.json";
// import scanning_3 from "../../assets/lottie/scanning_3.json";
// import scanning_4 from "../../assets/lottie/scanning_4.json";
// import processing from "../../assets/lottie/processing.json";
// import processing_2 from "../../assets/lottie/processing_2.json";
// import processing_3 from "../../assets/lottie/processing_3.json";
// import processing_4 from "../../assets/lottie/processing_4.json";
// import processing_5 from "../../assets/lottie/processing_5.json";
// import processing_6 from "../../assets/lottie/processing_6.json";
// import cross from "../../assets/icons/cross.png";

// const CameraViewPage = ({ onCapture, onExit }) => {
//     const webcamRef = useRef(null);
//     const [isReady, setIsReady] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);

//     const stopCamera = () => {
//         const video = webcamRef.current?.video;
//         const tracks = video?.srcObject?.getTracks();
//         tracks?.forEach((track) => track.stop());
//     };

//     const playClickSound = () => {
//         const audio = new Audio(notificationSound);
//         audio.play().catch(() => { });
//     };

//     // const handleCapture = () => {
//     //     setIsProcessing(true);

//     //     setTimeout(() => {
//     //         playClickSound();
//     //     }, 1000)

//     //     setTimeout(() => {
//     //         const imageSrc = webcamRef.current?.getScreenshot();
//     //         stopCamera();
//     //         if (imageSrc) onCapture(imageSrc);
//     //     }, 2300);
//     // };

//     // ----------------------

//     const video = webcamRef.current.video;
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;

//     const frame = document.querySelector(`.${styles.cropFrame}`);
//     const videoRect = video.getBoundingClientRect();
//     const frameRect = frame.getBoundingClientRect();

//     // Получаем пропорции положения рамки внутри видео
//     const relX = (frameRect.left - videoRect.left) / videoRect.width;
//     const relY = (frameRect.top - videoRect.top) / videoRect.height;
//     const relW = frameRect.width / videoRect.width;
//     const relH = frameRect.height / videoRect.height;

//     // Переводим в реальные координаты изображения
//     const cropX = img.width * relX;
//     const cropY = img.height * relY;
//     const cropWidth = img.width * relW;
//     const cropHeight = img.height * relH;

//     // const handleCapture = () => {
//     //     setIsProcessing(true);

//     //     setTimeout(() => {
//     //         playClickSound();
//     //     }, 1000);

//     //     setTimeout(() => {
//     //         const imageSrc = webcamRef.current?.getScreenshot();
//     //         if (!imageSrc) return;

//     //         // Создаём объект Image, чтобы можно было обрезать
//     //         const img = new Image();
//     //         img.src = imageSrc;

//     //         img.onload = () => {
//     //             // Создаём временный canvas
//     //             const canvas = document.createElement("canvas");
//     //             const ctx = canvas.getContext("2d");

//     //             // 🔧 Координаты и размер области обрезки
//     //             // Здесь тебе нужно подобрать значения под твоё расположение полоски в кадре.
//     //             // Например, если полоска по центру:
//     //             // const cropX = img.width * 0.25; // отступ слева
//     //             // const cropY = img.height * 0.4; // отступ сверху
//     //             // const cropWidth = img.width * 0.5; // ширина обрезки
//     //             // const cropHeight = img.height * 0.2; // высота обрезки

//     //             const cropX = img.width * 0.43;
//     //             const cropY = img.height * 0.24;
//     //             const cropWidth = img.width * 0.14; //общ
//     //             const cropHeight = img.height * 0.3;

//     //             // Настраиваем canvas под размер обрезанной области
//     //             canvas.width = cropWidth;
//     //             canvas.height = cropHeight;

//     //             // Копируем нужную часть из исходного изображения
//     //             ctx.drawImage(
//     //                 img,
//     //                 cropX, cropY, cropWidth, cropHeight,
//     //                 0, 0, cropWidth, cropHeight
//     //             );

//     //             // Получаем итоговое изображение
//     //             const croppedImage = canvas.toDataURL("image/png");

//     //             stopCamera();
//     //             onCapture(croppedImage); // передаём обрезанный снимок
//     //             console.log(img.width, img.height);
//     //         };
//     //     }, 2300);
//     // };

//     const handleCapture = () => {
//         setIsProcessing(true);

//         setTimeout(() => playClickSound(), 1000);

//         setTimeout(() => {
//             const imageSrc = webcamRef.current?.getScreenshot();
//             if (!imageSrc) return;

//             const img = new Image();
//             img.src = imageSrc;

//             img.onload = () => {
//                 const video = webcamRef.current?.video;
//                 if (!video) return;

//                 const frame = document.querySelector(`.${styles.cropFrame}`);
//                 const videoRect = video.getBoundingClientRect();
//                 const frameRect = frame.getBoundingClientRect();

//                 // Относительные координаты рамки
//                 const relX = (frameRect.left - videoRect.left) / videoRect.width;
//                 const relY = (frameRect.top - videoRect.top) / videoRect.height;
//                 const relW = frameRect.width / videoRect.width;
//                 const relH = frameRect.height / videoRect.height;

//                 // Переводим в реальные координаты изображения
//                 const cropX = img.width * relX;
//                 const cropY = img.height * relY;
//                 const cropWidth = img.width * relW;
//                 const cropHeight = img.height * relH;

//                 // Обрезаем
//                 const canvas = document.createElement("canvas");
//                 const ctx = canvas.getContext("2d");
//                 canvas.width = cropWidth;
//                 canvas.height = cropHeight;

//                 ctx.drawImage(
//                     img,
//                     cropX, cropY, cropWidth, cropHeight,
//                     0, 0, cropWidth, cropHeight
//                 );

//                 const croppedImage = canvas.toDataURL("image/png");
//                 stopCamera();
//                 onCapture(croppedImage);
//             };
//         }, 2300);
//     };

//     const handleUserMedia = () => {
//         setTimeout(() => setIsReady(true), 150);
//     };

//     useEffect(() => stopCamera, []);

//     return (
//         <div className={styles.cameraContainer}>
//             {!isReady && <div className={styles.darkBackground}></div>}
//             <Webcam
//                 ref={webcamRef}
//                 audio={false}
//                 screenshotFormat="image/png"
//                 videoConstraints={{ facingMode: "environment" }}
//                 className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
//                 onUserMedia={handleUserMedia}
//                 playsInline
//             />
//             <div className={styles.topControls}>
//                 <button
//                     className={styles.exitBtn}
//                     onClick={() => {
//                         stopCamera();
//                         onExit();
//                     }}
//                     aria-label="Exit to home"
//                 >
//                     X
//                 </button>
//             </div>

//             <div className={styles.overlay}>
//                 <div className={styles.viewfinder}>
//                     <div className={styles["bottom-left"]}></div>
//                     <div className={styles["bottom-right"]}></div>

//                     {/* 🔲 Новая рамка для обрезки */}
//                     <div className={styles.cropFrame}></div>
//                 </div>
//             </div>
//             <div className={styles.wrapBtn}>
//                 <button
//                     className={styles.scanBtn}
//                     onClick={handleCapture}
//                     style={{ opacity: isProcessing ? 0 : 1 }}
//                 ></button>

//                 <Lottie
//                     key={isProcessing ? "processing" : "idle"}
//                     animationData={processing_6}
//                     loop={false}
//                     style={{
//                         width: "80px",
//                         height: "80px",
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         opacity: isProcessing ? 1 : 0,
//                         pointerEvents: "none",
//                         filter: "brightness(0) invert(1)",
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CameraViewPage;

// --------------------------------------!!!!!!!!!!!!!!!!!!---------------------

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

    //   const handleCapture = () => {  //!!!!!!!!!!!!! работает
    //     setIsProcessing(true);
    //     setTimeout(() => playClickSound(), 1000);

    //     // Задержка имитирует анимацию/процессинг
    //     setTimeout(() => {
    //       // Берём снимок (dataURL) — можно заменить на захват из video для лучшего разрешения
    //       const imageSrc = webcamRef.current?.getScreenshot();
    //       if (!imageSrc) {
    //         setIsProcessing(false);
    //         return;
    //       }

    //       const img = new Image();
    //       img.src = imageSrc;

    //       img.onload = () => {
    //         // Получаем video элемент — он должен быть уже доступен, т.к. мы вызываем capture
    //         const video = webcamRef.current?.video;
    //         const frameEl = frameRef.current;
    //         if (!video || !frameEl) {
    //           // Без video/frame ничего не делаем
    //           setIsProcessing(false);
    //           return;
    //         }

    //         // Получаем прямоугольники в координатах окна
    //         const videoRect = video.getBoundingClientRect();
    //         const frameRect = frameEl.getBoundingClientRect();

    //         // Вычисляем относительные координаты рамки внутри видео area
    //         // clamp — чтобы не выйти за границы
    //         const relX = Math.max(0, Math.min(1, (frameRect.left - videoRect.left) / videoRect.width));
    //         const relY = Math.max(0, Math.min(1, (frameRect.top - videoRect.top) / videoRect.height));
    //         const relW = Math.max(0, Math.min(1, frameRect.width / videoRect.width));
    //         const relH = Math.max(0, Math.min(1, frameRect.height / videoRect.height));

    //         // Переводим в координаты пикселей исходного изображения (img.width / img.height)
    //         const cropX = Math.round(img.width * relX);
    //         const cropY = Math.round(img.height * relY);
    //         const cropWidth = Math.round(img.width * relW);
    //         const cropHeight = Math.round(img.height * relH);

    //         // Если cropWidth/Height 0 — отмена
    //         if (cropWidth <= 0 || cropHeight <= 0) {
    //           setIsProcessing(false);
    //           return;
    //         }

    //         // Создаём canvas, отключаем сглаживание (если нужно)
    //         const canvas = document.createElement("canvas");
    //         canvas.width = cropWidth;
    //         canvas.height = cropHeight;
    //         const ctx = canvas.getContext("2d");
    //         if (ctx) {
    //           ctx.imageSmoothingEnabled = false;
    //           ctx.drawImage(
    //             img,
    //             cropX,
    //             cropY,
    //             cropWidth,
    //             cropHeight,
    //             0,
    //             0,
    //             cropWidth,
    //             cropHeight
    //           );
    //         }

    //         const croppedImage = canvas.toDataURL("image/png");
    //         stopCamera();
    //         onCapture(croppedImage);
    //         setIsProcessing(false);
    //       };

    //       img.onerror = () => {
    //         // Если по какой-то причине картинка не загрузилась
    //         setIsProcessing(false);
    //       };
    //     }, 2300);
    //   };

    // ------------------------------------

    const handleCapture = () => {
        setIsProcessing(true);

        // 🎵 небольшой звуковой эффект через 1 секунду
        setTimeout(() => playClickSound(), 1000);

        // ⏳ делаем задержку для анимации (2.3 секунды)
        setTimeout(() => {
            const video = webcamRef.current?.video;
            if (!video) {
                console.error("Video element not found");
                setIsProcessing(false);
                return;
            }

            // ✅ Захватываем кадр напрямую из видео в полном разрешении
            const canvasFull = document.createElement("canvas");
            canvasFull.width = video.videoWidth;
            canvasFull.height = video.videoHeight;

            const ctxFull = canvasFull.getContext("2d");
            ctxFull.drawImage(video, 0, 0, canvasFull.width, canvasFull.height);

            // Получаем полное изображение в base64
            const imageSrc = canvasFull.toDataURL("image/png");

            // Создаём Image, чтобы обрезать нужную часть
            const img = new Image();
            img.src = imageSrc;

            img.onload = () => {
                const frame = document.querySelector(`.${styles.cropFrame}`);
                if (!frame) {
                    console.error("Crop frame not found");
                    setIsProcessing(false);
                    return;
                }

                const videoRect = video.getBoundingClientRect();
                const frameRect = frame.getBoundingClientRect();

                // 📐 Рассчитываем относительные координаты рамки
                const relX = (frameRect.left - videoRect.left) / videoRect.width;
                const relY = (frameRect.top - videoRect.top) / videoRect.height;
                const relW = frameRect.width / videoRect.width;
                const relH = frameRect.height / videoRect.height;

                // 🔢 Переводим в реальные пиксели изображения
                const cropX = img.width * relX;
                const cropY = img.height * relY;
                const cropWidth = img.width * relW;
                const cropHeight = img.height * relH;

                // ✂️ Создаём временный canvas под область обрезки
                const canvasCrop = document.createElement("canvas");
                canvasCrop.width = cropWidth;
                canvasCrop.height = cropHeight;
                const ctxCrop = canvasCrop.getContext("2d");

                ctxCrop.drawImage(
                    img,
                    cropX, cropY, cropWidth, cropHeight,
                    0, 0, cropWidth, cropHeight
                );

                // 🎨 Получаем финальное обрезанное изображение
                const croppedImage = canvasCrop.toDataURL("image/png");

                // 🛑 Останавливаем камеру и передаём результат
                stopCamera();
                onCapture(croppedImage);
                setIsProcessing(false);
            };
        }, 2300);
    };

    // -----------------------------------------------------------

    // const handleCapture = () => {
    //     setIsProcessing(true);

    //     setTimeout(() => playClickSound(), 1000);

    //     setTimeout(() => {
    //         const video = webcamRef.current?.video;
    //         if (!video) return;

    //         // 1️⃣ Захват кадра напрямую из видео
    //         const canvas = document.createElement("canvas");
    //         canvas.width = video.videoWidth;
    //         canvas.height = video.videoHeight;
    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //         const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //         // 2️⃣ Инициализация OpenCV.js
    //         const src = cv.matFromImageData(imgData);
    //         const gray = new cv.Mat();
    //         const blurred = new cv.Mat();
    //         const edged = new cv.Mat();

    //         // 3️⃣ Преобразуем в серое и применяем размытие + детектор границ
    //         cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    //         cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
    //         cv.Canny(blurred, edged, 50, 150);

    //         // 4️⃣ Находим контуры
    //         const contours = new cv.MatVector();
    //         const hierarchy = new cv.Mat();
    //         cv.findContours(edged, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    //         let maxArea = 0;
    //         let bestRect = null;

    //         // 5️⃣ Ищем самый большой прямоугольный контур (тест-полоска)------------
    //         for (let i = 0; i < contours.size(); i++) {
    //             const cnt = contours.get(i);
    //             const approx = new cv.Mat();
    //             cv.approxPolyDP(cnt, approx, 0.02 * cv.arcLength(cnt, true), true);

    //             if (approx.rows === 4) {
    //                 const area = cv.contourArea(approx);
    //                 if (area > maxArea) {
    //                     maxArea = area;
    //                     bestRect = approx;
    //                 }
    //             }
    //             approx.delete();
    //             cnt.delete();
    //         }

    //         // 6️⃣ Если нашли прямоугольник, обрезаем
    //         if (bestRect) {
    //             // Получаем координаты вершин
    //             const points = [];
    //             for (let i = 0; i < 4; i++) {
    //                 points.push({
    //                     x: bestRect.intPtr(i, 0)[0],
    //                     y: bestRect.intPtr(i, 0)[1],
    //                 });
    //             }

    //             // Находим bounding box
    //             const x = Math.min(...points.map(p => p.x));
    //             const y = Math.min(...points.map(p => p.y));
    //             const w = Math.max(...points.map(p => p.x)) - x;
    //             const h = Math.max(...points.map(p => p.y)) - y;

    //             // Обрезаем на canvas
    //             const croppedCanvas = document.createElement("canvas");
    //             croppedCanvas.width = w;
    //             croppedCanvas.height = h;
    //             const croppedCtx = croppedCanvas.getContext("2d");
    //             croppedCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);

    //             const croppedImage = croppedCanvas.toDataURL("image/png");
    //             onCapture(croppedImage);
    //         } else {
    //             // Если прямоугольник не найден — можно вернуть весь кадр или показать ошибку
    //             const fallbackImage = canvas.toDataURL("image/png");
    //             onCapture(fallbackImage);
    //         }

    //         // 7️⃣ Очистка памяти OpenCV
    //         src.delete();
    //         gray.delete();
    //         blurred.delete();
    //         edged.delete();
    //         contours.delete();
    //         hierarchy.delete();

    //         stopCamera();
    //     }, 2300);
    // };

    const handleUserMedia = () => {
        // camera ready
        setTimeout(() => setIsReady(true), 150);
    };

    useEffect(() => {
        // при размонтировании останавливаем камеру
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




