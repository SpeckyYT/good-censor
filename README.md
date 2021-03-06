# Good-Censor

A simple censoring module for all your needs.

## Contents

- [Good-Censor](#good-censor)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
    - [options.censorText](#optionscensortext)
    - [options.censorLoop](#optionscensorloop)
    - [options.censorLongest](#optionscensorlongest)
    - [options.censorSlice](#optionscensorslice)
    - [options.censorStart](#optionscensorstart)
    - [options.censorEnd](#optionscensorend)
    - [options.ignore](#optionsignore)

## Installation

```sh
npm i --save good-censor
```

## Usage

```js
const GoodCensor = require('good-censor');

const badwords = [
    'duck',
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

const censored = myCensor.censor('duck you, you little batch');

console.log(censored) // "**** you, you little *****"
```

## Options

```js
// the following are the default values
const options = {
    censorText: '*',
    censorLoop: true,
    censorLongest: true,
    censorSlice: true,
    censorStart: 0,
    censorEnd: 0,
    ignore: /(?!)/
}
myCensor.censor('someString',options);
```

| Note: examples below are pseudocode
|-

### options.censorText

```js
options = {
    censorText: '#',
}
// result: #### you, you little #####

options = {
    censorText: '~BEEP~',
    censorSlice: false,
    censorLoop: false,
}
// result: ~BEEP~ you, you little ~BEEP~
```

### options.censorLoop

```js
options = {
    censorText: '#',
    censorLoop: false,
}
// result: # you, you little #

options = {
    censorText: 'NO',
    censorLoop: true,
    censorSlice: false,
}
// result: NONO you, you little NONONO
```

### options.censorLongest

```js
badwords = ['duck','ducking']
text = 'ducking'
options = {
    censorLongest: true,
}
// result: *******

badwords = ['duck','ducking']
text = 'ducking'
options = {
    censorLongest: false,
}
// result: ****ing
```

### options.censorSlice

```js
options = {
    censorText: 'AAAAAAAAAA',
    censorSlice: true,
}
// result: AAAA you, you little AAAAA

options = {
    censorText: 'AAAAAAAAAA',
    censorSlice: false,
}
// result: AAAAAAAAAA you, you little AAAAAAAAAA
```

### options.censorStart

```js
options = {
    censorStart: 1,
}
// result: d*** you, you little b****

options = {
    censorStart: 2,
}
// result: du** you, you little ba***
```

NOTE: if you put a number which is too big (especially in combination with `options.censorEnd`), the full word may get not censored.

### options.censorEnd

```js
options = {
    censorEnd: 1,
}
// result: ***k you, you little ****h

options = {
    censorEnd: 2,
}
// result: **ck you, you little ***ch
```

NOTE: if you put a number which is too big (especially in combination with `options.censorStart`), the full word may get not censored.

### options.ignore

```js
options = {
    ignore: /ck|ch/
}
// result: duck you, you little batch
```

NOTE: this is really useful in cases where you don't want to censure URLs or other specific strings. The flags will be forced to be `iy`
