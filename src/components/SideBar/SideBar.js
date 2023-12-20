import styles from "./SideBar.module.css";
import Icon from "../../assets/icons/Icon";

const SideBar = () => {
  const menuItems = [
    { name: "Dashboard", iconName: "Dashboard", href: "/admin/dashboard" },
    {
      name: "Application List",
      iconName: "ApplicationList",
      href: "/admin/applicationList",
    },
    { name: "Theme", iconName: "Theme", href: "/admin/dashboard" },
    { name: "Logout", iconName: "Logout", href: "/admin" },
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
