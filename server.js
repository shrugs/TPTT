'use strict';

var express = require('express');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var app = express();

// Express settings
require('./lib/config/express')(app);

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Routing
require('./lib/routes')(app, io);

// Start server
http.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});



// Expose app
exports = module.exports = app;