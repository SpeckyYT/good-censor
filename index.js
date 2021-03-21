const ahocorasick = require('ahocorasick');
let badwords = [];

const cache = {
    size: -1,
    ac: new ahocorasick([]),
}

function load(){
    if(!Array.isArray(badwords)) badwords = [];
    if(cache.size == badwords.length) return cache.ac;
    cache.size = badwords.length;
    cache.ac = new ahocorasick(
        badwords.map(
            b => b && typeof b == 'string' ? b.toLowerCase() : NaN
        )
    );
    return cache.ac;
}

function parseResults(results = [], longest = true){
    if(!Array.isArray(results)) return [];
    return results.map(([index,matches]) => {
        const length = Math[longest?'max':'min'](matches.map(s => s.length));
        return [index + 1 - length, length];
    });
}

function spliceString(string, index, deleteCount, ...items){
    const start = string.slice(0, index);
    const insert = items.join('');
    const end = string.slice(index + deleteCount);
    return `${start}${insert}${end}`;
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
    ]
    .forEach(([key,type,normal]) => {
        parsedOptions[key] =
            typeof options[key] == type ?
                options[key] :
                normal;
    });

    parsedOptions.censorStart = parsedOptions.censorStart || 0;
    parsedOptions.censorEnd = parsedOptions.censorEnd || 0;

    const results = ac.search(text.toLowerCase()).reverse();
    const parsedResults = parseResults(results, parsedOptions.censorLongest);

    for(const [index,length] of parsedResults){
        const count = length -
            parsedOptions.censorStart -
            parsedOptions.censorEnd;

        if(count <= 0) continue;

        const start = index + parsedOptions.censorStart;

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
