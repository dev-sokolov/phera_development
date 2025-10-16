import { useForm } from "react-hook-form";

import styles from "./PersonalData.module.css";

const PersonalData = () => {
    const { register, watch } = useForm();

    // Отслеживаем все поля
    const { age, hormone, ancestral } = watch();

    // Определяем результат в зависимости от выбора
    const getRecommendation = () => {
        // if (!age || !gender || !goal || !activity) {
        //     return "Fill all fields to get a recommendation.";
        // }

        // if (goal === "lose" && activity === "low") {
        //     return "Try light cardio workouts and reduce calorie intake.";
        // } else if (goal === "gain" && activity === "high") {
        //     return "Increase your protein intake and focus on strength training.";
        // } else if (goal === "maintain") {
        //     return "Maintain a balanced diet and regular physical activity.";
        // }

        // return "Personalized recommendation will appear here.";

        if (age === "18-24") {
            return "Your recommendation 18-24";
        } else if (age === "25-34") {
            return "Your recommendation 25-34";
        }

    };

    return (
        <>
            <div className={styles.wrapper}>
                <h3>Share data to get more personalised results (Optional)</h3>
                <div>
                    <form className={styles.form}>
                        <label className={styles.title} >Age Group
                            <select {...register("age")} id="age" className={styles.select}>
                                <option value="">Select age group</option>
                                <option value="18-24">18-24</option>
                                <option value="25-34">25-34</option>
                                <option value="35-44">35-44</option>
                                <option value="45-54">45-54</option>
                                <option value="55+">55+</option>
                            </select>
                        </label>
                    </form>
                </div>


            </div>
            {/* Блок с рекомендацией */}
            <div className={styles.recommendation}>
                <p>{getRecommendation()}</p>
            </div>
        </>

    )
};

export default PersonalData;