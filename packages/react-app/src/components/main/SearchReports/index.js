import React, { useState } from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import { CustomInput } from "../../shared/CustomInput";
import MastTitle from "../../shared/MastTitle";
import CustomButton from "../../shared/CustomButton";
//import'./style.css';

const SearchReports = (props) => {
  const [query, setQuery] = useState("");
  const SearchHandler = () => {
      console.log(query)
  };
  return (
    <React.Fragment>
      <BackgroundLayout />
      <MastTitle title="Search Reports" />
      <div className="flex flex-col justify-center items-center px-[5%] md:px-[20%] pt-[1rem] md:pt-[2rem]">
        <div className="w-full">
          <CustomInput
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            label="Enter Address"
            placeholder="Enter Wallet Address of the Patient"
          />
        </div>

        <CustomButton onClick={SearchHandler}>
          <p className="px-[1.5rem] py-[2px] text-[20px]">Search</p>
        </CustomButton>
      </div>
    </React.Fragment>
  );
};

export default SearchReports;
