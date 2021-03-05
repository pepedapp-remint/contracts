require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/46e1129337704902bc55c7b1f3315a72",
      accounts: [
        // INSERT KEY!
      ]
    },
  },
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    version: "0.7.6",
  },
};
