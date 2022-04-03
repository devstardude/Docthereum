import React from 'react';
import {SiEthereum} from "react-icons/si";
//import'./style.css';

const Card = (props)=>{
    const Background = "https://avatars.githubusercontent.com/u/38020273?s=280&v=4"
    return (
      <React.Fragment>
        <div className="py-7 flex justify-center items-center ">
          <div className=" w-full lg:flex">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-slate-300"
              style={{
                backgroundImage: `url(${Background})`,
              }}
              title="Mountain"
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-lg">
              <div className="mb-8 w-full">
                <p className="text-sm text-gray-600 flex items-center">
                  <SiEthereum className="text-[16px]" />
                  Ethereum Rinkby
                </p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  Docthereum
                </div>
                <p className="text-gray-700 text-base w-full">
                  Get anonymous reports of patients from all over the world.
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">Status </p>
                  <p className="text-green-600">Online 💚</p>
                </div>
                <div className="text-sm ml-5">
                  <p className="text-gray-900 leading-none">
                    Click here to see{" "}
                  </p>
                  <a
                    href="https://testnet.thegraph.com/subgraph?id=57oKangNhLGcQnz24nLrK9ByUeU9Tzhwfz9wbu72heZT&view=Overview"
                    className="text-[#0ac5a8]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    The Graph
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
};

export default Card ;