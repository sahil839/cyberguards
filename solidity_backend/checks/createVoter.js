var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");

module.exports = function(done) {
  console.log("Getting the deployed version of the Admin smart contract");
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      instance.createVoter(1);
       instance.createVoter(2);
       instance.createVoter(3);
       instance.createVoter(4);
       instance.createVoter(312345678902);
       instance.createVoter(312345678905);
       instance.createVoter(312345678908);
       instance.createVoter(312345678901);
       instance.createVoter(312345678904);
       instance.createVoter(312345678910);
       instance.createVoter(312345678911);
       instance.createVoter(312345678912);
      return instance.createVoter(5);
    })
    .then(function(result) {
      console.log("Transaction hash: ", result);
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
