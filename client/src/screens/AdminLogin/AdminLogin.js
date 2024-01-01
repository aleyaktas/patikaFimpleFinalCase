import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./AdminLogin.module.css";
import DefaultTemplate from "../../layouts/DefaultTemplate/DefaultTemplate";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/actions";
import { useAuthContext } from "../../contexts/AuthContext";
import { adminLoginSchema } from "../../helpers/yupSchemes";
import { showMessage } from "../../helpers/showMessage";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminLoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await adminLogin(data);
      if (res.msg) {
        return showMessage(res.msg, "error");
      }
      navigate("/admin/panel");
      await login(res.token);
    } catch (error) {
      console.log(error);
    }
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
        <button type="submit" className={styles.button}>
          Giriş
        </button>
      </form>
    </DefaultTemplate>
  );
};

export default AdminLogin;
