import styles from "./ApplicationStatus.module.css";
import status from "../../assets/icons/icons/application-status.svg";
import DefaultTemplate from "../../layout/DefaultTemplate/DefaultTemplate";
import { useNavigate } from "react-router-dom";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  return (
    <DefaultTemplate>
      <div className={styles.statusCard}>
        <p className={styles.title}>Başvuru Durumu Sorgula</p>
        <img className={styles.statusImg} src={status} alt="status" />
        <div className={styles.inputContainer}>
          <input
            className={styles.statusInput}
            placeholder="Başvuru Sorgula..."
          />
          <button
            className={styles.button}
            onClick={() => navigate("/basvuru-sorgula/1")}
          >
            Sorgula
          </button>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default ApplicationStatus;
