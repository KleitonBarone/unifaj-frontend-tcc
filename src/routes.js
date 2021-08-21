import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Profile from "./components/Perfil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={SignIn} />
        <Route path="/inscrever" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
