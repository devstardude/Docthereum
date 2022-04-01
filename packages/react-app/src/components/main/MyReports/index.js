import React, { useEffect, useState } from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import MastTitle from "../../shared/MastTitle";
import Report from "./Report";

import "./style.css";
import { useCall } from "@usedapp/core";
import { valueToPercent } from "@mui/base";

const MyReports = (props) => {
  // const [reportsIds, setReportIds] = useState(null);
  const { error: contractCallError, value: reports } =
    useCall({
      contract: props.contract,
      method: "getUserReports",
      args: [props.account],
    }) ?? {};

  return (
    <React.Fragment>
      <BackgroundLayout />
      <MastTitle title="My Reports" />
      {/* pass reportid as cid={reports[0]}  */}
      {reports &&
        reports[0].map((id) => (
          <Report key={id} cid={id} contract={props.contract} />
        ))}
      {/* <Report/>
     <Report/>
     <Report/> */}
    </React.Fragment>
  );
};

export default MyReports;
