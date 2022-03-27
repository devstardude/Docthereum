import React from "react";
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

import "./style.css";

const PdfViewer = (props) => {
  // creating new plugin instance
const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            {/* View PDF */}
            <div className="viewer">
              {/* render this if we have a pdf file */}
              {props.pdfFile && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={props.pdfFile}
                    plugins={[defaultLayoutPluginInstance]}
                  ></Viewer>
                </Worker>
              )}

              {/* render this if we have pdfFile state null   */}
            </div>
          </div>
        </Zoom>
      </Modal>
    </React.Fragment>
  );
};

export default PdfViewer;
