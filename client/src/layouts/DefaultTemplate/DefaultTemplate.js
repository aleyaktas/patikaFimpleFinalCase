import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../../components/Header/Header";
import styles from "./DefaultTemplate.module.css";
import OfflineServiceWorker from "../../components/OfflineServiceWorker/OfflineServiceWorker";

const DefaultTemplate = ({ children }) => {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) setOffline(true);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        {!offline ? <>{children}</> : <OfflineServiceWorker />}
      </div>
    </div>
  );
};

DefaultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultTemplate;
