import { useState } from "react";
import styles from "./Files.module.css";
import ImageModal from "../ImageModal/ImageModal";

const Files = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={image}
          onClick={() => openModal(index)}
          className={styles.image}
        />
      ))}
      {isModalOpen && (
        <ImageModal
          image={images[selectedImageIndex]}
          onClose={closeModal}
          onPrevious={gotoPrevious}
          onNext={gotoNext}
        />
      )}
    </div>
  );
};

export default Files;
