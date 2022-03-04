function calcStatLHS(base, iv, statexp, level) {
    statexp_sqrt = Math.sqrt(statexp);
    numerator = ((base + iv) * 2 + (statexp_sqrt/4)) * level;
    lhs = numerator / 100;
    return lhs;
}

function calcStat(base, iv, statexp, level, isHp) {
    val = calcStatLHS(base, iv, statexp, level);
    val += 5;
    if(isHp) {
        val +=  5 + level;
    }
    return Math.round(val);  // Math.floor wasn't getting the value I wanted
}
