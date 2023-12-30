import Icon from "../../assets/icons/Icon";
import styles from "./ImageModal.module.css";

const ImageModal = ({ image, onClose, onPrevious, onNext }) => {
  if (!image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackdropClick} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className={styles.imageContainer}>
          <button onClick={onPrevious} className={styles.button}>
            <Icon
              name="Left"
              width="36px"
              height="36px"
              className={styles.icon}
            />
          </button>
          <img src={image} alt={image} className={styles.image} />
          <button onClick={onNext} className={styles.button}>
            <Icon
              name="Right"
              width="36px"
              height="36px"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
