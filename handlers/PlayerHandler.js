const Game = require('../domain/entities/Game');
const Player = require('../domain/entities/Player');

module.exports = {
    addPlayer: (req, res) => {
        try {
            const { id, name } = req.body;
            const game = Game.getInstance();
            const newPlayer = new Player(id, name);
            game.players.push(newPlayer);
            res.status(201).json({ message: `Jogador ${name} adicionado!` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    removePlayer: (req, res) => {
        try {
            const { id } = req.params;
            const game = Game.getInstance();
            game.players = game.players.filter(player => player.id !== id);
            res.status(200).json({ message: `Jogador ${id} removido!` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    listPlayers: (req, res) => {
        try {
            const game = Game.getInstance();
            res.status(200).json(game.players);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    
};
