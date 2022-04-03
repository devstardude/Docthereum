import React from 'react';
import { AiFillHeart } from "react-icons/ai";
import'./style.css';
export const LandingFooter = (props)=>{
    return (
      <div className="w-screen bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm">
        <div className="flex justify-center items-center text-[18px] py-[7px] text-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()}, Made with &nbsp;
          <AiFillHeart className="Heart text-red-700" />
          &nbsp; Love and Care
        </div>
      </div>
    );
};

export const CustomFooter = (props) => {
  return (
    <div className="fixed bottom-0 left-0 w-screen bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm">
      <div className="flex justify-center items-center text-[18px] py-[6px] text-gray-800 dark:text-gray-200">
        This page is only visible to&nbsp;
        <span className="text-[#0ac5a8] font-bold">{props.user}</span>, you can access it
        because it's visible for demonstration purposes.
      </div>
    </div>
  );
};
