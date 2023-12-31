import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Başvuru Sorgula",
      href: "/basvuru-sorgula",
    },
    {
      name: "Admin",
      href: "/admin",
    },
  ];
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <div className={styles.buttons}>
        {links.map((link, index) => (
          <button
            onClick={() => navigate(link.href)}
            className={styles.button}
            key={index}
          >
            {link.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
