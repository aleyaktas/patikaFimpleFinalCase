import { useLoadingContext } from "../../../context/Loading";
import getStatusInfo from "../../../helper/applicationStatus";
import Loading from "../../Loading/Loading";
import styles from "./TableBody.module.css";

const TableBody = ({ tableData, onClick }) => {
  const { loading } = useLoadingContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {tableData.length > 0 ? (
        tableData.map((item, index) => {
          const { statusText, statusClass } = getStatusInfo(item.status);
          return (
            <tr key={index} className={styles.tableRow}>
              <td className={styles.tableData}>{item.name}</td>
              <td className={styles.tableData}>{item.reason}</td>
              <td className={styles.statusContainer}>
                <div className={styles[statusClass]} />
                {statusText}
              </td>
              <td className={styles.tableData}>{item.createdAt}</td>
              <td className={`${styles.tableData} ${styles.hidden}`}>
                {item.code}
              </td>
              <td className={styles.button}>
                <button
                  onClick={() => onClick()}
                  className={styles.detailButton}
                >
                  Detay
                </button>
              </td>
            </tr>
          );
        })
      ) : (
        <p className={styles.notFoundMessage}>Sonuç Bulunamadı</p>
      )}
    </>
  );
};

export default TableBody;
