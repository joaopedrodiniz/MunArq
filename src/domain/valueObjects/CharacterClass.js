class CharacterClass {
    constructor(name, abilities) {
      this.name = name;
      this.abilities = abilities;
    }
  
    useAbility(ability, player, context) {
      const abilityToUse = this.abilities.find(a => a.name === ability);
      if (abilityToUse) {
        abilityToUse.apply(player, context);
      } else {
        throw new Error(`Habilidade ${ability} não encontrada para a classe ${this.name}`);
      }
    }
  
    canUseItem(item) {
      return !item.classRestrictions || item.classRestrictions.includes(this.name);
    }
  }
  
  module.exports = CharacterClass;
  