const Race = require('../valueObjects/Race');
const CharacterClass = require('../valueObjects/CharacterClass');

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.level = 1;
    this.race = null;
    this.characterClass = null;
    this.hand = [];
    this.equippedItems = [];
  }

  setRace(race) {
    if (!(race instanceof Race)) {
      throw new Error('Tipo inválido para raça');
    }
    this.race = race;
  }

  setCharacterClass(characterClass) {
    if (!(characterClass instanceof CharacterClass)) {
      throw new Error('Tipo inválido para classe');
    }
    this.characterClass = characterClass;
  }

  calculateCombatPower() {
    let power = this.level;
    this.equippedItems.forEach(item => {
      if (this.canUseItem(item)) {
        power += item.bonus;
      }
    });
    return power;
  }

  canUseItem(item) {
    const raceAllows = !this.race || this.race.canUseItem(item);
    const classAllows = !this.characterClass || this.characterClass.canUseItem(item);
    return raceAllows && classAllows;
  }

  levelUp() {
    this.level += 1;
  }

  levelDown() {
    if (this.level > 1) {
      this.level -= 1;
    }
  }

  addCardToHand(card) {
    this.hand.push(card);
  }

  removeCardFromHand(cardId) {
    this.hand = this.hand.filter((card) => card.id !== cardId);
  }

  equipItem(item) {
    if (this.canUseItem(item)) {
      this.equippedItems.push(item);
    } else {
      throw new Error('Este jogador não pode usar este item');
    }
  }

  unequipItem(itemId) {
    const index = this.equippedItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      return this.equippedItems.splice(index, 1)[0];
    }
    return null;
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      race: this.race ? this.race.name : null,
      characterClass: this.characterClass ? this.characterClass.name : null,
      hand: this.hand.map(card => ({ id: card.id, name: card.name })),
      equippedItems: this.equippedItems.map(item => ({ id: item.id, name: item.name, bonus: item.bonus }))
    };
  }
}

module.exports = Player;
