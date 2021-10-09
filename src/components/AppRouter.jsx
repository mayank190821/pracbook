import React from "react";
import LoginPage from "./loginPage";
import LandingPage from "./landingPage";
import {Switch, Route} from "react-router";
export default  function AppRouter(){
    return (
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/" component={LandingPage} />
        </Switch>
    )
}