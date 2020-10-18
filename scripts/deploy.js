// We require the Buidler Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
// When running the script with `buidler run <script>` you'll find the Buidler
// Runtime Environment's members available in the global scope.
const bre = require("@nomiclabs/buidler");

const merkleRoot = "0x8c3589d8de5a345c612b4144ff28d57a4337e53feb1a804ba5357bbc28087170";
const sigs = [
  "0x91781647437c48bc328f25d4c47b6f24cf8a46ab1b0f3c63704f9705178c0b5d",
  "0x2fde0bc20c20a82166355cf1b6b78d01a4411d4794703642b04d3ec0232548ca",
  "0xfa61d833ca2c8fc6f23aabbc18a23eef4e6313bc47446ecb06dbb148eefe349a",
  "0x7f43c4e20a98081432b88599fcdbf9e2d8a3b7093515a473f828190a2d82e045",
  "0x4fc4fd5e45256c6074fcfa6705c9f8f17cca4fbc2e334c238a245edecc09fabf",
  "0x10c7871c5794b23562937b3b10abe535d5164acfee07d8109aec4af7bdd09d84",
  "0x7a6f424e3883f69688aa191a08e0f8b03a2da963afe6a080337ee476b9c3589e",
  "0x05788e5a6fae013209599b7899cfc89f5559641feb121b7a3e6cc3be2daf4068",
  "0x89bb1be1fb0ea747de9e02f21ed76c98a2c1a83775fc0fd9acc0d5e302d2b1ac",
  "0xaf63a02c558a3f5b3dda2a040b0bdc78b8ab0e36b58eba524b3d29c04a34583b",
  "0xd8b90b8c24e203c4c18e162b98d52ba01155af03e8d20a612e8aec24f14c4fc6",
  "0x6a5ce53aa652306b139b77b3a0de38c6b1cd0e43383d6bdafc8f4a063527feb4",
  "0xba563cc12e6ca57a4041b3959367cb0b09924cd19646031fe44678b675e769b0",
  "0x7b08aa4b59c690330631aadebb59d83fe8a66b97766920de16ac45910c6ba733",
  "0x4ef7c56f860c0a7edb918c2cd692594ca391b747fbc2d2ec340d32511aaffefc",
  "0xbd4d181cccd9ec7f70ef63d02a93f26765a790d8fee03b7ee682792e5cbf78b4",
  "0x20c83c5b460e76df8591c89528c04d009ba45a2d59197f350c74953295f6c109",
  "0xcccc4d6e704b77395b9ee4108631d2af41d1e8336c1242dc850333d1a18a978f",
  "0xc99f67bd53dd2fb621858f780bdec8fe5793b20fc60f9a3df110b6d577fc01cf",
  "0xba7469ba4efe2078a7cdae47444109b741678232a2ac9cb030f9bd39febb17da",
  "0x3a39c5f35b3c05614cdf99eb7884e76ee362c521a5f41f6b56ce95e4f3b5ff8b",
  "0xa431e8bd585950fb846d762b7dfdceb2827437d8afef1246bf92d272b6342977",
  "0x5235eecbec0bdb8e08f664c5c5867b5193aece7577f35bb555f68834f9ea12ef",
  "0x76f941a558c7330b19b557295d4eb56e38e5034b154918c08544137181348a86",
  "0xa8bc86c65d45cbeb818518a64ce67f7ab0d7a549c6a688f63a77a8801b706fd0",
  "0x06b6647fa668273ccbe34bae1de5821e6a20b80debb76a0a39a226d28980086c",
  "0xdcbcb0d85c03db6b855e425fcb219f6435a041487939babb56a25a46afc56000",
  "0xbdf6b4167de60f9da3fcaa3e08c249b92332b3ad33bd18e5365dbd4059e5bb90",
  "0x752663a7c5b0ad285ea894a9ec02fb859edf82c6541e48f1315d790f3bd4060f",
  "0x981a9a95f89ceb15741ce20f3555954ac88333e6ce234a7e10043404d66207dd",
  "0xaa65e74b4ab9c5f584424388b01667de681ecd17e87ca845a4665af0ae889c92",
  "0x17b638bef6634122c117e1e809da4e3d8ea63c7cd7c067a22ab3e53b8bbfb02e",
  "0xee214c4156637a9ac7a99dc94fafc0978eb38c3f8f7a3ab24bc30dc1455ef014",
  "0x5c4361352ef0e6f52fa68a81d4dec8a5383ac050147239e148262448fc53bc46",
  "0x8e87826417dbc05d8717bc1c33f7b45467ea5bf3111c1948f08abadd54da02dd",
  "0xa5c2c13fdae9afe4d4d3287011e4cb1495700b964bd4f398f94abc24ba4440f2",
  "0x3cc32745d9519f6002514e2318064f6f91733f2405c1662c1eb4677a005b4815",
  "0xbfc3301d66b05a4068f9e0ec421cc95a435a7d91134734e054c57ec160ad6dd1",
  "0xf8639f8c3965bdb24379a5312d3c51ad066102edc783e995ad39236672336b57",
  "0x7f087b38c7ddfcc6ace3f26c842c9536f36190096b1e096d45d5ed9160fbcf82",
  "0x16099ffb7064e269abf6a27a03b1b1b1108891c08709f206df2c970dd67f7a8f",
  "0x1d362c64c86cb4ba4a27a60d6994077d83928cb7aefb9e353feec6068da7fda7",
  "0x01465b5a079a742e66ef3e6184ef6d125eaa1de8201339cf32503c32ac1624e8",
  "0xd369cbd71ed5f8ee9f74920172160f28d9907376c6280121335ad8326dc3d403",
  "0xaf6dc202fd533e92b80e5b6e0c105823b497da2fdc8b73483ef47116878ad69d",
  "0xf328c5631465dd8a8a13942eb8e05512b3c8a5b05ffc97dc56014dad8bdfb5e4",
  "0xc1d2a5425b13b8295fe144f95aa09997f7d2d37017899077e48dd2d6bb9d0f71",
  "0xfaf2d410fdc8ed22ed8f47ac86cb26a6656d734a405b4e91646e7e0624f6bc24",
  "0x870b6a4bf32371f7feb8cd414204f8e09c99d6f51782560aa2f01ea1c9728236",
  "0xaef351c8e8b940e546173bd05197f6dae08df962e82fcdcd8368584426f08988",
  "0x3181d4b9b8648f4d4163080398aab0f58744586db2f92b24c9917b74a8f7ece7",
  "0x29ee41a8f854e8cdd08ae4040debd3d9484ba045b407d058cabf196a44b96b95",
  "0xfb8ef8b25c4709925b9e1a81557e68cf11bb2eeae0cea89a9465c0e8983758c3",
  "0xe5a3d531c74028e0697d0a811b10cd7b37ab83138f49c24c40a881cee34b281f",
  "0x5c5c4b08f2ab2850bf37df9c86509f5458da80dc41020da10bf2f0e0a47d1ad4",
  "0xfdace08abdccfb2ab62a6f0fd964bc1e51419ae4df69f473f2ed2738d8280443",
  "0x72eadf7aea2df67c83e46c487721e40e9f7f268da7b9b48d24a5e046f888ce4a",
  "0xe25bf6639bb98ae53654cf0d389b756304f917b948ce28218cb14916a79db6e7"
];

const ipfsHashes = [
  'QmVpweR64Ke5P9zVLRboWMpDzTpFeNveopVKGc5NoSTFYe',
  'QmUToCYReSsVANzVQEHbJeRkZNZqhJHgZRNS7n968KSGTQ',
  'QmXTgGDiZAnSy7QioraST8sdoEfVLG3b8fyJ5HzfuBynXS',
  'QmWZcFt1toHH3HRwkHSVFTpnHPtZkm11G9Yau5137WAg5e',
  'QmXkyWYkFmzTVbEFMjkzEtnnddXKmkVnPfsnKgwE5TkJK6',
  'Qmcsrqu8CrheSz5LUrC2mkX9EHQsCrHtFCP68LtBtEhHnL',
  'QmZms6W1w1RNTgtRF45HKRGiVJoSCtM2kqPsEeSXmjeRWq',
  'QmPTmN4cqZS2Vw7SELBZb2jgwu6X3CETS3KzQXxKz35azf',
  'QmaCAUR76TE3mQ4vYUfWVsvEYw2Np1hfCqboEUF47FDXXz',
  'Qmcz73Z1H6wiRGUnGNXDuorLPQAKxFMAry22DhZPax5Jy2',
  'Qmdjze9GgMJDWGcA2msenNSZFK6wykHNhGic61Nq3s4vyi',
  'QmaonGdMpdu1ghcXQA3iHGnoC4tDwPi2V9VVndhTXGaZha',
  'QmNNbKJPa4F4BicHPCHA98nZxBCASW1C14r1vJwmBYQeAb',
  'QmXMfBsMTMLew6MZa7e9URSsptyVThpU2QBq5hxYnpAvq6',
  'QmNfegZQk7sGSd81CTAMnLwX5suy6PL3pFCJ9AmpbMnYGw',
  'Qmbp89sJNnesV4vwunfEbb822XwCR9GmkLoUuoWEmXZYwK',
  'QmWUWFHvC8LKsqHXFS2zNb7kvwxrqwB2dRJRZriPwMrLu1',
  'QmU7MGycBoSYZTgUhRV3TkgDwcRqT8Fk9pUq7gAmjYfz81',
  'Qmb1vbVVYnFYVaCVKv53d7cJQmJqHum5syBxmEGswuUQYS',
  'QmbEudYWej3suT2PyD9HpFrhfaVj3pqHabFSHBAMKNcFCD',
  'QmR6squxi2gabg8ocDKU4gxUgTa8DEsewv8DRFSTGi8ABd',
  'QmbuhJH72JFD967TmghNFpjqFyXvm25qk2nXh9hYGgTr4d',
  'QmRmuJCMDzhCqCjrvzyhykAk4FxkHyLFQzXdYy7G7yNC61',
  'QmXWtfEKeYgpnXncferCUdsHQUzZR1rki12nvAPiu3Ra87',
  'QmPBAnSimMg6bpZqPpvLCNfHMs9PoubWUqATs1rk5fNfco',
  'QmYsLRyFae237BS8snMnTBNa8tuH9bgMkoitkrr8CQfQBC',
  'QmRaCfKtNfcPXe1cxYnew8LaA5UgQ85LePExTTGbusMvb1',
  'QmVHkdCz94LVw3EjtxC8VBk3bJYCATCW6XihY8hguM1wUJ',
  'Qme9VMxZPDbwtAivrhw9yM74jfzCuRoZ7EU66S2AsmEagb',
  'QmVD1jQWXX3AtEg9EDmDtxwh9TTNRhB1Vss1rK75GRhkwu',
  'QmRZkTeJRLKz16XDekUZJi7HP1hEMQydZesKM18FwzJe7Q',
  'QmcNQ51sPDZt6go4JZUc9VafbzapdtHrFzWALgewX2ez2g',
  'QmQg2buv6KCPfoWpCPfg3LT5nqiHubD7ZmnkwPk82JmAqf',
  'QmYEgVPanXoZYnLgQJfr91tDzLDnxzmHNXL3RziGfoX51z',
  'QmSYpaDBPkJZqyg6wf4snnVg7e7C3WFrakuZMwZQ7hLToU',
  'QmV4jc7WZoC5U2N1cwoUsE1wpupRBeCUFY9YvzDfP3i59i',
  'QmX9AaFrr3No2rwZbCvUXGJbH6se7jFiopX5LQ1Y7GbHQY',
  'QmYahBrCkyw6JJDJHHMYPdW6znbvE9Qrp2G7imvvssg2Lx',
  'QmPk1YeMQJXgP1qgWs51EGWeesmd9zEWyr3HLdxkP6ovrx',
  'QmWDfmvxD1eB8Kv8dtMXSPTCPEfFYEhnQSX7EiftmiBLQh',
  'QmRrQr3XkqdN3ofBWhdihL41dkQfuPM58kDzPiUQtXZX3Q',
  'QmUNg63wk6ibeirwUTruD7TMR6BfjDKH3tG9AP3D5R9so3',
  'QmcMqJP6RiXCiimXqi57gx7JzUJ6pWdVhjxEMmSTHxesvb',
  'QmdEZWShPZM4V84v6dDm7jqe1XK5K6tCWadjZj37f3nYcv',
  'QmehQABsu2JHfEUsGEBcwCAqrFz1pXyhqzB8rhvrtVUw6E',
  'QmYEChn7p3gAy2wZoRFxdP38c79uQMxhTii9Xt4FWvGWtF',
  'QmeZqakkbNtoUjoXZjm7sitKfkiDyLrt12dXzVE5B59aR9',
  'QmVTxVk577WRjLCzue2DX9iiuADMm9s8D9DfUC84vkaxsX',
  'QmbzjkAL9dsW8gpF9d8E5H5pqqxkFq3uZ7epWcCwDqnQuk',
  'QmcG6ZKinChYWzEwvyv3stsScy8dSeUuYBRX2DWP3ixgyg',
  'QmY32CdkQDoYbf8BXcQ6JinAtjjRyyTfQd11wMNcdDZiHF',
  'QmeEemLkDQmmDT7UFdtprpXKnyAoeTyyMFjNc6XEr3vZSg',
  'QmbNjtcWhcDqgavvPLVqopAkj8aH1sCS8enTp4m9An3QYF',
  'QmZMGR4N74w4kLxmY3GgFdRqaJQGMF9k51xuzsMg7dcid4',
  'QmVYdSVVhgkJCM2SQfuLXNay5bXTAiwTkDYaZ1ML8YZK88',
  'QmXZizFhrXnM7BnE6qXv27xNpGA5wtaDTcsDVXiXDyh3BU',
  'QmPDxwMtgoUdPtovVLVCLRzCK71rTRw9FfPJCRkRkjnK32',
  'QmSwCm37usYn2zJHvitAAV9yDmA8WQyg77vAUvzyM9RKBU'
];

// NOTE: sample code for greeter
async function main() {
  // We get the contract to deploy
  const Minter = await ethers.getContractFactory("Minter");
  const PepeV2 = await ethers.getContractFactory("PepeV2");

  const minter = await Minter.deploy(merkleRoot);
  await minter.deployed();
  console.log(`Minter deployed to: ${minter.address}`);

  const pepeV2 = await PepeV2.deploy(minter.address, sigs, ipfsHashes);
  await pepeV2.deployed();
  console.log(`PepeV2 deployed to ${pepeV2.address}`);

  await minter.setMintable(pepeV2.address);
  console.log(`Minter mintable set to Pepe V2 at address ${pepeV2.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
