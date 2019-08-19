import web3 from "./web3";
import CandidateFactory from "../build/contracts/CandidateFactory.json";

const instance = new web3.eth.Contract(
  CandidateFactory.abi,
  "0x9033708F55Da773b68161735a7815883E69011a8"
);

export default instance;
