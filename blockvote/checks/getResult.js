var Ballot = artifacts.require("Ballot");
var Candidate = artifacts.require("Candidate");

module.exports = function(done) {
  console.log("Getting the deployed version of the Ballot smart contract");
  Ballot.deployed()
    .then(async function(instance) {
      console.log("Calling createVoters");
      let result = await instance.displayelected(1);
      console.log(result);
      let candidate = await Candidate.at(result);
      console.log(candidate.returnCandidateInfo());
      return 1;
    })
    .then(function(result) {
      console.log("Transaction hash: ", result.tx);
      // console.log(result.call());
      // console.log(result.returnAddress().call());
      console.log("request complete");
      done();
    })
    .catch(function(e) {
      console.log(e);
      done();
    });
};