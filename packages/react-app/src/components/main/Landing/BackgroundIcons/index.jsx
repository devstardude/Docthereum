import React from "react";
import SvgOne from "./SvgOne";
import "./style.css";
import SvgTwo from "./SvgTwo";
import SvgThree from "./SvgThree";
import SvgFour from "./SvgFour";
import SvgFive from "./SvgFive";
import SvgSix from "./SvgSix";

const BackgroundIcons = (props) => {
  return (
    <React.Fragment>
      <div className="absolute w-full h-full top-0 left-0 text-gray-400/50 dark:text-gray-100/50">
        <div className="absolute h-14 w-14 top-[20%] left-[20%] FloatOne">
          <SvgOne />
        </div>
        <div className="absolute h-12 w-12 top-[35%] right-[10%] FloatThree">
          <SvgFive />
        </div>
        <div className="absolute h-11 w-11 top-[25%] right-[30%] FloatOne">
          <SvgThree />
        </div>
        <div className="absolute h-14 w-14 top-[70%] left-[10%] FloatTwo">
          <SvgFour />
        </div>
        <div className="absolute h-10 w-10 top-[75%] left-[40%] md:left-[30%] FloatThree">
          <SvgTwo />
        </div>
        <div className="absolute h-12 w-12 top-[80%] right-[20%] FloatTwo">
          <SvgSix />
        </div>
      </div>
    </React.Fragment>
  );
};

export default BackgroundIcons;
