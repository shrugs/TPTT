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
        letters: [],
        lastEventCause: 0

    };

    state.letters = _.map(state.text.split(''), function(letter) {
        return {text: letter, highlighted: false};
    });

    function startLine() {
        // start timer, reset local errors
        state.startTime = (new Date()).getTime()/1000;
        _.each(state.stats, function(stat) {
            stat.local = 0;
        });

        state.text = words.getWord();
        state.currentLetterIndex = 0;

        // set up letters array
        state.letters = [];
        state.letters = _.map(state.text.split(''), function(letter) {
            return {text: letter, highlighted: false};
        });
    }

    function scoreLetter() {
        // add points
        state.stats.points.local += 20;
    }

    function handleMistake() {
        // handle error by punishing users
        _.each(state.letters, function(letter) {
            letter.highlighted = false;
        });
        state.currentLetterIndex = 0;
        // decrement score
        state.stats.points.local --;
    }

    function handleUpdate(id) {
        // update time
        var now = (new Date()).getTime()/1000;
        state.stats.time.local = now - state.startTime;
        state.lastEventCause = id;
    }

    function finishLine() {
        // add up totals
        _.each(state.stats, function(stat) {
            stat.total += stat.local;
        });
        // remove points for time
        state.stats.points.local -= state.stats.time.local * 2;
        startLine();
        return {};
    }

    function newUser() {
        return userCount++;
    }

    function handleKeypress(key, id) {
        if (state.letters[state.currentLetterIndex].text === key) {
            // success!
            state.letters[state.currentLetterIndex].highlighted = true;

            state.currentLetterIndex++;

            scoreLetter();
        } else {
            handleMistake();
        }

        handleUpdate(id);

        if (state.currentLetterIndex >= state.text.length) {
            // finish line, yay!
            io.emit('finish', finishLine());
        }

        return state;
    }

    function setState() {
        io.emit('set:state', state);
    }

    io.on('connection', function(socket) {
        var id = newUser();
        socket.userID = id;
        io.emit('join', id);
        setState();
        // rebroadcast state
        socket.on('keycode', function(key) {
            io.emit('set:state', handleKeypress(keycode(key), socket.userID));
        });
    });

    io.on('disconnect', function() {
        userCount --;
    });

};
