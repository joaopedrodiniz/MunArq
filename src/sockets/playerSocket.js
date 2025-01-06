const Game = require('../domain/entities/Game');

module.exports = (io, socket) => {
    // Conectar um jogador ao jogo
    socket.on('joinGame', (player) => {
        try {
            const game = Game.getInstance();
            game.players.push(player);
            io.emit('gameState', game.getState()); // Notificar todos os clientes
            console.log(`Jogador ${player.name} entrou no jogo.`);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    // Atualizar o estado de um jogador
    socket.on('updatePlayer', (updatedPlayer) => {
        try {
            const game = Game.getInstance();
            const playerIndex = game.players.findIndex(p => p.id === updatedPlayer.id);
            if (playerIndex === -1) throw new Error('Jogador não encontrado.');

            game.players[playerIndex] = updatedPlayer;
            io.emit('gameState', game.getState()); // Notificar todos os clientes
            console.log(`Jogador ${updatedPlayer.name} foi atualizado.`);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    // Remover um jogador
    socket.on('leaveGame', (playerId) => {
        try {
            const game = Game.getInstance();
            game.players = game.players.filter(p => p.id !== playerId);
            io.emit('gameState', game.getState()); // Notificar todos os clientes
            console.log(`Jogador ${playerId} saiu do jogo.`);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });
};