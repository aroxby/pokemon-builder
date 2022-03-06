function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function loadScript(url, callback) {
    const head = document.head;
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    head.appendChild(script);
}

function requireFiles(files, callback) {
    function maybeCallback() {
        if(Object.values(loadedFiles).every((elem) => elem)) {
            callback();
        }
    }

    const loadedFiles = {};
    files.map((file) => {
        loadedFiles[file] = false;
        loadScript((file), () => {
            loadedFiles[file] = true;
            maybeCallback();
        });
    });
}

const requiredFiles = [
    'names.js',
    'dex.js',
    'basestats.js',
    'stats.js',
    'pokemon.js',
    'pokemonIds.js',
];

requireFiles(requiredFiles, lateInit);
/* Globals, we'll create an app object to track all this state later */
const speciesEntry = document.getElementById('speciesEntry');
const levelControl = document.getElementById('levelControl');
/* End globals */


function lateInit() {
    fillSpeciesEntry(getPokedexOrder(), getPokemonNames());
    fillDefaultSpecies();
    fillDefaultLevel();
    setupHandlers();
    updatePokemonDataFromSpeciesControl(speciesEntry);
}

function fillSpeciesEntry(order, names) {
    for(const species of order) {
        const option = document.createElement("option");
        option.value = species;
        option.innerHTML = names[species];
        speciesEntry.appendChild(option);
    }
}

function fillDefaultSpecies() {
    // Start at pokedex #1
    speciesEntry.selectedIndex = 0;
}

function fillDefaultLevel() {
    updateLevel(1);
}

function setupHandlers() {
    speciesEntry.onchange = () => updatePokemonDataFromSpeciesControl(speciesEntry);
    levelControl.onchange = () => updatePokemonDataFromLevelControl(levelControl);
}

function updatePokemonDataFromSpeciesControl(speciesEntry) {
    const species = Number(speciesEntry.value);
    const pokedexNumber = speciesEntry.selectedIndex + 1;
    updatePokemonDataFromSpecies(species, pokedexNumber);
}

function updatePokemonDataFromLevelControl() {
    const species = Number(speciesEntry.value);
    const rawlevel = Number(levelControl.value);
    const level = Math.round(clamp(rawlevel, 0, 255));
    updateLevel(level);
    updatePokemonDataFromLevel(species, level);
}

function updatePokemonDataFromSpecies(species, pokedexNumber) {
    updatePokedexNumber(pokedexNumber);
    updatePokemonDataFromLevelControl();
}

function updatePokemonDataFromLevel(species, level) {
    const baseStats = getPokemonBaseStats()[species];
    const pokemon = new Pokemon(species, level, baseStats);
    updateStats(pokemon);
}

function updatePokedexNumber(number) {
    const label = document.getElementById('pokedexNumber');
    label.innerHTML = number.toString().padStart(3, '0');
}

function updateLevel(level) {
    levelControl.value = level;
}


function updateStats(pokemon) {
    updateHpStats(
        pokemon.baseStats.hp, pokemon.ivs.hp, pokemon.statExp.hp, pokemon.level
    );
    updateAttackStats(
        pokemon.baseStats.attack, pokemon.ivs.attack, pokemon.statExp.attack, pokemon.level
    );
    updateDefenseStats(
        pokemon.baseStats.defense, pokemon.ivs.defense, pokemon.statExp.defense, pokemon.level
    );
    updateSpecialStats(
        pokemon.baseStats.special, pokemon.ivs.special, pokemon.statExp.special, pokemon.level
    );
    updateSpeedStats(
        pokemon.baseStats.speed, pokemon.ivs.speed, pokemon.statExp.speed, pokemon.level
    );
}

function updateHpStats(baseStat, iv, statExp, level) {
    const finalStat = calcStat(baseStat, iv, statExp, level, true);
    updateStatGroup('hp', baseStat, iv, statExp, finalStat);
}

function updateAttackStats(baseStat, iv, statExp, level) {
    const finalStat = calcStat(baseStat, iv, statExp, level, false);
    updateStatGroup('attack', baseStat, iv, statExp, finalStat);
}

function updateDefenseStats(baseStat, iv, statExp, level) {
    const finalStat = calcStat(baseStat, iv, statExp, level, false);
    updateStatGroup('defense', baseStat, iv, statExp, finalStat);
}

function updateSpecialStats(baseStat, iv, statExp, level) {
    const finalStat = calcStat(baseStat, iv, statExp, level, false);
    updateStatGroup('special', baseStat, iv, statExp, finalStat);
}

function updateSpeedStats(baseStat, iv, statExp, level) {
    const finalStat = calcStat(baseStat, iv, statExp, level, false);
    updateStatGroup('speed', baseStat, iv, statExp, finalStat);
}

function updateStatGroup(name, baseStat, iv, statExp, finalStat) {
    updateBaseStat(name, baseStat);
    updateIv(name, iv);
    updateHpStatExp(name, statExp);
    updateFinalStat(name, finalStat);
}

function updateBaseStat(name, stat) {
    const input = document.getElementById(name + 'BaseStatOutput');
    input.value = stat;
}

function updateIv(name, stat) {
    const input = document.getElementById(name + 'IvOutput');
    input.value = stat;
}

function updateHpStatExp(name, stat) {
    const input = document.getElementById(name + 'StatExpOutput');
    input.value = stat;
}

function updateFinalStat(name, stat) {
    const input = document.getElementById(name + 'Output');
    input.value = stat;
}
