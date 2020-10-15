const { expect } = require("chai");

const { testIpfsHashes } = require("./utils");

const randAddress = "0x433A15f56e95Ee632dc690C032B5B2F7de447446"

describe("pepeV2Metadata", function() {

  it("should return the expected URIs for tokenIDs", async function() {
    const PepeV2 = await ethers.getContractFactory("PepeV2");
    const pepeV2 = await PepeV2.deploy(randAddress, testIpfsHashes);

    const uri = await pepeV2.uri(1);
    expect(uri).to.equal("ipfs://ipfs/QmYHFCLGqq2x5LGxrFbwbnuf7rbaJZuUxcfw1Ud2nmpaEz");
  });

});
