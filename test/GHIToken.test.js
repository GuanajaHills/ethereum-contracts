const { expect } = require('chai');

describe('GHIToken', function () {
  before(async function () {
    this.GHIToken = await ethers.getContractFactory('GHIToken');
  });

  beforeEach(async function () {
    this.token = await upgrades.deployProxy(this.GHIToken, { initializer: 'initialize' });
    await this.token.deployed();
  });

  it('should have correct name', async function () {
    const name = await this.token.name();
    expect(name).to.equal('Guanaja Hills Investment Token');
  });

  it('should have correct symbol', async function () {
    const symbol = await this.token.symbol();
    expect(symbol).to.equal('GHI');
  });

  it('should have a supply of 100 million', async function () {
    const supply = await this.token.totalSupply();
    expect(supply).to.equal(100 * 1000 * 1000);
  });

  it('should have no decimal places', async function () {
    const decimals = await this.token.decimals();
    expect(decimals).to.equal(0);
  });

  it('should allow contract deployer to create snapshots', async function () {
    const receipt = await this.token.snapshot();
    await expect(receipt).to.emit(this.token, 'Snapshot');
  });

  it('should not allow creating snapshots without snapshot role', async function () {
    const signers = await ethers.getSigners();
    const promise = this.token.connect(signers[1]).snapshot();
    await expect(promise).to.be.revertedWith('GHIToken: snapshot role required');
  });

  it('should be upgradable', async function () {
    // Upgrade.
    const GHITokenUpgrade = await ethers.getContractFactory('GHITokenUpgrade');
    const upgradedToken = await upgrades.upgradeProxy(this.token.address, GHITokenUpgrade);
    await upgradedToken.test();
    // Test post-upgrade state.
    const testVar = await upgradedToken.testVar();
    expect(testVar).to.equal('0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658');
    const supply = await upgradedToken.totalSupply();
    expect(supply).to.equal(100 * 1000 * 1000);
  });
});
