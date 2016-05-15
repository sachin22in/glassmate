(function () {
    'use strict';

    angular.module('starter').controller('NavCtrl', ['$scope','$ionicSideMenuDelegate','httpService','$rootScope', NavCtrl]);

    function NavCtrl($scope,$ionicSideMenuDelegate, httpService, $rootScope) {       
        $scope.showMenu = function () {
          $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.filter ={};
        $scope.likedByFilter = {};

        $scope.dates = [];
        var i = 0;
        var tempDate = new Date();
        do{
          $scope.dates[i] = angular.copy(tempDate);
          tempDate.setDate(tempDate.getDate() + 1);
          i++;
        }while(i<14);
        //$scope.searchPlace();
        //$scope.filter.date = $scope.dates[0];
        $scope.selectDate = function(date){
          $scope.filter.date = date;
        }
        $scope.resetFilter = function(){
          $scope.filter ={}; 
          $scope.likedByFilter = {};
        }
        $scope.applyFilter = function(){
          
          $rootScope.filterOptions = angular.copy($scope.filter);
          if($scope.likedByFilter.me){
            $rootScope.filterOptions.isLiked = $rootScope.userDetails.userID;
          }
           $ionicSideMenuDelegate.toggleRight();
        }

        $scope.getCitys = function(){
          
            httpService.makecall($rootScope.baseUrl+ '/getCitys', 'POST').then(function(response){
              console.log('++++++++++getCitys++++++++');
              console.log(response);
              $scope.postCitys = response.data;

            }, 
            function(error){
              alert("Connection Error. Please Check Network Connection.");
              console.log(error);
            });
        };

        $scope.getCitys();
        // $scope.showRightMenu = function () {
        //   console.log("in");
        //   $ionicSideMenuDelegate.toggleRight();
        //   $ionicSideMenuDelegate.canDragContent([false]);
        // };
    }
})();