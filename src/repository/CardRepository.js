const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../data/cards.json');

class CardRepository {
    static save(cards) {
        fs.writeFileSync(filePath, JSON.stringify(cards, null, 2));
    }

    static load() {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        return { dungeon: [], treasure: [] };
    }
}

module.exports = CardRepository;