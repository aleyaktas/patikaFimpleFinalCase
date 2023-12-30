import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Form.module.css";
import FileUpload from "../../components/FileUpload/FileUpload";
import { createFormSchema } from "../../helpers/yupSchemes";

const Form = ({ formSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createFormSchema),
  });

  const onSubmit = (data) => {
    formSubmit(data);
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
        <label htmlFor="identity">TC</label>
        <input
          {...register("identity")}
          type="text"
          id="identity"
          className={styles.formInput}
        />
        {errors.identity && (
          <p className={styles.errorMessage}>{errors.identity.message}</p>
        )}
      </div>

      <div className={styles.formElement}>
        <label htmlFor="age">Age</label>
        <input
          {...register("age")}
          type="number"
          id="age"
          className={styles.formInput}
        />
        {errors.age && (
          <p className={styles.errorMessage}>{errors.age.message}</p>
        )}
      </div>
      <div className={`${styles.formElement} ${styles.largeHeight}`}>
        <label htmlFor="reason">Başvuru Nedeni</label>
        <textarea
          {...register("reason")}
          id="reason"
          className={`${styles.formInput} ${styles.textarea}`}
        />
        {errors.reason && (
          <p className={styles.errorMessage}>{errors.reason.message}</p>
        )}
      </div>
      <div className={`${styles.formElement} ${styles.largeHeight}`}>
        <label htmlFor="address">Adres Bilgisi</label>
        <textarea
          {...register("address")}
          id="address"
          className={`${styles.formInput} ${styles.textarea}`}
        />
        {errors.address && (
          <p className={styles.errorMessage}>{errors.address.message}</p>
        )}
      </div>
      <div className={styles.formElement}>
        <label htmlFor="files">Belge Ekle</label>
        <Controller
          name="files"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <FileUpload
              id="files"
              name="files"
              register={register("files")}
              field={field}
            />
          )}
        />
        {errors.files && (
          <p className={styles.errorMessage}>{errors.files.message}</p>
        )}
      </div>
      <button type="submit" className={styles.formSubmitButton}>
        Gönder
      </button>
    </form>
  );
};

export default Form;
