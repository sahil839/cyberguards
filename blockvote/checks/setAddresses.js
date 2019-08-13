var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");
var CandidateFactory = artifacts.require("CandidateFactory");
var Ballot = artifacts.require("Ballot");

module.exports = function(done) {
  console.log("Getting the deployed version of the Admin smart contract");
  Admin.deployed()
    .then(function(instance) {
      console.log(
        "Calling SendRequest function for contract ",
        instance.address
      );
      return VoterFactory.deployed().then(function(i) {
        return i.setAdminAddress(instance.address);
      });
    })
    .then(function(result) {
      console.log("Transaction hash: ", result.tx);
      console.log("Request complete");
      // done();
    })
    .catch(function(e) {
      console.log(e);
      done();
    });
  console.log(
    "Getting the deployed version of the CandidateFactory smart contract"
  );

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
      // done();
    })
    .catch(function(e) {
      console.log(e);
      done();
    });
  console.log(
    "Getting the deployed version of the VoterFactory smart contract"
  );
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
  CandidateFactory.deployed()
    .then(function(instance) {
      console.log(
        "Calling SendRequest function for contract ",
        instance.address
      );
      return Ballot.deployed().then(function(i) {
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
    Ballot.deployed()
    .then(function(instance) {
      console.log(
        "Calling SendRequest function for contract ",
        instance.address
      );
      return VoterFactory.deployed().then(function(i) {
        return i.setBallotAddress(instance.address);
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

    Ballot.deployed()
    .then(function(instance) {
      console.log(
        "Calling SendRequest function for contract ",
        instance.address
      );
      return CandidateFactory.deployed().then(function(i) {
        return i.setBallotAddress(instance.address);
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
