import PropTypes from "prop-types";
import styles from "./TableHeader.module.css";

const TableHeader = ({ tableHeader }) => {
  return (
    <tr className={styles.tableHeader}>
      {tableHeader.map((tableItem, index) => (
        <th key={index}>{tableItem}</th>
      ))}
    </tr>
  );
};

TableHeader.propTypes = {
  tableHeader: PropTypes.array.isRequired,
};

export default TableHeader;
