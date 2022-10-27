const EvaluationSystem = artifacts.require("EvaluationSystem");
const { expect } = require('chai');
const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("EvaluationSystem", function (accounts) {
  console.log('Accounts', accounts);

    let names = ['Juan'];

     beforeEach("Deployed", async () => {
       this.instance = await EvaluationSystem.deployed();
     });

     //testing address contract
     it("Should show address owner", async () => {
         let _address = await this.instance.address;
         console.log('Contract address', _address);
         assert(EvaluationSystem !== ' ');
     });

     //testing evaluate function
     it("Should evaluate owner address (teacher)", async () => {
       let _evaluated = await this.instance.evaluate('Jhon','12',10,{from:accounts[0]});
       let _seeGrades = await this.instance.seeGrades('12');
       expect(_evaluated,_seeGrades);
       });

   //testing event of evaluate function
   it('Should emit event EvaluateStudent', async () => {
    let receipt = await this.instance.evaluate('Juan','13',10,{from:accounts[0]});
      //console.log(receipt.logs);
     expectEvent(receipt,'EvaluateStudent',{name:'Juan'});
   });   

   //testing Revision function
   it('Should show list revision', async () => {
    let _sheck = await this.instance.sheckGrades('12');
    let _revision = await this.instance.Revision.call({from:accounts[0]});
      expect(_revision, _sheck);
   });

   //testing revert
   it('Revert if are not a teacher', async () => {
      await expectRevert(this.instance.evaluate('Andreu', '14', 8,{from:accounts[1]}),
      'You dont have permissions!');
   });

   it('Revert if student was evaluated', async () => {
    await expectRevert(this.instance.evaluate('Jhon', '12', 8,{from:accounts[0]}),
    'The student is already evaluated!');
   });
   
    it('Revert if the student already requested a review', async () => {
      await expectRevert(this.instance.sheckGrades('12'),
      'You already asked for review!');
    });

});
