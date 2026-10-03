const express = require('express');
const path = require('path');

const router = express.Router();
const electricHomePath = path.join(__dirname, '..', 'public', 'eletric.html');

router.get('/eletric', (req, res) => {
  res.sendFile(electricHomePath);
});

router.get('/eletricos', (req, res) => {
  res
    .status(501)
    .type('text')
    .send('A Central de descobertas ainda não está implementada.');
});

module.exports = router;
