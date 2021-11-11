import React from "react";
import LoginPage from "./loginPage";
import LandingPage from "./landingPage";
import DashBoard from "./Faculty/DashBoard";
import { Switch, Route } from "react-router";

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/faculty/dashboard" component={DashBoard}/>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  );
}
