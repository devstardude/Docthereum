import React from 'react';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import DaoComponent from './DaoComponent';
//import'./style.css';
const activeChainId = ChainId.Rinkeby;

const Dao = (props)=>{
    return (
      <React.Fragment>
        <ThirdwebProvider desiredChainId={activeChainId}>
          <DaoComponent address={props.address} />
        </ThirdwebProvider>
      </React.Fragment>
    );
};

export default Dao ;