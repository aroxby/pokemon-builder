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

class App {
    constructor() {
        this.speciesEntry = document.getElementById('speciesEntry');
        this.levelControl = document.getElementById('levelControl');

        this.fillSpeciesEntry(getPokedexOrder(), getPokemonNames());
        this.fillDefaultSpecies();
        this.fillDefaultLevel();
        this.setupHandlers();
        this.updatePokemonDataFromSpeciesControl(speciesEntry);
    }

    fillSpeciesEntry(order, names) {
        for(const species of order) {
            const option = document.createElement("option");
            option.value = species;
            option.innerHTML = names[species];
            this.speciesEntry.appendChild(option);
        }
    }

    fillDefaultSpecies() {
        // Start at pokedex #1
        this.speciesEntry.selectedIndex = 0;
    }

    fillDefaultLevel() {
        this.updateLevel(1);
    }

    setupHandlers() {
        this.speciesEntry.onchange = () => this.updatePokemonDataFromSpeciesControl(speciesEntry);
        this.levelControl.onchange = () => this.updatePokemonDataFromLevelControl(levelControl);
    }

    updatePokemonDataFromSpeciesControl(speciesEntry) {
        const species = Number(this.speciesEntry.value);
        const pokedexNumber = this.speciesEntry.selectedIndex + 1;
        this.updatePokemonDataFromSpecies(species, pokedexNumber);
    }

    updatePokemonDataFromLevelControl() {
        const species = Number(this.speciesEntry.value);
        const rawlevel = Number(this.levelControl.value);
        const level = Math.round(clamp(rawlevel, 0, 255));
        this.updateLevel(level);
        this.updatePokemonDataFromLevel(species, level);
    }

    updatePokemonDataFromSpecies(species, pokedexNumber) {
        this.updatePokedexNumber(pokedexNumber);
        this.updatePokemonDataFromLevelControl();
    }

    updatePokemonDataFromLevel(species, level) {
        const baseStats = getPokemonBaseStats()[species];
        const pokemon = new Pokemon(species, level, baseStats);
        this.updateStats(pokemon);
    }

    updatePokedexNumber(number) {
        const label = document.getElementById('pokedexNumber');
        label.innerHTML = number.toString().padStart(3, '0');
    }

    updateLevel(level) {
        this.levelControl.value = level;
    }

    updateHpStats(baseStat, iv, statExp, level) {
        const finalStat = calcStat(baseStat, iv, statExp, level, true);
        this.updateStatGroup('hp', baseStat, iv, statExp, finalStat);
    }

    updateAttackStats(baseStat, iv, statExp, level) {
        const finalStat = calcStat(baseStat, iv, statExp, level, false);
        this.updateStatGroup('attack', baseStat, iv, statExp, finalStat);
    }

    updateDefenseStats(baseStat, iv, statExp, level) {
        const finalStat = calcStat(baseStat, iv, statExp, level, false);
        this.updateStatGroup('defense', baseStat, iv, statExp, finalStat);
    }

    updateSpecialStats(baseStat, iv, statExp, level) {
        const finalStat = calcStat(baseStat, iv, statExp, level, false);
        this.updateStatGroup('special', baseStat, iv, statExp, finalStat);
    }

    updateSpeedStats(baseStat, iv, statExp, level) {
        const finalStat = calcStat(baseStat, iv, statExp, level, false);
        this.updateStatGroup('speed', baseStat, iv, statExp, finalStat);
    }

    updateStatGroup(name, baseStat, iv, statExp, finalStat) {
        this.updateBaseStat(name, baseStat);
        this.updateIv(name, iv);
        this.updateHpStatExp(name, statExp);
        this.updateFinalStat(name, finalStat);
    }

    updateBaseStat(name, stat) {
        const input = document.getElementById(name + 'BaseStatOutput');
        input.value = stat;
    }

    updateIv(name, stat) {
        const input = document.getElementById(name + 'IvOutput');
        input.value = stat;
    }

    updateHpStatExp(name, stat) {
        const input = document.getElementById(name + 'StatExpOutput');
        input.value = stat;
    }

    updateFinalStat(name, stat) {
        const input = document.getElementById(name + 'Output');
        input.value = stat;
    }

    updateStats(pokemon) {
        this.updateHpStats(
            pokemon.baseStats.hp, pokemon.ivs.hp, pokemon.statExp.hp, pokemon.level
        );
        this.updateAttackStats(
            pokemon.baseStats.attack, pokemon.ivs.attack, pokemon.statExp.attack, pokemon.level
        );
        this.updateDefenseStats(
            pokemon.baseStats.defense, pokemon.ivs.defense, pokemon.statExp.defense, pokemon.level
        );
        this.updateSpecialStats(
            pokemon.baseStats.special, pokemon.ivs.special, pokemon.statExp.special, pokemon.level
        );
        this.updateSpeedStats(
            pokemon.baseStats.speed, pokemon.ivs.speed, pokemon.statExp.speed, pokemon.level
        );
    }
};

const requiredFiles = [
    'names.js',
    'dex.js',
    'basestats.js',
    'stats.js',
    'pokemon.js',
    'pokemonIds.js',
];

requireFiles(requiredFiles, () => new App());
