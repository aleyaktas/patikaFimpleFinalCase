import PropTypes from "prop-types";
import styles from "./DetailsCard.module.css";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import getStatusInfo from "../../helpers/applicationStatus";
import { statusOptions } from "../../constants/applicationStatus";
import { useAuthContext } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";
import { useLoadingContext } from "../../contexts/Loading";
import getFullName from "../../helpers/getFullName";
import { getDate, getDateTime } from "../../helpers/getDate";
import { useEffect, useState } from "react";
import Files from "../Files/Files";
import Down from "../../assets/icons/icons/down.svg";
import Up from "../../assets/icons/icons/up.svg";

const DetailsCard = ({ applicationDetails, handleSave }) => {
  const { token } = useAuthContext();
  const { loading } = useLoadingContext();
  const [selectedOption, setSelectedOption] = useState();
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    setSelectedOption(applicationDetails.status);
  }, [applicationDetails.status]);

  const { statusText, statusClass } = getStatusInfo(applicationDetails?.status);

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <p className={styles.applicationId}>
          Başvuru-{applicationDetails.code}
        </p>
        <div className={styles.statusContainer}>
          <div className={styles[statusClass]} />
          {statusText}
        </div>
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.name}>
          {!loading &&
            getFullName(applicationDetails.name, applicationDetails.surname)}
        </p>
        <p className={styles.date}>{getDate(applicationDetails.createdAt)}</p>
      </div>
      <div className={styles.informations}>
        <p className={styles.information}>
          <span className={styles.informationText}>Yaş: </span>
          {applicationDetails.age}
        </p>
        <p className={styles.information}>
          <span className={styles.informationText}>Kimlik Numarası: </span>
          {applicationDetails.identity}
        </p>
        <p className={styles.information}>
          <span className={styles.informationText}>Adres: </span>
          {applicationDetails.address}
        </p>
      </div>
      <div className={styles.bodyInformations}>
        <div>
          <p className={styles.informationText}>Başvuru Nedeni</p>
          <p>{applicationDetails.reason}</p>
        </div>
        <div>
          <p className={styles.informationText}>Ekler</p>
          {applicationDetails.files?.length > 0 ? (
            <Files files={applicationDetails.files} />
          ) : (
            <p>Ek Bulunamadı</p>
          )}
        </div>
        <div>
          <div className={styles.commentTitle}>
            <p className={styles.informationText}>
              Cevaplar ({applicationDetails.comments?.length})
            </p>
            <button
              className={styles.showCommentButton}
              onClick={() => setShowComment(!showComment)}
            >
              <img
                className={styles.icon}
                src={showComment ? Up : Down}
                width="24"
                height="24"
              />
            </button>
          </div>
          {showComment &&
            (applicationDetails.comments.length > 0 ? (
              applicationDetails.comments.map((item) => (
                <div key={item.commentId}>
                  <p className={styles.commentDate}>
                    {getDateTime(item.createdAt)}
                  </p>
                  <p>{item.comment}</p>
                </div>
              ))
            ) : (
              <p>Henüz Cevaplanmamış</p>
            ))}
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
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
          </div>
          <DropdownMenu
            options={statusOptions}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
          <button
            className={styles.replyButton}
            onClick={() => {
              handleSave(selectedOption, comment);
              setComment("");
            }}
            disabled={loading}
          >
            Kaydet
          </button>
        </div>
      )}
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
    </>
  );
};

DetailsCard.propTypes = {
  applicationDetails: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default DetailsCard;
