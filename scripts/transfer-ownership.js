// Transfers ownership over the ProxyAdmin to the specified address.
// Eg.: Gnosis Safe for multi-sig support.
async function main () {
  const ownerAddress = process.env.OWNER_ADDRESS;
  if (!ownerAddress) throw new Error('OWNER_ADDRESS env var missing');
  await upgrades.admin.transferProxyAdminOwnership(ownerAddress);
  console.log('Transferred ownership of ProxyAdmin to:', ownerAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
