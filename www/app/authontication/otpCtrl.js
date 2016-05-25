
(function () {
    'use strict';

    angular.module('starter').controller('otpCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService', otpCtrl]);

    function otpCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService) {  
     
     $scope.sendOTP = function(){
 		var URL = 'http://login.smsgatewayhub.com/RestAPI/MT.svc/mt';
 		var data = {"Account":{"User":"Glassmates","Password":"fiesta86","SenderId":"WEBSMS","Channel":"2","DCS":"0","SchedTi me":null,"GroupId":null},"Messages":[{"Number":"919558515827","Text":"Hello test message % ignore123 %"}]};

 		$http({
	        method: 'POST',
	        url: URL,
	        headers: {
			   'Content-Type': undefined
			},
	        crossDomain: true,
	        data: data
	    })
	    .then(function(response){
            
        }, 
        function(error){
            console.log(error);
        });

     }
     $scope.generateOTP = function(){
        return Math.floor(Math.random()*90000) + 10000;
     }
  
    }

})();