"use strict";
/** 
 * 
 * --------------------------------------
 * Servidor Node.js para interagir com a rede blockchain do Hyperledger Fabric
 * --------------------------------------
 * Este script é responsável por criar um servidor Node.js para interagir com a rede blockchain do Hyperledger Fabric.
 * Inicialmente é feita a importação do módulo express, em seguida são importadas as rotas do servidor para interagir com a rede blockchain.
 * O servidor é configurado para utilizar as rotas importadas e para escutar na porta 3000. 
 * 
 */

const express = require("express");
const assetsRoutes = require("./rotas");

const app = express();
app.use(express.json());

app.use("/assets", assetsRoutes);

app.get("/health", (req, res) => {
    res.status(200).send("O servidor está funcionando!");
});

app.listen(3000, () => {
    console.log("API server running on port 3000");
});
