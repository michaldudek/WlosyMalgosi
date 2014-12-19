(function(ng) {
    'use strict';

    ng.module('WlosyMalgosi')
        .controller('WashCtrl', [
            '$scope', '$timeout', 'washes',
            function($scope, $timeout, washes) {
                $scope.status = 'clean';
                $scope.showButton = true;
                $scope.washes = {};

                $scope.washNow = function() {
                    $scope.showButton = false;
                    // if clean hair then first we need to make them dirty
                    if ($scope.status === 'clean') {
                        $scope.status = 'dirty';
                        return $timeout(function() {
                            $scope.washNow();
                        }, 3500);
                    }

                    $scope.status = 'washing';
                    washes.washNow();
                    $scope.refresh(true);
                    $timeout(function() {
                        $scope.status = 'clean';
                        $scope.showButton = true;
                    }, 5000);
                };

                $scope.undoWash = function() {
                    washes.undoWash();
                    $scope.refresh();
                };

                $scope.refresh = function(noUpdate) {
                    var dates = washes.get();
                    $scope.washes.last = dates.last;
                    $scope.washes.previous = dates.previous;

                    if (!noUpdate) {
                        $scope.updateStatus();
                    }
                };

                $scope.updateStatus = function() {
                    var now = (new Date()).getTime();
                    $scope.status = 
                        !$scope.washes.last
                        || (new Date()).getTime() - $scope.washes.last.getTime() > 1000 * 60 * 60 * 30
                            ? 'dirty'
                            : 'clean';
                };

                $scope.refresh(true);
                $timeout(function() {
                    $scope.updateStatus();
                }, 1000);
            }
        ]);

})(window.angular);