import { useState } from "react";

import styles from "./AgeDropdown.module.css";

const AgeDropdown = ({ isActive, age, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];

    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <div className={styles.wrap}>
            <h4 className={styles.title}>Age Group</h4>            
            <div
                className={`${styles.select} ${!isActive ? styles.selectDisabled : ""}`}
                onClick={isActive ? toggle : undefined}
                tabIndex={isActive ? 0 : -1}
            >
                {age || "Select age group"}
                <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
                <div className={styles.dropdown}>
                    {ageOptions.map((option) => (
                        <div key={option} className={styles.dropdownItem} onClick={() => { onSelect(option); setIsOpen(false); }}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AgeDropdown;