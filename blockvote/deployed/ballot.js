import web3 from "./web3";
import Ballot from "../build/contracts/Ballot.json";

const instance = new web3.eth.Contract(
  JSON.parse(Ballot.abi),
  "0x166db5ef3A5223a025122c9Bdc2bDe26DedD6c60"
);

export default instance;
