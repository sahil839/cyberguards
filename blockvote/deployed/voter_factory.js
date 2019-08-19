import web3 from "./web3";
import VoterFactory from "../build/contracts/VoterFactory.json";

const instance = new web3.eth.Contract(
  VoterFactory.abi,
  "0x33C0Fe22E2Cbc48f41B450542f2b6203cC7D4539"
);

export default instance;
