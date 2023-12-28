import { useState } from "react";
import Files from "../Files/Files";
import styles from "./DetailsCard.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import getStatusInfo from "../../helper/applicationStatus";
import { statusOptions } from "../../constants/applicationStatus";

const DetailsCard = ({ applicationDetail }) => {
  const [isAuthToken, setIsAuthToken] = useState(false);
  const { name, code, status, age, identity, reason, date, address, files } =
    applicationDetail;

  const { statusText, statusClass } = getStatusInfo(status);

  return (
    <>
      <div className={styles.headerContainer}>
        <p className={styles.applicationId}>Başvuru-{code}</p>
        <div className={styles.statusContainer}>
          <div className={styles[statusClass]} />
          {statusText}
        </div>
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.name}>{name}</p>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.informations}>
        <p className={styles.information}>Yaş: {age}</p>
        <p className={styles.information}>Kimlik Numarası: {identity}</p>
        <p className={styles.information}>Adres: {address} </p>
      </div>
      <div className={styles.bodyInformations}>
        <div>
          <p className={styles.informationText}>Başvuru Nedeni</p>
          <p>{reason}</p>
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
          <DropdownMenu options={statusOptions} />
        </div>
      )}
    </>
  );
};

export default DetailsCard;
