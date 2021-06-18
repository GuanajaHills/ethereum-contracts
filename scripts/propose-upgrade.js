const { defender } = require('hardhat');

async function main () {
  const proxyAddress = process.env.PROXY_ADDRESS;
  if (!proxyAddress) throw new Error('PROXY_ADDRESS env var missing');
  const upgradeContract = process.env.UPGRADE_CONTRACT;
  if (!upgradeContract) throw new Error('CONTRACT env var missing');

  const Contract = await ethers.getContractFactory(upgradeContract);
  const proposal = await defender.proposeUpgrade(proxyAddress, Contract);
  console.log('Upgrade proposal created at:', proposal.url);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
