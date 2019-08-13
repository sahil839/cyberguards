var Admin = artifacts.require("Admin");
var CandidateFactory = artifacts.require("CandidateFactory");



module.exports = function(done) {
  console.log(
    "Getting the deployed version of the VoterFactory smart contract"
  );
  CandidateFactory.deployed()
    .then(async function(instance) {
      console.log("Calling returnVotersList");
    //   let voter1 = await instance.returnVoterAddress(1);
    //   let voter2 = await instance.returnVoterAddress(2);
    //   let voter3 = await instance.returnVoterAddress(3);
    //   console.log(voter1);
    //   console.log(voter2);
    //   console.log(voter3);
    let candidatelist  = await instance.returnCandidateList(1);
    for (let i=0; i<candidatelist.length; i++)
        console.log(candidatelist[i]);

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

