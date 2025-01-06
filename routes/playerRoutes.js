const express = require('express');
const router = express.Router();

const PlayerHandler = require('../handlers/PlayerHandler');

// Rota para adicionar um jogador
router.post('/add', PlayerHandler.addPlayer);

// Rota para remover um jogador
router.delete('/remove/:id', PlayerHandler.removePlayer);

// Rota para listar jogadores
router.get('/', PlayerHandler.listPlayers);

module.exports = router;