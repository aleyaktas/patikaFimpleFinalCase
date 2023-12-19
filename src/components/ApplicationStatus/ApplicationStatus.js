import styles from "./ApplicationStatus.module.css";
import status from "../../assets/icons/application-status.svg";

const ApplicationStatus = () => {
  return (
    <div className={styles.container}>
      <div className={styles.statusCard}>
        <p className={styles.title}>Başvuru Durumu Sorgula</p>
        <img className={styles.statusImg} src={status} alt="status" />
        <div className={styles.inputContainer}>
          <input
            className={styles.statusInput}
            placeholder="Başvuru Sorgula..."
          />
          <button className={styles.button}>Sorgula</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
