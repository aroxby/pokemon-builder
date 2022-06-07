function padString(str, desiredLength, padding = '\0') {
    return str.padEnd(desiredLength, padding);
}

function unpadString(str, padding = '\0') {
    return str.replace(new RegExp(`${padding}*$`), '');
}

function gameEncodeString(str) {
    return recodeString(str, GameStringEncodingMap);
}

function gameDecodeString(str) {
    return recodeString(str, GameStringDecodingMap);
}

function recodeString(str, map) {
    return [...str].map((ch) => map[ch] ?? map['?']).join('');
}

const GameStringEncodingMap = {
    "\0": '\x50',
    " ": '\x7f',
    "A": '\x80',
    "B": '\x81',
    "C": '\x82',
    "D": '\x83',
    "E": '\x84',
    "F": '\x85',
    "G": '\x86',
    "H": '\x87',
    "I": '\x88',
    "J": '\x89',
    "K": '\x8a',
    "L": '\x8b',
    "M": '\x8c',
    "N": '\x8d',
    "O": '\x8e',
    "P": '\x8f',
    "Q": '\x90',
    "R": '\x91',
    "S": '\x92',
    "T": '\x93',
    "U": '\x94',
    "V": '\x95',
    "W": '\x96',
    "X": '\x97',
    "Y": '\x98',
    "Z": '\x99',
    "(": '\x9a',
    ")": '\x9b',
    ":": '\x9c',
    ";": '\x9d',
    "[": '\x9e',
    "]": '\x9f',
    "a": '\xa0',
    "b": '\xa1',
    "c": '\xa2',
    "d": '\xa3',
    "e": '\xa4',
    "f": '\xa5',
    "g": '\xa6',
    "h": '\xa7',
    "i": '\xa8',
    "j": '\xa9',
    "k": '\xaa',
    "l": '\xab',
    "m": '\xac',
    "n": '\xad',
    "o": '\xae',
    "p": '\xaf',
    "q": '\xb0',
    "r": '\xb1',
    "s": '\xb2',
    "t": '\xb3',
    "u": '\xb4',
    "v": '\xb5',
    "w": '\xb6',
    "x": '\xb7',
    "y": '\xb8',
    "z": '\xb9',
    "'": '\xe0',
    "-": '\xe3',
    "?": '\xe6',
    "!": '\xe7',
    ".": '\xe8',
    "♂": '\xef',
    "¥": '\xf0',
    "/": '\xf3',
    ",": '\xf4',
    "♀": '\xf5',
    "0": '\xf6',
    "1": '\xf7',
    "2": '\xf8',
    "3": '\xf9',
    "4": '\xfa',
    "5": '\xfb',
    "6": '\xfc',
    "7": '\xfd',
    "8": '\xfe',
    "9": '\xff',
};

const GameStringDecodingMap = {
    // TODO: Deal with {Pk}, {Mn}, and ×
    '\x50': "\0",
    '\x7f': " ",
    '\x80': "A",
    '\x81': "B",
    '\x82': "C",
    '\x83': "D",
    '\x84': "E",
    '\x85': "F",
    '\x86': "G",
    '\x87': "H",
    '\x88': "I",
    '\x89': "J",
    '\x8a': "K",
    '\x8b': "L",
    '\x8c': "M",
    '\x8d': "N",
    '\x8e': "O",
    '\x8f': "P",
    '\x90': "Q",
    '\x91': "R",
    '\x92': "S",
    '\x93': "T",
    '\x94': "U",
    '\x95': "V",
    '\x96': "W",
    '\x97': "X",
    '\x98': "Y",
    '\x99': "Z",
    '\x9a': "(",
    '\x9b': ")",
    '\x9c': ":",
    '\x9d': ";",
    '\x9e': "[",
    '\x9f': "]",
    '\xa0': "a",
    '\xa1': "b",
    '\xa2': "c",
    '\xa3': "d",
    '\xa4': "e",
    '\xa5': "f",
    '\xa6': "g",
    '\xa7': "h",
    '\xa8': "i",
    '\xa9': "j",
    '\xaa': "k",
    '\xab': "l",
    '\xac': "m",
    '\xad': "n",
    '\xae': "o",
    '\xaf': "p",
    '\xb0': "q",
    '\xb1': "r",
    '\xb2': "s",
    '\xb3': "t",
    '\xb4': "u",
    '\xb5': "v",
    '\xb6': "w",
    '\xb7': "x",
    '\xb8': "y",
    '\xb9': "z",
    '\xe0': "'",
    '\xe3': "-",
    '\xe6': "?",
    '\xe7': "!",
    '\xe8': ".",
    '\xef': "♂",
    '\xf0': "¥",
    '\xf3': "/",
    '\xf4': ",",
    '\xf5': "♀",
    '\xf6': "0",
    '\xf7': "1",
    '\xf8': "2",
    '\xf9': "3",
    '\xfa': "4",
    '\xfb': "5",
    '\xfc': "6",
    '\xfd': "7",
    '\xfe': "8",
    '\xff': "9",
};