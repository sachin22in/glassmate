
(function () {
    'use strict';

    angular.module('starter').controller('profileNavCtrl', ['$scope','$state','$http','$rootScope', profileNavCtrl]);

    function profileNavCtrl($scope,$state,$http,$rootScope) {       
        $scope.navGoTo = function(goto){
            $state.go(goto);
        }

	}
    
})();