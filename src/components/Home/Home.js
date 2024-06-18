import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import styles from "./Home.module.css";
import useHttp from "../../hooks/usehttp";

const Home = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { isLoading, error, request } = useHttp();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      const url = `${process.env.REACT_APP_BASE_URL}/users.json?orderBy="$key"&equalTo="${userId}"`;

      const data = await request({ url });
      console.log(url);
      setUser({
        firstName: data[userId].first_name,
        lastName: data[userId].last_name,
        email: data[userId].email,
      });
    };

    fetchUser();
  }, [request]);

  const loadingMessage = <h2>Cargando...</h2>;

  const errorMessage = <h2>{error}</h2>;

  return (
    <Card className={styles.home}>
      {isLoading && loadingMessage}
      {error && errorMessage}
      {!isLoading && !error && (
        <>
          <h1>¡Bienvenido!</h1>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </>
      )}
    </Card>
  );
};

export default Home;
