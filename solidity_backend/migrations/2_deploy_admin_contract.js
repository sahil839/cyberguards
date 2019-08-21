var Admin = artifacts.require("Admin");
var day = 17;
var month = 8;
var year = 2019;
var name = "BlockVote";
module.exports = deployer => {
    deployer.deploy(Admin, day, month, year, name);
};