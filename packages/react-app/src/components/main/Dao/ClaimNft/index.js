import React from 'react';
import BackgroundLayout from '../../../shared/BackgroundLayout';
import CustomButton from "../../../shared/CustomButton";

import'./style.css';

const ClaimNft  = (props)=>{
    return (
      <React.Fragment>
        <BackgroundLayout />
        <div className="ClaimNft">
          <div className="Card rounded-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="p-5 flex flex-col justify-center items-center rounded-md">
                <p className="font-medium">Exclusive Doctheum NFT 🩺</p>
                <div className=" mt-3">
                  <img
                    className="rounded-md"
                    src="https://gateway.ipfscdn.io/ipfs/QmVRGV9tzrpdBPo575mMvCABdTDiAVAnGogtp4NQ7FMxrf/0"
                    alt="saitama"
                  />
                </div>
              </div>
              <div className="Content p-5 text-black">
                <div className="flex flex-col gap-5 justify-center relative text-center h-full">
                  <h1 className="font-extrabold text-[#0ac5a9e8]">
                    Mint your free DocthereumDAO Membership NFT 🩺
                  </h1>
                  <div onClick={props.mintNft}>
                    <CustomButton
                      disabled={props.isClaiming}
                    >
                      {props.isClaiming ? "Minting..." : "Mint your nft (FREE)"}
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
};

export default ClaimNft ;