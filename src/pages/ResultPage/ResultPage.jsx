import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

import styles from "./ResultPage.module.css";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Получаем переданные данные
    const { capturedImage } = location.state || {};
    
    return (
        <div className={styles.wrapResultPage}>
            <h2 className={styles.title}>Result page</h2>

            {capturedImage ? (
                <div className={styles.wrapCaptured}>
                    <img src={capturedImage} alt="Captured pH strip" className={styles.resultImage} />
                </div>
            ) : (
                <p>No image found.</p>
            )}

            <div className={styles.wrapBtn}>
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
        </div>
    );
};

export default ResultPage;