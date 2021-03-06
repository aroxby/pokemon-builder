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
            hexRefesh: document.getElementById('hexRefreshControl'),
            hexData: document.getElementById('hexDataControl'),
            exportButton: document.getElementById('exportControl'),
            importButton: document.getElementById('importControl'),
            importWrapper: document.getElementById('importWrapper'),
            sprite: document.getElementById('sprite'),
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

        this.fillSpeciesEntry(getPokedexOrder(), getPokemonNames());
        this.fillMovesEntries(getMoveNames());
        this.fillTypeEntries(TypeNames);

        this.buildDefaultPokemon();
        this.reloadEntirePokemon();

        this.setupHandlers();
    }

    buildDefaultPokemon() {
        // PokemonIds really only exists for this one line
        const species = PokemonIds.BULBASAUR;
        const level = 1;
        const exp = 0;
        const baseStats = getPokemonBaseStats()[species];
        const types = getPokemonTypes()[species];
        const nickname = getPokemonNames()[species];
        const otId = 31337;
        const otName = 'Trainer';
        this.pokemon = new Pokemon(
            species, level, exp, baseStats, types, nickname, otId, otName
        );
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

    reloadEntirePokemon() {
        this.reloadPokemonSpecies();
        // Cheating the reverse lookup here
        const pokedexNumber = this.controls.species.selectedIndex + 1;
        this.updatePokedexNumber(pokedexNumber);
        this.reloadPokemonLevel();
        this.reloadPokemonExp();
        this.reloadPokemonMoves();
        this.reloadPokemonOt();
        this.reloadPokemonNickname();
        this.reloadPokemonTypes();
        this.reloadPokemonStats();
        this.updatePokemonSprite();
    }

    reloadPokemonSpecies() {
        this.controls.species.value = this.pokemon.species;
    }

    reloadPokemonLevel() {
        this.updateLevel(this.pokemon.level);
    }

    reloadPokemonExp() {
        this.controls.exp.value = this.pokemon.exp;
    }

    reloadPokemonMoves() {
        this.controls.moves[0].move.value = this.pokemon.moves[0];
        this.controls.moves[1].move.value = this.pokemon.moves[1];
        this.controls.moves[2].move.value = this.pokemon.moves[2];
        this.controls.moves[3].move.value = this.pokemon.moves[3];
        this.controls.moves[0].pp.value = this.pokemon.getPp(0);
        this.controls.moves[1].pp.value = this.pokemon.getPp(1);
        this.controls.moves[2].pp.value = this.pokemon.getPp(2);
        this.controls.moves[3].pp.value = this.pokemon.getPp(3);
    }

    reloadPokemonOt() {
        this.controls.otId.value = this.pokemon.otId;
        this.controls.otName.value = this.pokemon.otName;
    }

    reloadPokemonNickname() {
        this.controls.nickname.value = this.pokemon.nickname;
    }

    setupHandlers() {
        this.controls.species.oninput = () => this.updatePokemonDataFromSpeciesControl();
        this.controls.level.oninput = () => this.updatePokemonDataFromLevelControl();
        this.controls.exp.oninput = () => this.updatePokemonExp();

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

        for(const controlIndex in this.controls.types) {
            this.controls.types[controlIndex].oninput = () => this.updatePokemonDataFromTypeControl(controlIndex);
        }

        this.controls.nickname.oninput = () => this.updatePokemonNickname();
        this.controls.otId.oninput = () => this.updatePokemonOtId();
        this.controls.otName.oninput = () => this.updatePokemonOtName();

        this.controls.hexRefesh.onclick = () => this.hexDumpPokemon();
        this.controls.exportButton.onclick = () => this.createPokemonDownload();
        this.controls.importWrapper.onclick = () => this.controls.importButton.click();
        this.controls.importButton.onchange = () => this.readPokemonUpload();
    }

    updatePokemonExp() {
        this.pokemon.exp = this.controls.exp.value;
    }

    updatePokemonDataFromSpeciesControl() {
        const species = Number(this.controls.species.value);
        const pokedexNumber = this.controls.species.selectedIndex + 1;
        this.updatePokemonDataFromSpecies(species, pokedexNumber);
        this.updateNicknameFromSpecies(species);
        this.updatePokemonSprite();
    }

    updateNicknameFromSpecies(species) {
        const nickname = getPokemonNames()[species];
        this.pokemon.nickname = this.controls.nickname.value = nickname;
    }

    updatePokemonDataFromLevelControl() {
        const rawlevel = Number(this.controls.level.value);
        const level = Math.round(clamp(rawlevel, 0, 255));
        this.updateLevel(level);
        this.updatePokemonDataFromLevel(level);
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

    updatePokemonNickname() {
        this.pokemon.nickname = this.controls.nickname.value;
    }

    updatePokemonOtId() {
        this.pokemon.otId = Number(this.controls.otId.value);
    }

    updatePokemonOtName() {
        this.pokemon.otName = this.controls.otName.value;
    }

    updatePokemonDataFromSpecies(species, pokedexNumber) {
        this.pokemon.species = species;
        this.pokemon.types = getPokemonTypes()[species];
        this.pokemon.baseStats = getPokemonBaseStats()[species];
        this.updatePokedexNumber(pokedexNumber);
        this.reloadPokemonTypes();
        this.reloadPokemonStats();
        this.updateExp(this.pokemon.calcExp());
    }

    updatePokemonDataFromLevel(level) {
        this.pokemon.level = level;
        this.updateExp(this.pokemon.calcExp());
        this.reloadPokemonStats();
    }

    updatePokemonSprite() {
        const spriteUrl = getSpriteUrl(this.pokemon.species);
        this.controls.sprite.src = spriteUrl;
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

    reloadPokemonStats() {
        for(const statName of Object.values(StatNames)) {
            this.updateStatGroup(
                statName,
                this.pokemon.baseStats[statName],
                this.pokemon.ivs[statName],
                this.pokemon.statExp[statName],
                this.pokemon.calcStat(statName),
            );
        }
    }

    reloadPokemonTypes() {
        this.controls.types[0].value = this.pokemon.types[0];
        this.controls.types[1].value = this.pokemon.types[1];
    }

    hexDumpPokemon() {
        this.controls.hexData.value = hexDump(this.pokemon.serialize());
    }

    createPokemonDownload() {
        const suffix = '.pk1';
        const filename = this.pokemon.nickname + suffix;
        const data = this.pokemon.serialize();
        pushDownload(filename, data);
    }

    readPokemonUpload() {
        readUpload(this.controls.importButton.files[0], (data) => {
            this.controls.hexData.value = hexDump(data);
            this.pokemon.deserialize(data);
            this.reloadEntirePokemon();
            // Clears the file upload so that the same file can be opened again
            this.controls.importButton.value = '';
        });
    }
};
