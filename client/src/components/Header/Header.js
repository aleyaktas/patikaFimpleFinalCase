import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedItem, setSelectedItem] = useState(pathname);

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

  const handleSelect = (href) => {
    setSelectedItem(href);
    navigate(href);
  };

  return (
    <div className={styles.container}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <div className={styles.buttons}>
        {links.map((link, index) => (
          <button
            onClick={() => handleSelect(link.href)}
            className={`${styles.button} ${
              selectedItem === link.href && styles.active
            }`}
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
