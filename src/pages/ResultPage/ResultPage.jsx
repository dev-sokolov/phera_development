// import { useLocation, useNavigate } from "react-router-dom";
// import JSZip from "jszip";
// import { useState, useRef, useEffect } from "react";

// import PersonalData from "../../components/PersonalData/PersonalData";
// import importSvg from "../../assets/icons/importSvg.svg";
// import exportSvg from "../../assets/icons/exportSvg.svg";
// import talk from "../../assets/icons/talk.svg";
// import checkedYes from "../../assets/icons/checkedYes.svg";
// import checkedNo from "../../assets/icons/checkedNo.svg";

// import styles from "./ResultPage.module.css";

// const ResultPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);

//     const [isDataSharingActive, setIsDataSharingActive] = useState(false);

//     const [age, setAge] = useState("");
//     const [hormone, setHormone] = useState([]);
//     const [ancestral, setAncestral] = useState("");

//     // Получаем переданные данные
//     const { capturedImage } = location.state || {}; //////////////////////////
//     // console.log(capturedImage);


//     useEffect(() => {
//         if (!capturedImage) {
//             navigate("/", { replace: true });
//         }
//     }, [capturedImage, navigate]);

//     const handleExportZip = async () => {
//         // 1. Данные для экспорта
//         const data = {
//             phValue: 4.3,
//             date: "15.10.2025, 20:12:09",
//             confidence: "98%",
//         };

//         // 2. Преобразуем в JSON
//         const json = JSON.stringify(data, null, 2);

//         // 3. Создаем ZIP
//         const zip = new JSZip();
//         zip.file("ph_results.json", json); // добавляем файл в архив

//         // 4. Генерируем ZIP как Blob
//         const content = await zip.generateAsync({ type: "blob" });

//         // 5. Создаем ссылку и скачиваем
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(content);
//         link.download = "ph_results.zip"; // имя архива
//         link.click();

//         // 6. Очищаем объект URL
//         URL.revokeObjectURL(link.href);
//     };

//     const handleImportClick = () => {
//         fileInputRef.current.click(); // имитация нажатия на скрытый input
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         // Проверяем расширение файла на всякий случай
//         if (!file.name.endsWith(".json")) {
//             alert("Пожалуйста, выберите файл формата JSON");
//             return;
//         }

//         // Чтение файла (например, JSON)
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             try {
//                 const content = e.target.result;
//                 const data = JSON.parse(content);
//                 // Здесь можно обновить состояние или что-то сделать с данными
//             } catch (err) {
//                 console.error("Ошибка при чтении файла", err);
//             }
//         };
//         reader.readAsText(file);
//     };

//     const handleTalkToDoctor = () => {
//         window.open("https://phera.digital/doctor", "_blank");
//     };

//     return (
//         <div className={styles.wrapResultPage}>
//             <div className={styles.content}>
//                 {capturedImage && (
//                     <div className={styles.capturedImageWrap}>
//                         <img
//                             src={capturedImage}
//                             alt="Captured pH strip"
//                             className={styles.capturedImage}
//                         />
//                     </div>
//                 )}
//                 <div className={styles.ph}>
//                     <p className={styles.phTitle}>Your pH</p>
//                     <p className={styles.phValue}>4.3</p>
//                     <div className={styles.phInfo}>
//                         <div>clock</div>
//                         <div>15.10.2025, 20:12:09</div>
//                         <div className={styles.phConfidence}>
//                             <div>98%</div>
//                             <div>Confidence</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.phDescription}>
//                     <h3>What This Means</h3>
//                     <p>Your pH is within the typical acidic range associated with Lactobacillus dominance.</p>
//                 </div>
//                 <div className={styles.processingResults}>
//                     <div className={styles.wrapBtn}>
//                         <button className={styles.btn} onClick={handleExportZip}>
//                             <div className={styles.icon}> <img src={exportSvg} alt="export" /></div>
//                             Export Results
//                         </button>
//                         <button className={styles.btn} onClick={handleImportClick}>
//                             <div className={styles.icon}> <img src={importSvg} alt="import" /></div>
//                             Import Results
//                         </button>
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             style={{ display: "none" }}
//                             accept=".json" // разрешаем только JSON-файлы 
//                             onChange={handleFileChange}
//                         />
//                         <button
//                             className={styles.btn}
//                             onClick={() => setIsDataSharingActive(prev => !prev)}
//                         >
//                             <div className={styles.icon}> <img src={isDataSharingActive ? checkedYes : checkedNo} alt="check" /></div>
//                             Share Data
//                         </button>
//                         <button className={styles.btn} onClick={handleTalkToDoctor}>
//                             <div className={styles.icon}> <img src={talk} alt="talk to a Doktor" /></div>
//                             Talk to a Doctor
//                         </button>
//                     </div>
//                 </div>
//                 <div className={styles.personalData}> <PersonalData
//                     isActive={isDataSharingActive}
//                     age={age}
//                     setAge={setAge}
//                     hormone={hormone}
//                     setHormone={setHormone}
//                     ancestral={ancestral}
//                     setAncestral={setAncestral} />
//                 </div>
//             </div>
//             <div className={styles.footer}>Privacy: Frames are processed in memory and discarded. Results are not saved unless you export.</div>
//         </div>
//     );
// };

// export default ResultPage;

// ------------------------------------------------------------------------------

// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import PersonalData from "../../components/PersonalData/PersonalData";
// import importSvg from "../../assets/icons/importSvg.svg";
// import exportSvg from "../../assets/icons/exportSvg.svg";
// import talk from "../../assets/icons/talk.svg";
// import checkedYes from "../../assets/icons/checkedYes.svg";
// import checkedNo from "../../assets/icons/checkedNo.svg";
// import styles from "./ResultPage.module.css";
// import JSZip from "jszip";

// const ResultPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { capturedImage } = location.state || {};

//     const [phValue, setPhValue] = useState(null);
//     const [isDataSharingActive, setIsDataSharingActive] = useState(false);
//     const [age, setAge] = useState("");
//     const [hormone, setHormone] = useState([]);
//     const [ancestral, setAncestral] = useState("");

//     useEffect(() => {
//         if (!capturedImage) {
//             navigate("/", { replace: true });
//         }
//     }, [capturedImage, navigate]);

//     useEffect(() => {
//         if (!capturedImage) return;

//         const img = new Image();
//         img.src = capturedImage;
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0, img.width, img.height);

//             // -------------------------------
//             // 1️⃣ Определяем область стика
//             // Предположим стик по центру горизонтально, вертикально центрируем
//             const stickWidth = 20; // примерная ширина стика
//             const stickHeight = img.height * 0.6; // 60% высоты изображения
//             const stickX = img.width / 2 - stickWidth / 2;
//             const stickY = img.height / 2 - stickHeight / 2;

//             // -------------------------------
//             // 2️⃣ Находим цвет центрального квадрата на белом стикe
//             const squareSize = 10; // маленький квадрат 10x10 px
//             const squareX = stickX + stickWidth / 2 - squareSize / 2;
//             const squareY = stickY + stickHeight / 2 - squareSize / 2;

//             const getAverageColor = (x, y, width, height) => {
//                 const imageData = ctx.getImageData(x, y, width, height);
//                 const data = imageData.data;
//                 let r = 0, g = 0, b = 0;
//                 const pixelCount = data.length / 4;
//                 for (let i = 0; i < data.length; i += 4) {
//                     r += data[i];
//                     g += data[i + 1];
//                     b += data[i + 2];
//                 }
//                 return { r: Math.round(r / pixelCount), g: Math.round(g / pixelCount), b: Math.round(b / pixelCount) };
//             };

//             const centerColor = getAverageColor(squareX, squareY, squareSize, squareSize);

//             // -------------------------------
//             // 3️⃣ Определяем образцы шкалы слева и справа
//             // Можно усреднять цвета всей вертикальной полоски слева и справа
//             const sampleWidth = 15;
//             const sampleHeight = stickHeight;

//             const leftColor = getAverageColor(stickX - 40, stickY, sampleWidth, sampleHeight);  // примерная область слева
//             const rightColor = getAverageColor(stickX + stickWidth + 25, stickY, sampleWidth, sampleHeight); // справа

//             const samples = [
//                 { color: leftColor, ph: 4.0 },
//                 { color: rightColor, ph: 7.0 },
//             ];

//             const colorDistance = (c1, c2) =>
//                 Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);

//             const matchColor = (center, samples) => {
//                 let minDist = Infinity;
//                 let bestMatch = null;
//                 samples.forEach(sample => {
//                     const dist = colorDistance(center, sample.color);
//                     if (dist < minDist) {
//                         minDist = dist;
//                         bestMatch = sample;
//                     }
//                 });
//                 return bestMatch?.ph || null;
//             };

//             const detectedPh = matchColor(centerColor, samples);
//             setPhValue(detectedPh);
//         };
//     }, [capturedImage]);

//     // -------------------------------

//     const handleExportZip = async () => {
//         const data = { phValue, date: new Date().toLocaleString(), confidence: "98%" };
//         const zip = new JSZip();
//         zip.file("ph_results.json", JSON.stringify(data, null, 2));
//         const content = await zip.generateAsync({ type: "blob" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(content);
//         link.download = "ph_results.zip";
//         link.click();
//         URL.revokeObjectURL(link.href);
//     };

//     const handleTalkToDoctor = () => window.open("https://phera.digital/doctor", "_blank");

//     return (
//         <div className={styles.wrapResultPage}>
//             <div className={styles.content}>
//                 {capturedImage && (
//                     <div className={styles.capturedImageWrap}>
//                         <img src={capturedImage} alt="Captured pH strip" className={styles.capturedImage} />
//                     </div>
//                 )}

//                 <div className={styles.ph}>
//                     <p className={styles.phTitle}>Your pH</p>
//                     <p className={styles.phValue}>{phValue !== null ? phValue : "…"}</p>
//                 </div>

//                 <div className={styles.processingResults}>
//                     <button className={styles.btn} onClick={handleExportZip}>
//                         <img src={exportSvg} alt="export" /> Export Results
//                     </button>
//                     <button className={styles.btn} onClick={() => setIsDataSharingActive(prev => !prev)}>
//                         <img src={isDataSharingActive ? checkedYes : checkedNo} alt="check" /> Share Data
//                     </button>
//                     <button className={styles.btn} onClick={handleTalkToDoctor}>
//                         <img src={talk} alt="talk to a Doktor" /> Talk to a Doctor
//                     </button>
//                 </div>

//                 <div className={styles.personalData}>
//                     <PersonalData
//                         isActive={isDataSharingActive}
//                         age={age}
//                         setAge={setAge}
//                         hormone={hormone}
//                         setHormone={setHormone}
//                         ancestral={ancestral}
//                         setAncestral={setAncestral}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ResultPage;


// ----------------------------------------------------

// import { useLocation, useNavigate } from "react-router-dom";
// import JSZip from "jszip";
// import { useState, useRef, useEffect } from "react";

// import PersonalData from "../../components/PersonalData/PersonalData";
// import importSvg from "../../assets/icons/importSvg.svg";
// import exportSvg from "../../assets/icons/exportSvg.svg";
// import talk from "../../assets/icons/talk.svg";
// import checkedYes from "../../assets/icons/checkedYes.svg";
// import checkedNo from "../../assets/icons/checkedNo.svg";
// import styles from "./ResultPage.module.css";

// const ResultPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const fileInputRef = useRef(null);
//     const { capturedImage } = location.state || {};

//     const [phValue, setPhValue] = useState(null);
//     const [isDataSharingActive, setIsDataSharingActive] = useState(false);
//     const [age, setAge] = useState("");
//     const [hormone, setHormone] = useState([]);
//     const [ancestral, setAncestral] = useState("");

//     useEffect(() => {
//         if (!capturedImage) {
//             navigate("/", { replace: true });
//         }
//     }, [capturedImage, navigate]);

//     useEffect(() => {
//         if (!capturedImage) return;

//         const img = new Image();
//         img.src = capturedImage;
//         img.onload = () => {
//             const canvas = document.createElement("canvas");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(img, 0, 0, img.width, img.height);

//             // -------------------------------
//             // 1️⃣ Определяем область стика
//             // Предположим стик по центру горизонтально, вертикально центрируем
//             const stickWidth = 20; // примерная ширина стика
//             const stickHeight = img.height * 0.6; // 60% высоты изображения
//             const stickX = img.width / 2 - stickWidth / 2;
//             const stickY = img.height / 2 - stickHeight / 2;

//             // -------------------------------
//             // 2️⃣ Находим цвет центрального квадрата на белом стикe
//             const squareSize = 10; // маленький квадрат 10x10 px
//             const squareX = stickX + stickWidth / 2 - squareSize / 2;
//             const squareY = stickY + stickHeight / 2 - squareSize / 2;

//             const getAverageColor = (x, y, width, height) => {
//                 const imageData = ctx.getImageData(x, y, width, height);
//                 const data = imageData.data;
//                 let r = 0, g = 0, b = 0;
//                 const pixelCount = data.length / 4;
//                 for (let i = 0; i < data.length; i += 4) {
//                     r += data[i];
//                     g += data[i + 1];
//                     b += data[i + 2];
//                 }
//                 return { r: Math.round(r / pixelCount), g: Math.round(g / pixelCount), b: Math.round(b / pixelCount) };
//             };

//             const centerColor = getAverageColor(squareX, squareY, squareSize, squareSize);

//             // -------------------------------
//             // 3️⃣ Определяем образцы шкалы слева и справа
//             // Можно усреднять цвета всей вертикальной полоски слева и справа
//             const sampleWidth = 15;
//             const sampleHeight = stickHeight;

//             const leftColor = getAverageColor(stickX - 40, stickY, sampleWidth, sampleHeight);  // примерная область слева
//             const rightColor = getAverageColor(stickX + stickWidth + 25, stickY, sampleWidth, sampleHeight); // справа

//             const samples = [
//                 { color: leftColor, ph: 4.0 },
//                 { color: rightColor, ph: 7.0 },
//             ];

//             const colorDistance = (c1, c2) =>
//                 Math.sqrt((c1.r - c2.r) ** 2 + (c1.g - c2.g) ** 2 + (c1.b - c2.b) ** 2);

//             const matchColor = (center, samples) => {
//                 let minDist = Infinity;
//                 let bestMatch = null;
//                 samples.forEach(sample => {
//                     const dist = colorDistance(center, sample.color);
//                     if (dist < minDist) {
//                         minDist = dist;
//                         bestMatch = sample;
//                     }
//                 });
//                 return bestMatch?.ph || null;
//             };

//             const detectedPh = matchColor(centerColor, samples);
//             setPhValue(detectedPh);
//         };
//     }, [capturedImage]);

//     // -------------------------------

//     const handleExportZip = async () => {
//         const data = { phValue, date: new Date().toLocaleString(), confidence: "98%" };
//         const zip = new JSZip();
//         zip.file("ph_results.json", JSON.stringify(data, null, 2));
//         const content = await zip.generateAsync({ type: "blob" });
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(content);
//         link.download = "ph_results.zip";
//         link.click();
//         URL.revokeObjectURL(link.href);
//     };

//     const handleImportClick = () => {
//         fileInputRef.current.click(); // имитация нажатия на скрытый input
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         // Проверяем расширение файла на всякий случай
//         if (!file.name.endsWith(".json")) {
//             alert("Пожалуйста, выберите файл формата JSON");
//             return;
//         }

//         // Чтение файла (например, JSON)
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             try {
//                 const content = e.target.result;
//                 const data = JSON.parse(content);
//                 // Здесь можно обновить состояние или что-то сделать с данными
//             } catch (err) {
//                 console.error("Ошибка при чтении файла", err);
//             }
//         };
//         reader.readAsText(file);
//     };

//     const handleTalkToDoctor = () => window.open("https://phera.digital/doctor", "_blank");

//     return (
//         <div className={styles.wrapResultPage}>
//             <div className={styles.content}>
//                 {capturedImage && (
//                     <div className={styles.capturedImageWrap}>
//                         <img src={capturedImage} alt="Captured pH strip" className={styles.capturedImage} />
//                     </div>
//                 )}

//                 <div className={styles.ph}>
//                     <p className={styles.phTitle}>Your pH</p>
//                     <p className={styles.phValue}>{phValue !== null ? phValue : "…"}</p>
//                     <div className={styles.phInfo}>
//                         <div>clock</div>
//                         <div>15.10.2025, 20:12:09</div>
//                         <div className={styles.phConfidence}>
//                             <div>98%</div>
//                             <div>Confidence</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={styles.phDescription}>
//                     <h3>What This Means</h3>
//                     <p>Your pH is within the typical acidic range associated with Lactobacillus dominance.</p>
//                 </div>

//                 <div className={styles.processingResults}>
//                     <div className={styles.wrapBtn}>
//                         <button className={styles.btn} onClick={handleExportZip}>
//                             {/* <img src={exportSvg} alt="export" /> Export Results */}
//                             <div className={styles.icon}> <img src={exportSvg} alt="export" /></div>
//                             Export Results
//                         </button>
//                         <button className={styles.btn} onClick={handleImportClick}>
//                             <div className={styles.icon}> <img src={importSvg} alt="import" /></div>
//                             Import Results
//                         </button>
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             style={{ display: "none" }}
//                             accept=".json" // разрешаем только JSON-файлы 
//                             onChange={handleFileChange}
//                         />
//                         <button className={styles.btn} onClick={() => setIsDataSharingActive(prev => !prev)}>
//                             {/* <img src={isDataSharingActive ? checkedYes : checkedNo} alt="check" /> Share Data */}
//                             <div className={styles.icon}> <img src={isDataSharingActive ? checkedYes : checkedNo} alt="check" /></div>
//                             Share Data
//                         </button>
//                         <button className={styles.btn} onClick={handleTalkToDoctor}>
//                             {/* <img src={talk} alt="talk to a Doktor" /> Talk to a Doctor */}
//                             <div className={styles.icon}> <img src={talk} alt="talk to a Doktor" /></div>
//                             Talk to a Doctor
//                         </button>
//                     </div>
//                 </div>

//                 <div className={styles.personalData}>
//                     <PersonalData
//                         isActive={isDataSharingActive}
//                         age={age}
//                         setAge={setAge}
//                         hormone={hormone}
//                         setHormone={setHormone}
//                         ancestral={ancestral}
//                         setAncestral={setAncestral}
//                     />
//                 </div>
//             </div>
//             <div className={styles.footer}>Privacy: Frames are processed in memory and discarded. Results are not saved unless you export.</div>
//         </div>
//     );
// };

// export default ResultPage;

// ----------------------------------------------------

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PersonalData from "../../components/PersonalData/PersonalData";
import exportSvg from "../../assets/icons/exportSvg.svg";
import talk from "../../assets/icons/talk.svg";
import checkedYes from "../../assets/icons/checkedYes.svg";
import checkedNo from "../../assets/icons/checkedNo.svg";
import styles from "./ResultPage.module.css";
import JSZip from "jszip";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { capturedImage } = location.state || {};

  const [phValue, setPhValue] = useState(null);
  const [isDataSharingActive, setIsDataSharingActive] = useState(false);
  const [age, setAge] = useState("");
  const [hormone, setHormone] = useState([]);
  const [ancestral, setAncestral] = useState("");

  useEffect(() => {
    if (!capturedImage) {
      navigate("/", { replace: true });
    }
  }, [capturedImage, navigate]);

  // --- RGB → LAB ---
  const rgbToLab = (r, g, b) => {
    r = r / 255; g = g / 255; b = b / 255;
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

  const deltaE = (lab1, lab2) =>
    Math.sqrt((lab1.L - lab2.L) ** 2 + (lab1.a - lab2.a) ** 2 + (lab1.b - lab2.b) ** 2);

  // 🎨 Эталонная шкала pH (примерная — подкорректируй по своим цветам)
  const phScaleLab = [
    { ph: 4.0, color: rgbToLab(255, 230, 60) },   // ярко-жёлтый
    { ph: 5.0, color: rgbToLab(230, 220, 70) },   // желтовато-зелёный
    { ph: 6.0, color: rgbToLab(180, 210, 90) },   // светло-зелёный
    { ph: 7.0, color: rgbToLab(120, 200, 100) },  // нейтральный зелёный
    { ph: 8.0, color: rgbToLab(70, 180, 120) },   // зелёно-голубоватый
    { ph: 9.0, color: rgbToLab(50, 150, 130) }    // темно-зеленый/бирюзовый
  ];

  useEffect(() => {
    if (!capturedImage) return;

    const img = new Image();
    img.src = capturedImage;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // 1️⃣ Область стика (центральная белая полоска)
      const stickWidth = 20;
      const stickHeight = img.height * 0.6;
      const stickX = img.width / 2 - stickWidth / 2;
      const stickY = img.height / 2 - stickHeight / 2;

      // 2️⃣ Центральный квадрат (на тестовой зоне)
      const squareSize = 10;
      const squareX = stickX + stickWidth / 2 - squareSize / 2;
      const squareY = stickY + stickHeight / 2 - squareSize / 2;

      const getAverageColor = (x, y, width, height) => {
        const imageData = ctx.getImageData(x, y, width, height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;
        const pixelCount = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        return {
          r: Math.round(r / pixelCount),
          g: Math.round(g / pixelCount),
          b: Math.round(b / pixelCount),
        };
      };

      const centerColor = getAverageColor(squareX, squareY, squareSize, squareSize);
      const centerLab = rgbToLab(centerColor.r, centerColor.g, centerColor.b);

      // 3️⃣ Сравнение со шкалой
      let closestPh = phScaleLab[0].ph;
      let minDelta = Infinity;

      for (const { ph, color } of phScaleLab) {
        const dE = deltaE(centerLab, color);
        if (dE < minDelta) {
          minDelta = dE;
          closestPh = ph;
        }
      }

      setPhValue(closestPh);
    };
  }, [capturedImage]);

  const handleExportZip = async () => {
    const data = { phValue, date: new Date().toLocaleString(), confidence: "98%" };
    const zip = new JSZip();
    zip.file("ph_results.json", JSON.stringify(data, null, 2));
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "ph_results.zip";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleTalkToDoctor = () => window.open("https://phera.digital/doctor", "_blank");

  return (
    <div className={styles.wrapResultPage}>
      <div className={styles.content}>
        {capturedImage && (
          <div className={styles.capturedImageWrap}>
            <img src={capturedImage} alt="Captured pH strip" className={styles.capturedImage} />
          </div>
        )}

        <div className={styles.ph}>
          <p className={styles.phTitle}>Your pH</p>
          <p className={styles.phValue}>{phValue !== null ? phValue.toFixed(1) : "…"}</p>
        </div>

        <div className={styles.processingResults}>
          <button className={styles.btn} onClick={handleExportZip}>
            <img src={exportSvg} alt="export" /> Export Results
          </button>
          <button className={styles.btn} onClick={() => setIsDataSharingActive(prev => !prev)}>
            <img src={isDataSharingActive ? checkedYes : checkedNo} alt="check" /> Share Data
          </button>
          <button className={styles.btn} onClick={handleTalkToDoctor}>
            <img src={talk} alt="talk to a Doctor" /> Talk to a Doctor
          </button>
        </div>

        <div className={styles.personalData}>
          <PersonalData
            isActive={isDataSharingActive}
            age={age}
            setAge={setAge}
            hormone={hormone}
            setHormone={setHormone}
            ancestral={ancestral}
            setAncestral={setAncestral}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;