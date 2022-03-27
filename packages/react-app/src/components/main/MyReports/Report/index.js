import React from "react";
import { FaFileMedicalAlt, FaMale } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiBabyFace, GiWeightScale } from "react-icons/gi";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";

const Report = (props) => {
  const gradients = [
    "bg-gradient-to-r from-indigo-200 via-red-200/50 to-yellow-100/50",
    "bg-gradient-to-r from-red-200 via-red-300/50 to-yellow-200/50",
    "bg-gradient-to-r from-indigo-300/50 to-purple-400/50",
    "bg-gradient-to-r from-purple-200/50 via-purple-400/50 to-purple-800/50",
    "bg-gradient-to-r from-blue-100/50 via-blue-300/50 to-blue-500/50",
    "bg-gradient-to-r from-yellow-200/50 via-green-200/50 to-green-300/50",
    "bg-gradient-to-r from-teal-200/50 to-lime-200/50",
  ];
  const random = Math.floor(Math.random() * gradients.length);
  return (
    <React.Fragment>
      <div className="flex justify-center items-center pt-[2rem]">
        <div className={`ReportCard ${gradients[random]}`}>
          <div className="flex  w-full h-full bg-gray-100/50 dark:bg-gray-700/50 rounded-lg px-2 py-4">
            <Tooltip title="View Report">
              <div className=" flex flex-col justify-left items-center h-full w-[20%]">
                <FaFileMedicalAlt className="h-full w-full text-gray-700 dark:text-gray-50 cursor-pointer" />
              </div>
            </Tooltip>

            <div className="flex justify-center flex-col gap-3 px-3 h-full w-[80%]  text-gray-800 dark:text-gray-50">
              <p>
                <span className="font-bold">Wallet Address: </span>
                0xAJSKJ123LK1J2LJ3LK1LJ3
              </p>
              <p>
                <span className="font-bold">Category: </span>
                Blood Report
              </p>
              <p>
                <span className="font-bold">Time: </span>
                26 March 2022
              </p>
              <div className="flex">
                <p>
                  <span className="font-bold">General Information: </span>
                </p>
                <div className="flex flex-wrap justify-center items-center">
                  <Tooltip title="Gender">
                    <div className="border-2 border-gray-600 dark:border-gray-300 rounded-[100%] mx-2 my-2 md:my-0 p-2">
                      <FaMale />
                    </div>
                  </Tooltip>
                  <p>Male</p>
                  <Tooltip title="Age group">
                    <div className="border-2 border-gray-600 dark:border-gray-300 rounded-[100%] mx-2 my-2 md:my-0 p-2">
                      <GiBabyFace />
                    </div>
                  </Tooltip>
                  <p>22</p>
                  <Tooltip title="Blood Group">
                    <div className="border-2 border-gray-600 dark:border-gray-300 rounded-[100%] mx-2 my-2 md:my-0 p-2">
                      <MdBloodtype />
                    </div>
                  </Tooltip>
                  <p>A+</p>
                  <Tooltip title="Body Weight">
                    <div className="border-2 border-gray-600 dark:border-gray-300 rounded-[100%] mx-2 my-2 md:my-0 p-2">
                      <GiWeightScale />
                    </div>
                  </Tooltip>

                  <p>60 Kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Report;
