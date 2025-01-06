const Game = require('../domain/entities/Game');
const Player = require('../domain/entities/Player');

let game = null;

module.exports = {
    joinGame: (req, res) => {
        try {
            const { name } = req.body;
            if (!game) {
                game = new Game();
            }
            const player = new Player(Date.now().toString(), name);
            game.addPlayer(player);
            res.status(200).json({ playerId: player.id, message: `${name} joined the game` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getGameState: (req, res) => {
        try {
            if (!game) {
                return res.status(200).json({ status: 'Waiting for players' });
            }
            res.status(200).json(game.getState());
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    kickDoor: (req, res) => {
        try {
            const { playerId } = req.body;
            const result = game.kickDoor(playerId);
            res.status(200).json({ gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    startCombat: (req, res) => {
        try {
            const { playerId, monsterId } = req.body;
            const result = game.startCombat(playerId, monsterId);
            res.status(200).json({ gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    lootRoom: (req, res) => {
        try {
            const { playerId } = req.body;
            const result = game.lootRoom(playerId);
            res.status(200).json({ gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    nextTurn: (req, res) => {
        try {
            const result = game.nextTurn();
            res.status(200).json({ gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    playCard: (req, res) => {
        try {
            const { playerId, cardId } = req.body;
            const result = game.playCard(playerId, cardId);
            res.status(200).json({ gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    charity: (req, res) => {
        try {
            const { playerId, cardIds } = req.body;
            const result = game.handleCharity(playerId, cardIds);
            res.status(200).json({ gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    handleEquipRace(req, res) {
        try {
            const { playerId, raceName } = req.body;
            const game = Game.getInstance();
            const player = game.getPlayerById(playerId);
            GameService.equipRace(player, raceName);
            res.status(200).json({ message: 'Raça equipada com sucesso!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    handleEquipClass(req, res) {
        try {
            const { playerId, className } = req.body;
            const game = Game.getInstance();
            const player = game.getPlayerById(playerId);
            GameService.equipClass(player, className);
            res.status(200).json({ message: 'Classe equipada com sucesso!' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

};
