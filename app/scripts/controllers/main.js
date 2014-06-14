'use strict';

angular.module('tpttApp')
.controller('MainCtrl', function ($scope, IO) {
    $scope.state = {};
    $scope.lastWinner = 'None';
    IO.on('keypress', function(key) {
        $scope.$broadcast('keypress', key);
    });

    IO.on('set:state', function(state) {
        $scope.state = state;
    });

    IO.on('join', function(userID) {
        $scope.userID = userID;
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
