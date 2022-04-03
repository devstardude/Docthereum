import { useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
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
import {
  GET_DOC_AUTHS,
  GET_LAB_AUTHS,
  GET_REPORTS_SAVED,
} from "./graphql/subgraph";
import UploadPdf from "./components/main/UploadPdf";
import Register from "./components/main/Register";
import { API_KEY, SUBGRAPH_NAME } from "./constants.js";
import MyReports from "./components/main/MyReports";
import SearchReports from "./components/main/SearchReports";
import Research from "./components/main/Research";

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
  const [address, setAddress] = useState(null);
  const [subgraphData, setSubgraphData] = useState(null);
  const contract = new Contract(addresses.DocAddress, abis.docthereum);
  const { account } = useEthers();
  const APIURL =
    "https://api.studio.thegraph.com/query/24067/docthereum/v0.0.2";

  // use to tell if doctor variable: isDoctor
  const { error: contractError1, value: isDoctor } =
    useCall({
      contract: contract,
      method: "AuthorisedDoc",
      args: [account],
    }) ?? {};
  // console.log(isDoctor);
  // To Check if user is Doctor

  //use to tell if lab variable: isLab
  const { error: contractCallError2, value: isLab } =
    useCall({
      contract: contract,
      method: "AuthorisedLab",
      args: [account],
    }) ?? {};
  // console.log(isLab);
  // To Check if user is Lab

  //graph data below

  const setGraphDataHandler = (data) => {};

  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    client
      .query({
        query: GET_REPORTS_SAVED, // three queries : GET_DOC_AUTHS, GET_LAB_AUTHS,GET_REPORTS_SAVED
        // queries are customisable , edit in ./subgraph.js
      })
      .then((data) => {
        console.log("App Subgraph data: ", data.data.reportSavedEntities);
        const reponse = data.data.reportSavedEntities;
        console.log("App", reponse);
        setSubgraphData(reponse);
      }) //visualise this data
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }, []);

  return (
    <div className="App overflow-x-hidden">
      <Router>
        <Navbar>
          <CustomButton className="hidden md:block pr-3">
            <WalletButton />
          </CustomButton>
        </Navbar>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/myreports"
            element={<MyReports contract={contract} account={account} />}
          />
          <Route
            path="/search"
            element={<SearchReports contract={contract} />}
          />
          <Route path="/upload" element={<UploadPdf contract={contract} />} />
          <Route
            path="/register"
            element={<Register contract={contract} account={account} />}
          />
          <Route
            path="/research"
            element={<Research graphData={subgraphData} />}
          />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
