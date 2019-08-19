import web3 from "./web3";
import Admin from "../build/contracts/Admin.json";

const instance = new web3.eth.Contract(
  JSON.parse(Admin.abi),
  "0x1442cc8d6466659A4f008612982A68Ed2377a02e"
);

export default instance;
