import PropTypes from "prop-types";
import styles from "./DropdownMenu.module.css";

const DropdownMenu = ({ options, onSelect, selectedOption }) => {
  return (
    <div className={styles.selectContainer}>
      <select value={selectedOption} onChange={onSelect}>
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

DropdownMenu.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

export default DropdownMenu;
