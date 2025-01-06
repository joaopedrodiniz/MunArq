class DungeonCard {
    constructor(id, name, description, type, effects) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.type = type;
      this.effects = effects;
    }
    play(player, game) { this.applyEffects(player, game); }
  
    applyEffects(player, game) {
      if (this.type === 'Monster') {
        // Lógica de combate será implementada no Game
      } else if (this.type === 'Race' || this.type === 'Class') {
        if (this.type === 'Race') {
          game.changePlayerRace(player.id, this.effects.race);
        } else {
          game.changePlayerClass(player.id, this.effects.class);
        }
      }
    
    }

  }
  
  module.exports = DungeonCard;
  