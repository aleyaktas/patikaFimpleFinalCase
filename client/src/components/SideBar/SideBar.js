import styles from "./SideBar.module.css";
import Icon from "../../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const SideBar = ({ sidebarVisible, toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const menuItems = [
    { name: "Panel", iconName: "Dashboard", href: "/admin/panel" },
    {
      name: "Başvuru Listesi",
      iconName: "ApplicationList",
      href: "/admin/basvuru-listesi",
    },
    { name: "Tema", iconName: "Theme", href: "/admin/dashboard" },
    { name: "Çıkış Yap", iconName: "Logout", href: "/admin" },
  ];
  return (
    <div
      className={`${styles.sideBar}`}
      style={{
        transform: !sidebarVisible && "translateX(0)",
      }}
    >
      <button
        className={`${styles.closeButton} ${
          sidebarVisible && styles.showButton
        }`}
        onClick={toggleSidebar}
      >
        <Icon name="Close" color="white" />
      </button>
      <Icon color="white" name="Logo" width="300px" />
      <ul className={styles.sideBarItems}>
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={styles.sideBarItem}
            onClick={() => {
              navigate(item.href);
              item.iconName === "Logout" && logout();
            }}
          >
            <Icon name={item.iconName} color="#a8a9af" />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
