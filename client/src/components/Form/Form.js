import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./Form.module.css";
import FileUpload from "../../components/FileUpload/FileUpload";

const Form = ({ formSubmit }) => {
  const schema = Yup.object({
    name: Yup.string().required("Ad zorunlu"),
    surname: Yup.string().required("Soyad zorunlu"),
    age: Yup.number()
      .typeError("Yaş bir sayı olmalıdır")
      .positive("Yaş pozitif bir sayı olmalıdır")
      .integer("Yaş tam sayı olmalıdır")
      .required("Yaş zorunlu"),
    identity: Yup.string()
      .required("TC zorunlu")
      .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, "Geçersiz TC Kimlik Numarası")
      .length(11, "TC Kimlik Numarası 11 haneli olmalıdır"),
    reason: Yup.string().required("Başvuru Nedeni zorunlu"),
    address: Yup.string()
      .required("Adres Bilgisi zorunlu")
      .max(200, "Adres bilgisi 200 karakterden uzun olamaz"),
    files: Yup.mixed()
      .test(
        "fileCount",
        "En fazla 3 dosya seçebilirsiniz",
        (files) => files?.length <= 3
      )
      .test("totalSize", "Toplam dosya boyutu 5 MB'ı aşamaz", (files) => {
        if (!files) return true;
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        const maxSize = 5 * 1024 * 1024;
        return totalSize <= maxSize;
      }),
  }).required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
          type="text"
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
