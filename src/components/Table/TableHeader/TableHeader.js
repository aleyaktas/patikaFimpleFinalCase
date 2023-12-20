import styles from "./TableHeader.module.css";

const TableHeader = ({ tableHeader }) => {
  return (
    <div className={styles.tableHeader}>
      {tableHeader.map((tableItem, index) => (
        <div key={index}>{tableItem}</div>
      ))}
    </div>
  );
};

export default TableHeader;
