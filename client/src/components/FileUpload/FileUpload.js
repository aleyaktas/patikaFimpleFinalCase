import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileUpload.module.css";
import Icon from "../../assets/icons/Icon";
import defaultFileIcon from "../../assets/icons/icons/default-file.svg";

const FileUplaod = ({ register, field, ...props }) => {
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
    // maxSize: 5242880,
    // accept: "image/*",
    // maxFiles: 3,
  });

  const removeFile = (e, fileName) => {
    e.stopPropagation();
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className={styles.dropzoneStyle}>
      <input {...getInputProps()} {...props} register={register} />
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

export default FileUplaod;
