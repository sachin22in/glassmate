
(function () {
    'use strict';

    angular.module('starter').controller('dpUploadCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService', dpUploadCtrl]);

    function dpUploadCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService) {  

      $scope.myImage='';
      $scope.myCroppedImage='';
      $('.dpSpinner').hide();
      $scope.loadDone = function(){
        $('.dpSpinner').hide();
      }
      $scope.loadStart = function(){
        $('.dpSpinner').show();
      }
      $scope.chooseFile = function(){
        $('#fileInput').click();
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