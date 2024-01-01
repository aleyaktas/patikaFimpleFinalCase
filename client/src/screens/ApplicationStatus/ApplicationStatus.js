import { useNavigate } from "react-router-dom";
import styles from "./ApplicationStatus.module.css";
import status from "../../assets/icons/icons/application-status.svg";
import DefaultTemplate from "../../layouts/DefaultTemplate/DefaultTemplate";
import { applicationStatusSchema } from "../../helpers/yupSchemes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const ApplicationStatus = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicationStatusSchema),
  });

  const onSubmit = async (data) => {
    navigate(`/basvuru-sorgula/${data.code}`);
  };

  return (
    <DefaultTemplate>
      <form className={styles.statusCard} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Başvuru Durumu Sorgula</p>
        <img className={styles.statusImg} src={status} alt="status" />
        <div className={styles.applicationStatusContainer}>
          <div className={styles.inputContainer}>
            <input
              id="code"
              type="text"
              aria-label="Başvuru Kodu"
              {...register("code")}
              className={styles.statusInput}
              placeholder="Başvuru Sorgula..."
            />
            {errors.code && (
              <p className={styles.errorMessage}>{errors.code.message}</p>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Sorgula
          </button>
        </div>
      </form>
    </DefaultTemplate>
  );
};

export default ApplicationStatus;
