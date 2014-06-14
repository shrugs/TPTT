'use strict';

var keycode = require('keycode');
var words = require('./words');
var _ = require('lodash');

exports.initIO = function(io) {

    var userCount = 0;
    var state = {
        startTime: (new Date()).getTime()/1000,
        currentLetterIndex: 0,
        stats: {
            errors: {
                total: 0,
                local: 0,
                name: 'Mistakes'
            },
            points: {
                total: 0,
                local: 0,
                name: 'Points'
            },
            time: {
                total: 0,
                local: 0,
                name: 'Time'
            }
        },
        text: words.getWord(),
        letters: [],
        lastEventCause: 0,
        userCount: 1

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
        state.stats.points.local += 2;
    }

    function handleMistake() {
        // handle error by punishing users
        _.each(state.letters, function(letter) {
            letter.highlighted = false;
        });
        state.currentLetterIndex = 0;
        // decrement score
        state.stats.points.local --;
        // update mistake
        state.stats.errors.local ++;
    }

    function handleUpdate(id) {
        // update time
        var now = (new Date()).getTime()/1000;
        state.stats.time.local = parseInt(now - state.startTime, 10);
        state.lastEventCause = id;
        state.userCount = userCount;
    }

    function finishLine() {
        // add up totals
        _.each(state.stats, function(stat) {
            stat.total += stat.local;
        });
        // remove points for time
        state.stats.points.local -= state.stats.time.local * 2;
        startLine();
        return {
            lastEventCause: state.lastEventCause
        };
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
        socket.emit('join', id);
        setState();
        // rebroadcast state
        socket.on('keycode', function(key) {
            io.emit('set:state', handleKeypress(keycode(key), socket.userID));
        });
        socket.on('disconnect', function() {
            userCount --;
        });
    });

};
