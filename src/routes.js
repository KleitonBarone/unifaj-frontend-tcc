import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import Profile from "./components/Perfil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

import Admin from "./layouts/Admin";

import "./assets/css/material-dashboard-react.css?v=1.10.0";
import { useSelector } from "react-redux";
import PrivateRoute from "privateRoute";

function Routes() {
  const state = useSelector(state=>state)

  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={SignIn} />
        <Route path="/inscrever" component={SignUp} />
        <PrivateRoute exact path="/admin/dashboard" component={Admin} auth={localStorage.getItem("IS_LOGGED")}/>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
