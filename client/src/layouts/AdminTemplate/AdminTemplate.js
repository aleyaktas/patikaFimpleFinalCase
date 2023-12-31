import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./AdminTemplate.module.css";
import Icon from "../../assets/icons/Icon";
import OfflineServiceWorker from "../../components/OfflineServiceWorker/OfflineServiceWorker";

const AdminTemplate = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) setOffline(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={styles.container}>
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <Icon name="Menu" width="24px" />
      </button>
      <div className={styles.body}>
        {!offline ? (
          <>{children}</>
        ) : (
          <div className={styles.offlineBody}>
            <OfflineServiceWorker />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTemplate;
