import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";

import styles from "./PersonalData.module.css";

const PersonalData = () => {
    const { register, watch, setValue } = useForm();
    const { age, hormone = [], ancestral } = watch(); // Отслеживаем все поля

    const [isAgeOpen, setIsAgeOpen] = useState(false);
    const [isHormoneOpen, setIsHormoneOpen] = useState(false); // состояние открытия списка
    const dropdownRef = useRef(null);

    // массив всех вариантов гормонов
    const hormoneOptions = [
        "Estrogen",
        "Progesterone",
        "Testosterone",
        "Cortisol",
        "Thyroid hormones",
    ];

    const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];

    // const toggleHormoneDropdown = () => {
    //     setIsHormoneOpen((prev) => !prev);
    // };
    // const toggleAgeDropdown = () => setIsAgeOpen((prev) => !prev);
    // const toggleHormoneDropdown = () => setIsHormoneOpen((prev) => !prev);
    // ▼ Тогглы
    const toggleAgeDropdown = () => {
        setIsAgeOpen((prev) => {
            const newState = !prev;
            if (newState) setIsHormoneOpen(false); // закрыть гормоны
            return newState;
        });
    };

    const toggleHormoneDropdown = () => {
        setIsHormoneOpen((prev) => {
            const newState = !prev;
            if (newState) setIsAgeOpen(false); // закрыть age
            return newState;
        });
    };

    // добавление/удаление выбранных гормонов

    const handleHormoneChange = (value) => {
        const updated = hormone.includes(value)
            ? hormone.filter(item => item !== value)
            : [...hormone, value];
        setValue("hormone", updated);
    };

    const handleAgeSelect = (value) => {
        setValue("age", value);
        setIsAgeOpen(false);
    };

    // удалить гормон по клику на тег
    const handleRemoveHormone = (value) => {
        const updated = hormone.filter((item) => item !== value);
        setValue("hormone", updated);
    };

    // Закрытие при клике вне блока
    useEffect(() => {
        const handleClick = (event) => {
            const dropdown = dropdownRef.current;

            // Если клик вне блока
            if (!dropdown || !dropdown.contains(event.target)) {
                setIsAgeOpen(false);
                setIsHormoneOpen(false);
                return;
            }

            // Если клик ВНУТРИ блока, но не в сам dropdown и не в кнопку открытия
            const isDropdownClick = event.target.closest(`.${styles.dropdown}`);
            const isSelectClick = event.target.closest(`.${styles.select}`);

            if (!isDropdownClick && !isSelectClick) {
                setIsAgeOpen(false);
                setIsHormoneOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // рекомендации
    const getRecommendation = () => {
        if (age === "18-24") return "Your recommendation 18-24";
        if (age === "25-34") return "Your recommendation 25-34";
        if (age === "35-44") return "Your recommendation 35-44";
        if (age === "45-54") return "Your recommendation 45-54";
        if (age === "55+") return "Your recommendation 55+";
    };

    return (
        <>
            <div className={styles.wrapper} ref={dropdownRef}>
                <h3 className={styles.heading}>Share data to get more personalised results (Optional)</h3>
                {/* <div> */}
                <form className={styles.form}>
                    {/* <label className={styles.title} >Age Group
                        <select {...register("age")} className={styles.select}>
                            <option value="" className={styles.dropdown}>Select age group</option>
                            <option value="18-24" className={styles.dropdown}>18-24</option>
                            <option value="25-34" className={styles.dropdown}>25-34</option>
                            <option value="35-44" className={styles.dropdown}>35-44</option>
                            <option value="45-54" className={styles.dropdown}>45-54</option>
                            <option value="55+" className={styles.dropdown}>55+</option>
                        </select>
                    </label> */}
                    {/* AGE GROUP */}
                    <label className={styles.title}>
                        Age Group
                        <div
                            className={styles.select}
                            onClick={toggleAgeDropdown}
                            tabIndex={0}
                        >
                            {age || "Select age group"}
                            <span className={styles.arrow}>{isAgeOpen ? "▲" : "▼"}</span>
                        </div>

                        {isAgeOpen && (
                            <div className={styles.dropdown}>
                                {ageOptions.map((option) => (
                                    <div
                                        key={option}
                                        className={styles.dropdownItem}
                                        onClick={() => handleAgeSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </label>

                    {/* HORMONE FACTORS */}

                    <label className={styles.title} ref={dropdownRef}>
                        Hormone Factors
                        <div
                            className={styles.select}
                            onClick={toggleHormoneDropdown}
                            tabIndex={0}
                        >
                            Select hormone factors
                            <span className={styles.arrow}>{isHormoneOpen ? "▲" : "▼"}</span>
                        </div>

                        {isHormoneOpen && (
                            <div className={styles.dropdown}>
                                {hormoneOptions.map((option) => (
                                    <div
                                        key={option}
                                        className={styles.dropdownItem}
                                        onClick={() => handleHormoneChange(option)}
                                    >
                                        <span
                                            className={`${styles.checkmarkLeft} ${hormone.includes(option) ? styles.visible : ""
                                                }`}
                                        >
                                            ✓
                                        </span>
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </label>

                    {/* выбранные гормоны под инпутом */}
                    {hormone.length > 0 && (
                        <div className={styles.selectedList}>
                            {hormone.map((item) => (
                                <span key={item} className={styles.selectedTag}>
                                    {item}
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => handleRemoveHormone(item)}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}

                </form>
                {/* </div> */}
            </div>
            {(age || (hormone && hormone.length > 0) || ancestral) && (
                <div className={styles.wrapRecommendation}>
                    <h3 className={styles.heading}>Personalized Insight</h3>
                    <p className={styles.recommendation}>{getRecommendation()}</p>
                </div>
            )}
        </>
    )
};

export default PersonalData;