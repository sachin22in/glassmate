(function () {
    'use strict';

    angular.module('starter').controller('ProfileTabCtrl', ['$scope','$state','$rootScope','$ionicHistory', ProfileTabCtrl]);
    

    function ProfileTabCtrl($scope,$state,$rootScope,$ionicHistory) {       
        //alert("Profile");
        $scope.showUserTestimonials = false;
        $scope.showphotos = function(){
            $scope.showUserTestimonials = false;
        }
        $scope.showtestimonials = function(){
            $scope.showUserTestimonials = true;
        }

        $scope.goTOFollowerPage = function(){
            $state.go('tabs.followers');
        }
        $scope.goToPublicProfile = function(){
            $state.go('tabs.publicProfile');
        }
        $scope.login = function(){
                alert();
     	      //$state.go('tabs.home');
     	};
     	$rootScope.$ionicGoBack = function() {
            $ionicHistory.goBack();
        };		
      }
})();