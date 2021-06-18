const { expect } = require('chai');

describe('CHIPToken', function () {
  before(async function () {
    this.CHIPToken = await ethers.getContractFactory('CHIPToken');
  });

  beforeEach(async function () {
    this.token = await upgrades.deployProxy(this.CHIPToken, { initializer: 'initialize' });
    await this.token.deployed();
  });

  it('should have correct name', async function () {
    const name = await this.token.name();
    expect(name).to.equal('Guanaja Hills Resort Chip');
  });

  it('should have correct symbol', async function () {
    const symbol = await this.token.symbol();
    expect(symbol).to.equal('CHIP');
  });

  it('should have no initial supply', async function () {
    const supply = await this.token.totalSupply();
    expect(supply).to.equal(0);
  });

  it('should have 2 decimal places', async function () {
    const decimals = await this.token.decimals();
    expect(decimals).to.equal(2);
  });

  it('should allow contract deployer to mint new token', async function () {
    const signers = await ethers.getSigners();
    await this.token.mint(signers[0].address, 999);
    const supply = await this.token.totalSupply();
    expect(supply).to.equal(999);
  });

  it('should not allow minting without minter role', async function () {
    const signers = await ethers.getSigners();
    const promise = this.token.connect(signers[1]).mint(signers[0].address, 999);
    await expect(promise).to.be.revertedWith('CHIPToken: minter role required');
    const supply = await this.token.totalSupply();
    expect(supply).to.equal(0);
  });

  it('should be upgradable', async function () {
    // Pre-upgrade state.
    const signers = await ethers.getSigners();
    await this.token.mint(signers[0].address, 999);
    // Upgrade.
    const CHIPTokenUpgrade = await ethers.getContractFactory('CHIPTokenUpgrade');
    const upgradedToken = await upgrades.upgradeProxy(this.token.address, CHIPTokenUpgrade);
    await upgradedToken.test();
    // Test post-upgrade state.
    const testVar = await upgradedToken.testVar();
    expect(testVar).to.equal('0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658');
    const supply = await upgradedToken.totalSupply();
    expect(supply).to.equal(999);
  });
});
