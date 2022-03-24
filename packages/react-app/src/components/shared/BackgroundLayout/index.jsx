import React from "react";

import "./style.css";

const BackgroundLayout = (props) => {
  return (
      <div className="BackgroundLayout">
        <div className="BlackBackground"></div>
        <div className="BlueBall"></div>
        <div className="RedBall"></div>
        <div className="BlackOverlay"></div>
      </div>
  );
};

export default BackgroundLayout;
