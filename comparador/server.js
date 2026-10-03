// server.js
const express = require('express');
const path = require('path');
const { processarRotaEConsumo } = require('./businessRules');

const app = express();
const PORT = 3000;

// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint (Rota da API) que o Frontend vai chamar
app.get('/api/comparar-consumo', async (req, res) => {
    const { origem, destino } = req.query;
    
    if (!origem || !destino) {
        return res.status(400).json({ error: 'Origem e destino são obrigatórios.' });
    }
    
    try {
        const resultado = await processarRotaEConsumo(origem, destino);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});