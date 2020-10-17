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
    const Minter = await ethers.getContractFactory("Minter");
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const minter = await Minter.deploy(testMerkleTree.root);
    const pepeV2 = await PepeV2.deploy(minter.address, testSigs, testIpfsHashes);
    await minter.setMintable(pepeV2.address);

    const leaf = testMerkleTree.leaves[0];
    const vals = testMerkleTree.leafToVals[leaf];
    const branch = testMerkleTree.leafToBranch[leaf];

    await minter.claim(vals[0], vals[1], vals[2], vals[3], branch)

    const leaf2 = testMerkleTree.leaves[2];
    const vals2 = testMerkleTree.leafToVals[leaf2];
    const branch2 = testMerkleTree.leafToBranch[leaf2];

    await minter.claim(vals2[0], vals2[1], vals2[2], vals2[3], branch2)

    const balance = await pepeV2.balanceOf(vals2[2], 2);
    expect(balance).to.equal(vals2[3]);
    const emptyBalance = await pepeV2.balanceOf(vals2[2], 1);
    expect(emptyBalance).to.equal(0);
  });

  it("use the same token ID for subsequent calls with the same sig", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const minter = await Minter.deploy(testMerkleTree.root);
    const pepeV2 = await PepeV2.deploy(minter.address, testSigs, testIpfsHashes);
    await minter.setMintable(pepeV2.address);

    const leaf = testMerkleTree.leaves[0];
    const vals = testMerkleTree.leafToVals[leaf];
    const branch = testMerkleTree.leafToBranch[leaf];

    await minter.claim(vals[0], vals[1], vals[2], vals[3], branch)

    const leaf2 = testMerkleTree.leaves[1];
    const vals2 = testMerkleTree.leafToVals[leaf2];
    const branch2 = testMerkleTree.leafToBranch[leaf2];

    await minter.claim(vals2[0], vals2[1], vals2[2], vals2[3], branch2)

    const balance = await pepeV2.balanceOf(vals2[2], 1);
    expect(balance).to.equal(vals2[3]);
    const emptyBalance = await pepeV2.balanceOf(vals2[2], 2);
    expect(emptyBalance).to.equal(0);
  });

  it("should fail if index has already been claimed", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const PepeV2 = await ethers.getContractFactory("PepeV2");

    const minter = await Minter.deploy(testMerkleTree.root);
    const pepeV2 = await PepeV2.deploy(minter.address, testSigs, testIpfsHashes);
    await minter.setMintable(pepeV2.address);

    const leaf = testMerkleTree.leaves[0];
    const vals = testMerkleTree.leafToVals[leaf];
    const branch = testMerkleTree.leafToBranch[leaf];

    await minter.claim(vals[0], vals[1], vals[2], vals[3], branch)

    await expect(minter.claim(vals[0], vals[1], vals[2], vals[3], branch))
      .to.be.revertedWith("Minter: Can't claim a drop that's already been claimed");
  });
});
