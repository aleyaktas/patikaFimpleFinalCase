import Icon from "../../../assets/icons/Icon";
import styles from "./TableBody.module.css";

const TableBody = ({ tableData }) => {
  return (
    <div className={styles.tableContainer}>
      {tableData.map((item, index) => {
        return (
          <div key={index} className={styles.tableRow}>
            <div className={styles.tableData}>{item.assignee}</div>
            <div className={styles.tableData}>{item.subject}</div>
            <div
              className={`${styles.tableData} ${
                styles[`status-${item.status.replace(/\s/g, "").toLowerCase()}`]
              }`}
            >
              {item.status}
            </div>
            <div className={styles.tableData}>{item.lastUpdate}</div>
            <div className={styles.tableData}>{item.trackingId}</div>
            <div className={styles.tableData}>
              <button className={styles.detailButton}>
                Detay <Icon name="Right" color="white" width="16px" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;
