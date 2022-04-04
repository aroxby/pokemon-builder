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
    'app.js',
    'basestats.js',
    'dex.js',
    'names.js',
    'pokemon.js',
    'pokemonIds.js',
    'stats.js',
    'moveIds.js',
    'moveNames.js',
    'movePps.js',
];

requireFiles(requiredFiles, () => new App());
