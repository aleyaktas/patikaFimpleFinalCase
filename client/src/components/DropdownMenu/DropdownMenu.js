import { useState } from "react";
import styles from "./DropdownMenu.module.css";

const DropdownMenu = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.selectContainer}>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Seçiniz</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;
