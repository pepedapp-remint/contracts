const { expect } = require("chai");
const { ethers } = require("@nomiclabs/buidler");

const sigs = [
  '0x0000000000000000000000000000000000000000000000000000000000000001',
  '0x0000000000000000000000000000000000000000000000000000000000000002',
  '0x0000000000000000000000000000000000000000000000000000000000000003',
  '0x0000000000000000000000000000000000000000000000000000000000000004',
  '0x0000000000000000000000000000000000000000000000000000000000000005'
]

describe("claim", function() {

  it("should fail if user doesn't own the specified token in PepeCore", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const WrappedPepe = await ethers.getContractFactory("WrappedPepe");

    const pepeCore = await TestPepeCore.deploy(sigs)
    await pepeCore.deployed();
    const wrappedPepe = await WrappedPepe.deploy(pepeCore.address);
    await wrappedPepe.deployed();

    await expect(wrappedPepe.claim(0))
      .to.be.revertedWith("Must own the original token in PepeCore");
  });

  it.only("should fail if user has already claimed", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const WrappedPepe = await ethers.getContractFactory("WrappedPepe");
    const [addr1, addr2] = await ethers.getSigners();
    const tokenId = 0;

    const pepeCore = await TestPepeCore.deploy(sigs)
    await pepeCore.deployed();
    await pepeCore.connect(addr1).setNumSigsOwned(sigs[tokenId], 2);

    //const ret = await pepeCore.connect(addr1).getNumSigsOwned(sigs[0])
    //console.log(ret);

    const wrappedPepe = await WrappedPepe.deploy(pepeCore.address);
    await wrappedPepe.deployed();

    await wrappedPepe.connect(addr1).claim(tokenId);
    //await expect(wrappedPepe.connect(addr1).claim(0))
      //.to.be.revertedWith("Can only claim once per address");
  });

  it.skip("should fail if called on a non-existant tokenId", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const WrappedPepe = await ethers.getContractFactory("WrappedPepe");

    const pepeCore = await TestPepeCore.deploy(sigs)
    await pepeCore.deployed();
    const wrappedPepe = await WrappedPepe.deploy(pepeCore.address);
    await wrappedPepe.deployed();

    await expect(wrappedPepe.claim(5))
      .to.be.revertedWith("Can't claim tokens that don't exist");
  });

  it.skip("should result in user having their copies of the specified tokenID", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const WrappedPepe = await ethers.getContractFactory("WrappedPepe");

    const pepeCore = await TestPepeCore.deploy(sigs)
    await pepeCore.deployed();
    const wrappedPepe = await WrappedPepe.deploy(pepeCore.address);
    await wrappedPepe.deployed();

    await wrappedPepe.claim(0);
  });

});
