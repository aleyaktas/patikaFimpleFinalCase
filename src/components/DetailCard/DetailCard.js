import Icon from "../../assets/icons/Icon";
import styles from "./DetailCard.module.css";

const DetailCard = ({ applicationDetail }) => {
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
      <div className={styles.backButtonContainer}>
        <button className={`${styles.button} ${styles.backButton}`}>
          <Icon name="Left" width="16px" color="black" />
          Geri
        </button>
      </div>
      <div className={styles.detailHeaderContainer}>
        <p className={styles.name}>{assignee}</p>
        <div>
          <p className={styles.applicationId}>#{trackingId}</p>
          <select className={styles.statusSelect}>
            <option>Tamamlandı</option>
            <option>Bekliyor</option>
            <option>İptal Edildi</option>
          </select>
        </div>
      </div>
      <div className={styles.detailHeaderInformationContainer}>
        <div className={styles.detailHeaderInformations}>
          <div className={styles.detailHeaderInformation}>
            <p className={styles.detailInformationText}>Yaş:</p>
            <p>{age}</p>
          </div>
          <div className={styles.detailHeaderInformation}>
            <p className={styles.detailInformationText}>Kimlik Numarası:</p>
            <p>{identifier}</p>
          </div>
          <div className={styles.detailHeaderInformation}>
            <p className={styles.detailInformationText}>Başvuru Tarihi:</p>
            <p>{date}</p>
          </div>
        </div>
        <div className={styles.address}>
          <p>{address} </p>
        </div>
      </div>

      <div
        style={{
          padding: "16px 0",
        }}
      >
        <p className={styles.detailInformationText}>Başvuru Nedeni</p>
        <p>{subject}</p>
      </div>
      <div>
        <p className={styles.detailInformationText}>Ekler</p>
        <p> 1,2,3</p>
      </div>
      <button className={`${styles.button} ${styles.replyButton}`}>
        <Icon name="Reply" width="16px" color="white" />
        Cevapla
      </button>
    </>
  );
};

export default DetailCard;
