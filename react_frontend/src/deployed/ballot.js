import web3 from "./web3";
import Ballot from "../build/contracts/Ballot.json";

const instance = new web3.eth.Contract(
  Ballot.abi,
  "0xf433530F1007888712E22aD54C9c2Bd57Fa8163D"
);

export default instance;
