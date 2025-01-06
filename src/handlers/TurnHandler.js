const TurnService = require('../domain/services/TurnService');

module.exports = {
  // Fase: Arrombar a porta
  kickDoor: (req, res) => {
    try {
      const { playerId } = req.body;
      const result = TurnService.executeTurn(playerId, 'kickDoor');
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Fase: Procurar Problemas ou Saquear Sala
  troubleOrLoot: (req, res) => {
    try {
      const { playerId, action } = req.body; // 'trouble' ou 'loot'
      const result = TurnService.executeTurn(playerId, action);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Fase: Caridade
  charity: (req, res) => {
    try {
      const { playerId } = req.body;
      const result = TurnService.executeTurn(playerId, 'charity');
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Fase: Encerrar Turno
  endTurn: (req, res) => {
    try {
      const { playerId } = req.body;
      const result = TurnService.executeTurn(playerId, 'end');
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
