import web3 from "./web3";
import CandidateFactory from "../build/contracts/CandidateFactory.json";

const instance = new web3.eth.Contract(
  CandidateFactory.abi,
  "0xcB01CcA2a7a0EA499CdD1835304d31053C62c9bD"
);

export default instance;
