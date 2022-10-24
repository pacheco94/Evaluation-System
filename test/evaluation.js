const Evaluation = artifacts.require("Evaluation");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Evaluation", function (/* accounts */) {
  it("should assert true", async function () {
    await Evaluation.deployed();
    return assert.isTrue(true);
  });
});
