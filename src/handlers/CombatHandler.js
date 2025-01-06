// const CombatService = require('../services/CombatService');
// const Game = require('../entities/Game');

// const combatService = new CombatService();

// module.exports = {
//     startCombat: (req, res) => {
//         try {
//             const { playerId, monsterId } = req.body;
//             const game = Game.getInstance();
//             combatService.startCombat(playerId, monsterId, game);
//             res.status(200).json({ message: 'Combate iniciado!', gameState: game.getState() });
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },

//     resolveCombat: (req, res) => {
//         try {
//             const game = Game.getInstance();
//             const result = combatService.resolveCombat(game);
//             res.status(200).json({ message: result, gameState: game.getState() });
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },
// };
