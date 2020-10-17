const { expect } = require("chai");

const { testMerkleTree } = require("./utils");

describe("merkleVerify", function() {
  const randomNode = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const randomBranch = [
    '0x0000000000000000000000000000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000000000000000000000000000002'
  ]


  it("should succeed for the test nodes/proofs", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(testMerkleTree.root);

    for (const [leaf, proof] of Object.entries(testMerkleTree.leafToBranch)) {
      const result = await minter.merkleVerify(leaf, proof);
      expect(result).to.equal(true);
    }
  });

  it("should fail for a random node/proof", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(testMerkleTree.root);

    const result = await minter.merkleVerify(randomNode, randomBranch);
    expect(result).to.equal(false);
  });

});
