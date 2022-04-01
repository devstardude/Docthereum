import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Zoom from "@mui/material/Zoom";
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
import axios from "axios";
import { Document, Page } from "react-pdf";

import "./style.css";

const PdfViewer = (props) => {
  const [baseData64, setBaseData64] = useState(null);

  const [url, setUrl] = useState(null);
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    let base64;
    const pdfUrl =`https://${props.pdfFile.fileCid}.ipfs.dweb.link/?filename=${props.pdfFile.fileName}`;
    axios.get(pdfUrl).then((res) => {
      base64 = res.data;
      setBaseData64(base64);
    });
  }, []);

  useEffect(() => {
    const pdfContentType = "application/pdf";
    const base64toBlob = (data) => {
      // Cut the prefix `data:application/pdf;base64` from the raw base 64
      const base64WithoutPrefix = data.substr(
        `data:${pdfContentType};base64,`.length
      );
      const bytes = window.atob(base64WithoutPrefix);
      let length = bytes.length;
      let out = new Uint8Array(length);
      while (length--) {
        out[length] = bytes.charCodeAt(length);
      }
      return new Blob([out], { type: pdfContentType });
    };
    const url = baseData64 && URL.createObjectURL(base64toBlob(baseData64));
    console.log("url", url);
    setUrl(url);
  }, [baseData64]);
  return (
    <React.Fragment>
      <div className="w-full" onClick={handleOpen}>
        {props.children}
      </div>
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="ModalComponent-Wrapper">
            <p className="ModalComponent-Title">Health Report</p>
            <div className="">
              {url && (
                <div className="w-full h-[30rem]">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={url}
                      plugins={[defaultLayoutPluginInstance]}
                    ></Viewer>
                  </Worker>
                </div>
              )}
            </div>
          </div>
        </Zoom>
      </Modal>
    </React.Fragment>
  );
};

// base 64 pdf
// https://bafkreie3q64jy2kcoozatoyg3pj3vgx4gnszbxshvjc47cjkk3msm74iyq.ipfs.dweb.link/?filename=Report_0x4e7F3145Fd18c86b13B651F92f2aD7C93a566CA4_1648392821873

export default PdfViewer;
