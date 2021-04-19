const assert = require('assert');
const Censor = require('.');

Censor.badwords.push(
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
)

const toCensor = 'duck my ship';

describe('good-censor', function(){
    this.slow(5)
    it('should censor the text', function(){
        const result = Censor.censor(toCensor)
        assert.strictEqual(result, '**** my ****')
    })
    it('should censor using censorStart and censorEnd', function(){
        const options = {
            censorText: '#',
            censorStart: 1,
            censorEnd: 1,
        }
        const result = Censor.censor(toCensor, options)
        assert.strictEqual(result, 'd##k my s##p')
    })
    it('should censor using censorLoop and censorSlice', function(){
        const options = {
            censorText: '-=BEEP=-',
            censorLoop: false,
            censorSlice: false,
        }
        const result = Censor.censor(toCensor, options)
        assert.strictEqual(result, '-=BEEP=- my -=BEEP=-')
    })
    it('should censor the longest bad word', function(){
        const options = {
            censorLongest: true,
        }
        const result = Censor.censor('ducking', options)
        assert.strictEqual(result, '*******')
    })
    it('should censor the shortest bad word', function(){
        const options = {
            censorLongest: false,
        }
        const result = Censor.censor('ducking', options)
        assert.strictEqual(result, '****ing')
    })
})
