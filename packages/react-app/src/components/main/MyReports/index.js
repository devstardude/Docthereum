import React from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import MastTitle from "../../shared/MastTitle";
import Report from "./Report";

import "./style.css";

const MyReports = (props) => {
  
  return (
    <React.Fragment>
      <BackgroundLayout />
      <MastTitle title="My Reports" />
     <Report/>
     <Report/>
     <Report/>
     <Report/>
    </React.Fragment>
  );
};

export default MyReports;
