import web3 from "./web3";
import Admin from "../build/contracts/Admin.json";

const instance = new web3.eth.Contract(
  JSON.parse(Admin.abi),
  "0xA4ee6f2626BDe920af606e0cddB62F6FfD15189a"
);

export default instance;
