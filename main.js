function loadScript(url, callback) {
    const head = document.head;
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    head.appendChild(script);
}

let namesLoaded = false;
let dexLoaded = false;

function lateInit() {
    if(!(namesLoaded && dexLoaded)) {
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
}

loadScript('names.js', () => {  // getPokemonNames()
    namesLoaded = true;
    lateInit();
});
loadScript('dex.js', () => {  // getPokedexOrder()
    dexLoaded = true;
    lateInit();
});
