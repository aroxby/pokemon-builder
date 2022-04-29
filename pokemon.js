class Ivs {
    constructor(attack = 0, defense = 0, hp = 0, special = 0, speed = 0) {
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.special = special;
        this.speed = speed;
    }
}

class StatExp {
    constructor(attack = 0, defense = 0, hp = 0, special = 0, speed = 0) {
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.special = special;
        this.speed = speed;
    }
}

class Pokemon {
    constructor(species, level, exp, baseStats, nickname, otId) {
        this.species = species;
        this.level = level;
        this.exp = exp;
        this.baseStats = baseStats;
        this.statExp = new StatExp();
        this.ivs = new Ivs();
        this.moves = [
            // MoveIds really only exists for this one line
            MoveIds.NONE, MoveIds.NONE, MoveIds.NONE, MoveIds.NONE,
        ];
        this.types = [TypeIds.NORMAL, TypeIds.NORMAL];
        this.nickname = nickname;
        this.otId = otId;
    }

    calcStat(statName) {
        const finalStat = calcStat(
            this.baseStats[statName],
            this.ivs[statName],
            this.statExp[statName],
            this.level,
            statName == StatNames.HP,
        );
        return finalStat;
    }

    calcExp() {
        const rate = getPokemonGrowthRate(this.species);
        const formula = growthFormulas(rate);
        const exp = formula(this.level);
        return Math.max(Math.floor(exp), 0);
    }

    rebuildHpIv() {
        const hpIv = (
            (this.ivs[StatNames.ATTACK] & 1) << 3 |
            (this.ivs[StatNames.DEFENSE] & 1) << 2 |
            (this.ivs[StatNames.SPEED] & 1) << 1 |
            (this.ivs[StatNames.SPECIAL] & 1) << 0
        );
        this.ivs[StatNames.HP] = hpIv;
    }

    getPp(moveIndex) {
        return getMovePps()[this.moves[moveIndex]];
    }
}
