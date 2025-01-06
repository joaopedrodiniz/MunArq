const Deck = require('./Deck');
const DungeonCard = require('./Card/DungeonCard');

class DungeonDeck extends Deck {
  constructor() {
    super('dungeon');
    this.cards = [];
    this.initializeDeck();
  }

  addCard(card) {
    this.cards.push(card);
  }

  getCount() { 
    return this.cards.length; 
  }

  initializeDeck() {
    // Adicionar monstros
    this.addCard(new DungeonCard('m1', 'Goblin', 'Um goblin fraco.', 'Monster', { level: 1, treasures: 1, badStuff: (player) => player.levelDown() }));
    this.addCard(new DungeonCard('m2', 'Dragão', 'Um dragão poderoso!', 'Monster', { level: 20, treasures: 5, badStuff: (player) => { player.level = 1; player.discardHand(); } }));
    this.addCard(new DungeonCard('m3', 'Esqueleto', 'Um esqueleto assustador.', 'Monster', { level: 3, treasures: 1, badStuff: (player) => player.levelDown() }));
    this.addCard(new DungeonCard('m4', 'Ogro', 'Um ogro enorme e forte.', 'Monster', { level: 8, treasures: 2, badStuff: (player) => player.discardHand() }));
    this.addCard(new DungeonCard('m5', 'Zumbi', 'Um zumbi lento, mas perigoso.', 'Monster', { level: 5, treasures: 2, badStuff: (player) => player.levelDown() }));
    this.addCard(new DungeonCard('m6', 'Lich', 'Um lich poderoso com magia sombria.', 'Monster', { level: 12, treasures: 3, badStuff: (player) => { player.level -= 2; } }));

    // Adicionar cartas de raça
    this.addCard(new DungeonCard('r1', 'Seja um Elfo', 'Você agora é um Elfo, ou ganha um nível se já for um Elfo.', 'Race', { race: 'Elfo' }));
    this.addCard(new DungeonCard('r2', 'Seja um Anão', 'Você agora é um Anão, ou ganha um nível se já for um Anão.', 'Race', { race: 'Anão' }));
    this.addCard(new DungeonCard('r3', 'Seja um Meio-Elfo', 'Você agora é um Meio-Elfo, ou ganha um nível se já for um Meio-Elfo.', 'Race', { race: 'Meio-Elfo' }));
    this.addCard(new DungeonCard('r4', 'Seja um Orc', 'Você agora é um Orc, ou ganha um nível se já for um Orc.', 'Race', { race: 'Orc' }));
    this.addCard(new DungeonCard('r5', 'Seja um Gnomo', 'Você agora é um Gnomo, ou ganha um nível se já for um Gnomo.', 'Race', { race: 'Gnomo' }));

    // Adicionar cartas de classe
    this.addCard(new DungeonCard('c1', 'Seja um Guerreiro', 'Você agora é um Guerreiro, ou ganha um nível se já for um Guerreiro.', 'Class', { class: 'Guerreiro' }));
    this.addCard(new DungeonCard('c2', 'Seja um Mago', 'Você agora é um Mago, ou ganha um nível se já for um Mago.', 'Class', { class: 'Mago' }));
    this.addCard(new DungeonCard('c3', 'Seja um Paladino', 'Você agora é um Paladino, ou ganha um nível se já for um Paladino.', 'Class', { class: 'Paladino' }));
    this.addCard(new DungeonCard('c4', 'Seja um Ladino', 'Você agora é um Ladino, ou ganha um nível se já for um Ladino.', 'Class', { class: 'Ladino' }));
    this.addCard(new DungeonCard('c5', 'Seja um Clérigo', 'Você agora é um Clérigo, ou ganha um nível se já for um Clérigo.', 'Class', { class: 'Clérigo' }));
    this.addCard(new DungeonCard('c6', 'Seja um Bárbaro', 'Você agora é um Bárbaro, ou ganha um nível se já for um Bárbaro.', 'Class', { class: 'Bárbaro' }));

    this.shuffle();




  }

  draw() {
    if (this.cards.length === 0) {
      throw new Error('O baralho está vazio!');
    }
    return this.cards.pop();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

module.exports = DungeonDeck;
