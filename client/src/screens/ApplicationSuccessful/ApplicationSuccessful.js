import { useState } from "react";
import Icon from "../../assets/icons/Icon";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import DefaultTemplate from "../../layouts/DefaultTemplate/DefaultTemplate";
import styles from "./ApplicationSuccessful.module.css";
import { useLocation } from "react-router-dom";

const ApplicationSuccessful = () => {
  const location = useLocation();
  const detailData = location.state?.data;

  const [copySuccess, setCopySuccess] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyFeedback = (message) => {
    setCopySuccess(message);
    if (message === "Kopyalandı!") setIsCopied(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(detailData.identifier).then(
      () => handleCopyFeedback("Kopyalandı!"),
      () => handleCopyFeedback("Kopyalama Başarısız!")
    );
  };

  return (
    <DefaultTemplate>
      <div className={styles.container}>
        <div className={styles.messageContainer}>
          <Icon name="Success" width="100px" height="100px" color="#00BE64" />
          <p className={styles.messageTitle}>Teşekkürler!</p>
          <p>Başvurunuz Başarıyla Alınmıştır</p>
          <div className={styles.copyContainer}>
            Başvuru sorgulama numaranız:
            <button onClick={copyToClipboard} className={styles.copyButton}>
              <Icon
                name={isCopied ? "CopyTick" : "Copy"}
                color={isCopied && "#00BE64"}
                width="24px"
                height="24px"
              />
            </button>
            {detailData.code}
          </div>
        </div>
        <DetailsCard applicationDetail={detailData} />
      </div>
    </DefaultTemplate>
  );
};

export default ApplicationSuccessful;
