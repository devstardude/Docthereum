import React from 'react';
import { FaFileMedicalAlt, FaWaveSquare } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { RiRunFill } from "react-icons/ri";
import { GiNightSleep } from "react-icons/gi";
import'./style.css';

const Report = (props)=>{
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
              <div className=" flex flex-col justify-left items-center h-full w-[20%]">
                <FaFileMedicalAlt className="h-full w-full text-gray-700 dark:text-gray-50 cursor-pointer" />
              </div>
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
                    <span className="font-bold">Google Fit Data: </span>
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="border rounded-[100%] mx-2 p-2">
                      <BsSuitHeartFill />
                    </div>
                    <p>99</p>{" "}
                    <div className="border rounded-[100%] mx-2 p-2">
                      <GiNightSleep />
                    </div>
                    <p>99</p>{" "}
                    <div className="border rounded-[100%] mx-2 p-2">
                      <RiRunFill />
                    </div>
                    <p>99</p>{" "}
                    <div className="border rounded-[100%] mx-2 p-2">
                      <FaWaveSquare />
                    </div>
                    <p>99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
};

export default Report ;