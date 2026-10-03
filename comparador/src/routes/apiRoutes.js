const express = require('express');
const { processarRotaEConsumo } = require('../../businessRules');

const router = express.Router();

router.get('/comparar-consumo', async (req, res) => {
  const { origem, destino } = req.query;

  if (!origem || !destino) {
    return res.status(400).json({ error: 'Origem e destino são obrigatórios.' });
  }

  try {
    const resultado = await processarRotaEConsumo(origem, destino);
    return res.json(resultado);
  } catch (error) {
    console.error('Erro ao comparar consumo:', error);
    return res.status(500).json({ error: 'Não foi possível comparar o consumo.' });
  }
});

module.exports = router;
