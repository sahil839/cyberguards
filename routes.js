const routes = require("next-routes")();

routes
  .add("details", "/details/:aadhaar")
  .add("candidatedetails", "/candidatedetails/:aadhaar");

module.exports = routes;
