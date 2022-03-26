import React from "react";

//import'./style.css';

const MastTitle = (props) => {
  return (
    <React.Fragment>
      <div className="pt-[5rem]">
        <div className="flex flex-col justify-center items-center">
          <h1 className=" text-[24px] md:text-[44px] text-[#0ac5a8] font-bold ">
            {props.title}
          </h1>
          <hr className="mt-4 w-[90%] md:w-[60%] bg-gray-500 " />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MastTitle;
