
(function () {
    'use strict';

    angular.module('starter').controller('changePicCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService', changePicCtrl]);

    function changePicCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService) {  

      $scope.myImage='';
      $scope.myCroppedImage='';
      $('.dpSpinner').hide();
      $scope.loadDone = function(){
        $('.dpSpinner').hide();
        console.log($scope.myCroppedImage);
      }
      $scope.loadStart = function(){
        $('.dpSpinner').show();
      }
      $scope.chooseFile = function(){
        $('#fileInput').click();
      }
      $scope.skip = function(){
        $state.go('tabs.theWall');
      }
      $scope.savePicture = function(){
        $scope.objToSend = {};
        $scope.objToSend.myCroppedImage = $('#cropImg').attr('src');
        $scope.objToSend.userID = $rootScope.userDetails.userID;

        httpService.makecall($rootScope.baseUrl+ '/profilePic', 'POST', $scope.objToSend).then(function(response){
          console.log(response);
          if (response.data.statusCode == 'success') {
              $rootScope.userDetails.picPath = '/ProfilePic/' + $rootScope.userDetails.userID + '.png';
              $state.go('tabs.profile');
          }else{
            alert('error');
          };
          
        }, 
        function(error){
          console.log(error);
        });
      }
      var handleFileSelect=function(evt) {
        console.log(evt);
        $('.dpSpinner').show();
        var file=evt.currentTarget.files[0];
        if(!file){
          $('.dpSpinner').hide();
          return;
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function($scope){
            $scope.myImage=evt.target.result;
            //console.log($scope.myImage);
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);


    }
})();