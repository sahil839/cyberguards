var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");

module.exports = function(done) {
  console.log("Getting the deployed version of the Admin smart contract");
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678902, 25, 11, 1998, "Geetesh Gupta", 1, "+919460027791");
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
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678905, 24, 1, 1996, "Mayank Raj", 1, "+919521197358");
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
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678908, 21, 1, 1998, "Sahil Batra", 1, "+918866635618");
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
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678901, 25, 11, 1996, "Tarun Singh", 1, "+919460027791");
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
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678904, 25, 11, 1998, "Raghav Raj", 1, "+919460027791");
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
    Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678912, 25, 11, 1998, "Pulkit", 2, "+919460027791");
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
    Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678911, 25, 11, 1998, "Hiren", 2, "+919460027791");
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
    Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(312345678910, 25, 11, 1998, "Swar Vaidya", 2, "+919460027791");
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
