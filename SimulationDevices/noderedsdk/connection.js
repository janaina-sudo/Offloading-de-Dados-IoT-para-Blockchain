'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const getContract = async () => {

    const connectionProfileName = '/home/janaina-santos/Documentos/hyperledgerFabricIoT/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json'
    const connectionProfileJson = (await fs.promises.readFile(connectionProfileName)).toString();
    const connectionProfile = JSON.parse(connectionProfileJson);

    const walletpath = 'noderedsdk/wallet/Admin@org1.example.com'
    const wallet = await Wallets.newFileSystemWallet(walletpath);
    const gatewayOptions = {
        wallet,
        identity: 'Admin@org1.example.com',
    }
    const gateway = new Gateway();
    await gateway.connect(connectionProfile, gatewayOptions);

    console.log('Conectado ao Fabric' + connectionProfileName);


    try {
     

        const network = await gateway.getNetwork('projectiot');
        const contract = network.getContract('chaincode-javascript');


    } catch (error) {
        console.error(`Erro ao conectar ao Fabric: ${error}`);
        process.exit(1);
    }
};

module.exports = { getContract };
