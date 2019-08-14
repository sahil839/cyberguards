import web3 from "./web3";
import Admin from "../build/contracts/Admin.json";

const instance = new web3.eth.Contract(
  JSON.parse(Admin.abi),
  "0x4f1D65717e60Dc1271Aa0a27C1F1Bc588445e0FB"
);

export default instance;
