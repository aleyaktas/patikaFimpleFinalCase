import styles from "./SideBar.module.css";
import Icon from "../../assets/icons/Icon";

const SideBar = () => {
  const menuItems = [
    { name: "Panel", iconName: "Dashboard", href: "/admin/dashboard" },
    {
      name: "Başvuru Listesi",
      iconName: "ApplicationList",
      href: "/admin/applicationList",
    },
    { name: "Tema", iconName: "Theme", href: "/admin/dashboard" },
    { name: "Çıkış Yap", iconName: "Logout", href: "/admin" },
  ];
  return (
    <div className={styles.sideBar}>
      <Icon color="white" name="Logo" width="300px" />
      <ul className={styles.sideBarItems}>
        {menuItems.map((item) => (
          <li key={item.name} className={styles.sideBarItem}>
            <Icon name={item.iconName} color="#a8a9af" />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
