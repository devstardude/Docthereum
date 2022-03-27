import React, { useState, useEffect } from "react";
import { FaFileMedicalAlt, FaMale } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiBabyFace, GiWeightScale } from "react-icons/gi";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";
import { useCall } from "@usedapp/core";
import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_TOKEN } from "../../../../constants.js";
import PdfViewer from "./PdfViewer";

function makeStorageClient() {
  return new Web3Storage({ token: WEB3STORAGE_TOKEN });
}

const Report = (props) => {
  const [pdfFile, setPdfFile] = useState(null);
  useEffect(() => {
    async function retrieveFiles(cid) {
      const client = makeStorageClient();
      const res = await client.get(cid);
      console.log(`Got a response! [${res.status}] ${res.statusText}`);
      if (!res.ok) {
        throw new Error(
          `failed to get ${cid} - [${res.status}] ${res.statusText}`
        );
      }
      // unpack File objects from the response
      const files = await res.files();
      return files;
    }
    const pdfFileResponse = async () => {
      const pdfResponse = await retrieveFiles(props.cid);
      console.log("pdfResposnse", pdfResponse[0]);
      setPdfFile(pdfResponse);
    };
    pdfFileResponse();
  }, []);

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

  const { error: contractCallError, value: report } =
    useCall({
      contract: props.contract,
      method: "GetDetailedReport",
      args: [props.cid], //replace with props.cid
    }) ?? {};

  // retrieveFiles(props.cid); // replace with props.cid
  const timeFormat = (time) => {
    var d = new Date(0);
    return d.setUTCSeconds(time);
  };
  return (
    <React.Fragment>
      {report && (
        <div className="flex justify-center items-center pt-[2rem]">
          <div className={`ReportCard ${gradients[random]}`}>
            <div className="flex  w-full h-full bg-gray-100/50 dark:bg-gray-700/50 rounded-lg px-2 py-4">
              <Tooltip title="View Report">
                <div className=" flex flex-col justify-left items-center h-full w-[20%]">
                  {pdfFile && (
                    <PdfViewer pdfFile={pdfFile}>
                      <FaFileMedicalAlt className="h-full w-full text-gray-700 dark:text-gray-50 cursor-pointer" />
                    </PdfViewer>
                  )}
                </div>
              </Tooltip>

              <div className="flex justify-center flex-col gap-3 px-3 h-full w-[80%]  text-gray-800 dark:text-gray-50">
                <p>
                  <span className="font-bold">User address: </span>
                  {report[0].User}
                </p>{" "}
                <p>
                  <span className="font-bold">Lab Address: </span>
                  {report[0].User}
                </p>
                <p>
                  <span className="font-bold">Category: </span>
                  {report[0].category}
                </p>
                <p>
                  <span className="font-bold">Time: </span>

                  {new Date(timeFormat(report[0].dated)).toLocaleDateString()}
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
      )}
    </React.Fragment>
  );
};

export default Report;
