const Game = require('../entities/Game');

class TurnService {
  static executeTurn(playerId) {
    const game = Game.getInstance();
    const currentPlayer = game.getCurrentPlayer();

    if (currentPlayer.id !== playerId) {
      throw new Error('Não é o turno deste jogador.');
    }

    game.startTurn();

    // Kick door phase
    const kickedCard = game.kickDoor(playerId);

    if (kickedCard.type === 'Monster') {
      game.startCombat(playerId, kickedCard.id);
    } else {
      // Player can choose to look for trouble or loot the room
      // This decision should be made by the client
      // For now, we'll just loot the room
      game.lootTheRoom(playerId);
    }

    // End turn (includes charity)
    game.endTurn();
  }
}

module.exports = TurnService;
