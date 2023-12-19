import AdminLogin from "../../components/AdminLogin/AdminLogin";
import ApplicationStatus from "../../components/ApplicationStatus/ApplicationStatus";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <AdminLogin />
    </div>
  );
};

export default Home;
