import React from "react";
import BackgroundLayout from "../../../shared/BackgroundLayout";
import CustomButton from "../../../shared/CustomButton";
import "./style.css";

const DaoLanding = (props) => {
  return (
    <div className="DaoLanding">
      <BackgroundLayout />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="Title">DocthereumDAO</h1>
        <p className="Subtitle TextBasic">Please Connect Wallet 🩺</p>
      </div>
    </div>
  );
};

export default DaoLanding;
