// server.js
const express = require('express');
const { getContract } = require('./connection.js');
const app = express();

app.use(express.json()); 

app.get('/health', (req, res) => {
    res.status(200).send({ status: 'Funcionando', message: 'O servidor está funcionando!' });
});

app.post('/createAsset', async (req, res) => {
    const { ID, Color, Size, Owner, AppraisedValue } = req.body;

    try {
        const contract = await getContract();

        await contract.submitTransaction('CreateAsset', ID, Color, Size, Owner, AppraisedValue);

        res.status(200).send({ message: 'Asset criado com sucesso!' });
    } catch (error) {
        console.error(`Erro ao criar asset: ${error}`);
        res.status(500).send({ error: 'Erro ao criar asset', details: error.message });
    }
});

app.get('/readAsset/:id', async (req, res) => {
    const assetId = req.params.id;

    try {
        const contract = await getContract();
        const result = await contract.evaluateTransaction('ReadAsset', assetId);
        res.status(200).json(JSON.parse(result.toString()));
    } catch (error) {
        console.error(`Erro ao consultar asset: ${error}`);
        res.status(500).send({ error: 'Erro ao consultar asset', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
