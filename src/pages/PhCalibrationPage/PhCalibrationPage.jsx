import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import styles from "./PhCalibrationPage.module.css";

const PH_LEVELS = [4, 5, 6, 7, 8, 9];

const rgbToLab = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x), fy = f(y), fz = f(z);

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz)
  };
};

const PhCalibrationPage = () => {
  const webcamRef = useRef(null);
  const [selectedPh, setSelectedPh] = useState(null);
  const [savedData, setSavedData] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("phCalibration");
    if (stored) setSavedData(JSON.parse(stored));
  }, []);

  const captureColor = () => {
    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 20;
    const imageData = ctx.getImageData(centerX - size/2, centerY - size/2, size, size);

    let r = 0, g = 0, b = 0;
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    r /= data.length / 4;
    g /= data.length / 4;
    b /= data.length / 4;

    const lab = rgbToLab(r, g, b);

    const updated = { ...savedData, [selectedPh]: lab };
    setSavedData(updated);
    localStorage.setItem("phCalibration", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <h1>pH Calibration</h1>
      <p>Выбери уровень pH и нажми “Capture Color” при наведении камеры на квадрат теста.</p>

      <div className={styles.webcamWrap}>
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/png"
          className={styles.webcam}
          videoConstraints={{ facingMode: "environment" }}
        />
        <div className={styles.crosshair}></div>
      </div>

      <div className={styles.phButtons}>
        {PH_LEVELS.map(ph => (
          <button
            key={ph}
            className={`${styles.phBtn} ${selectedPh === ph ? styles.active : ""}`}
            onClick={() => setSelectedPh(ph)}
          >
            pH {ph}
          </button>
        ))}
      </div>

      <button
        className={styles.captureBtn}
        onClick={captureColor}
        disabled={!selectedPh}
      >
        Capture Color
      </button>

      <div className={styles.results}>
        <h3>Saved Calibration</h3>
        {Object.keys(savedData).length === 0 && <p>No data yet</p>}
        <ul>
          {Object.entries(savedData).map(([ph, lab]) => (
            <li key={ph}>
              <strong>pH {ph}:</strong> L={lab.L.toFixed(1)}, a={lab.a.toFixed(1)}, b={lab.b.toFixed(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PhCalibrationPage;