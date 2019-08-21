  var CandidateFactory = artifacts.require("CandidateFactory");
var VoterFactory = artifacts.require("VoterFactory");

module.exports = function(done) {
  console.log("Getting the deployed version of the CandidateFactory smart contract");
  CandidateFactory.deployed()
    .then(function(instance) {
      console.log(
        "Calling SendRequest function for contract ",
        instance.address
      );
      return VoterFactory.deployed().then(function(i) {
        return i.setCandidateFactory(instance.address);
      });
    })
    .then(function(result) {
      console.log("Transaction hash: ", result.tx);
      console.log("Request complete");
      done();
    })
    .catch(function(e) {
      console.log(e);
      done();
    });
};
