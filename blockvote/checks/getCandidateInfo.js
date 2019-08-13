


var Candidate = artifacts.require("Candidate");

module.exports = async function(done) {
  console.log("Getting the deployed version of the Candidate smart contract");
  let candidate = await Candidate.at("0xE3Ec72fBc1506068749021D18fb464a05eDC200B");
  let aadhaar = await candidate.displayAadhaar();
  console.log(aadhaar);
  let candidate = await candidate.becomeCandidate(1, "BJP");
  console.log(candidate);
  candidate = await Candidate.at("0x9a35e6cD0Ce823e5a1320790f60a36b29730f0A4");
  aadhaar = await candidate.displayAadhaar();
  console.log(aadhaar);
  candidate = await candidate.becomeCandidate(2, "Congress");
  console.log(candidate);
  candidate = await Candidate.at("0xc56Be7a1208fE387F143DA8b31F2891F0b604Ae3");
  aadhaar = await candidate.displayAadhaar();
  console.log(aadhaar);
};
