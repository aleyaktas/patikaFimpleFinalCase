import { useState } from "react";
import styles from "./SideBar.module.css";
import Icon from "../../assets/icons/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/images/light-logo.png";

const SideBar = ({ sidebarVisible, toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(location.pathname);

  const menuItems = [
    { name: "Panel", iconName: "Dashboard", href: "/admin/panel" },
    {
      name: "Başvuru Listesi",
      iconName: "ApplicationList",
      href: "/admin/basvuru-listesi",
    },
    { name: "Çıkış Yap", iconName: "Logout", href: "/admin" },
  ];

  const handleSelect = (item) => {
    navigate(item.href);
    item.iconName === "Logout" && logout();
    setSelectedItem(item.name);
  };

  return (
    <div
      className={`${styles.sideBar}`}
      style={{
        transform: !sidebarVisible && "translateX(0)",
      }}
    >
      <button
        className={`${styles.closeButton} ${
          sidebarVisible ? styles.showButton : ""
        }`}
        onClick={toggleSidebar}
      >
        <Icon name="Close" color="white" />
      </button>

      <ul className={styles.sideBarItems}>
        <img src={logo} alt="logo" className={styles.logo} />
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`${styles.sideBarItem} ${
              selectedItem === item.href && styles.active
            }`}
            onClick={() => handleSelect(item)}
          >
            <Icon name={item.iconName} className={styles.sidebarIcon} />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
