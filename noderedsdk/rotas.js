/** 
 * 
 * --------------------------------------------------------
 *  Rotas do Servidor para interagir com a rede blockchain
 * ---------------------------------------------------------
 * Este script é responsavel por criar as rotas do servidor para interagir com a rede blockchain.
 * Inicialmente é feita a importação do módulo express e em seguida é criado um novo router express.
 * As rotas são criadas para interagir com a rede blockchain, sendo elas:
 * - Rota para retornar todos os ativos presentes na rede blockchain.
 * - Rota para retornar um ativo específico a partir do id.
 * - Rota para criar um novo ativo na rede blockchain.
 *
 */

const express = require("express");
const router = express.Router();
const { setupConnection, getAllAssets, createAsset, readAssetByID } = require("./conexao");

router.get("/", async (req, res) => {
    try {
        const { contract } = await setupConnection();
        const assets = await getAllAssets(contract);
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/:id", async (req, res) => {
    const assetId = req.params.id;
    try {
        const { contract } = await setupConnection();
        const asset = await readAssetByID(contract, assetId);
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/create", async (req, res) => {
    let { assetId, color, size, name, value } = req.body;

    try {
        const { contract } = await setupConnection();
        await createAsset(contract, assetId, color, size, name, value);
        res.status(200).send("Ativo criado com sucesso!");
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
