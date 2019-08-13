var Candidate = artifacts.require("Candidate");

module.exports = async function(done) {
  console.log("Getting the deployed version of the Candidate smart contract");
  let candidate = await Candidate.at("0x257DD9D87D0a7535388e05C364556b5B39078378");
  let aadhaar = await candidate.returnvotecount();
  console.log(aadhaar);
  candidate = await Candidate.at("0xbEC68C89BB43002aFCee0F89996cCF18b5510D93");
  aadhaar = await candidate.returnvotecount();
  console.log(aadhaar);
};
