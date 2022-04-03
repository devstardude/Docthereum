import React, { useState } from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";

import { useCall, useContractFunction, useEthers } from "@usedapp/core";

//import web3.storage to store the file
import { Web3Storage, getFilesFromPath } from "web3.storage";
// Import Worker
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./style.css";
import { WEB3STORAGE_TOKEN } from "@my-app/react-app/src/constants.js";
import { Buffer } from "buffer";
import { CustomInput } from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import MastTitle from "../../shared/MastTitle";
import { CustomFooter } from "../../shared/Footer";
const UploadPdf = (props) => {
  const [inputs, setInputs] = useState({
    address: "",
    category: "",
    age: "",
    blood: "",
    weight: "",
    height: "",
    gender: "",
  });
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState("");

  // handle file onChange event
  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
        setPdfFile("");
      }
    } else {
      console.log("please select a PDF");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name", name);
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
    console.log("inputs", inputs);
  };

  function makeStorageClient() {
    return new Web3Storage({ token: WEB3STORAGE_TOKEN });
  }

  function makeFileObject(rawfile) {
    const d = new Date();
    let time = d.getTime();

    const buffer = Buffer.from(rawfile);

    let uniqueId = `Report_${inputs.address}_${time}`;
    console.log(uniqueId);

    const file = [new File([buffer], uniqueId)];
    return file;
  }

  async function storeWithProgress(files) {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid) => {
      console.log("uploading files with cid:", cid);
    };

    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size) => {
      uploaded += size;
      const pct = totalSize / uploaded;
      console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };

    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = makeStorageClient();

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk });
  }

  const { state, send } = useContractFunction(props.contract, "SaveReport");
  const uploadToBlokchain = async (
    cid,
    userAddress,
    category,
    age,
    height,
    weight,
    blood_group,
    gender
  ) => {
    const result = await send(cid, userAddress, category, [
      age,
      height,
      weight,
      blood_group,
      gender
    ]);
    //[age,height,weight,blood_group,gender]==[int,int,int,string,string]

    console.log(state.errorMessage);
    //use state to show progress : minting, succes or failure
    // do something with result : true or false
  };

  const pdfUploadHandler = async (event) => {
    // take pdf file from state and upload
    event.preventDefault();
    console.log(pdfFile);
    const file = makeFileObject(pdfFile);
    storeWithProgress(file).then((id) => {
      console.log("uploading to chain...");
      uploadToBlokchain(
        id,
        inputs.address,
        inputs.category,
        parseInt(inputs.age),
        inputs.height,
        parseInt(inputs.weight),
        inputs.blood,
        inputs.gender
      ); //yahan category ki argument daalni he jese patient ki thi
      console.log("uploaded");
    });
  };

  return (
    <React.Fragment>
      <BackgroundLayout />
      <MastTitle title="Upload Report" />
      <div className="py-[2rem] px-2 md:px-8 ">
        <div className="flex justify-center items-center ">
          <div className="w-[90%] md:w-[70%] lg:w-[80%] bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm p-4 rounded-lg mb-3">
            <form>
              <div class="flex flex-col items-center justify-around bg-grey-lighter">
                <label class="rounded-full px-5 py-[2px] border-[3px] border-[#0ac5a8] text-gray-700 dark:text-gray-200 dark:hover:text-black cursor-pointer hover:bg-[#0ac5a8] hover:text-white font-medium transition-colors">
                  <div className="flex items-center justify-center">
                    <svg
                      class="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="pl-5 text-base leading-normal">
                      Select a file
                    </span>
                  </div>
                  <input type="file" onChange={handleFile} class="hidden" />
                </label>
                <div className=" w-[25rem] md:w-[45rem]">
                  <div class="grid grid-cols-2 gap-4">
                    {fields.map((field) => (
                      <CustomInput
                        name={field.name}
                        onChange={(event) => handleChange(event)}
                        placeholder={field.label}
                        label={field.placeholder}
                      />
                    ))}
                  </div>
                </div>
                <CustomButton onClick={pdfUploadHandler} type="submit">
                  <p className="px-5 py-[2px]">Upload PDF</p>
                </CustomButton>
              </div>
              <div></div>
              <div className="flex justify-center items-center pt-4">
                {pdfError && <span className="text-danger">{pdfError}</span>}
                {!pdfFile && <>No file is selected yet</>}
              </div>
            </form>
          </div>
        </div>

        <div className="viewer">
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}
        </div>
      </div>
      <CustomFooter user="Labs" />
    </React.Fragment>
  );
};

const fields = [
  { name: "address", placeholder: "Enter wallet address", label: "Wallet" },
  {
    name: "category",
    placeholder: "Enter report category",
    label: "For eg Blood report",
  },
  { name: "age", placeholder: "Enter age", label: "Enter age in numbers" },
  {
    name: "weight",
    placeholder: "Enter weight",
    label: "Enter weight in numbers",
  },
  {
    name: "height",
    placeholder: "Enter height",
    label: "Enter height in numbers",
  },
  { name: "blood", placeholder: "Enter blood type blood", label: "For eg. A+" },
  {
    name: "gender",
    placeholder: "Enter gender",
    label: "M for Male, F for Female, O for others",
  },
];

export default UploadPdf;
