class Deck {
    constructor(type) {
      this.type = type;
      this.cards = [];
    }
  
    addCard(card) {
      this.cards.push(card);
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
  
  module.exports = Deck;
  
  