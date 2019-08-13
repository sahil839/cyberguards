var CandidateFactory = artifacts.require("CandidateFactory");

module.exports = deployer => {
    deployer.deploy(CandidateFactory);
};