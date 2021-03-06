function getPokemonGrowthRate(species) {
    const rates = [
        GrowthRates.FAST,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.SLOW,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.SLOW,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.FAST,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
        GrowthRates.MEDIUM_SLOW,
    ];
    return rates[species];
}
