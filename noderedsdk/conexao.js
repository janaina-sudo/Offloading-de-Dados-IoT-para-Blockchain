/** 
 * 
 * --------------------------------------
 * Conexao com a rede Blockchain
 * --------------------------------------
 * Este script é responsavel por fazer a conexão com a rede test-network configurada presente dentro da pasta fabric-samples.
 * Inicialmente é utilizado o módulo grpc para fazer a conexão com o peer da rede, em seguida é feita a conexão com a rede através 
 * do módulo fabric-gateway. A função setupConnection() é responsável por retornar o contrato que será utilizado para interagir com 
 * a rede blockchain do Hyperledger Fabric. O script contem as seguintes funções:
 * 
 * - newGrpcConnection(): cria uma nova conexão grpc com o peer da rede blockchain (Node.js SDK).
 * - newIdentity(): cria uma nova identidade a partir do certificado presente no diretório certDirectoryPath.
 * - newSigner(): cria um novo signer a partir da chave privada presente no diretório keyDirectoryPath.
 * - setupConnection(): faz a conexão com a rede blockchain e retorna o contrato que será utilizado para interagir com a rede.
 * - getAllAssets(contract): retorna todos os ativos presentes no ledger da rede blockchain.
 * - createAsset(contract, assetId, color, size, owner, appraisedValue): cria um novo ativo no ledger da rede blockchain.
 * - readAssetByID(contract, assetId): retorna um ativo específico presente no ledger dado o valor do assetId da rede blockchain.
 * 
 */

const grpc = require("@grpc/grpc-js");
const { connect, signers, hash } = require("@hyperledger/fabric-gateway");
const { getFirstDirFileName } = require("./utils");
const fs = require("fs").promises;
const crypto = require("crypto");
const { config } = require("./configuracaoenv");
const util = require("util");

const utf8Decoder = new util.TextDecoder();

async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile(config.tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(config.peerEndpoint, tlsCredentials, {
        "grpc.ssl_target_name_override": config.peerHostAlias,
    });
}

async function newIdentity() {
    const certPath = await getFirstDirFileName(config.certDirectoryPath);
    const credentials = await fs.readFile(certPath);
    return { mspId: config.mspId, credentials };
}

async function newSigner() {
    const keyPath = await getFirstDirFileName(config.keyDirectoryPath);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

async function setupConnection() {
    const client = await newGrpcConnection();
    const gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        hash: hash.sha256,
    });

    const network = gateway.getNetwork(config.channelName);
    const contract = network.getContract(config.chaincodeName);

    return { contract, gateway, client };
}

async function getAllAssets(contract) {
    const resultBytes = await contract.evaluateTransaction("GetAllAssets");
    const resultJson = utf8Decoder.decode(resultBytes);
    return JSON.parse(resultJson);
}

async function createAsset(contract, assetId, color, size, owner, appraisedValue) {
    await contract.submitTransaction("CreateAsset", assetId, color, size.toString(), owner, appraisedValue.toString());
}

async function readAssetByID(contract, assetId) {
    const resultBytes = await contract.evaluateTransaction("ReadAsset", assetId);
    const resultJson = utf8Decoder.decode(resultBytes);
    return JSON.parse(resultJson);
}

module.exports = {
    setupConnection,
    getAllAssets,
    createAsset,
    readAssetByID,
};
