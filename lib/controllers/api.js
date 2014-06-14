'use strict';

var keycode = require('keycode');

var userCount = 0;
var currentState = {};


exports.newUser = function() {
    return userCount++;
};

exports.initIO = function(io) {
    io.on('connection', function(socket) {
        var id = exports.newUser();
        console.log('new user: ' + id);
        io.emit('join', id);
        // re broadcast all keypress
        socket.on('keycode', function(key) {
            console.log(keycode(key));
            io.emit('keypress', keycode(key));
        });

        socket.on('get:state', function(socket) {
            socket.emit('set:state', currentState);
        });
    });
};