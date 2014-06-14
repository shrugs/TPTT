'use strict';

angular.module('tpttApp')
.controller('MainCtrl', function ($scope, IO, $timeout) {
    $scope.state = {};
    $scope.lastWinner = 'None';
    $scope.leaderboard = [];
    IO.on('keypress', function(key) {
        $scope.$broadcast('keypress', key);
    });

    IO.on('set:state', function(state) {
        $scope.state = angular.extend($scope.state, state);
    });

    IO.on('set:state:base', function(state) {
        $scope.state = state;
    });

    IO.on('join', function(userID) {
        $scope.userID = userID;
    });

    IO.on('mistake', function(userID) {
        $scope.mistakePerson = userID;
        $timeout(function() {
            $scope.mistakePerson = undefined;
        }, 150);
    });

    IO.on('finish', function(data) {
        $scope.leaderboard = data.leaderboard;
    });

    $scope.$on('ttkeycode', function(e, keyCode) {
        IO.emit('keycode', keyCode);
    });

    $scope.toggleType = function() {
        if ($scope.type === 'words') {
            $scope.type = 'numbers';
        } else {
            $scope.type = 'words';
        }

        IO.emit('change:type', $scope.type);

    };
});
