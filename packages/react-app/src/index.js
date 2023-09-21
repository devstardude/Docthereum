import "./index.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { DAppProvider, Mainnet, Rinkeby, Mumbai } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";
import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useToken,
  useVote,
  useNetwork,
} from "@thirdweb-dev/react";

import App from "./App";

// Change this to your own Infura project id: https://infura.io/register
const INFURA_PROJECT_ID = "6606d56974ac469e86a5347a6cb36f50";
const config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]:
      "https://polygon-mumbai.infura.io/v3/" + INFURA_PROJECT_ID,
  },
};

// You should replace this url with your own and put it into a .env file
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://api.thegraph.com/subgraphs/name/paulrberg/create-eth-app",
});

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
