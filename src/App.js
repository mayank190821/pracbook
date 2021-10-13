import "../src/styles/App.css";
import React from "react";
import AppRouter from "./components/AppRouter";
import "../src/styles/App.css";
import SideBar from "./components/Faculty/SideBar";
import StudentInfo from "./components/Faculty/StudentInfo";
import StudentTable from "./components/Faculty/StudentTable";
import DashBoard from "./components/Faculty/DashBoard";

function App() {
  return (
    <React.Fragment>
      <DashBoard />

      {/* <AppRouter/> */}

      {/* <SideBar/> */}
      {/* <StudentInfo/> */}
      {/* <StudentTable/> */}
    </React.Fragment>
  );
}

export default App;
