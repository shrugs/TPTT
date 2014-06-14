'user strict';

var words = [
    'the',
    'lazy',
    'dog',
    'jumped',
    'over',
    'the',
    'fox',
    'or',
    'something',
    'like',
    'that'
];

var idx = 0;

exports.getWord = function() {
    if (idx >= words.length) {
        idx = 0;
    }
    idx++;
    return words[idx-1];
};