import Files from "../Files/Files";
import styles from "./DetailsCard.module.css";

const DetailsCard = ({ applicationDetail }) => {
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

  return (
    <>
      <div className={styles.detailHeaderContainer}>
        <p className={styles.name}>{assignee}</p>
        <div>
          <p className={styles.applicationId}>#{trackingId}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
      <div className={styles.headerInformations}>
        <p className={styles.headerInformation}>Yaş: {age}</p>
        <p className={styles.headerInformation}>
          Kimlik Numarası: {identifier}
        </p>
        <p className={styles.headerInformation}>Adres: {address} </p>
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
    </>
  );
};

export default DetailsCard;
