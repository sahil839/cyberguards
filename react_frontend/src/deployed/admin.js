import web3 from "./web3";
import Admin from "../build/contracts/Admin.json";

const instance = new web3.eth.Contract(
  Admin.abi,
  "0x64A5AaED7398dc65f8A99C0B6B2b6Abe65FDEEAB"
);

export default instance;
