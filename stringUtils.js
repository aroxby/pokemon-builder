function padString(str, desiredLength, padding = '\0') {
    console.log(str, desiredLength, padding);
    const newStr = str + padding.repeat(
        Math.ceil(Math.max(desiredLength - str.length, 0) / padding.length)
    );
    return newStr;
}
