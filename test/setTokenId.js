const { expect } = require("chai");

const { testSigs, testIpfsHashes } = require("./utils");

describe("setTokenId", function() {
  it("should fail if attempting to set from a non-minter address", async function() {
    const [minter, other_addr] = await ethers.getSigners();
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const pepeV2 = await PepeV2.deploy(minter._address, testSigs, testIpfsHashes);

    await expect(pepeV2.connect(other_addr).setTokenId(1, testSigs[0]))
      .to.be.revertedWith("PepeV2: Can only set token ID from minter address");
  });

  it("should succeed in setting tokenIdToSig if set from minter", async function() {
    const [minter, other_addr] = await ethers.getSigners();
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const pepeV2 = await PepeV2.deploy(minter._address, testSigs, testIpfsHashes);

    await pepeV2.connect(minter).setTokenId(1, testSigs[0]);
    const sig = await pepeV2.tokenIdToSig(1);
    expect(sig).to.equal(testSigs[0]);
  });

  it("shouldn't allow setting a given token ID more than once", async function() {
    const [minter, other_addr] = await ethers.getSigners();
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const pepeV2 = await PepeV2.deploy(minter._address, testSigs, testIpfsHashes);

    await pepeV2.connect(minter).setTokenId(1, testSigs[0]);
    await expect(pepeV2.connect(minter).setTokenId(1, testSigs[1]))
      .to.be.revertedWith("PepeV2: can only set token ID sig once");
  });
});
