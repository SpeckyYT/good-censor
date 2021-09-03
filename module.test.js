const assert = require('assert');
const GoodCensor = require('.');

const badwords = [
    'duck',
    'ducking',
    'ship',
    'sax',
    'nagger',
    'corn',
    'sick',
    'batch',
    'clip',
    'milk',
]

const myCensor = new GoodCensor(badwords)

const toCensor = 'duck my ship';
const toCensorAccents = 'dück my shîp';

describe('good-censor', function(){
    this.slow(5)
    it('should censor the text', function(){
        const result = myCensor.censor(toCensor)
        assert.strictEqual(result, '**** my ****')
    })
    it('should censor using censorStart and censorEnd', function(){
        const options = {
            censorText: '#',
            censorStart: 1,
            censorEnd: 1,
        }
        const result = myCensor.censor(toCensor, options)
        assert.strictEqual(result, 'd##k my s##p')
    })
    it('should censor using censorLoop and censorSlice', function(){
        const options = {
            censorText: '-=BEEP=-',
            censorLoop: false,
            censorSlice: false,
        }
        const result = myCensor.censor(toCensor, options)
        assert.strictEqual(result, '-=BEEP=- my -=BEEP=-')
    })
    it('should censor words with accents', function(){
        const result = myCensor.censor(toCensorAccents)
        assert.strictEqual(result, '**** my ****')
    })
    it('should not censor if accents option is false', function(){
        const options = {
            censorAccents: false,
        }
        const result = myCensor.censor(toCensorAccents, options)
        assert.strictEqual(result, toCensorAccents)
    })
    it('should not censor if it matches the ignore', function(){
        const options = {
            ignore: /ck/g
        }
        const result = myCensor.censor(toCensor, options);
        assert.strictEqual(result, 'duck my ****')
    })
    it('should censor the longest bad word', function(){
        const options = {
            censorLongest: true,
        }
        const result = myCensor.censor('ducking', options)
        assert.strictEqual(result, '*******')
    })
    it('should censor the shortest bad word', function(){
        const options = {
            censorLongest: false,
        }
        const result = myCensor.censor('ducking', options)
        assert.strictEqual(result, '****ing')
    })
})
