class Ivs {
    constructor(attack = 0, defense = 0, hp = 0, special = 0, speed = 0) {
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.special = special;
        this.speed = speed;
    }

    serialize() {
        const serializer = new Serializer();

        // These bit wise operators really bug me.
        // The point of creating these data arrays is so that I don't have
        // to think about how to pack the data.
        serializer.addInt(this.attack << 4 | this.defense, 1);
        serializer.addInt(this.speed << 4 | this.special, 1);

        return serializer.data;
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
    constructor(species, level, exp, baseStats, nickname, otId, otName) {
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
        this.otName = otName;
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

    serialize() {
        const hp = this.calcStat(StatNames.HP);

        const serializer = new Serializer();
        serializer.addInt(1, 1);  // PKHeX compatibility
        serializer.addInt(this.species, 1);  // PKHeX compatibility
        serializer.addInt(0xff, 1);  // PKHeX compatibility
        serializer.addInt(this.species, 1);
        serializer.addInt(hp, 2);
        serializer.addInt(this.level, 1);
        serializer.addInt(0, 1);  // Status condition
        serializer.addInt(this.types[0], 1);
        serializer.addInt(this.types[1], 1);
        serializer.addInt(0, 1);  // Held item
        serializer.addInt(this.moves[0], 1);
        serializer.addInt(this.moves[1], 1);
        serializer.addInt(this.moves[2], 1);
        serializer.addInt(this.moves[3], 1);
        serializer.addInt(this.otId, 2);
        serializer.addInt(this.exp, 3);
        serializer.addInt(this.statExp.hp, 2);
        serializer.addInt(this.statExp.attack, 2);
        serializer.addInt(this.statExp.defense, 2);
        serializer.addInt(this.statExp.speed, 2);
        serializer.addInt(this.statExp.special, 2);
        serializer.addData(this.ivs.serialize(), 2);
        serializer.addInt(getMovePps()[this.moves[0]], 1);
        serializer.addInt(getMovePps()[this.moves[1]], 1);
        serializer.addInt(getMovePps()[this.moves[2]], 1);
        serializer.addInt(getMovePps()[this.moves[3]], 1);
        serializer.addInt(this.level, 1);
        serializer.addInt(hp, 2);
        serializer.addInt(this.calcStat(StatNames.ATTACK), 2);
        serializer.addInt(this.calcStat(StatNames.DEFENSE), 2);
        serializer.addInt(this.calcStat(StatNames.SPEED), 2);
        serializer.addInt(this.calcStat(StatNames.SPECIAL), 2);
        serializer.addString(gameEncodeString(padString(this.otName, 8)), 8);
        serializer.addInt(0, 3);  // PKHeX compatibility
        serializer.addString(gameEncodeString(padString(this.nickname, 11)), 11);

        return serializer.data;
    }
}
