const { expect } = require("chai");

const sigs = [
  '0x0000000000000000000000000000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000000000000000000000000000002',
  '0x0000000000000000000000000000000000000000000000000000000000000003',
  '0x0000000000000000000000000000000000000000000000000000000000000004',
  '0x0000000000000000000000000000000000000000000000000000000000000005'
]

describe("claim", function() {

  it("should fail if user has already claimed", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const WrappedPepe = await ethers.getContractFactory("WrappedPepe");

    const pepeCore = await TestPepeCore.deploy(sigs)
    await pepeCore.deployed();
    const wrappedPepe = await WrappedPepe.deploy(pepeCore.address);
    await wrappedPepe.deployed();

    await wrappedPepe.claim(0);
    await expect(wrappedPepe.claim(0))
      .to.be.revertedWith("Can only claim once per address");
  });

  it("should fail if called on a non-existant tokenId", async function() {

  });

  it("should result in user having their copies of the specified tokenID", async function() {

  });

});
