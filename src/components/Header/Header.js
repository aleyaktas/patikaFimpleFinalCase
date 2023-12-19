import logo from "../../assets/icons/logo.svg";
import styles from "./Header.module.css";

const Header = () => {
  const links = [
    {
      name: "Home",
      hred: "/basvuru-olustur",
    },
    {
      name: "Başvuru Sorgula",
      hred: "/basvuru-sorgula",
    },
    {
      name: "Admin",
      hred: "/admin",
    },
  ];
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" width={120} />
      <div className={styles.buttons}>
        {links.map((link, index) => (
          <button className={styles.button} key={index}>
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
