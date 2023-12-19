import styles from "./Form.module.css";

const Form = () => {
  const formElements = [
    { name: "Ad", type: "text" },
    { name: "Soyad", type: "text" },
    { name: "TC", type: "text" },
    { name: "Başvuru Nedeni", type: "textarea" },
    { name: "Adres Bilgisi", type: "textarea" },
    { name: "Fotoğraf Ekle", type: "file" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.formElements}>
        {formElements.map(({ name, type }, index) => (
          <div
            className={`${styles.formElement} ${
              type === "textarea" ? styles.largeHeight : ""
            }`}
            key={index}
          >
            <label htmlFor={name}>{name}</label>
            {type === "file" ? (
              <div className={styles.fileUpload}>
                <input
                  className={styles.formInput}
                  type="file"
                  id={name}
                  name={name.toLowerCase()}
                />
              </div>
            ) : type === "textarea" ? (
              <textarea
                className={`${styles.formInput} ${styles.textarea}`}
                id={name}
                name={name.toLowerCase()}
              />
            ) : (
              <input
                className={styles.formInput}
                type="text"
                id={name}
                name={name.toLowerCase()}
              />
            )}
          </div>
        ))}
        <button className={styles.formSubmitButton} type="submit">
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Form;
