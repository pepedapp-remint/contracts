const { expect } = require("chai");

describe("makeNode", function() {
  const testRoot = "0x10bdfd02a5c1d7c937adb35387f9a120039837dfcb63835a0f839445fb5010b7";

  // NOTE: from https://github.com/wrapped-pepes/airdrop
  const testValues = {
    '0xd49332e4f3b92342001b631b66f95d6a6a6bf6ec306df7414f4e2be926fb9928':
      [0,'0x01465b5a079a742e66ef3e6184ef6d125eaa1de8201339cf32503c32ac1624e8','0x13154CE2844490BfA5E0FE038149A90e84F56f13',1],

    '0x25d6a00e5c158fa9916393788f8c51b03a10a016bb62423618e1666b238c39bd':
      [1,'0x01465b5a079a742e66ef3e6184ef6d125eaa1de8201339cf32503c32ac1624e8','0x433A15f56e95Ee632dc690C032B5B2F7de447446',33],

    '0xc2fd78394ac23461309bcad6b514dfa259a7b5db18fc2b2b08d53ea1451d0491':
      [2912,'0xfdace08abdccfb2ab62a6f0fd964bc1e51419ae4df69f473f2ed2738d8280443', '0xf7dBFe7dcFBA501464008554e7c5EddE8ab7B0ff', 27]
  }

  it("should work as expected on actual values", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(testRoot);

    for (const root in testValues) {
      const tuple = testValues[root]

      const actualRoot = await minter.makeNode(tuple[0], tuple[1], tuple[2], tuple[3]);
      expect(actualRoot).to.equal(root);
    }
  });
});
