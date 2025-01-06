const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/players.json');

class PlayerRepository {
    static save(players) {
        fs.writeFileSync(filePath, JSON.stringify(players, null, 2));
    }

    static load() {
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content) {
                return JSON.parse(content);
            } else {
                return [];
            }
        }
        return [];
    }
}

module.exports = PlayerRepository;

