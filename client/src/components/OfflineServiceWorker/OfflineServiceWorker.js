import styles from "./OfflineServiceWorker.module.css";

const OfflineServiceWorker = () => {
  return (
    <div className={`${styles.body} ${styles.offline}`}>
      <p>
        İnternet bağlantınız bulunamadı, bağlantıyı sağladıktan sonra sayfayı
        yenileyin.
      </p>
      <button
        onClick={() => window.location.reload()}
        className={styles.refreshButton}
      >
        Yenile
      </button>
    </div>
  );
};

export default OfflineServiceWorker;
