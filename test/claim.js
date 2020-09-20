const { expect } = require("chai");

describe("claim", function() {

  it("should fail if user has already claimed", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const WrappedPepe = await ethers.getContractFactory("WrappedPepe");

    const pepeCore = await TestPepeCore.deploy(['0x0000000000000000000000000000000000000000000000000000000000000001'])
    await pepeCore.deployed();
    const wrappedPepe = await WrappedPepe.deploy(pepeCore.address);
    await wrappedPepe.deployed();

    await wrappedPepe.claim(0);
    await expect(wrappedPepe.claim(0)).to.be.reverted;
  });

  it("should result in user having their copies of the specified tokenID", async function() {

  });

});

//describe("Greeter", function() {
  //it("Should return the new greeting once it's changed", async function() {
    //const Greeter = await ethers.getContractFactory("Greeter");
    //const greeter = await Greeter.deploy("Hello, world!");

    //await greeter.deployed();
    //expect(await greeter.greet()).to.equal("Hello, world!");

    //await greeter.setGreeting("Hola, mundo!");
    //expect(await greeter.greet()).to.equal("Hola, mundo!");
  //});
//});
