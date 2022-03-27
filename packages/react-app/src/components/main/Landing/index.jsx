import React from "react";
import Typewriter from "typewriter-effect";
import BackgroundIcons from "./BackgroundIcons";
import { BiChevronsDown } from "react-icons/bi";
import "./style.css";
import BackgroundLayout from "../../shared/BackgroundLayout";
import InfoDivs from "./InfoDivs";
import { motion, AnimatePresence } from "framer-motion";
import Counter from "./Counter";

const Landing = (props) => {
  return (
    <div>
      <BackgroundLayout />
      <div className="Landing">
        <BackgroundIcons />
        <div className="TitleBox">
          <p className="HeadOne ">
            <span className="Title">Docthereum&nbsp;</span>
            <span className="Subtitle">helps you</span>
          </p>
          <p className="HeadTwo ">
            <Typewriter
              options={{
                strings: [
                  "In managing patients reports",
                  "By Providing seamless healthcare",
                  "Whenever and wherever needed",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </p>
          <div className="HeadThree">
            <p className=" ">This is Medical Future</p>
            <div className="flex justify-center">
              <motion.div
                animate={{ y: 5 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <BiChevronsDown color="#0ac5a8" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <InfoDivs />
      <div className="text-[50px]">
      </div>
    </div>
  );
};

export default Landing;
