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
            });

            $scope.$on('keypress', function(e, key) {
                if ($scope.letters[$scope.currentLetterIndex].text === key) {
                    // success!
                    $scope.letters[$scope.currentLetterIndex].highlighted = true;

                    $scope.currentLetterIndex++;

                    if ($scope.currentLetterIndex >= $scope.text.length) {
                        // finish line, yay!
                        $scope.finishLine();
                    }
                }
            });

            $scope.finishLine = function() {

            };

            angular.element(document).keydown(function(e){
                $scope.$emit('ttkeycode', e.keyCode);
            });

        }
    };
});
