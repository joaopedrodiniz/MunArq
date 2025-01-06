class CombatService {
    constructor(player, monster) {
        this.player = player;
        this.monster = monster;
        this.helpers = [];
        this.modifiers = [];
        this.isResolved = false;
        this.result = null;
    }

    // Adiciona um jogador como ajudante no combate
    addHelper(player) {
        if (this.isResolved) {
            throw new Error('Combat is already resolved');
        }
        
        if (this.helpers.find(h => h.id === player.id)) {
            throw new Error('Player is already helping');
        }

        this.helpers.push(player);
    }

    // Remove um ajudante do combate
    removeHelper(playerId) {
        this.helpers = this.helpers.filter(helper => helper.id !== playerId);
    }

    // Adiciona um modificador ao combate (cartas de modificação, bônus, etc)
    addModifier(modifier) {
        if (this.isResolved) {
            throw new Error('Combat is already resolved');
        }

        this.modifiers.push(modifier);
    }

    // Calcula o poder total do lado do jogador (incluindo ajudantes e modificadores)
    calculatePlayerSidePower() {
        // Poder base do jogador principal
        let totalPower = this.player.calculateCombatPower();

        // Adiciona poder dos ajudantes
        for (const helper of this.helpers) {
            totalPower += helper.calculateCombatPower();
        }

        // Aplica modificadores
        for (const modifier of this.modifiers) {
            if (modifier.type === 'player') {
                totalPower += modifier.value;
            }
        }

        return totalPower;
    }

    // Calcula o poder total do monstro (incluindo modificadores)
    calculateMonsterPower() {
        let totalPower = this.monster.level;

        // Aplica modificadores do monstro
        for (const modifier of this.modifiers) {
            if (modifier.type === 'monster') {
                totalPower += modifier.value;
            }
        }

        return totalPower;
    }

    // Tenta fugir do combate
    async attemptEscape() {
        if (this.isResolved) {
            throw new Error('Combat is already resolved');
        }

        // Roll 1d6 for escape attempt
        const roll = Math.floor(Math.random() * 6) + 1;
        const escaped = roll >= 5; // Sucesso em 5 ou 6

        if (escaped) {
            this.isResolved = true;
            this.result = {
                type: 'escape',
                success: true,
                message: 'Successfully escaped from combat!'
            };
        } else {
            // Aplica "Bad Stuff" do monstro em caso de falha
            await this.monster.applyBadStuff(this.player);
            this.isResolved = true;
            this.result = {
                type: 'escape',
                success: false,
                message: 'Failed to escape! Bad stuff applied.'
            };
        }

        return this.result;
    }

    // Resolve o combate
    async resolveCombat() {
        if (this.isResolved) {
            throw new Error('Combat is already resolved');
        }

        const playerPower = this.calculatePlayerSidePower();
        const monsterPower = this.calculateMonsterPower();

        if (playerPower > monsterPower) {
            // Vitória do jogador
            const treasureCards = this.monster.treasureReward;
            
            // Distribui o tesouro
            for (let i = 0; i < treasureCards; i++) {
                const card = game.treasureDeck.drawCard();
                if (card) {
                    this.player.hand.push(card);
                }
            }

            // Sobe de nível
            this.player.levelUp();

            this.isResolved = true;
            this.result = {
                type: 'victory',
                playerPower,
                monsterPower,
                treasureDrawn: treasureCards,
                message: `Victory! Drew ${treasureCards} treasure cards and gained a level!`
            };
        } else {
            // Derrota do jogador
            await this.monster.applyBadStuff(this.player);

            this.isResolved = true;
            this.result = {
                type: 'defeat',
                playerPower,
                monsterPower,
                message: 'Defeat! Bad stuff has been applied.'
            };
        }

        // Limpa os helpers e modificadores após o combate
        this.helpers = [];
        this.modifiers = [];

        return this.result;
    }

    // Retorna o status atual do combate
    getStatus() {
        return {
            player: {
                name: this.player.name,
                power: this.calculatePlayerSidePower(),
                level: this.player.level
            },
            monster: {
                name: this.monster.name,
                power: this.calculateMonsterPower(),
                level: this.monster.level,
                treasureReward: this.monster.treasureReward
            },
            helpers: this.helpers.map(h => ({
                name: h.name,
                power: h.calculateCombatPower()
            })),
            modifiers: this.modifiers,
            isResolved: this.isResolved,
            result: this.result
        };
    }
}

module.exports = CombatService;