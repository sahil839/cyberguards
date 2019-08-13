var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");

module.exports = function(done) {
  console.log("Getting the deployed version of the Admin smart contract");
  VoterFactory.deployed()
    .then(function(instance) {
      console.log(
        "Calling SendRequest function for contract ",
        instance.address
      );
      return Admin.deployed().then(function(i) {
        return i.setVoterFactory(instance.address);
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
