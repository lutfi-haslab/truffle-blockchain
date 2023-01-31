const Adoption = artifacts.require("Adoption");
const Count = artifacts.require("Count");
const JsonString = artifacts.require("JsonString")
const JsonArray = artifacts.require("JsonArray")

module.exports = function(deployer) {
  deployer.deploy(JsonArray);
};