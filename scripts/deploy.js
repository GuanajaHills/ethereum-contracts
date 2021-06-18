async function main () {
  // The address that should be the owner/admin of all contracts (eg. Gnosis Safe MultiSig).
  const ownerAddress = process.env.OWNER_ADDRESS;
  if (!ownerAddress) throw new Error('OWNER_ADDRESS env var missing');

  // NOTE: If it times out while polling for the transaction to be mined (TransactionMinedTimeout), comment out the
  // calls that have already succeeded and rerun the deployProxy() calls that threw the exception.

  // Deploy GHI Token.
  const GHIToken = await ethers.getContractFactory('GHIToken');
  const ghiToken = await upgrades.deployProxy(GHIToken, [ownerAddress], { initializer: 'initialize' });
  await ghiToken.deployed();
  console.log('GHIToken deployed to:', ghiToken.address);

  // Deploy CHIP Token.
  const CHIPToken = await ethers.getContractFactory('CHIPToken');
  const chipToken = await upgrades.deployProxy(CHIPToken, [ownerAddress], { initializer: 'initialize' });
  await chipToken.deployed();
  console.log('CHIPToken deployed to:', chipToken.address);

  // Transfer upgrade-proxy admin ownership.
  await upgrades.admin.transferProxyAdminOwnership(ownerAddress);
  console.log('Transferred ownership to:', ownerAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
