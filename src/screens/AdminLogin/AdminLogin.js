import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AdminLogin.module.css";
import DefaultTemplate from "../../layout/DefaultTemplate/DefaultTemplate";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Kullanıcı adı zorunlu"),
  password: yup.string().required("Şifre zorunlu"),
});

const AdminLogin = () => {
  const navigate = useNavigate();

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
    <DefaultTemplate>
      <form className={styles.loginCard} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.title}>Giriş Yap</p>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            aria-label="Kullanıcı Adı"
            {...register("username")}
          />
          {errors.username && (
            <p className={styles.errorMessage}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            type="password"
            aria-label="Şifre"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <button
          onClick={() => navigate("/admin-dashboard")}
          type="submit"
          className={styles.button}
        >
          Giriş
        </button>
      </form>
    </DefaultTemplate>
  );
};

export default AdminLogin;
