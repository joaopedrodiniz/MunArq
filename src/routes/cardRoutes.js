const express = require('express');
const router = express.Router();

const CardHandler = require('../handlers/CardHandler');

// Rota para listar cartas disponíveis
router.get('/', CardHandler.listCards);

// Rota para jogar uma carta
router.post('/play', CardHandler.playCard);

module.exports = router;