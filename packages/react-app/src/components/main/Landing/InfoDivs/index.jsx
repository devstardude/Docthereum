import React from "react";

//import'./style.css';

const InfoDivs = (props) => {
  return (
    <React.Fragment>
      <div className="px-[1rem] sm:px-[2rem] md:px-[3rem] lg:px-[5rem] py-[5rem]">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              item.rev ? "md:flex-row-reverse" : "md:flex-row"
            } pt-[5rem]`}
          >
            <div className=" flex items-center justify-center h-[25rem]">
              <iframe
                title={item.title}
                className= {`relative h-full z-10 pointer-events-none ${item.invert &&"dark:invert"}`}
                src={item.frame}
              ></iframe>
            </div>
            <div className="flex items-center justify-center w-full  px-[1rem] md:px-[2rem]">
              <div className="px-4 py-8 dark:bg-gray-600/[0.25] bg-gray-200/[0.25] filter backdrop-blur-sm rounded-xl">
                <p className="text-[24px] font-semibold text-gray-800 dark:text-gray-200 ">
                  {" "}
                  <span className="text-[#0ac5a8] font-bold text-[40px]">
                    {item.title}&nbsp;
                  </span>{" "}
                  {item.subtitle}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

const data = [
  {
    frame: "https://embed.lottiefiles.com/animation/70065",
    title: "Decentralized health platform",
    subtitle:
      "to aid in managing patient reports and provide seamless healthcare whenever and wherever needed across the globe",
  },
  {
    frame: "https://embed.lottiefiles.com/animation/70453",
    title: "Certified Labs and Doctors",
    subtitle:
      "to aid in managing patient reports and provide seamless healthcare  whenever and wherever needed across the globe",
    rev: true,
  },
  {
    frame: "https://embed.lottiefiles.com/animation/69383",
    title: "Remain Anonymous.",
    subtitle: "your medical data can't be tracked back to your real identity",
    invert:true
  },
];

export default InfoDivs;
