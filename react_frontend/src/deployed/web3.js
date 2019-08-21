import Web3 from "web3";
// const HDWalletProvider = require("truffle-hdwallet-provider");
let web3;
web3 = new Web3(new Web3.providers.HttpProvider("https://ec.blockchain.azure.com:3200/pX8w42ySbRnSYOjpvw-jxKw7"));

console.log(web3);
export default web3;
