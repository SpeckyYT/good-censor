const ahocorasick = require('ahocorasick');
let badwords = [];

const cache = {
    size: -1,
    ac: new ahocorasick([]),
}

function load(){
    if(!Array.isArray(badwords)) badwords = [];
    if(cache.size == badwords.length) return cache.ac;
    badwords = badwords.filter(bw => typeof bw == 'string' && bw.length > 0);
    cache.size = badwords.length;
    cache.ac = new ahocorasick(badwords);
    return cache.ac;
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

function isIntersecting([s1,e1],ignore){
    for(const [s2,l2] of ignore)
        if(s1 <= s2 + l2 && s2 <= e1) return true;
}

function censor(text, options){
    const ac = load();
    
    if(typeof text != 'string') return '';
    if(typeof options != 'object') options = {};

    const parsedOptions = {};

    [
        ['censorText','string','*'],
        ['censorLoop','boolean',true],
        ['censorLongest','boolean',true],
        ['censorSlice','boolean',true],
        ['censorStart','number',0],
        ['censorEnd','number',0],
        ['ignore',RegExp,/(?!)/]
    ]
    .forEach(([key,type,normal]) => {
        parsedOptions[key] =
            (
                typeof type == 'string' ?
                    typeof options[key] == type :
                    options[key] instanceof type
            ) ?
                options[key] :
                normal;
    });

    parsedOptions.censorStart = parsedOptions.censorStart || 0;
    parsedOptions.censorEnd = parsedOptions.censorEnd || 0;

    const results = ac.search(text.toLowerCase());
    const parsedResults = parseResults(
        results,
        parsedOptions.censorLongest
    )
    .reverse();

    const ignoreRegex = new RegExp(parsedOptions.ignore,'iy');
    const ignore = [];
    
    for(let i = 0; i < text.length; i++){
        ignoreRegex.lastIndex = i;
        const res = ignoreRegex.exec(text);
        if(!res) continue;
        ignore.push([
            res.index,
            res[0].length,
        ]);
    }

    for(const [index,length] of parsedResults){
        if(isIntersecting([index,index+length],ignore)) continue;

        const count = length -
            parsedOptions.censorStart -
            parsedOptions.censorEnd;

        if(count <= 0) continue;

        const start = parseInt(index) + parsedOptions.censorStart;

        let censorText = parsedOptions.censorText;
        if(parsedOptions.censorLoop && censorText.length > 0)
            while(censorText.length < count)
                censorText = censorText + parsedOptions.censorText;

        if(parsedOptions.censorSlice)
            censorText = censorText.slice(0,count);

        text = spliceString(text, start, count, censorText);
    }

    return text;
}

module.exports = {
    badwords: badwords,
    censor: censor,
};
