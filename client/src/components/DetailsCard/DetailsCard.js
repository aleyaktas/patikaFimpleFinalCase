import Files from "../Files/Files";
import styles from "./DetailsCard.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import getStatusInfo from "../../helpers/applicationStatus";
import { statusOptions } from "../../constants/applicationStatus";
import { useAuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";
import { useLoadingContext } from "../../contexts/Loading";
import getFullName from "../../helpers/getFullName";
import getDate from "../../helpers/getDate";

const DetailsCard = ({ applicationDetail }) => {
  const { token } = useAuthContext();
  const { loading } = useLoadingContext();

  if (loading) {
    return <Loading />;
  }

  const { statusText, statusClass } = getStatusInfo(applicationDetail?.status);

  return (
    <>
      <div className={styles.headerContainer}>
        <p className={styles.applicationId}>Başvuru-{applicationDetail.code}</p>
        <div className={styles.statusContainer}>
          <div className={styles[statusClass]} />
          {statusText}
        </div>
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.name}>
          {getFullName(applicationDetail.name, applicationDetail.surname)}
        </p>
        <p className={styles.date}>{getDate(applicationDetail.createdAt)}</p>
      </div>
      <div className={styles.informations}>
        <p className={styles.information}>Yaş: {applicationDetail.age}</p>
        <p className={styles.information}>
          Kimlik Numarası: {applicationDetail.identity}
        </p>
        <p className={styles.information}>
          Adres: {applicationDetail.address}{" "}
        </p>
      </div>
      <div className={styles.bodyInformations}>
        <div>
          <p className={styles.informationText}>Başvuru Nedeni</p>
          <p>{applicationDetail.reason}</p>
        </div>
        <div>
          <p className={styles.informationText}>Ekler</p>
          {/* <Files images={applicationDetail.files} /> */}
        </div>
      </div>
      {token && (
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
