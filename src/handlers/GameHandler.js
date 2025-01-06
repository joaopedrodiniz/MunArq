const Game = require('../domain/entities/Game');
const Player = require('../domain/entities/Player');

let game = null;

module.exports = {
    // Jogador entra no jogo
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

    // Retorna o estado atual do jogo
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

    // Inicia o jogo
    startGame: (req, res) => {
        try {
            if (!game || game.players.length < 2) {
                throw new Error('O jogo precisa de pelo menos 2 jogadores para começar.');
            }
            game.startGame();
            res.status(200).json({ message: 'Jogo iniciado!', gameState: game.getState() });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Finaliza o jogo
    endGame: (req, res) => {
        try {
            if (!game) {
                throw new Error('Nenhum jogo em andamento para encerrar.');
            }
            game.endGame();
            res.status(200).json({ message: 'Jogo finalizado.', gameState: game.getState() });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Próximo turno (apenas para fins de debug)
    nextTurn: (req, res) => {
        try {
            if (!game) {
                throw new Error('Nenhum jogo em andamento.');
            }
            const result = game.nextTurn();
            res.status(200).json({ message: 'Turno atualizado.', gameState: game.getState(), ...result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};