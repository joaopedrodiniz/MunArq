const Deck = require('./Deck');
const TreasureCard = require('./Card/TreasureCard');

class TreasureDeck extends Deck {
  constructor() {
    super('treasure');
    this.initializeDeck();
  }

  getCount() { 
    return this.cards.length; 
  }

  initializeDeck() {
    // Adicionar itens
    this.addCard(new TreasureCard('t1', 'Espada Longa', 'Aumenta o nível em 2.', 2, 'Item', { bonus: 2, restrictions: [] }));
    this.addCard(new TreasureCard('t2', 'Poção Mágica', 'Aumenta o nível em 3.', 3, 'Item', { bonus: 3, restrictions: [] }));
    this.addCard(new TreasureCard('t7', 'Cajado Místico', 'Aumenta o nível em 4.', 4, 'Item', { bonus: 4, restrictions: [] })); 
    this.addCard(new TreasureCard('t8', 'Elmo de Ferro', 'Aumenta o nível em 2.', 2, 'Item', { bonus: 2, restrictions: [] })); 
    this.addCard(new TreasureCard('t9', 'Botas Rápidas', 'Aumenta o nível em 1 e concede um movimento extra.', 1, 'Item', { bonus: 1, restrictions: [] }));

    // Adicionar itens específicos para raças
    this.addCard(new TreasureCard('t3', 'Arco Élfico', 'Aumenta o nível em 3 para Elfos.', 3, 'Item', { bonus: 3, restrictions: ['Elfo'] }));
    this.addCard(new TreasureCard('t4', 'Machado Anão', 'Aumenta o nível em 3 para Anões.', 3, 'Item', { bonus: 3, restrictions: ['Anão'] }));
    this.addCard(new TreasureCard('t10', 'Espada Élfica', 'Aumenta o nível em 4 para Elfos.', 4, 'Item', { bonus: 4, restrictions: ['Elfo'] })); 
    this.addCard(new TreasureCard('t11', 'Martelo Anão', 'Aumenta o nível em 4 para Anões.', 4, 'Item', { bonus: 4, restrictions: ['Anão'] }));
    // Adicionar itens específicos para classes
    this.addCard(new TreasureCard('t5', 'Escudo do Guerreiro', 'Aumenta o nível em 3 para Guerreiros.', 3, 'Item', { bonus: 3, restrictions: ['Guerreiro'] }));
    this.addCard(new TreasureCard('t6', 'Varinha do Mago', 'Aumenta o nível em 3 para Magos.', 3, 'Item', { bonus: 3, restrictions: ['Mago'] }));
    this.addCard(new TreasureCard('t12', 'Escudo do Paladino', 'Aumenta o nível em 4 para Paladinos.', 4, 'Item', { bonus: 4, restrictions: ['Paladino'] })); 
    this.addCard(new TreasureCard('t13', 'Punhal do Ladino', 'Aumenta o nível em 3 para Ladinos.', 3, 'Item', { bonus: 3, restrictions: ['Ladino'] })); 
    this.addCard(new TreasureCard('t14', 'Manto do Clérigo', 'Aumenta o nível em 2 para Clérigos.', 2, 'Item', { bonus: 2, restrictions: ['Clérigo'] })); 
    this.addCard(new TreasureCard('t15', 'Espada do Bárbaro', 'Aumenta o nível em 4 para Bárbaros.', 4, 'Item', { bonus: 4, restrictions: ['Bárbaro'] }));

    this.shuffle();
  }
}

module.exports = TreasureDeck;

