const Game = require('../domain/entities/Game');

module.exports = {
    listCards: (req, res) => {
        try {
            const game = Game.getInstance();
            res.status(200).json({
                dungeon: game.dungeonDeck,
                treasure: game.treasureDeck,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    playCard: (req, res) => {
        try {
            const { playerId, cardId } = req.body;
            const game = Game.getInstance();
            const player = game.players.find(p => p.id === playerId);
    
            if (!player) {
                throw new Error('Jogador não encontrado.');
            }
    
            const cardIndex = player.hand.findIndex(c => c.id === cardId);
    
            if (cardIndex === -1) {
                throw new Error('Carta não encontrada na mão do jogador.');
            }
    
            const card = player.hand[cardIndex];
            card.play(player, game);  // Atualizado para passar player e game
            player.hand.splice(cardIndex, 1);
    
            res.status(200).json({ message: `Carta ${card.name} jogada!` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
};
