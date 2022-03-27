class App {
    constructor() {
        this.controls = {
            species: document.getElementById('speciesControl'),
            level: document.getElementById('levelControl'),
            pokedex: document.getElementById('pokedexNumber'),
            baseStats: {},
            ivs: {},
            statExp: {},
            stats: {},
        };
        for(const statName of Object.values(StatNames)) {
            this.controls.baseStats[statName] = document.getElementById(
                statName + 'BaseStatControl'
            );
            this.controls.ivs[statName] = document.getElementById(
                statName + 'IvControl'
            );
            this.controls.statExp[statName] = document.getElementById(
                statName + 'StatExpControl'
            );
            this.controls.stats[statName] = document.getElementById(
                statName + 'Control'
            );
        };

        const defaultSpecies = PokemonIds.BULBASAUR;
        const defaultLevel = 1;
        this.pokemon = new Pokemon(
            defaultSpecies, defaultLevel, getPokemonBaseStats()[defaultSpecies]
        );

        this.fillSpeciesEntry(getPokedexOrder(), getPokemonNames());
        this.fillDefaultSpecies();
        this.fillDefaultLevel();
        this.setupHandlers();
        // this is used instead of updateStats so the pokedex number gets set
        this.updatePokemonDataFromSpeciesControl();
    }

    fillSpeciesEntry(order, names) {
        for(const species of order) {
            const option = document.createElement("option");
            option.value = species;
            option.innerHTML = names[species];
            this.controls.species.appendChild(option);
        }
    }

    fillDefaultSpecies() {
        this.controls.species.value = this.pokemon.species;
    }

    fillDefaultLevel() {
        this.updateLevel(this.pokemon.level);
    }

    setupHandlers() {
        this.controls.species.onchange = () => this.updatePokemonDataFromSpeciesControl();
        this.controls.level.onchange = () => this.updatePokemonDataFromLevelControl();
        this.controls.statExp.hp.onchange = () => this.updatePokemonDataFromHpStatExpControl();
    }

    updatePokemonDataFromSpeciesControl() {
        const species = Number(this.controls.species.value);
        const pokedexNumber = this.controls.species.selectedIndex + 1;
        this.updatePokemonDataFromSpecies(species, pokedexNumber);
    }

    updatePokemonDataFromLevelControl() {
        const rawlevel = Number(this.controls.level.value);
        const level = Math.round(clamp(rawlevel, 0, 255));
        this.updateLevel(level);
        this.updatePokemonDataFromLevel(this.pokemon.species, level);
    }

    updatePokemonDataFromHpStatExpControl() {
        const value = clamp(Number(this.controls.statExp.hp.value), 0, 65535);
        this.updatePokemonDataFromHpStatExp(value);
    }

    updatePokemonDataFromSpecies(species, pokedexNumber) {
        this.pokemon.species = species;
        this.pokemon.baseStats = getPokemonBaseStats()[species];
        this.updatePokedexNumber(pokedexNumber);
        this.updateStats(this.pokemon);
    }

    updatePokemonDataFromLevel(species, level) {
        this.pokemon.level = level;
        this.updateStats(this.pokemon);
    }

    updatePokedexNumber(number) {
        this.controls.pokedex.innerHTML = number.toString().padStart(3, '0');
    }

    updateLevel(level) {
        this.controls.level.value = level;
    }

    updatePokemonDataFromHpStatExp(statExp) {
        this.pokemon.statExp.hp = statExp;
        this.updateFinalStat(StatNames.HP, this.pokemon.calcStat(StatNames.HP));
    }

    updateStatGroup(name, baseStat, iv, statExp, finalStat) {
        this.updateBaseStat(name, baseStat);
        this.updateIv(name, iv);
        this.updateStatExp(name, statExp);
        this.updateFinalStat(name, finalStat);
    }

    updateBaseStat(name, stat) {
        const input = this.controls.baseStats[name];
        input.value = stat;
    }

    updateIv(name, stat) {
        const input = this.controls.ivs[name];
        input.value = stat;
    }

    updateStatExp(name, stat) {
        const input = this.controls.statExp[name];
        input.value = stat;
    }

    updateFinalStat(name, stat) {
        const input = this.controls.stats[name];
        input.value = stat;
    }

    updateStats(pokemon) {
        for(const statName of Object.values(StatNames)) {
            this.updateStatGroup(
                statName,
                pokemon.baseStats[statName],
                pokemon.ivs[statName],
                pokemon.statExp[statName],
                pokemon.calcStat(statName),
            );
        }
    }
};
