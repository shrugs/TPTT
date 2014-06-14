'user strict';

var _ = require('lodash');

var words = [
    'the',
    'be',
    'to',
    'of',
    'and',
    'a',
    'in',
    'that',
    'have',
    'it',
    'for',
    'not',
    'on',
    'with',
    'he',
    'as',
    'you',
    'do',
    'at',
    'this',
    'but',
    'his',
    'by',
    'from',
    'they',
    'we',
    'say',
    'her',
    'she',
    'or',
    'an',
    'will',
    'my',
    'one',
    'all',
    'would',
    'there',
    'their',
    'what',
    'so',
    'up',
    'out',
    'if',
    'about',
    'who',
    'get',
    'which',
    'go',
    'me',
    'when',
    'make',
    'can',
    'like',
    'time',
    'no',
    'just',
    'him',
    'know',
    'take',
    'people',
    'into',
    'year',
    'your',
    'good',
    'some',
    'could',
    'them',
    'see',
    'other',
    'than',
    'then',
    'now',
    'look',
    'only',
    'come',
    'its',
    'over',
    'think',
    'also',
    'back',
    'after',
    'use',
    'two',
    'how',
    'our',
    'work',
    'first',
    'well',
    'way',
    'even',
    'new',
    'want',
    'because',
    'any',
    'these',
    'give',
    'day',
    'most',
    'us'
];

var numbers = [];

for (var i = 0; i < 100; i++) {
    numbers.push(i.toString());
}

var type = 'words';

var stuff = {
    'numbers': numbers,
    'words': words
};


var idx = 0;

exports.getWord = function() {

    if (idx >= stuff[type].length) {
        idx = 0;
    }
    idx++;
    return stuff[type][idx-1];
};

exports.options = {
    type: function(_type) {
        idx = 0;
        type = _type;
    }
};