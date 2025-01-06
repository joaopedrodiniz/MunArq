const Player = require('./Player');
const DungeonDeck = require('./DungeonDeck');
const TreasureDeck = require('./TreasureDeck');

class Game {
    constructor() {
      if (Game.instance) return Game.instance;
  
      this.players = [];
      this.dungeonDeck = new DungeonDeck();
      this.treasureDeck = new TreasureDeck();
      this.currentPlayerIndex = 0;
      this.currentTurn = null; // Controle de turnos
      this.currentCombat = null;
  
      Game.instance = this;
    }
  
    static getInstance() {
      if (!Game.instance) {
        Game.instance = new Game();
      }
      return Game.instance;
    }
  
    startTurn() {
      const currentPlayer = this.getCurrentPlayer();
      this.currentTurn = new Turn(currentPlayer, this);
      return { message: `Iniciando o turno de ${currentPlayer.name}.` };
    }
  
    nextPlayer() {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.currentTurn = null; // Limpa o turno atual
    }
  
    getCurrentPlayer() {
      return this.players[this.currentPlayerIndex];
    }


    getState() {
        const currentPlayer = this.getCurrentPlayer();
        return {
            players: this.players.map(player => player.getState()),
            currentPlayer: currentPlayer ? currentPlayer.getState() : null,
            dungeonDeckCount: this.dungeonDeck.getCount(),
            treasureDeckCount: this.treasureDeck.getCount(),
            status: this.status,
            currentCombat: this.currentCombat,
        };
    }

    addPlayer(player) {
        this.players.push(player);
        if (this.players.length >= 2 && this.status === 'waiting_for_players') {
            this.status = 'in_progress';
            this.startGame();
        }
    }

    startGame() {
        this.shuffleDecks();
        this.dealInitialHands();
        this.currentPlayerIndex = 0;
    }

    shuffleDecks() {
        this.dungeonDeck.shuffle();
        this.treasureDeck.shuffle();
    }

    dealInitialHands() {
        this.players.forEach(player => {
            for (let i = 0; i < 4; i++) {
                player.addCardToHand(this.dungeonDeck.draw());
                player.addCardToHand(this.treasureDeck.draw());
            }
        });
    }
  }
  
  module.exports = Game;  