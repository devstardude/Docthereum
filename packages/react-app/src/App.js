import { useQuery } from "@apollo/client";

import {
  shortenAddress,
  useCall,
  useEthers,
  useLookupAddress,
} from "@usedapp/core";
import React, { useEffect, useState } from "react";
import Landing from "./components/main/Landing";
import Navbar from "./components/shared/Navbar";
import CustomButton from "./components/shared/CustomButton";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Contract } from "@ethersproject/contracts";
import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./graphql/subgraph";
import UploadPdf from "./components/main/UploadPdf";
import Register from "./components/main/Register";
import MyReports from "./components/main/MyReports";


function WalletButton() {
  const [rendered, setRendered] = useState("");

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <div
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </div>
  );
}

function App() {
  // Read more about useDapp on https://usedapp.io/

  // const { loading, error: subgraphQueryError, data } = useQuery(GET_TRANSFERS);

  // const { error: contractCallError, value: valu } =
  // useCall({
  //   contract: new Contract(addresses.DocAddress, abis.docthereum),
  //   method: "ContractName",
  //   // args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
  // }) ?? {};
  // const contract = new Contract(addresses.DocAddress, abis.docthereum);
  // console.log(contract);
  
  // useEffect(() => {
  //   if (subgraphQueryError) {
  //     console.error(
  //       "Error while querying subgraph:",
  //       subgraphQueryError.message
  //     );
  //     return;
  //   }
  //   if (!loading && data && data.transfers) {
  //     console.log({ transfers: data.transfers });
  //   }
  // }, [loading, subgraphQueryError, data]);

  return (
    <React.Fragment className="App overflow-x-hidden">
      <Router>
        <Navbar>
          <CustomButton className="hidden md:block pr-3">
            <WalletButton />
          </CustomButton>
        </Navbar>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<UploadPdf />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myreports" element={<MyReports />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
