'use strict';


exports.initIO = function(io) {
    io.on('connection', function(socket) {
        socket.emit('test', 'hey');
    });
};