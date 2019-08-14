import web3 from "./web3";
import VoterFactory from "../build/contracts/VoterFactory.json";

const instance = new web3.eth.Contract(
  VoterFactory.abi,
  "0x449C4cd052fDfe507F3958C613FfE6358ac68689"
);

export default instance;
