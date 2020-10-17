const { expect } = require("chai");

const { testSigs, testIpfsHashes } = require("./utils");

describe("pepeV2Metadata", function() {
  it("should fail in returning a URI if the token ID hasn't been set", async function() {
    const [minter, other_addr] = await ethers.getSigners();
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const pepeV2 = await PepeV2.deploy(minter._address, testSigs, testIpfsHashes);

    await expect(pepeV2.uri(1))
      .to.be.revertedWith("PepeV2: Can only return URI for known token IDs");
  });

  it("should return the proper URI if the token ID has been set", async function() {
    const [minter, other_addr] = await ethers.getSigners();
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const pepeV2 = await PepeV2.deploy(minter._address, testSigs, testIpfsHashes);
    await pepeV2.connect(minter).setTokenId(1, testSigs[0]);

    const uri = await pepeV2.uri(1);
    expect(uri).to.equal(`ipfs://ipfs/${testIpfsHashes[0]}`);
  });
});
