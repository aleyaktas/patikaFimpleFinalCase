import Header from "../../components/Header/Header";
import styles from "./DefaultTemplate.module.css";

const DefaultTemplate = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default DefaultTemplate;
