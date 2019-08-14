import web3 from "./web3";
import VoterFactory from "../build/contracts/VoterFactory.json";

const instance = new web3.eth.Contract(
  VoterFactory.abi,
  "0x36C5b9c89567A832144BeF2F089fece04b932752"
);

export default instance;
