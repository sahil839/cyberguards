import web3 from "./web3";
import CandidateFactory from "../build/contracts/CandidateFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CandidateFactory.abi),
  "0xf83Ac429a9402E59d6605F4244a2C9C498db336E"
);

export default instance;
