var Ballot = artifacts.require("Ballot");

module.exports = function(done) {
  console.log("Getting the deployed version of the Admin smart contract");
  Ballot.deployed()
    .then(async function(instance) {
      console.log("Calling createVoters");
      // let vote1 = await instance.vote("0x257DD9D87D0a7535388e05C364556b5B39078378", "0xBBBC2916D08CE267cbC24dD2b880A1CC251a9224");
      // let vote2 = await instance.vote("0x257DD9D87D0a7535388e05C364556b5B39078378", "0xf9e15Ca6ce92B0145d316977034f3C4cA04cb5b6");
      let vote3 = await instance.vote("0xbEC68C89BB43002aFCee0F89996cCF18b5510D93", "0xF0a7712CcD5f863a8caA673a09C93E4cdCF2FDff");
      return 1;
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



// 0xD251c65890Cbf3656e05D4844a3619829c4cFDB6
// 0xe4D477f64F51267dD71414d5653f7a5f31cD8B04
// 0xc56Be7a1208fE387F143DA8b31F2891F0b604Ae3



// 0xE3Ec72fBc1506068749021D18fb464a05eDC200B
// 0x9a35e6cD0Ce823e5a1320790f60a36b29730f0A4