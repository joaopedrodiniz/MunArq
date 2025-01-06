class Turn {
    constructor(player, game) {
      this.player = player;
      this.game = game;
      this.phase = 'kickDoor'; // Fase inicial do turno
    }
  
    // Executa a fase "Arrombar a Porta"
    kickDoor() {
      if (this.phase !== 'kickDoor') {
        throw new Error('A fase atual não permite arrombar a porta.');
      }
  
      const card = this.game.dungeonDeck.draw();
      if (card.type === 'Monster') {
        this.game.currentCombat = new CombatService(this.player, card);
        this.phase = 'combat';
        return { message: `Você encontrou um ${card.name}!`, card };
      } else if (card.type === 'Curse') {
        card.applyCurse(this.player);
        this.phase = 'charity';
        return { message: `Você foi amaldiçoado por ${card.name}.`, card };
      } else {
        this.player.addCardToHand(card);
        this.phase = 'troubleOrLoot';
        return { message: `Você encontrou ${card.name}.`, card };
      }
    }
  
    // Fase "Procurar Problemas" ou "Saque na Sala"
    troubleOrLoot(action) {
      if (this.phase !== 'troubleOrLoot') {
        throw new Error('A fase atual não permite esta ação.');
      }
  
      if (action === 'trouble') {
        // Procurar problemas: jogador escolhe um monstro de sua mão
        const monsterCard = this.player.hand.find((card) => card.type === 'Monster');
        if (!monsterCard) {
          throw new Error('Nenhum monstro disponível para procurar problemas.');
        }
        this.game.currentCombat = new CombatService(this.player, monsterCard);
        this.phase = 'combat';
        return { message: `Você desafiou ${monsterCard.name}.`, monsterCard };
      } else if (action === 'loot') {
        // Saquear a sala: jogador pega uma carta do baralho de masmorras
        const card = this.game.dungeonDeck.draw();
        this.player.addCardToHand(card);
        this.phase = 'charity';
        return { message: `Você saqueou ${card.name}.`, card };
      }
    }
  
    // Fase "Caridade"
    charity() {
      if (this.phase !== 'charity') {
        throw new Error('A fase atual não permite caridade.');
      }
  
      const excessCards = this.player.hand.length - 5;
      if (excessCards > 0) {
        const lowestLevelPlayers = this.game.players
          .filter((p) => p.level === Math.min(...this.game.players.map((p) => p.level)));
  
        const distributedCards = this.player.hand.splice(0, excessCards);
        for (const card of distributedCards) {
          const recipient = lowestLevelPlayers.shift();
          recipient.addCardToHand(card);
        }
      }
      this.phase = 'end';
      return { message: 'Caridade concluída.' };
    }
  
    // Finaliza o turno
    endTurn() {
      if (this.phase !== 'end') {
        throw new Error('Você não pode encerrar o turno agora.');
      }
  
      this.game.nextPlayer();
      return { message: `Turno encerrado. Próximo jogador: ${this.game.getCurrentPlayer().name}` };
    }
  }
  
  module.exports = Turn;
  