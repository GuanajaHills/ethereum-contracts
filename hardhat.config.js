require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require('@openzeppelin/hardhat-upgrades');
require('@openzeppelin/hardhat-defender');
require('solidity-coverage');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_API_RINKEBY_KEY_HTTP,
      accounts: { mnemonic: process.env.TESTNET_MNEMONIC },
    },
  },
  defender: {
    apiKey: process.env.DEFENDER_TEAM_API_KEY,
    apiSecret: process.env.DEFENDER_TEAM_API_SECRET_KEY,
  },
  solidity: '0.8.3',
};
