import { useQuery, ApolloClient, InMemoryCache, } from "@apollo/client";

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
import {GET_DOC_AUTHS,GET_LAB_AUTHS,GET_REPORTS_SAVED} from "./graphql/subgraph";
import UploadPdf from "./components/main/UploadPdf";
import Register from "./components/main/Register";
import {API_KEY,SUBGRAPH_NAME} from "./constants.js";
import MyReports from "./components/main/MyReports";

function WalletButton(props) {
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
  const [address,setAddress]=useState(null)
  const contract = new Contract(addresses.DocAddress, abis.docthereum);
  const { account } = useEthers();
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
          <Route path="/myreports" element={<MyReports />} />
          <Route path="/upload" element={<UploadPdf contract={contract} />} />
          <Route
            path="/register"
            element={<Register contract={contract} account={account} />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
