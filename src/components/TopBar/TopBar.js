import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export default function Title() {

  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  }

  const handleInscrever = () => {
    history.push("/inscrever");
  }


  return (
    <div>
        <Button onClick={handleInscrever}>Inscreva-se</Button>
        <Button onClick={handleLogin}>Entrar</Button>
    </div>
  );
}
