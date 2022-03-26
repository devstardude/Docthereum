import React, { useState } from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";

import { useCall,
         useContractFunction,
         useEthers
        } from "@usedapp/core";

//import web3.storage to store the file
import { Web3Storage,getFilesFromPath } from 'web3.storage';
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
import {WEB3STORAGE_TOKEN} from "@my-app/react-app/src/constants.js";
import { Buffer } from "buffer";


const UploadPdf = (props) => {
  
  const [patientAddress,setPatientAddress] = useState(""); 
  

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
  const handleAddress = (e) =>{
    setPatientAddress(e.target.value);
  }
  function makeStorageClient () {
    return new Web3Storage({ token: WEB3STORAGE_TOKEN })
  }
  
  function makeFileObject (rawfile) { 
    const d = new Date();
    let time = d.getTime();
  
    const buffer = Buffer.from(rawfile)
    
    let uniqueId = `Report_${patientAddress}_${time}`
    console.log(uniqueId);
  
    const file =   [new File([buffer], uniqueId)]
    
    return file
  }
  
  async function storeWithProgress (files) {
    // show the root cid as soon as it's ready
    const onRootCidReady = cid => {
      console.log('uploading files with cid:', cid)
    }
  
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
    let uploaded = 0
  
    const onStoredChunk = size => {
      uploaded += size
      const pct = totalSize / uploaded
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }
  
    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = makeStorageClient()
  
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk })
  }
  
  
  const { state, send } = useContractFunction(props.contract, 'SaveReport')
  const uploadToBlokchain = async(cid, userAddress) =>{
    const result = await send(cid,userAddress);
    
    
    console.log(state.errorMessage);
    //use state to show progress : minting, succes or failure
    // do something with result : true or false
  }

  const pdfUploadHandler = async () => {
    // take pdf file from state and upload
    console.log(pdfFile);
    const file = makeFileObject(pdfFile);
    storeWithProgress(file).then((id)=>{
      console.log("uploading to chain...");
      uploadToBlokchain(id,patientAddress);
    })
    
    
  };


  return (
    <React.Fragment>
      <BackgroundLayout />
      <div className="pt-[5rem] px-2 md:px-8">
        <form>
          <label>
            <button onClick={pdfUploadHandler} type= "button" className="py-2 mt-4 border-4">
              Upload PDF
            </button>
          </label>
          <br></br>

          <input
            type="file"
            className="form-control"
            onChange={handleFile}
          ></input>
          {/* add css to this input below */}
           <input
            type="txt"
            className="form-control"
            onChange={handleAddress}
          ></input>

          {/* we will display error message in case user select some file
        other than pdf */}
          {pdfError && <span className="text-danger">{pdfError}</span>}
        </form>

        {/* View PDF */}
        <h5>View PDF</h5>
        <div className="viewer">
          {/* render this if we have a pdf file */}
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}

          {/* render this if we have pdfFile state null   */}
          {!pdfFile && <>No file is selected yet</>}
        </div>
      </div>
      {/* Upload PDF */}
    </React.Fragment>
  );
};

export default UploadPdf;
