/** 
 * 
 * --------------------------------------
 *  Utils - Funções auxiliares
 * --------------------------------------
 * Este script é responsável por conter funções auxiliares que são utilizadas em outros scripts.
 * A função getFirstDirFileName é responsável por retornar o caminho do primeiro arquivo presente em um diretório.
 * Ajuda a encontrar o caminho do certificado tls, do diretório de chaves privadas e do diretório de certificados.
 */
const fs = require("fs").promises;
const path = require("path");

async function getFirstDirFileName(dirPath) {
    const files = await fs.readdir(dirPath);
    const file = files[0];
    if (!file) throw new Error(`Nao existe arquivos no diretorio: ${dirPath}`);
    return path.join(dirPath, file);
}

module.exports = {
    getFirstDirFileName,
};
