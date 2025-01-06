const Game = require('../domain/entities/Game');
const socket = require('socket.io'); 

module.exports = (io, socket) => {
    // Enviar o estado inicial do jogo
    const game = Game.getInstance();
    socket.emit('gameState', game.getState());


    // Notificar sobre início ou fim de jogo
    socket.on('startGame', () => {
        try {
            game.startGame();
            io.emit('gameState', game.getState()); // Notificar todos os clientes
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on('endGame', () => {
        try {
            game.endGame();
            io.emit('gameState', game.getState()); // Notificar todos os clientes
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    // Atualizar sobre mudanças de turno
    socket.on('nextTurn', () => {
        try {
            game.nextTurn();
            io.emit('gameState', game.getState()); // Notificar todos os clientes
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
      
        // ... other socket events ...
      
        socket.on('executeTurn', (playerId) => {
          try {
            TurnService.executeTurn(playerId);
            io.emit('gameState', game.getState()); // Notify all clients
          } catch (error) {
            socket.emit('error', error.message);
          }
        });
      
        socket.on('lookForTrouble', ({ playerId, monsterCardId }) => {
          try {
            game.lookForTrouble(playerId, monsterCardId);
            io.emit('gameState', game.getState()); // Notify all clients
          } catch (error) {
            socket.emit('error', error.message);
          }
        });
      
        socket.on('lootTheRoom', (playerId) => {
          try {
            game.lootTheRoom(playerId);
            io.emit('gameState', game.getState()); // Notify all clients
          } catch (error) {
            socket.emit('error', error.message);
          }
        });
      
      
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
      
};


