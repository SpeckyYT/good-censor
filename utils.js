function isIntersecting([s1,e1],ignore){
    for(const [s2,l2] of ignore)
        if(s1 <= s2 + l2 && s2 <= e1) return true;
    return false;
}

function mergeOptions(...options){
    return Object.assign({},...options)
}

function parseResults(results = [], longest){
    if(!Array.isArray(results)) return [];
    const map = {};
    for(const [index,matches] of results){
        for(const match of matches){
            const i = index + 1 - match.length;
            if(!map[i] || longest != match.length < map[i])
                map[i] = match.length;
        }
    }
    return Object.entries(map);
}

function spliceString(string, index, deleteCount, ...items){
    const start = string.slice(0, index);
    const insert = items.join('');
    const end = string.slice(index + deleteCount);
    return `${start}${insert}${end}`;
}

module.exports = {
    isIntersecting,
    mergeOptions,
    parseResults,
    spliceString,
}
