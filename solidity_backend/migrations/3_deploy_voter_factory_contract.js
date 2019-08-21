var VoterFactory = artifacts.require("VoterFactory");
module.exports = deployer => {
    console.log(deployer.deploy(VoterFactory));
};