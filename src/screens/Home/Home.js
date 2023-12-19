import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Form />
    </div>
  );
};

export default Home;
