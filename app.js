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
            types: [],
            exp: document.getElementById('expControl'),
            otId: document.getElementById('OtIdControl'),
            otName: document.getElementById('OtNameControl'),
            nickname: document.getElementById('nickControl'),
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
        }

        const allMoveControls = document.getElementsByName('moveControl');
        const allPpControls = document.getElementsByName('ppControl');
        // For...in loops over this will return attributes as well as indices
        for(let controlIndex = 0; controlIndex < allMoveControls.length; controlIndex++) {
            this.controls.moves.push({
                move: allMoveControls[controlIndex],
                pp: allPpControls[controlIndex],
            });
        }

        const allTypeControls = document.getElementsByName('typeControl');
        for(let controlIndex = 0; controlIndex < allTypeControls.length; controlIndex++) {
            this.controls.types.push(allTypeControls[controlIndex]);
        }

        const defaultOtId = 31337;
        const defaultOtName = 'Trainer';
        this.controls.otId.value = defaultOtId;
        this.controls.otName.value = defaultOtName;

        // PokemonIds really only exists for this one line
        const defaultSpecies = PokemonIds.BULBASAUR;
        const defaultLevel = 1;
        this.pokemon = new Pokemon(
            defaultSpecies, defaultLevel, getPokemonBaseStats()[defaultSpecies]
        );

        this.fillSpeciesEntry(getPokedexOrder(), getPokemonNames());
        this.fillMovesEntries(getMoveNames());
        this.fillTypeEntries(TypeNames);
        this.fillDefaultSpecies();
        this.fillDefaultLevel();
        this.fillDefaultExp();
        this.setupHandlers();
        // this is used to cascade updates to other controls
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
            for(const name in names) {
                const option = document.createElement("option");
                option.value = names[name];
                option.innerHTML = name;
                controlSet.move.appendChild(option);
            }
            controlSet.move.value = MoveIds.NONE;
            controlSet.pp.value = getMovePps()[controlSet.move.value];
        }
    }

    fillTypeEntries(types) {
        for(const typeControl of this.controls.types) {
            for(const name in types) {
                const option = document.createElement("option");
                option.value = types[name];
                option.innerHTML = name;
                typeControl.appendChild(option);
            }
            typeControl.value = TypeIds.NORMAL;
        }
    }

    fillDefaultSpecies() {
        this.controls.species.value = this.pokemon.species;
    }

    fillDefaultLevel() {
        this.updateLevel(this.pokemon.level);
    }

    fillDefaultExp() {
        this.controls.exp.value = 0;
    }

    setupHandlers() {
        this.controls.species.oninput = () => this.updatePokemonDataFromSpeciesControl();
        this.controls.level.oninput = () => this.updatePokemonDataFromLevelControl();
        for(const statName of Object.values(StatNames)) {
            this.controls.statExp[statName].oninput = () => this.updatePokemonDataFromStatExpControl(statName);
        }
        for(const statName of Object.values(StatNames)) {
            if(statName != StatNames.HP) {
                this.controls.ivs[statName].oninput = () => this.updatePokemonDataFromIvControl(statName);
            }
        }
        for(const controlIndex in this.controls.moves) {
            this.controls.moves[controlIndex].move.oninput = () => this.updatePokemonDataFromMoveControl(controlIndex);
        }
    }

    updatePokemonDataFromSpeciesControl() {
        const species = Number(this.controls.species.value);
        const pokedexNumber = this.controls.species.selectedIndex + 1;
        this.updatePokemonDataFromSpecies(species, pokedexNumber);
        this.updateNicknameFromSpecies(species);
    }

    updateNicknameFromSpecies(species) {
        this.controls.nickname.value = getPokemonNames()[species];
    }

    updatePokemonDataFromLevelControl() {
        const rawlevel = Number(this.controls.level.value);
        const level = Math.round(clamp(rawlevel, 0, 255));
        this.updateLevel(level);
        this.updatePokemonDataFromLevel(this.pokemon.species, level);
    }

    updatePokemonDataFromStatExpControl(statName) {
        const statExp = clamp(Number(this.controls.statExp[statName].value), 0, 65535);
        this.controls.statExp[statName].value = statExp;
        this.pokemon.statExp[statName] = statExp;
        this.updateFinalStat(statName, this.pokemon.calcStat(statName));
    }

    updatePokemonDataFromIvControl(statName) {
        const iv = clamp(Number(this.controls.ivs[statName].value), 0, 15);
        this.controls.ivs[statName].value = iv;
        this.pokemon.ivs[statName] = iv;
        this.pokemon.rebuildHpIv();
        this.controls.ivs[StatNames.HP].value = this.pokemon.ivs[StatNames.HP];
        this.updateFinalStat(statName, this.pokemon.calcStat(statName));
    }

    updatePokemonDataFromMoveControl(controlIndex) {
        const move = Number(this.controls.moves[controlIndex].move.value);
        this.pokemon.moves[controlIndex] = move;
        this.controls.moves[controlIndex].pp.value = this.pokemon.getPp(controlIndex);
    }

    updatePokemonDataFromTypeControl(controlIndex) {
        const type = Number(this.controls.types[controlIndex].value);
        this.pokemon.types[controlIndex] = type;
    }

    updatePokemonDataFromSpecies(species, pokedexNumber) {
        this.pokemon.species = species;
        this.pokemon.types = getPokemonTypes()[species];
        this.pokemon.baseStats = getPokemonBaseStats()[species];
        this.updatePokedexNumber(pokedexNumber);
        this.updateTypes(this.pokemon.types);
        this.updateStats(this.pokemon);
        this.updateExp(this.pokemon.calcExp());
    }

    updatePokemonDataFromLevel(species, level) {
        this.pokemon.level = level;
        this.updateExp(this.pokemon.calcExp());
        this.updateStats(this.pokemon);
    }

    updateExp(exp) {
        this.controls.exp.value = exp;
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

    updateTypes(types) {
        this.controls.types[0].value = types[0];
        this.controls.types[1].value = types[1];
    }
};
