'use strict';

angular.module('tpttApp')
.controller('MainCtrl', function ($scope, IO) {
    IO.on('test', function(data) {
        console.log(data);
    });
});
