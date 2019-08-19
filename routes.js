const routes = require("next-routes")();

routes
  .add("details", "/details/:aadhaar")
  .add("candidatedetails", "/candidatedetails/:ward");

module.exports = routes;
