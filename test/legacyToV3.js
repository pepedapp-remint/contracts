const { expect } = require("chai");

const testSig = "0x91781647437c48bc328f25d4c47b6f24cf8a46ab1b0f3c63704f9705178c0b5d";

describe("legacyToV3", function () {

  it.only("should succeed if owner has the required amount of legacy tokens", async function() {
    const TestPepeCore = await ethers.getContractFactory("TestPepeCore");
    const Bridge = await ethers.getContractFactory("Bridge");

    const pepeCore = await TestPepeCore.deploy();
    const bridge = await Bridge.deploy(pepeCore.address);

    const [owner] = await ethers.getSigners();
    await pepeCore.setSigCount(testSig, 5, owner.address);
    //expect(await pepeCore.getSigCount(testSig, owner.address)).to.equal(5);

    await bridge.connect(owner).legacyToV3(testSig, 5);
  });

  it("should fail if the owner doesn't have the required amount of legacy tokens", async function() {

  });

});
