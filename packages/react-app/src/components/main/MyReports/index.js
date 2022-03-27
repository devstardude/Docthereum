import React, { useEffect } from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import MastTitle from "../../shared/MastTitle";
import Report from "./Report";

import "./style.css";
import {
  useCall
} from "@usedapp/core";
import { valueToPercent } from "@mui/base";

const MyReports =  (props) => {
  const { error: contractCallError, value: reports } =
  useCall({
    contract: props.contract,
    method: "getUserReports",
    args: [props.account],
  }) ?? {};
  console.log(reports);
 
  return (
    <React.Fragment>
      <BackgroundLayout />
      <MastTitle title="My Reports" />
      {/* pass reportid as cid={reports[0]}  */}
     <Report contract={props.contract} /> 
     {/* <Report/>
     <Report/>
     <Report/> */}
    </React.Fragment>
  );
};

export default MyReports;
