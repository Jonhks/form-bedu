import { useContext } from "react";
import styles from "./Navigation.module.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navigation = () => {
  const { isLoggedIn, onLogout } = useContext(AuthContext);

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Public</Link>
        </li>
        <li>
          <Link to="/gallery">Galería</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Button
              color="secondary"
              onClick={onLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
