const express = require('express');
const router = express.Router();
const GameHandler = require('../handlers/GameHandler');

// Join game route
router.post('/join', GameHandler.joinGame);

// Get game state route
router.get('/state', GameHandler.getGameState);

// Kick door route
router.post('/kick-door', GameHandler.kickDoor);

// Start combat route
router.post('/combat/start', GameHandler.startCombat);

// Loot room route
router.post('/loot', GameHandler.lootRoom);

// Next turn route
router.post('/next-turn', GameHandler.nextTurn);

// Play card route
router.post('/card/play', GameHandler.playCard);

// Charity route
router.post('/charity', GameHandler.charity);

router.post('/equip-race', GameHandler.handleEquipRace);
router.post('/equip-class', GameHandler.handleEquipClass);

module.exports = router;
