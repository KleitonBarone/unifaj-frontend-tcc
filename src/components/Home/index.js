import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../slices/auth";
import styles from "./index.module.css";

function Home() {
  //history do navegador para redirecionar

  //pega o estado da store
  //const { isLoggedIn } = useSelector(state => state.auth);

  //pega uma action
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Front End TCC</h1>
        <h2>Unifaj</h2>
        <button
          onClick={() => {
            dispatch(login());
            history.push("/profile");
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Home;