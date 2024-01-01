import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import styles from "./FileUpload.module.css";
import Icon from "../../assets/icons/Icon";
import defaultFileIcon from "../../assets/icons/icons/default-file.svg";

const FileUplaod = ({ field, ...props }) => {
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
    field.onChange(files);
  }, [files]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const removeFile = (e, fileName) => {
    e.stopPropagation();
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className={styles.dropzoneStyle}>
      <input {...getInputProps()} {...props} accept=".jpeg, .jpg, .png, .pdf" />
      <div className={styles.dropzoneTitleHeader}>
        <Icon name="Upload" className={styles.icon} />
        <p>Bir dosyayı buraya sürükleyip bırakın veya tıklayın</p>
      </div>
      <ul className={styles.fileListStyle}>
        {files.map((file, index) => (
          <div className={styles.fileContainer} key={`${index}-${file.name}`}>
            <li
              style={{
                backgroundImage: previewUrls[file.name]
                  ? `url(${previewUrls[file.name]})`
                  : `url(${defaultFileIcon})`,
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
            <p className={styles.fileName}>{file.name}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

FileUplaod.propTypes = {
  field: PropTypes.object.isRequired,
};

export default FileUplaod;
