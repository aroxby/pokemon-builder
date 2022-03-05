function loadScript(url, callback) {
    const head = document.head;
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    head.appendChild(script);
}

let loadedFiles = {
    'names': false,
    'dex': false,
    'basestats': false,
    'stats': false,
    'pokemon': false,
};

function lateInit() {
    if(
        Object.values(loadedFiles).some((elem) => !elem)
    ) {
        return;
    }

    fillSpeciesEntry(getPokedexOrder(), getPokemonNames());
}

function fillSpeciesEntry(order, names) {
    entry = document.getElementById('speciesEntry');
    for(const species of order) {
        const option = document.createElement("option");
        option.value = species;
        option.innerHTML = names[species];
        entry.appendChild(option);
    }

    const defaultIndex = 1;  // Pokedex value for bulbasaur
    entry.selectedIndex = defaultIndex;

    entry.onchange = () => regeneratePokemonData(entry);
    regeneratePokemonData(entry);
}

function regeneratePokemonData(entry) {
    const defaultLevel = 1;
    const species = Number(entry.value);
    const baseStats = getPokemonBaseStats()[species];

    const pokemon = new Pokemon(species, defaultLevel, baseStats);
    updatePokedexNumber(pokemon.species);
    updateLevel(pokemon.level);
    updateStats(pokemon);
}

function updateStats(pokemon) {
    const hpStat = calcStat(
        pokemon.baseStats.hp, pokemon.ivs.hp, pokemon.statExp.hp, pokemon.level, true
    );
    updateHp(hpStat);
}

function updatePokedexNumber(species) {
    const number = getPokedexOrder().indexOf(species);
    label = document.getElementById('pokedexNumber');
    label.innerHTML = number.toString().padStart(3, '0');
}

function updateLevel(level) {
    input = document.getElementById('levelOutput');
    input.value = level;
}

function updateHp(hpStat) {
    input = document.getElementById('hpOutput');
    input.value = hpStat;
}

loadScript('names.js', () => {  // getPokemonNames()
    loadedFiles['names'] = true;
    lateInit();
});
loadScript('dex.js', () => {  // getPokedexOrder()
    loadedFiles['dex'] = true;
    lateInit();
});
loadScript('basestats.js', () => {  // getPokemonBaseStats()
    loadedFiles['basestats'] = true;
    lateInit();
});
loadScript('stats.js', () => {  // calcStat()
    loadedFiles['stats'] = true;
    lateInit();
});
loadScript('pokemon.js', () => {  // class Pokemon
    loadedFiles['pokemon'] = true;
    lateInit();
});
