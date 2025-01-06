const Player = require('./Player');
const DungeonDeck = require('./DungeonDeck');
const TreasureDeck = require('./TreasureDeck');
const GameService = require('../services/GameService');

class Game {
    constructor() {
        if (Game.instance) {
            return Game.instance;
        }

        this.players = [];
        this.dungeonDeck = new DungeonDeck();
        this.treasureDeck = new TreasureDeck();
        this.currentPlayerIndex = 0;
        this.status = 'waiting_for_players';
        this.currentCombat = null;

        Game.instance = this;
    }

    static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
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

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    kickDoor(playerId) {
        const player = this.getPlayerById(playerId);
        if (player !== this.getCurrentPlayer()) {
            throw new Error("It's not your turn");
        }

        const card = this.dungeonDeck.draw();
        if (card.type === 'Monster') {
            this.currentCombat = {
                player: player,
                monster: card,
                playerPower: player.calculateCombatPower(),
                monsterPower: card.level
            };
            return { message: `You encountered a ${card.name}!`, card: card };
        } else {
            player.addCardToHand(card);
            return { message: `You found a ${card.name}!`, card: card };
        }
    }

    startCombat(playerId, monsterId) {
        const player = this.getPlayerById(playerId);
        if (player !== this.getCurrentPlayer()) {
            throw new Error("It's not your turn");
        }

        const monsterCard = player.getCardFromHand(monsterId);
        if (!monsterCard || monsterCard.type !== 'Monster') {
            throw new Error("Invalid monster card");
        }

        this.currentCombat = {
            player: player,
            monster: monsterCard,
            playerPower: player.calculateCombatPower(),
            monsterPower: monsterCard.level
        };

        player.removeCardFromHand(monsterId);
        return { message: `Combat started against ${monsterCard.name}!`, combat: this.currentCombat };
    }

    resolveCombat() {
        if (!this.currentCombat) {
            throw new Error("No combat in progress");
        }
    
        const { player, monster, playerPower, monsterPower } = this.currentCombat;
        const combatResult = {};
    
        if (playerPower > monsterPower) {
            // Jogador vence o combate
            player.levelUp();
            combatResult.winner = player.name;
            combatResult.message = `${player.name} defeated the ${monster.name} and leveled up!`;
    
            // Jogador ganha tesouros
            for (let i = 0; i < monster.treasures; i++) {
                const treasure = this.treasureDeck.draw();
                player.addCardToHand(treasure);
            }
    
            combatResult.treasures = monster.treasures;
        } else if (playerPower < monsterPower) {
            // Monstro vence o combate
            combatResult.winner = monster.name;
            combatResult.message = `${player.name} was defeated by the ${monster.name}. Bad stuff happens!`;
    
            // Aplicar o bad stuff
            monster.badStuff(player);
        } else {
            // Empate
            combatResult.winner = null;
            combatResult.message = `${player.name} and the ${monster.name} are equally matched. The combat ends in a draw.`;
        }
    
        // Limpar o combate atual
        this.currentCombat = null;
        return combatResult;
    }
    

    lootRoom(playerId) {
        const player = this.getPlayerById(playerId);
        if (player !== this.getCurrentPlayer()) {
            throw new Error("It's not your turn");
        }

        const card = this.treasureDeck.draw();
        player.addCardToHand(card);
        return { message: `You looted ${card.name}!`, card: card };
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.currentCombat = null;
        return { message: `It's now ${this.getCurrentPlayer().name}'s turn.` };
    }

    playCard(playerId, cardId) {
        const player = this.getPlayerById(playerId);
        const card = player.getCardFromHand(cardId);
        if (!card) {
            throw new Error("Card not found in player's hand");
        }

        // Implement card playing logic here
        // This will depend on the type of card and the current game state

        player.removeCardFromHand(cardId);
        return { message: `${player.name} played ${card.name}` };
    }

    handleCharity(playerId, cardIds) {
        const player = this.getPlayerById(playerId);
        cardIds.forEach(cardId => {
            const card = player.removeCardFromHand(cardId);
            if (card) {
                // Add the card back to the appropriate deck
                if (card.type === 'Monster' || card.type === 'Curse') {
                    this.dungeonDeck.addToBottom(card);
                } else {
                    this.treasureDeck.addToBottom(card);
                }
            }
        });
        return { message: `${player.name} discarded ${cardIds.length} cards for charity` };
    }

    getPlayerById(id) {
        const player = this.players.find(p => p.id === id);
        if (!player) {
            throw new Error("Player not found");
        }
        return player;
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
            canKickDoor: this.canKickDoor(),
            canLookForTrouble: this.canLookForTrouble(),
            canLootRoom: this.canLootRoom(),
            canEndTurn: this.canEndTurn()
        };
    }    

    equipRace(playerId, raceName) {
        const player = this.getPlayerById(playerId);
        if (!player) {
            throw new Error('Jogador não encontrado');
        }

        // Obter a carta de raça pela mão do jogador
        const raceCard = player.hand.find(card => card.type === 'Race' && card.effects.race === raceName);
        if (!raceCard) {
            throw new Error('Carta de raça não encontrada na mão do jogador');
        }

        // Aplicar os efeitos da raça no jogador
        const newRace = new Race(raceName, raceCard.effects.abilities || []);
        player.setRace(newRace);

        // Remover a carta da mão do jogador
        player.removeCardFromHand(raceCard.id);
    }

    equipClass(playerId, className) {
        const player = this.getPlayerById(playerId);
        if (!player) {
            throw new Error('Jogador não encontrado');
        }

        // Obter a carta de classe pela mão do jogador
        const classCard = player.hand.find(card => card.type === 'Class' && card.effects.class === className);
        if (!classCard) {
            throw new Error('Carta de classe não encontrada na mão do jogador');
        }

        // Aplicar os efeitos da classe no jogador
        const newClass = new CharacterClass(className, classCard.effects.abilities || []);
        player.setCharacterClass(newClass);

        // Remover a carta da mão do jogador
        player.removeCardFromHand(classCard.id);
    }

    canKickDoor() {
        return this.status === 'in_progress' && !this.currentCombat;
    }

    canLookForTrouble() {
        return this.status === 'in_progress' && !this.currentCombat;
    }

    canLootRoom() {
        return this.status === 'in_progress' && !this.currentCombat;
    }

    canEndTurn() {
        return this.status === 'in_progress' && !this.currentCombat;
    }
}

module.exports = Game;
