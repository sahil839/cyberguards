var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");

module.exports = function(done) {
  console.log("Getting the deployed version of the Admin smart contract");
  Admin.deployed()
    .then(function(instance) {
      console.log("Calling createVoters");
      return instance.addUserData(1, 25,11,1998, "GG", 1);;
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
        return instance.addUserData(2, 25,11,1998, "MR", 1);;
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
          return instance.addUserData(3, 25,11,1998, "SB", 1);;
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
