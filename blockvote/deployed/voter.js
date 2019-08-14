import web3 from "./web3";
import Voter from "../build/contracts/Voter.json";

const getInstance = address => {
  const instance = new web3.eth.Contract(Voter.abi, address);
  return instance;
};

export default getInstance;
