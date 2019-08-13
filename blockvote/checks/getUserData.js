var Voter = artifacts.require("Voter");

module.exports = async function(done) {
  console.log("Getting the deployed version of the Voter smart contract");
  let voter = await Voter.at("0xF0a7712CcD5f863a8caA673a09C93E4cdCF2FDff");
  let aadhaar = await voter.displayAadhaar();
  console.log(aadhaar);
  let candidate = await voter.becomeCandidate(1, "BJP");
  console.log(candidate);
  voter = await Voter.at("0xf9e15Ca6ce92B0145d316977034f3C4cA04cb5b6");
  aadhaar = await voter.displayAadhaar();
  console.log(aadhaar);
  candidate = await voter.becomeCandidate(2, "Congress");
  console.log(candidate);
  voter = await Voter.at("0xBBBC2916D08CE267cbC24dD2b880A1CC251a9224");
  aadhaar = await voter.displayAadhaar();
  console.log(aadhaar);
};
