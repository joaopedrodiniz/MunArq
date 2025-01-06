class TreasureCard {
    constructor(id, name, description, value, type, effects) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.value = value;
      this.type = type;
      this.effects = effects;
    }

    play(player, game) { this.applyEffects(player, game); }
  
    applyEffects(player) {
      if (this.type === 'Item') {
        if (player.canUseItem(this)) {
          player.equipItem(this);
        } else {
          throw new Error('Este jogador não pode usar este item');
        }
      }
      // Outros tipos de cartas de tesouro podem ser implementados aqui
    }
  }
  
module.exports = TreasureCard;
  