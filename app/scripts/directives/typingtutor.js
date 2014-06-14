'use strict';

angular.module('tpttApp')
.directive('typingTutor', function () {
    return {
        templateUrl: 'partials/typingtutor.html',
        restrict: 'AE',
        scope: {
            state: '='
        },
        link: function ($scope) {


            angular.element(document).keydown(function(e){
                $scope.$emit('ttkeycode', e.keyCode);
            });

            $scope.$watch('ttinput', function() {
                $scope.ttinput = '';
            });

        }
    };
});
