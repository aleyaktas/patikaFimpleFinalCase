import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./AdminTemplate.module.css";
import Icon from "../../assets/icons/Icon";

const AdminTemplate = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={styles.container}>
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <button className={styles.menuButton} onClick={toggleSidebar}>
        <Icon name="Menu" width="24px" />
      </button>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default AdminTemplate;
