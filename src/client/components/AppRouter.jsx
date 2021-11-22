import React from "react";
import LoginPage from "./loginPage";
import SignupPage from "./signupPage";
import LandingPage from "./landingPage";
import DashBoard from "./Faculty/DashBoard";
import { Switch, Route } from "react-router";
import ExamPage from "./ExamPage";
import InstructionPage from "./instructionPage";
import AddQuestion from "./Faculty/AddQuestion";
import SendingFile from "./Faculty/sendingFile";
import QuestionCard from "./Faculty/QuestionCard"
import StudentDashBoard from "./Student/StudentDashboard"

export default function AppRouter() {
  return (
    <Switch>
      <Route path="/exam/instruction/:examId" component={InstructionPage}/>
      <Route path="/exam/:examId" component={ExamPage}/>
      <Route path="/login/:role" component={LoginPage}/>
      <Route path="/signup/:role" component={SignupPage}/>
      <Route path="/faculty/dashboard" component={DashBoard}/>
      <Route exact path="/" component={StudentDashBoard} />
      {/* <Route exact path="/" component={SendingFile} />  */}
    </Switch>
  );
}
