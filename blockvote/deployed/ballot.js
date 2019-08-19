import web3 from "./web3";
import Ballot from "../build/contracts/Ballot.json";

const instance = new web3.eth.Contract(
  Ballot.abi,
  "0x3B2ae1BFD93D2Bef48b3B8481E2aEDB5456679F9"
);

export default instance;
