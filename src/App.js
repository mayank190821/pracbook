import '../src/styles/App.css';
import React from 'react';
import LandingPage from './components/landingPage';
// import LoginPage from "./components/loginPage";
import "../src/styles/App.css";
import SideBar from './components/Faculty/SideBar'

function App() {
  return (
    <React.Fragment>
      {/* <LandingPage/> */}
    <SideBar></SideBar>
      {/* <LoginPage /> */}
    </React.Fragment>
  );
}

export default App;
