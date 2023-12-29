import loading from "../../assets/gif/loading.gif";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img src={loading} width={150} height={150} />
    </div>
  );
};

export default Loading;
