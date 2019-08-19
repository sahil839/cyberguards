const routes = require("next-routes")();

routes
  .add("details", "/details/:aadhaar")
  .add("candidatedetails", "/candidatedetails/:ward")
  .add("result", "/result/:ward");

module.exports = routes;
