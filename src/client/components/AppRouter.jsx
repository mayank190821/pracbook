import React from "react";
import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import LandingPage from "./landingPage";
import DashBoard from "./Faculty/DashBoard";
import { Switch, Route } from "react-router";
import ExamPage from "./ExamPage";
import InstructionPage from "./instructionPage";
import StudentDashBoard from "./Student/StudentDashboard";
import PrivateRouter from "../helpermethods/PrivateRouter";

export default function AppRouter() {
  return (
    <Switch>
      <PrivateRouter
        exact
        path="/exam/instruction/:examId"
        component={InstructionPage}
      />
      <PrivateRouter exact path="/exam/:examId" component={ExamPage} />
      <PrivateRouter
        exact
        path="/faculty/dashboard/:id"
        component={DashBoard}
      />
      <PrivateRouter
        exact
        path="/student/dashboard/:id"
        component={StudentDashBoard}
      />
      <Route path="/login/:role" component={LoginPage} />
      <Route path="/signup/:role" component={SignupPage} />
      <Route exact path="/" component={LandingPage} />
    </Switch>
  );
}
