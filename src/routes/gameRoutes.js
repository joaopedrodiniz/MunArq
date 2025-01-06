const express = require('express');
const router = express.Router();

// Importando handlers
const GameHandler = require('../handlers/GameHandler');
const TurnHandler = require('../handlers/TurnHandler'); // Para turnos

// Rotas relacionadas ao jogo
router.post('/join', GameHandler.joinGame);          // Jogador entra no jogo
router.get('/state', GameHandler.getGameState);      // Estado atual do jogo
router.post('/start', GameHandler.startGame);        // Inicia o jogo
router.post('/end', GameHandler.endGame);            // Finaliza o jogo

// Rotas relacionadas ao turno
router.post('/turn/kick-door', TurnHandler.kickDoor);               // Arrombar a Porta
router.post('/turn/trouble-or-loot', TurnHandler.troubleOrLoot);    // Procurar Problemas ou Saquear Sala
router.post('/turn/charity', TurnHandler.charity);                  // Caridade
router.post('/turn/end', TurnHandler.endTurn);                      // Encerrar Turno

module.exports = router;
