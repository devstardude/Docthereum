# Docthereum 🩺
A dapp to maintain anonymous medical reports and aid seamless healthcare across the globe 🌎.
<p align="left">
  <img width="70%" src="https://i.ibb.co/y5DQz8r/Screenshot-84.png">
</p>

## The problem it solves
## 1. Storage 📂
  The traditional method of keeping records that is followed in most of the hospitals across India is the manual method 
  involving papers and books. There are serious limitations of manual record keeping including the need for large storage 
  areas and difficulties in the retrieval of records.And the possibility of easy manipulation without detection is a serious 
  concern.
=> **Docthereum stores records over decentralised network and records cannot be tampered with.** 

## 2. Anonymity 🎭
Another major concern is maintaining confidentiality of the patient records as the patient can hold the doctor and the 
  hospital negligent for breaking confidentiality of his medical records
=> **We maintain the records linked to patients Ethereum's public address, hence providing anonymity to the patient.
  And the identity of patient remains confidential.**

## 3. Research 👩‍🔬
Research includes increased efforts to use stored medical records as a source of data for health services, epidemiologic, and clinical studies. Given that it can be cumbersome, if not impossible, to find and seek consent from patients whose current or past records might be used.
=>**Since, we maintain our reports anonymously, and they cant be traced back to the patient himself, they can be provided to researchers to aid in their studies.**


## Challenges we ran into
## 1. Verification 🕵️‍♂️
We had a big problem on how to verify the Doctors and labs without the need of including a 3rd party and at the same time make the process as seamless as possible.
### Solution :- 
**We ask doctors or labs for their registration id , which we then use to verify them against an api that 
verifies them. Using Chainlink, we were able to integrate this functionality into our smart contract , thus making the 
verification process seamless**

## 2. Different testnets 
While developing the dapp , we noticed that Chainlink's rinkeby network was in maintainence and we would have to use Kovan network. But soon we realised that the subgraph we were building for the dapp doesnt not support deploying on Kovan network currently.
### Solution :-
**We decided to make two instances of the project and deploy the smart contract on both  
Rinkeby [0xa6a11dF4FAc5c4b148bC91f03FD0919237d16801](https://github.com/devstardude/Docthereum/blob/master/packages/contracts/docthereum.sol)  
And Kovan [0x6DdD958591974891eD4819cDF9a269DaEc3C55A7](https://github.com/devstardude/Docthereum/blob/master/packages/contracts/docthereum-kovan.sol).  
So we were able to test the verification functionality on Kovan , all while deploying the subgrapgh on Rinkeby to index the Rinkeby version of the smart contract.**

**Note :-** currently the dapp calls the instance deployed on Rinkeby network.

## Technologies we used
#### 1. Solidity  
#### 2. IPFS    
#### 3. TheGraph 
#### 4. Chainlink 
#### 5. React 
#### 6. Web3 


## Test live 🚀 :- https://docthereum.web.app/