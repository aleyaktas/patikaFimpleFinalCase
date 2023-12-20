import SideBar from "../../components/SideBar/SideBar";
import styles from "./AdminTemplate.module.css";

const AdminTemplate = ({ children }) => {
  return (
    <div className={styles.container}>
      <SideBar />
      {children}
    </div>
  );
};

export default AdminTemplate;
