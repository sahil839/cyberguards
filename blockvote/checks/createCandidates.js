var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");
var Voter = artifacts.require("Voter");


module.exports = function(done) {
  console.log(
    "Getting the deployed version of the VoterFactory smart contract"
  );
  VoterFactory.deployed()
    .then(async function(instance) {
      console.log("Calling returnVotersList");
      let voterList = await instance.returnVotersList();
      console.log(voterList);
      let voter1 = await Voter.at(voterList[0]);
      let voter2 = await Voter.at(voterList[1]);
      let voter3 = await Voter.at(voterList[2]);
      // console.log(voter1);
      let candidate = await voter3.becomeCandidate(true, "BJP");
      console.log(candidate);
      // console.log(voter2);
      // console.log(voter3);
      return 1;
    })
    .then(function(result) {
      // console.log("Transaction hash: ", result);
      console.log("request complete");
      done();
    })
    .catch(function(e) {
      console.log(e);
      done();
    });
};
