
(function () {
    'use strict';

    angular.module('starter').controller('AuthCtrl', ['$scope','$state','$rootScope','$ionicHistory','httpService', AuthCtrl]);

    function AuthCtrl($scope,$state,$rootScope,$ionicHistory,httpService ) {       
     
     $scope.login = function(){
       // console.log($scope.data.username + '' + $scope.data.password);
       if(!$scope.data.username){
        return;
       }
       if(!$scope.data.password){
        return;
       }
       httpService.makecall($rootScope.baseUrl+ '/login', 'POST', $scope.data).then(function(response){
        console.log(response);
        if (response.data.statusCode == 'success') {
            $rootScope.userDetails = response.data;
            $state.go('tabs.theWall');
        };
        if (response.data.statusCode == 'userNotFound') {
            alert("User id not found");
        };
        if (response.data.statusCode == 'invalidPass') {
            alert("Invalid Password");
        };
      }, 
      function(error){
        alert("Connection Error. Please Check Network Connection.");
        console.log(error);
      });
      // $state.go('tabs.theWall');


        // $http({
        //         url: $rootScope.baseUrl + 'loginVerification' + '/' + $scope.data.username + '/' + $scope.data.password,
        //         method: "GET",
        //     }).success(function(response){
        //         console.log(response);
        //         if(response.loginVerificationResult.EmailId.length > 0){
        //             $rootScope.personalInfo = response.loginVerificationResult;
        //             console.log($rootScope.personalInfo);
        //             $state.go('tabs.home');
        //         }
        //     }).error(function(error){
        //          console.log(error);
        //     });
     	//$state.go('tabs.home');
     
     };

      $scope.goTologin = function(){
     	$state.go('login');
     }; 


      $scope.goTosignup = function(){
     	$state.go('signup');
     }; 

     $scope.skipBanners = function(){
        $state.go('loginIntro');
     };  

     $rootScope.$ionicGoBack = function() {
        $ionicHistory.goBack();
    
        };
    }
})();