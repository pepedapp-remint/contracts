const { expect } = require("chai");

describe("merkleVerify", function() {
  // NOTE: from https://github.com/wrapped-pepes/airdrop
  const testRoot = "0x10bdfd02a5c1d7c937adb35387f9a120039837dfcb63835a0f839445fb5010b7";
  const testNode = "0x1513e50cda180dcadc6208a37244834c7d9005a596606c6d6c8a26ded9ad901b";
  const testBranch = [
    "0x5aac13476c63689363cad2069669f2e76a91e4f86e3ea095e81e2f97125d9afa",
    "0xe59965b8643a4578cc69410c23d8a0810012363303aa5186585de0b79fade804",
    "0xd0b9461e743cb564c739d49d2fb6e12d14d150ed3bcaee36e2212b919b469ba1",
    "0x2e8a243fe90fe637334df7924d0610e75ae0ac0da9c4e4decc0ff5cea6fc1e1d",
    "0xc8bd988a729086095348a9b4e70f7997b26bdfdcaf00033be68c7c6e85cadf7f",
    "0xa3df335554a7f10e8b11c7fec573932d4bcb0e09ef0a0194ac548138d227b1ec",
    "0x6f7f07916e3553b4330368ea66233697402d10896bbdcd6fecdc5e09aa248273",
    "0x8538b5215a7636dba065dab222108a1f3f3d2b12b78ee4c5a2d3d14092a29aed",
    "0xc1c707db0ed2786acd06b6c85b831b7e514f850f2e31f5f495a50a84994cf0be",
    "0x42755a075367c7a3254922bed01cb22d2053dfc58320aa373621c446c7e7194a",
    "0x38a4dade19b840481053114c3b84d65613487861cb2ecf929d7a44c9a5c149f0",
    "0x8137a054fc9c9ef62bf0e7226a42406ce13e80933f9049690a67977799c85eb1"
  ];
  const randomNode = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const randomBranch = [
    '0x0000000000000000000000000000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000000000000000000000000000002'
  ]


  it("should succeed for the test node/proof", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(testRoot, '0x433A15f56e95Ee632dc690C032B5B2F7de447446', []);

    const result = await minter.merkleVerify(testNode, testBranch);
    expect(result).to.equal(true);
  });

  it("should fail for a random node/proof", async function() {
    const Minter = await ethers.getContractFactory("Minter");
    const minter = await Minter.deploy(testRoot, '0x433A15f56e95Ee632dc690C032B5B2F7de447446', []);

    const result = await minter.merkleVerify(randomNode, randomBranch);
    expect(result).to.equal(false);
  });

});
