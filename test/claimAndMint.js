const { expect } = require("chai");

const { testSigs, testIpfsHashes, testMerkleTree } = require("./utils");

const sigToIpfsHash = {}
for (let i = 0; i < testSigs.length; i++) {
  sigToIpfsHash[testSigs[i]] = testIpfsHashes[i];
}

describe("claimAndMint", function() {

  it("should fail if mintable hasn't been set yet", async function() {
    const Minter = await ethers.getContractFactory("Minter");

    const minter = await Minter.deploy(testMerkleTree.root);

    const leaf = testMerkleTree.leaves[0];
    const vals = testMerkleTree.leafToVals[leaf];
    const branch = testMerkleTree.leafToBranch[leaf];

    await expect(minter.claim(vals[0], vals[1], vals[2], vals[3], branch))
      .to.be.revertedWith("Minter: Must have a mintable set");
  });

  it("should set the ownership of the token and ipfs Hash properly", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const minter = await Minter.deploy(testMerkleTree.root);
    const pepeV2 = await PepeV2.deploy(minter.address, testSigs, testIpfsHashes);
    await minter.setMintable(pepeV2.address);

    const leaf = testMerkleTree.leaves[0];
    const vals = testMerkleTree.leafToVals[leaf];
    const branch = testMerkleTree.leafToBranch[leaf];

    await minter.claim(vals[0], vals[1], vals[2], vals[3], branch)

    const balance = await pepeV2.balanceOf(vals[2], 1);
    expect(balance).to.equal(vals[3]);

    const uri = await pepeV2.uri(1);
    expect(uri).to.equal(`ipfs://ipfs/${sigToIpfsHash[vals[1]]}`)
  });

  it("should increment token ID for calls with a new sig", async function() {
    // TODO... do repetition

  });


  it("should fail if index has already been claimed", async function() {

  });



  it("use the same token ID for subsequent calls with the same sig", async function() {

  });
});
