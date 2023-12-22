import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileUpload.module.css";
import Icon from "../../assets/icons/Icon";

const FileUplaod = () => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({});

  useEffect(() => {
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls((prevUrls) => ({
            ...prevUrls,
            [file.name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  }, [files]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => {
      const newTotal = prevFiles.length + acceptedFiles.length;
      if (newTotal > 3) {
        const filesToAdd = 3 - prevFiles.length;
        return [...prevFiles, ...acceptedFiles.slice(0, filesToAdd)];
      }
      return [...prevFiles, ...acceptedFiles];
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 3,
  });

  const removeFile = (event, fileName) => {
    event.stopPropagation();
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className={styles.dropzoneStyle}>
      <input {...getInputProps()} />
      {files.length === 0 && (
        <div className={styles.dropzoneTitleHeader}>
          <Icon name="Upload" className={styles.icon} />
          <p>Bir dosyayı buraya sürükleyip bırakın veya tıklayın</p>
        </div>
      )}

      <ul className={styles.fileListStyle}>
        {files.map((file) => (
          <li
            key={file.name}
            style={{
              backgroundImage: `url(${previewUrls[file.name]})`,
            }}
            className={styles.fileItemStyle}
          >
            <button
              onClick={(e) => removeFile(e, file.name)}
              className={styles.removeButtonStyle}
            >
              <Icon name="Close" className={styles.closeIcon} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUplaod;
