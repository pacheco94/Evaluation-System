const EvaluationSystem = artifacts.require("EvaluationSystem");

module.exports = function (deployer) {
  deployer.deploy(EvaluationSystem);
};