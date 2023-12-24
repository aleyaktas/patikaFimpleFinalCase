import styles from "./TableBody.module.css";

const TableBody = ({ tableData, onClick }) => {
  return (
    <>
      {tableData.map((item, index) => {
        return (
          <tr key={index} className={styles.tableRow}>
            <td className={styles.tableData}>{item.assignee}</td>
            <td className={styles.tableData}>{item.subject}</td>
            <td className={styles.statusContainer}>
              <div
                className={`${
                  styles[
                    `status-${item.status.replace(/\s/g, "").toLowerCase()}`
                  ]
                }`}
              />
              {item.status}
            </td>
            <td className={styles.tableData}>{item.lastUpdate}</td>
            <td className={`${styles.tableData} ${styles.hidden}`}>
              {item.trackingId}
            </td>
            <td className={styles.button}>
              <button onClick={() => onClick()} className={styles.detailButton}>
                Detay
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TableBody;
