'use strict';

angular.module('tpttApp')
.controller('MainCtrl', function ($scope, IO) {
    $scope.text = 'testing';
    IO.on('keypress', function(key) {
        $scope.$broadcast('keypress', key);
    });

    $scope.$on('ttkeycode', function(e, keyCode) {
        IO.emit('keycode', keyCode);
    });
});
