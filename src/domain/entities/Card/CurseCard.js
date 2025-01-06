const Card = require('./Card');

class CurseCard extends Card {
    constructor(id, name, description, value, type) {
        super(id, name, description);
        this.value = value;
        this.type = type;
    }

    play(player, game) { this.applyCurse(player); }

    applyCurse(player) {
        console.log(`Aplicando efeito da carta de Maldição: ${this.name}`);
    }
}

module.exports = CurseCard;
