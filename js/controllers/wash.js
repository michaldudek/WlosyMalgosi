(function(ng) {
    'use strict';

    ng.module('WlosyMalgosi')
        .controller('WashCtrl', [
            '$scope', 'washes',
            function($scope, washes) {
                $scope.washes = {};

                $scope.washNow = function() {
                    washes.washNow();
                    $scope.refresh();
                };

                $scope.undoWash = function() {
                    washes.undoWash();
                    $scope.refresh();
                };

                $scope.refresh = function() {
                    var dates = washes.get();
                    $scope.washes.last = dates.last;
                    $scope.washes.previous = dates.previous;
                };

                $scope.washPossible = function() {
                    return true;
                };

                $scope.refresh();
            }
        ]);

})(window.angular);