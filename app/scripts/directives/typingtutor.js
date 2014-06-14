'use strict';

angular.module('tpttApp')
.directive('typingTutor', function () {
    return {
        templateUrl: 'partials/typingtutor.html',
        restrict: 'AE',
        scope: {
            text: '@'
        },
        link: function ($scope, element, attrs) {
            $scope.stats = {
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
            };
            $scope.currentLetterIndex = 0;

            $scope.$watch('text', function() {
                // set up letters array
                $scope.letters = [];
                angular.forEach($scope.text.split(''), function(letter) {
                    $scope.letters.push({
                        text: letter,
                        highlighted: false
                    });
                });

                $scope.startLine();
            });

            $scope.$on('keypress', function(e, key) {
                if ($scope.letters[$scope.currentLetterIndex].text === key) {
                    // success!
                    $scope.letters[$scope.currentLetterIndex].highlighted = true;

                    $scope.currentLetterIndex++;

                    $scope.scoreLetter();

                    if ($scope.currentLetterIndex >= $scope.text.length) {
                        // finish line, yay!
                        $scope.finishLine();
                    }
                } else {
                    $scope.handleMistake();
                }
            });

            angular.element(document).keydown(function(e){
                $scope.$emit('ttkeycode', e.keyCode);
            });

            $scope.$watch('ttinput', function() {
                $scope.ttinput = '';
            });

            $scope.startLine = function() {
                // start timer, reset local errors
                $scope.startTime = (new Date()).getTime()/1000;
            };

            $scope.scoreLetter = function() {
                // add points
            };

            $scope.handleMistake = function() {
                // handle error by punishing users
                angular.forEach($scope.letters, function(letter) {
                    letter.highlighted = false;
                });

                $scope.currentLetterIndex = 0;
            };

            $scope.finishLine = function() {
                // stop time, add up things
                $scope.stopTime = (new Date()).getTime()/1000;
                var duration = $scope.stopTime = $scope.startTime;

            };

        }
    };
});
