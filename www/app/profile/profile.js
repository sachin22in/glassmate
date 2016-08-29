(function () {
    'use strict';

    angular.module('starter').controller('ProfileTabCtrl', ['$scope','$state','$rootScope','$ionicHistory', ProfileTabCtrl]);
    

    function ProfileTabCtrl($scope,$state,$rootScope,$ionicHistory) {       
        
        if($rootScope.userDetails){
            $scope.userDetails = $rootScope.userDetails;
          }else{
            $state.go('login');
            return;
          }
        
      $scope.logout = function(){
            $rootScope.userDetails = '';
            localStorage.clear();
            facebookConnectPlugin.logout();
            $state.go('login');
     	};
      $scope.changeProfilePic = function(){
          $state.go('tabs.changePic');
      }
     	$rootScope.$ionicGoBack = function() {
            $ionicHistory.goBack();
        };		
      }
})();