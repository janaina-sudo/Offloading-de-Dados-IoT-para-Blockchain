/** 
 * 
 * ----------------------------------------
 * Configuração das variaveis de ambiente
 * ----------------------------------------
 * Este script é responsável por configurar as variáveis de ambiente utilizadas para a conexão com a rede blockchain.
 * As variáveis de ambiente são utilizadas para configurar o nome do canal, o nome do chaincode, o mspId, o caminho do diretório crypto,
 * o caminho do diretório de chaves privadas, o caminho do diretório de certificados, o caminho do certificado tls, o endpoint do peer,
 * o alias do host do peer. Essas variáveis de ambiente são utilizadas para configurar a conexão com a rede blockchain. 
 * OBS: os caminhos dos diretórios devem ser configurados de acordo com a estrutura de diretórios do fabric-samples/test-network.
 * 
 */

function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}

const config = {
    channelName: envOrDefault("CHANNEL_NAME", "mychannel"),
    chaincodeName: envOrDefault("CHAINCODE_NAME", "basic"),
    mspId: envOrDefault("MSP_ID", "Org1MSP"),
    cryptoPath: envOrDefault("CRYPTO_PATH", "/home/janaina-santos/Documentos/hyperledgerFabricIoT/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com"),
    keyDirectoryPath: envOrDefault("KEY_DIRECTORY_PATH", "/home/janaina-santos/Documentos/hyperledgerFabricIoT/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore"),
    certDirectoryPath: envOrDefault("CERT_DIRECTORY_PATH", "/home/janaina-santos/Documentos/hyperledgerFabricIoT/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/signcerts"),
    tlsCertPath: envOrDefault("TLS_CERT_PATH", "/home/janaina-santos/Documentos/hyperledgerFabricIoT/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt"),
    peerEndpoint: envOrDefault("PEER_ENDPOINT", "localhost:7051"),
    peerHostAlias: envOrDefault("PEER_HOST_ALIAS", "peer0.org1.example.com"),
};

module.exports = { config };
