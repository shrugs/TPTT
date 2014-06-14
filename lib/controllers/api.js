'use strict';

var keycode = require('keycode');
var words = require('./words');
var _ = require('lodash');

exports.initIO = function(io) {

    var userCount = 0;
    var state = {
        startTime: 0,
        currentLetterIndex: 0,
        stats: {
            errors: {
                total: 0,
                local: 0
            },
            points: {
                total: 0,
                local: 0
            },
            time: {
                total: 0,
                local: 0
            }
        },
        text: words.getWord(),
        letters: []

    };

    state.letters = _.map(state.text.split(''), function(letter) {
        return {text: letter, highlighted: false};
    });

    function startLine() {
        // start timer, reset local errors
        state.startTime = (new Date()).getTime()/1000;
        state.stats.errors.local = 0;
        state.stats.points.local = 0;
        state.stats.time.local = 0;

        state.text = words.getWord();

        // set up letters array
        state.letters = [];
        state.letters = _.map(state.text.split(''), function(letter) {
            return {text: letter, highlighted: false};
        });
    }

    function scoreLetter() {
        // add points
    }

    function handleMistake() {
        // handle error by punishing users
        for (var letter in state.letters) {
            letter.highlighted = false;
        }

        state.currentLetterIndex = 0;
    }

    function finishLine() {
        // stop time, add up things
        var stopTime = (new Date()).getTime()/1000;
        state.stats.time.local = stopTime - state.startTime;

    }

    function newUser() {
        return userCount++;
    }

    function handleKeypress(key) {
        if (state.letters[state.currentLetterIndex].text === key) {
            // success!
            state.letters[state.currentLetterIndex].highlighted = true;

            state.currentLetterIndex++;

            scoreLetter();

            if (state.currentLetterIndex >= state.text.length) {
                // finish line, yay!
                finishLine();
            }
        } else {
            handleMistake();
        }

        return state;
    }

    function setState() {
        io.emit('set:state', state);
    }

    io.on('connection', function(socket) {
        var id = newUser();
        console.log('new user: ' + id);
        io.emit('join', id);
        setState();
        // rebroadcast state
        socket.on('keycode', function(key) {
            io.emit('set:state', handleKeypress(keycode(key)));
        });
    });

    io.on('disconnect', function() {
        userCount --;
    });

};
