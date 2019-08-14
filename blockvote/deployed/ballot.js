import web3 from "./web3";
import Ballot from "../build/contracts/Ballot.json";

const instance = new web3.eth.Contract(
  JSON.parse(Ballot.abi),
  "0x3E7C87251345895721e370b126d6a78A1b8BD45f"
);

export default instance;
