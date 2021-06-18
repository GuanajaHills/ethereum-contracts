// Transfers ownership over the ProxyAdmin to the specified Gnosis Safe for
// multi-sig support.
async function main () {
  const gnosisSafe = process.env.GNOSIS_SAFE_ADDRESS;
  if (!gnosisSafe) throw new Error('GNOSIS_SAFE_ADDRESS env var missing');
  await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);
  console.log('Transferred ownership of ProxyAdmin to:', gnosisSafe);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
