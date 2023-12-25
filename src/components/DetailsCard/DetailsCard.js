import { useState } from "react";
import Files from "../Files/Files";
import styles from "./DetailsCard.module.css";

const DetailsCard = ({ applicationDetail }) => {
  const [isAuthToken, setIsAuthToken] = useState();
  const {
    assignee,
    trackingId,
    status,
    age,
    identifier,
    subject,
    date,
    address,
    files,
  } = applicationDetail;

  const StatusTexts = {
    0: "Bekliyor",
    1: "İptal Edildi",
    default: "Tamamlandı",
  };

  const statusText = StatusTexts[status] || StatusTexts.default;
  const statusClass = styles[`status-${status}`];

  return (
    <>
      <div className={styles.headerContainer}>
        <p className={styles.applicationId}>Başvuru-{trackingId}</p>
        <div className={styles.statusContainer}>
          <div className={statusClass} />
          {statusText}
        </div>
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.name}>{assignee}</p>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.informations}>
        <p className={styles.information}>Yaş: {age}</p>
        <p className={styles.information}>Kimlik Numarası: {identifier}</p>
        <p className={styles.information}>Adres: {address} </p>
      </div>
      <div className={styles.bodyInformations}>
        <div>
          <p className={styles.informationText}>Başvuru Nedeni</p>
          <p>{subject}</p>
        </div>
        <div>
          <p className={styles.informationText}>Ekler</p>
          <Files images={files} />
        </div>
      </div>
      {isAuthToken && (
        <div className={styles.answerContainer}>
          <h2>Başvuruyu Cevapla</h2>
          <div>
            <label>Mesajın</label>
            <textarea
              className={styles.messageText}
              placeholder="Mesajınızı Yazınız..."
            />
          </div>
          <div>
            <label>Başvuru Durumu</label>
            <select className={styles.select}>
              <option>Tamamlandı</option>
              <option>Bekliyor</option>
              <option>İptal Edildi</option>
            </select>
            <button className={`${styles.button} ${styles.replyButton}`}>
              Kaydet
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsCard;
