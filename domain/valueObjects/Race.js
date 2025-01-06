class Race {
    constructor(name, abilities) {
      this.name = name;
      this.abilities = abilities;
    }
  
    applyRacialBonus(player, context) {
      this.abilities.forEach(ability => {
        ability.apply(player, context);
      });
    }
  
    canUseItem(item) {
      return !item.racialRestrictions || item.racialRestrictions.includes(this.name);
    }
  }
  
  module.exports = Race;
  