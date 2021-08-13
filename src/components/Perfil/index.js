import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../slices/auth";
import styles from "./index.module.css";

function Perfil() {
  //pega o estado da store
  const { isLoggedIn } = useSelector(state => state.auth);

  //pega uma action
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Front End TCC</h1>
        {isLoggedIn ? <h2>Logado!</h2> : null}
        <button
          onClick={() => {
            dispatch(logout());
            history.push("/");
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Perfil;
