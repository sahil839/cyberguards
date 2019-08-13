var Admin = artifacts.require("Admin");
var VoterFactory = artifacts.require("VoterFactory");

// module.exports = function(done) {
//   console.log("Getting the deployed version of the Admin smart contract");
//   Admin.deployed()
//     .then(function(instance) {
//       console.log("Calling createVoters");
//       return instance.returnVoterList();
//     })
//     .then(function(result) {
//       console.log("Transaction hash: ", result.tx);
//       console.log("request complete");
//       done();
//     })
//     .catch(function(e) {
//       console.log(e);
//       done();
//     });
// };

module.exports = function(done) {
  console.log(
    "Getting the deployed version of the VoterFactory smart contract"
  );
  VoterFactory.deployed()
    .then(async function(instance) {
      console.log("Calling returnVotersList");
      let voter1 = await instance.returnVoterAddress(1);
      let voter2 = await instance.returnVoterAddress(2);
      let voter3 = await instance.returnVoterAddress(3);
      console.log(voter1);
      console.log(voter2);
      console.log(voter3);
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
