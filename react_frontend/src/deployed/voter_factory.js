import web3 from "./web3";
import VoterFactory from "../build/contracts/VoterFactory.json";

const instance = new web3.eth.Contract(
  VoterFactory.abi,
  "0x5De2322099100Ae8631c99FaCee7c41eB3cA4D96"
);

export default instance;
