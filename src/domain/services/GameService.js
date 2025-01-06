class GameService {
    equipRace(player, raceName) {
        // Obter a carta de raça pela mão do jogador
        const raceCard = player.hand.find(card => card.type === 'Race' && card.effects.race === raceName);
        if (!raceCard) {
            throw new Error('Carta de raça não encontrada na mão do jogador');
        }

        // Aplicar os efeitos da raça no jogador
        const newRace = new Race(raceName, raceCard.effects.abilities || []);
        player.setRace(newRace);

        // Remover a carta da mão do jogador
        player.removeCardFromHand(raceCard.id);
    }

    equipClass(player, className) {
        // Obter a carta de classe pela mão do jogador
        const classCard = player.hand.find(card => card.type === 'Class' && card.effects.class === className);
        if (!classCard) {
            throw new Error('Carta de classe não encontrada na mão do jogador');
        }

        // Aplicar os efeitos da classe no jogador
        const newClass = new CharacterClass(className, classCard.effects.abilities || []);
        player.setCharacterClass(newClass);

        // Remover a carta da mão do jogador
        player.removeCardFromHand(classCard.id);
    }
}

module.exports = new GameService();