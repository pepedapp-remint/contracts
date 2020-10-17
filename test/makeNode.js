const { expect } = require("chai");

const { testMerkleTree } = require("./utils");

describe("makeNode", function() {
  it("should work as expected on actual values", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(testMerkleTree.root);

    for (const [leaf, vals] of Object.entries(testMerkleTree.leafToVals)) {
      const actualLeaf = await minter.makeNode(vals[0], vals[1], vals[2], vals[3]);
      expect(actualLeaf).to.equal(leaf);
    }
  });
});
