import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
//import'./style.css';

const SmallLoading = (props)=>{
    return (
      <div className="flex items-center justify-center text-[#0ac5a8] p-6">
        <CircularProgress color="inherit" />
      </div>
    );
};

export default SmallLoading ;