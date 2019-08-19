import web3 from "./web3";
import Candidate from "../build/contracts/Candidate.json";

const getInstance = address => {
  const instance = new web3.eth.Contract(Candidate.abi, address);
  return instance;
};

export default getInstance;