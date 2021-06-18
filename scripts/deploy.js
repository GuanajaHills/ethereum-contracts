async function main () {
  const GHIToken = await ethers.getContractFactory('GHIToken');
  const ghiToken = await upgrades.deployProxy(GHIToken, { initializer: 'initialize' });
  await ghiToken.deployed();
  console.log('GHIToken deployed to:', ghiToken.address);

  const CHIPToken = await ethers.getContractFactory('CHIPToken');
  const chipToken = await upgrades.deployProxy(CHIPToken, { initializer: 'initialize' });
  await chipToken.deployed();
  console.log('CHIPToken deployed to:', chipToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
