const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/game.json');

class GameRepository {
    static save(gameState) {
        fs.writeFileSync(filePath, JSON.stringify(gameState, null, 2));
    }

    static load() {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content) {
                return JSON.parse(content);
            } else {
                return null;
            }
        }
        return null;
    }
}

module.exports = GameRepository;
