import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../contexts/Loading";
import getStatusInfo from "../../../helpers/applicationStatus";
import Loading from "../../Loading/Loading";
import styles from "./TableBody.module.css";
import getFullName from "../../../helpers/getFullName";
import { getDate } from "../../../helpers/getDate";

const TableBody = ({ tableData }) => {
  const { loading } = useLoadingContext();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {tableData?.length > 0 ? (
        tableData.map((item, index) => {
          const { statusText, statusClass } = getStatusInfo(item.status);
          return (
            <tr key={index} className={styles.tableRow}>
              <td className={styles.tableData}>
                {getFullName(item.name, item.surname)}
              </td>
              <td className={styles.tableData}>{item.reason}</td>
              <td className={styles.statusContainer}>
                <div className={styles[statusClass]} />
                {statusText}
              </td>
              <td className={styles.tableData}>{getDate(item.createdAt)}</td>
              <td className={`${styles.tableData} ${styles.hidden}`}>
                {item.code}
              </td>
              <td className={styles.button}>
                <button
                  onClick={() =>
                    navigate(`/admin/basvuru-listesi/${item.code}`)
                  }
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
