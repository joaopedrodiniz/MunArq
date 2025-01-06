class Combat {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.helpers = [];
        this.modifiers = [];
    }

    addHelper(helper) {
        this.helpers.push(helper);
    }

    addModifier(modifier) {
        this.modifiers.push(modifier);
    }

    calculateTotalPlayerPower() {
        const helperPower = this.helpers.reduce((total, helper) => total + helper.level, 0);
        return this.player.level + helperPower + this.getModifierValue('player');
    }

    calculateTotalMonsterPower() {
        return this.monster.level + this.getModifierValue('monster');
    }

    getModifierValue(target) {
        return this.modifiers
            .filter(mod => mod.target === target)
            .reduce((total, mod) => total + mod.value, 0);
    }

    resolveCombat() {
        const playerPower = this.calculateTotalPlayerPower();
        const monsterPower = this.calculateTotalMonsterPower();

        if (playerPower > monsterPower) {
            console.log('Jogador venceu o combate!');
            return 'player';
        } else {
            console.log('Monstro venceu o combate!');
            return 'monster';
        }
    }
}

module.exports = Combat;