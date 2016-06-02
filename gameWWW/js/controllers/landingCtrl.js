(function () {
    'use strict';

    app.controller('landingCtrl', ['$scope','httpService','$rootScope','preloader','$state', landingCtrl]);

    function landingCtrl($scope, httpService, $rootScope, preloader, $state) {       
        $scope.imageLocations= [
        	'img/client_logo_bg.png',
        	'img/door_closed.png',
        	'img/door_open_01.png',
        	'img/door_open_02.png',
        	'img/door_open_03.png',
        	'img/door_open_04.png',
        	'img/door_open_05.png',
        	'img/door_open_06.png',
        	'img/door_open_07.png',
        	'img/door_open_08.png',
        	'img/door_open_09.png',
        	'img/door_open_10.png',
        	'img/door_open_11.png',
        	'img/door_open_12.png',
        	'img/door_open_13.png',
        	'img/door_open_14.png'

        ];
        preloader.preloadImages($scope.imageLocations).then(function(){
        	console.log("success");
        	$rootScope.isAllLoaded = true;
        	$state.go('tab.home');
        },function(){
        	console.log('error');
        })
    }
})();