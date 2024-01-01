import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Files.module.css";
import ImageModal from "../ImageModal/ImageModal";
import { isImage } from "../../helpers/imageControl";
import defaultFile from "../../assets/icons/icons/default-file.svg";
import { BASE_URL } from "../../services";

const Files = ({ files }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = files.filter((file) => isImage(file));
  const documents = files.filter((file) => !isImage(file));

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const gotoPrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const gotoNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        gotoPrevious();
      } else if (e.key === "ArrowRight") {
        gotoNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex, images.length]);

  const getFileName = (filePath) => {
    const index = filePath.indexOf("-");
    return index !== -1 ? filePath.substring(index + 1) : null;
  };

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div key={index} className={styles.fileContainer}>
          <img
            key={index}
            src={`${BASE_URL}/${image}`}
            alt={image}
            onClick={() => openModal(index)}
            className={styles.image}
          />
          <p className={styles.fileName}>{getFileName(image)}</p>
        </div>
      ))}
      {documents.map((document, index) => (
        <div key={index} className={styles.fileContainer}>
          <img
            src={defaultFile}
            alt={document}
            onClick={() => window.open(`${BASE_URL}/${document}`, "_blank")}
            className={styles.image}
          />
          <p className={styles.fileName}>{getFileName(document)}</p>
        </div>
      ))}
      {isModalOpen && (
        <ImageModal
          image={`${BASE_URL}/${images[selectedImageIndex]}`}
          onClose={closeModal}
          onPrevious={gotoPrevious}
          onNext={gotoNext}
        />
      )}
    </div>
  );
};

Files.propTypes = {
  files: PropTypes.array.isRequired,
};

export default Files;
