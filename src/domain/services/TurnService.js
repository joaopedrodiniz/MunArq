const Game = require('../entities/Game');

class TurnService {
  static executeTurn(playerId, action) {
    const game = Game.getInstance();
    const turn = game.currentTurn;

    if (!turn) {
      throw new Error('Nenhum turno em andamento.');
    }

    const player = game.getCurrentPlayer();
    if (player.id !== playerId) {
      throw new Error('Não é o turno deste jogador.');
    }

    switch (action) {
      case 'kickDoor':
        return turn.kickDoor();
      case 'trouble':
        return turn.troubleOrLoot('trouble');
      case 'loot':
        return turn.troubleOrLoot('loot');
      case 'charity':
        return turn.charity();
      case 'end':
        return turn.endTurn();
      default:
        throw new Error('Ação inválida para o turno.');
    }
  }
}

module.exports = TurnService;
