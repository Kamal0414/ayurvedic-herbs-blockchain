const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

class FabricService {
  constructor() {
    this.ccpPath = path.resolve(__dirname, '../config/fabric-network-connection.json');
    this.walletPath = path.join(process.cwd(), 'wallet');
    this.channelName = process.env.FABRIC_CHANNEL_NAME;
    this.chaincodeName = process.env.FABRIC_CHAINCODE_NAME;
    this.userId = process.env.FABRIC_USER_ID;
  }

  async getContract() {
    const ccp = JSON.parse(fs.readFileSync(this.ccpPath, 'utf8'));
    const wallet = await Wallets.newFileSystemWallet(this.walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: this.userId,
      discovery: { enabled: true, asLocalhost: true }
    });
    const network = await gateway.getNetwork(this.channelName);
    return network.getContract(this.chaincodeName);
  }

  async createBatch(data) {
    const contract = await this.getContract();
    await contract.submitTransaction(
      'CreateBatch',
      data.batchID, data.species, data.farmerID,
      data.latitude.toString(), data.longitude.toString(),
      data.address, data.quantityKg.toString()
    );
  }

  // processBatch, attachLabReport, transferBatch, getBatch, getAllBatches, getBatchHistory similar
}

module.exports = new FabricService();
