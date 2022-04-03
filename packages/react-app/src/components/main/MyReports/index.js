import React, { useEffect, useState } from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import MastTitle from "../../shared/MastTitle";
import Report from "../../shared/Report";

import "./style.css";
import { useCall } from "@usedapp/core";
import SmallLoading from "../../shared/SmallLoading";
import { CustomFooter } from "../../shared/Footer";

const MyReports = (props) => {
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
      {!reports && <SmallLoading />}
      {reports && reports.length === 0 && (
        <div>
          <p>No Reports to show ;-;</p>
        </div>
      )}
      {reports &&
        reports[0].map((id) => (
          <Report key={id} cid={id} contract={props.contract} />
        ))}
        <CustomFooter user="Patients" />
    </React.Fragment>
  );
};

export default MyReports;
