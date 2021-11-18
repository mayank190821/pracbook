import React from "react";
import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import LandingPage from "./landingPage";
import DashBoard from "./Faculty/DashBoard";
import { Switch, Route } from "react-router";
import ExamPage from "./ExamPage";

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/login/:role" component={LoginPage}/>
      <Route path="/signup/:role" component={SignupPage}/>
      <Route path="/faculty/dashboard" component={DashBoard}/>
      <Route exact path="/" component={ExamPage} />
    </Switch>
  );
}
