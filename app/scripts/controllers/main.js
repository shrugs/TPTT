'use strict';

angular.module('tpttApp')
.controller('MainCtrl', function ($scope, IO) {
    $scope.state = {};
    IO.on('keypress', function(key) {
        $scope.$broadcast('keypress', key);
    });

    IO.on('set:state', function(state) {
        console.log(state);
        $scope.state = state;
    });

    IO.on('join', function(userID) {
        $scope.userID = userID;
    });

    IO.on('finish', function(data) {
        $scope.winner = data.lastEventCause;
    });

    $scope.$on('ttkeycode', function(e, keyCode) {
        IO.emit('keycode', keyCode);
    });
});
