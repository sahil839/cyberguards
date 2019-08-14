import web3 from "./web3";
import CandidateFactory from "../build/contracts/CandidateFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CandidateFactory.abi),
  "0xDFB78fbe1488DBB933D26b9b1bE734F7775bd389"
);

export default instance;
