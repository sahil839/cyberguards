var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");
var CandidateFactory = artifacts.require("CandidateFactory");
var Ballot = artifacts.require("Ballot");
var voterFact = require("./voter_factory");

module.exports = function(done) {
  console.log("Admin: ");
  Admin.deployed().then(function(instance) {
    console.log(instance.address);
  });
  console.log("VoterFactory: ");
  VoterFactory.deployed().then(function(instance) {
    console.log(instance.address);
    voterFact.setVoterFactory(instance.address);
  });
  console.log("CandidateFactory: ");
  CandidateFactory.deployed().then(function(instance) {
    console.log(instance.address);
  });
  console.log("Ballot: ");
  Ballot.deployed().then(function(instance) {
    console.log(instance.address);
  });
};
