function getSpriteName(species) {
    let name = getPokemonNames()[species];
    name = name.replace('. ', '_');  // Mr. Mime
    name = name.replace('&#9794;', '_m');  // Nidoran
    name = name.replace('&#9792;', '_f');
    name = name.replace('\'', '');  // Farfetch'd
    name = name.replace('MissingNo.', 'ghost');
    name = name.toLowerCase();
    return name;
}

function getSpriteUrl(species) {
    const spriteName = getSpriteName(species);
    // The line of code for the url is just ridiculously long if we don't break it up
    const host = 'raw.githubusercontent.com';
    const path = 'pret/pokefirered/master/graphics/pokemon';
    const url = `https://${host}/${path}/${spriteName}/front.png`;
    return url;
}
