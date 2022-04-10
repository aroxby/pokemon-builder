function growthFormulas(growthRate) {
    const mapping = {
        [GrowthRates.FAST]: (level) => 4 / 5 * level ** 3,
        [GrowthRates.MEDIUM_FAST]: (level) => level ** 3,
        [GrowthRates.MEDIUM_SLOW]: (level) => 6 / 5 * level ** 3 - 15 * level ** 2 + 100 * level - 140,
        [GrowthRates.SLOW]: (level) => 5 / 4 * level ** 3,
    };
    return mapping[growthRate];
}
