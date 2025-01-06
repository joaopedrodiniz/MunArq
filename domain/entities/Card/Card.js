class Card {
    constructor(id, name, description) {
        if (this.constructor === Card) {
            throw new Error('Card é uma classe abstrata e não pode ser instanciada diretamente.');
        }

        this.id = id;
        this.name = name;
        this.description = description;
    }

    play(player, game) {
        throw new Error('O método play() deve ser implementado pelas subclasses.');
    }
}

module.exports = Card;