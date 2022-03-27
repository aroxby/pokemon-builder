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
    constructor(species, level, baseStats, statExp = null, ivs = null) {
        this.species = species;
        this.level = level;
        this.baseStats = baseStats;
        this.statExp = statExp || new StatExp();
        this.ivs = ivs || new Ivs();
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
}
