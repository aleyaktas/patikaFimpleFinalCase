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

export default TableHeader;
