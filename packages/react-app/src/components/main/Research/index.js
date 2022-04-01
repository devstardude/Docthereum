import React from "react";
import BackgroundLayout from "../../shared/BackgroundLayout";
import MastTitle from "../../shared/MastTitle";

//import'./style.css';

const Research = (props) => {
  return (
    <React.Fragment>
      <BackgroundLayout />
      <MastTitle title="Research" />
      <div className=" px-[1rem] md:px-[5rem] pt-[2rem]">
        <div className="font-semibold text-[24px] text-gray-800 dark:text-gray-200 leading-[40px]">
          <p className="">
            Get Anonymous data of Billion of users to research, use or view from
            here.
          </p>
          <p>
            Simply Query the{" "}
            <span className="text-[#0ac5a8] font-bold">
              Docthereum Graph&nbsp;
            </span>
            and Fetch all the Reports.
          </p>
          <div className="flex my-[1.5rem]  font-bold ">
            <p className="border-[5px] text-[35px] border-[#0ac5a8] py-2 px-4 rounded-lg ">
              How to Fetch
            </p>
          </div>
          <div className="text-[18px]">
            {data.map((item) => (
              <p>
                <span className="text-[#0ac5a8]">⦿&nbsp;</span>
                {item.title}{" "}
                {item.subtitle && (
                  <p className="text-[#0ac5a8]">{item.subtitle}</p>
                )}
                {item.link && (
                  <a
                    className=" text-[#0ac5a8] underline underline-[#0ac5a8]"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.linkTitle}
                  </a>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const data = [
  {
    title: "Query the Graph on the",
    link: "https://testnet.thegraph.com/subgraph?id=E7qhnfSw4g6voKqrkhXeBMsxnhqSCRovCh9b58id4gQM&view=Overview",
    linkTitle: "Graph Website",
  },
  {
    title:
      "Or use the API to  fetch the list of all reports saved and simply fetch the reports from IPFS using the file ids.",
    link: null,
    linkTitle: "",
  },
  {
    title: "Here is the link to get your Graph API",
    link: null,
   
    subtitle:
      "https://gateway.testnet.thegraph.com/api/[api-key]/subgraphs/id/E7qhnfSw4g6voKqrkhXeBMsxnhqSCRovCh9b58id4gQM",
  },
  {
    title: " Here are some additional documentation on Graph.",
    link: "https://thegraph.com/en/",
    linkTitle: "Graph Documentation",
  },
];

export default Research;
