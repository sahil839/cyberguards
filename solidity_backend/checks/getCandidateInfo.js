var Candidate = artifacts.require("Candidate");
var Admin = artifacts.require("Admin");
var CandidateFactory = artifacts.require("CandidateFactory");

module.exports = function(done) {
  console.log(
    "Getting the deployed version of the VoterFactory smart contract"
  );
  CandidateFactory.deployed()
    .then(async function(instance) {
      let candidatelist = await instance.returnCandidateList(1);
      console.log(
        "Getting the deployed version of the Candidate smart contract"
      );
      for (let i=0; i<candidatelist.length;i++){
        let candidate = await Candidate.at(
          candidatelist[i]
        );
        let aadhaar = await candidate.displayAadhaar();
        console.log(aadhaar);
      }
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