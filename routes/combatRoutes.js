const express = require('express');
const router = express.Router();
const Game = require('../domain/entities/Game');

// Iniciar um combate
router.post('/start', (req, res) => {
    try {
        const { playerId, monsterId } = req.body;
        const game = Game.getInstance();
        game.startCombat(playerId, monsterId);
        res.status(200).json({ message: 'Combate iniciado!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Resolver o combate
router.post('/resolve', (req, res) => {
    try {
        const game = Game.getInstance();
        var result = Game.resolveCombat();
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;