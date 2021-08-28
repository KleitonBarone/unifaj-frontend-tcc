import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import Profile from "./components/Perfil";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

import Admin from "./layouts/Admin";

import "./assets/css/material-dashboard-react.css?v=1.10.0";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={SignIn} />
        <Route path="/inscrever" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
