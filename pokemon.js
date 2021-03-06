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

    deserialize(data) {
        const deserializer = new Deserializer(data);
        const bytes = deserializer.pullInt(2);
        this.attack = bytes >> 12 & 0xF;
        this.defense = bytes >> 8 & 0xF;
        this.speed = bytes >> 4 & 0xF;
        this.special = bytes >> 0 & 0xF;
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
    constructor(species, level, exp, baseStats, types, nickname, otId, otName) {
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
        this.types = types;
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

    // TODO: This method should live in Ivs
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

    deserialize(data) {
        const deserializer = new Deserializer(data);

        deserializer.pullInt(3);  // PKHeX compatibility
        this.species = deserializer.pullInt(1);
        deserializer.pullInt(2);  // Current HP
        this.level = deserializer.pullInt(1);
        deserializer.pullInt(1);  // Status condition
        this.types[0] = deserializer.pullInt(1);
        this.types[1] = deserializer.pullInt(1);
        deserializer.pullInt(1);  // Held item
        this.moves[0] = deserializer.pullInt(1);
        this.moves[1] = deserializer.pullInt(1);
        this.moves[2] = deserializer.pullInt(1);
        this.moves[3] = deserializer.pullInt(1);
        this.otId = deserializer.pullInt(2);
        this.exp = deserializer.pullInt(3);
        this.statExp.hp = deserializer.pullInt(2);
        this.statExp.attack = deserializer.pullInt(2);
        this.statExp.defense = deserializer.pullInt(2);
        this.statExp.speed = deserializer.pullInt(2);
        this.statExp.special = deserializer.pullInt(2);
        this.ivs.deserialize(deserializer.pullData(2));
        deserializer.pullInt(1 * 4);  // Move PPs
        deserializer.pullInt(1);  // Level again
        deserializer.pullInt(2 * 5);  // Calculated stat values
        this.otName = unpadString(gameDecodeString(deserializer.pullString(8)));
        deserializer.pullInt(3);  // PKHeX compatibility
        this.nickname = unpadString(gameDecodeString(deserializer.pullString(11)));

        this.rebuildHpIv();
    }
}
