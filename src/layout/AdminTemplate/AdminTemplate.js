import SideBar from "../../components/SideBar/SideBar";
import styles from "./AdminTemplate.module.css";

const AdminTemplate = ({ children }) => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default AdminTemplate;
