import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./Form.module.css";

const Form = () => {
  const schema = Yup.object({
    name: Yup.string().required("Ad zorunlu"),
    surname: Yup.string().required("Soyad zorunlu"),
    idNumber: Yup.string().required("TC zorunlu"),
    applicationReason: Yup.string().required("Başvuru Nedeni zorunlu"),
    address: Yup.string().required("Adres Bilgisi zorunlu"),
    photograph: Yup.mixed().test(
      "required",
      "Dosya Seçimi zorunlu",
      (files) => files?.length > 0
    ),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formElements}>
      <div className={styles.formElement}>
        <label htmlFor="name">Ad</label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={styles.formInput}
        />
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}
      </div>

      <div className={styles.formElement}>
        <label htmlFor="surname">Soyad</label>
        <input
          {...register("surname")}
          type="text"
          id="surname"
          className={styles.formInput}
        />
        {errors.surname && (
          <p className={styles.errorMessage}>{errors.surname.message}</p>
        )}
      </div>

      <div className={styles.formElement}>
        <label htmlFor="idNumber">TC</label>
        <input
          {...register("idNumber")}
          type="text"
          id="idNumber"
          className={styles.formInput}
        />
        {errors.idNumber && (
          <p className={styles.errorMessage}>{errors.idNumber.message}</p>
        )}
      </div>

      <div className={`${styles.formElement} ${styles.largeHeight}`}>
        <label htmlFor="applicationReason">Başvuru Nedeni</label>
        <textarea
          {...register("applicationReason")}
          id="applicationReason"
          className={styles.formInput}
        />
        {errors.applicationReason && (
          <p className={styles.errorMessage}>
            {errors.applicationReason.message}
          </p>
        )}
      </div>

      <div className={`${styles.formElement} ${styles.largeHeight}`}>
        <label htmlFor="address">Adres Bilgisi</label>
        <textarea
          {...register("address")}
          id="address"
          className={styles.formInput}
        />
        {errors.address && (
          <p className={styles.errorMessage}>{errors.address.message}</p>
        )}
      </div>

      <div className={styles.formElement}>
        <label htmlFor="photograph">Fotoğraf Ekle</label>
        <input
          {...register("photograph")}
          type="file"
          id="photograph"
          accept="image/jpeg, image/png, image/gif"
        />
        {errors.photograph && (
          <p className={styles.errorMessage}>{errors.photograph.message}</p>
        )}
      </div>

      <button type="submit" className={styles.formSubmitButton}>
        Gönder
      </button>
    </form>
  );
};

export default Form;
