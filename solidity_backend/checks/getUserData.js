var Voter = artifacts.require("Voter");
var Candidate = artifacts.require("Candidate");
var VoterFactory = artifacts.require("VoterFactory");

module.exports = function(done) {
  console.log(
    "Getting the deployed version of the VoterFactory smart contract"
  );
  VoterFactory.deployed()
    .then(async function(instance) {
      let voterlist = await instance.returnVotersList();
      console.log(
        "Getting the deployed version of the Voter smart contract"
      );
      for (let i=0; i<voterlist.length;i++){
        let voter = await Voter.at(
          voterlist[i]
        );
        // console.log(voter);
        let voterInfo = await voter.returnVoterInfo();
        console.log(voterInfo);
      }
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
