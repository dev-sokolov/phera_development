import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

import styles from "./ResultPage.module.css";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Получаем переданные данные
    const { capturedImage } = location.state || {}; //////////////////////////

    useEffect(() => {
        if (!capturedImage) {
            navigate("/", {replace: true});
        }
    }, [capturedImage, navigate])
    
    return (
        <div className={styles.wrapResultPage}>
            <div className={styles.content}>
                <div className={styles.ph}>
                    <p className={styles.phTitle}>Your pH</p>
                    <p className={styles.phValue}>4.3</p>
                    <div className={styles.phInfo}>
                        <div>clock</div>
                        <div>15.10.2025, 20:12:09</div>
                        <div className={styles.phConfidence}>
                            <div>98%</div>
                            <div>Confidence</div>
                        </div>
                    </div>
                </div>
                <div className={styles.phDescription}>
                    <h3>What This Means</h3>
                    <p>Your pH is within the typical acidic range associated with Lactobacillus dominance.</p>
                </div>
                <div className={styles.processingResults}></div>
                <div className={styles.personalInfo}></div>
            </div>
        </div>
    );
};

export default ResultPage;