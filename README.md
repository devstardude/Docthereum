# Docthereum 🩺
A dapp to maintain anonymous medical reports and aids in seamless healthcare across the globe 🌎.
<p align="left">
  <img width="70%" src="https://i.ibb.co/Cbx1dbk/new-dp.png">
</p>

## Project Architechure
<img  width="70%" src="https://i.ibb.co/zQTV9DL/The-Business-Model-Kit-1.jpg" alt="The-Business-Model-Kit-1" border="0">  

 > ### See Working on Youtube: [Video](https://youtu.be/uwM1e-83o0A "Video")

---
## The problem it solves
## 1. Storage 📂
  The traditional method of keeping records that are followed in most hospitals across India is the manual method 
  involving papers and books. There are serious limitations of manual record-keeping including the need for large storage 
  areas and difficulties in the retrieval of records. And the possibility of easy manipulation without detection is a serious 
  concern.
> **Docthereum stores records over a decentralized network and records cannot be tampered with.** 

## 2. Anonymity 🎭
Another major concern is maintaining the confidentiality of the patient records as the patient can hold the doctor and the 
  hospital negligent for breaking the confidentiality of his medical records
> **We maintain the records linked to patients' Ethereum's public address, hence providing anonymity to the patient.
  And the identity of the patient remains confidential.**

## 3. Research 👩‍🔬
The research includes increased efforts to use stored medical records as a source of data for health services, epidemiologic, and clinical studies. Given that it can be cumbersome, if not impossible, to find and seek consent from patients whose current or past records might be used.
>**Since, we maintain our reports anonymously, and they cant be traced back to the patient himself, they can be provided to researchers to aid in their studies.**

## 4. Decentralized Voting to allot funds to a cause 💰
People who contribute to a cause with good intentions always have concerns about the transparency regarding if their money is being utilized correctly or not when there is a centralized authority controlling all the funds. People also don't get a say in it too many times.
>**In Docthereum we have built a Decentralized autonomous organization where funds can be utilized by Decentralised voting and everyone who's a member gets a say in it. You can become part of Docthereum DAO just by Minting a free NFT inside the app.**

## Challenges we ran into
## 1. Verification 🕵️‍♂️
We had a big problem with how to verify the Doctors and labs without the need of including a 3rd party and at the same time make the process as seamless as possible.
### Solution :- 
> **We ask doctors or labs for their registration id, which we then use to verify them against an API that 
verifies them. Using Chainlink, we were able to integrate this functionality into our smart contract, thus making the 
verification process seamless**

## 2. Different testnets 
While developing the dapp, we noticed that Chainlink's rinkeby network was in maintenance and we would have to use Kovan network. But soon we realized that the subgraph we were building for the dapp doesn't support deploying on Kovan network currently.
### Solution :-
>**We decided to make two instances of the project and deploy the smart contract on both  
Rinkeby [0xa6a11dF4FAc5c4b148bC91f03FD0919237d16801](https://github.com/devstardude/Docthereum/blob/master/packages/contracts/docthereum.sol)  
And Kovan [0x6DdD958591974891eD4819cDF9a269DaEc3C55A7](https://github.com/devstardude/Docthereum/blob/master/packages/contracts/docthereum-kovan.sol).  
So we were able to test the verification functionality on Kovan, all while deploying the subgraph on Rinkeby to index the Rinkeby version of the smart contract.**

**Note:-** currently the dapp calls the instance deployed on the Rinkeby network.

## Technologies we used
#### 1. Linode (For React app Hosting)
#### 2. Solidity  
#### 3. IPFS    
#### 4. TheGraph 
#### 5. Chainlink 
#### 6. React 
#### 7. Web3 

### You can Test it live at 🚀 : [Website](HTTP://192.46.214.84)
> It was our first time using **Linode for hosting React app** so we went through some documentation and videos. To make the process easier for developers who will choose Linode in the future for the same purpose, I wrote a 'How to Tutorial' to give back to the community and Linode's amazing service. Here is a link for that article too.

### Blog: [Link](https://dev.to/devstardude/how-to-deploy-react-app-on-remote-linux-server-using-nginx-in-linode-3iid)

## Links to Linode and Hashnode:

Linode: [Link](https://www.linode.com/)

Hashnode: [Link](https://hashnode.com/)