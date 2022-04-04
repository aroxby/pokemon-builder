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
            moves: [],
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

        const allMoveControls = document.getElementsByName('moveControl');
        const allPpControls = document.getElementsByName('ppControl');
        // For...in loops over this will return attributes as well as indices
        for(let controlIndex = 0; controlIndex < allMoveControls.length; controlIndex++) {
            this.controls.moves.push({
                move: allMoveControls[controlIndex],
                pp: allPpControls[controlIndex],
            });
        }

        const defaultSpecies = PokemonIds.BULBASAUR;
        const defaultLevel = 1;
        this.pokemon = new Pokemon(
            defaultSpecies, defaultLevel, getPokemonBaseStats()[defaultSpecies]
        );

        this.fillMovesEntries(getMoveNames());
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

    fillMovesEntries(names) {
        for(const controlSet of this.controls.moves) {
            for(const moveIndex in names) {
                const option = document.createElement("option");
                option.value = moveIndex;
                option.innerHTML = names[moveIndex];
                controlSet.move.appendChild(option);
            }
            controlSet.move.value = MoveIds.NONE;
            controlSet.pp.value = getMovePps()[controlSet.move.value];
        }
    }

    fillDefaultSpecies() {
        this.controls.species.value = this.pokemon.species;
    }

    fillDefaultLevel() {
        this.updateLevel(this.pokemon.level);
    }

    setupHandlers() {
        this.controls.species.oninput = () => this.updatePokemonDataFromSpeciesControl();
        this.controls.level.oninput = () => this.updatePokemonDataFromLevelControl();
        // TODO: Use less handler generators
        for(const statName of Object.values(StatNames)) {
            this.controls.statExp[statName].oninput = this.createStatExpControlHandler(statName);
        }
        for(const statName of Object.values(StatNames)) {
            if(statName != StatNames.HP) {
                this.controls.ivs[statName].oninput = this.createIvControlHandler(statName);
            }
        }
        for(const controlIndex in this.controls.moves) {
            this.controls.moves[controlIndex].move.oninput = this.createMoveControlHandler(controlIndex);
        }
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

    createStatExpControlHandler(statName) {
        const app = this;
        function updatePokemonDataFromStatExpControl() {
            const statExp = clamp(Number(app.controls.statExp[statName].value), 0, 65535);
            app.controls.statExp[statName].value = statExp;
            app.pokemon.statExp[statName] = statExp;
            app.updateFinalStat(statName, app.pokemon.calcStat(statName));
        }
        return updatePokemonDataFromStatExpControl;
    }

    createIvControlHandler(statName) {
        const app = this;
        function updatePokemonDataFromIvControl() {
            const iv = clamp(Number(app.controls.ivs[statName].value), 0, 15);
            app.controls.ivs[statName].value = iv;
            app.pokemon.ivs[statName] = iv;
            app.pokemon.rebuildHpIv();
            app.controls.ivs[StatNames.HP].value = app.pokemon.ivs[StatNames.HP];
            app.updateFinalStat(statName, app.pokemon.calcStat(statName));
        }
        return updatePokemonDataFromIvControl;
    }

    createMoveControlHandler(controlIndex) {
        const app = this;
        function updatePokemonDataFromMoveControl() {
            const move = Number(app.controls.moves[controlIndex].move.value);
            app.pokemon.moves[controlIndex] = move;
            app.controls.moves[controlIndex].pp.value = app.pokemon.getPp(controlIndex);
        }
        return updatePokemonDataFromMoveControl;
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
