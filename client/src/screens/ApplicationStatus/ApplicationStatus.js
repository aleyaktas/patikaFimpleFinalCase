import styles from "./ApplicationStatus.module.css";
import status from "../../assets/icons/icons/application-status.svg";
import DefaultTemplate from "../../layout/DefaultTemplate/DefaultTemplate";
import { useNavigate } from "react-router-dom";
import { getFormByCode } from "../../services/actions";
import { useEffect, useState } from "react";

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState();

  useEffect(() => {
    console.log(code);
  }, [code]);

  return (
    <DefaultTemplate>
      <div className={styles.statusCard}>
        <p className={styles.title}>Başvuru Durumu Sorgula</p>
        <img className={styles.statusImg} src={status} alt="status" />
        <div className={styles.inputContainer}>
          <input
            className={styles.statusInput}
            placeholder="Başvuru Sorgula..."
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => code && navigate(`/basvuru-sorgula/${code}`)}
          >
            Sorgula
          </button>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default ApplicationStatus;
