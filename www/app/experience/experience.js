
(function () {
    'use strict';

    angular.module('starter').controller('experienceCtrl', ['$scope','$state', '$ionicModal','$http','$rootScope', 'httpService', '$location', '$ionicScrollDelegate','$ionicPopup','$timeout', experienceCtrl]);

    function experienceCtrl($scope, $state, $ionicModal, $http, $rootScope, httpService, $location, $ionicScrollDelegate, $ionicPopup, $timeout) {
      //console.log($rootScope.baseUrl);
      if($rootScope.userDetails){
        $scope.userDetails = $rootScope.userDetails;
      }else{
        $state.go('login');
        return;
      }
      $scope.placeChnage = false;
      $scope.catOfPost = 'Cat001';
      $scope.addExperience = {};
      $scope.comment = {};
      $ionicModal.fromTemplateUrl('app/experience/addExperience.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.modal = modal;
      });   
          
      $scope.openModal = function() {
        $scope.addExperience = {};
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $scope.closePostDetailModal = function(){
        $scope.postModal.hide();  
      }
      
      
      
      $scope.openPostDetailModel = function(postDetail){
        console.log(postDetail);
        if(($scope.userDetails.userID != postDetail.postBy)){
          if((postDetail.isLiked != $scope.userDetails.userID)){
            return;
          }else{
            if(!postDetail.likeApproved){
              return;  
            }
          }
        }

          $scope.postModelDetail = postDetail;
          console.log($scope.postModelDetail); 
          $ionicModal.fromTemplateUrl('app/theWall/postDetail.html', {
            scope: $scope,
            animation: 'slide-in-up '
            }).then(function(postModal) { 

                $scope.postModal = postModal;
                console.log($scope.postModal);
                $scope.postModal.show(); 
                var obj = {};
                obj.postId = $scope.postModelDetail.postId;
                httpService.makecall($rootScope.baseUrl+ '/getCheersByPost', 'POST', obj).then(function(response){
                  console.log('++++++++++getCheersByPost++++++++');
                  console.log(response);
                  
                  if (response.data.statusCode == 'error') {
                      alert("Some Error");
                  };
                  $scope.likeBy = response.data;
                  
                }, 
                function(error){
                  alert("Connection Error. Please Check Network Connection.");
                  console.log(error);
                });
                httpService.makecall($rootScope.baseUrl+ '/getCommentsByPost', 'POST', obj).then(function(response){
                  console.log('++++++++++getCommentsByPost++++++++');
                  console.log(response);
                  
                  if (response.data.statusCode == 'error') {
                      alert("Some Error");
                  };
                  $scope.commentsForPost = response.data;

                }, 
                function(error){
                  alert("Connection Error. Please Check Network Connection.");
                  console.log(error);
                });
            });
          
      }
      
      $scope.postData = function(){
        console.log($scope.addExperience);
        if(!$scope.addExperience.expDetail){
          alert("Please add experience detail.");
          return;
        }
        
        
        $scope.addExperience.expBy = $rootScope.userDetails.userID;
        console.log($scope.addExperience);
          
        httpService.makecall($rootScope.baseUrl+ '/addExperience', 'POST', $scope.addExperience).then(function(response){
            console.log('++++++++++addExperience++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                $scope.addExperience.expId = response.data.insertId;
                $scope.addExperience.name = $scope.userDetails.name;
                $scope.addExperience.picPath = $scope.userDetails.picPath;
                $scope.showPosts.push($scope.addExperience);
                $scope.modal.hide();
            };
            if (response.data.statusCode == 'error') {
                alert("Some Error");
            };
            
          }, 
          function(error){
            alert("Connection Error. Please Check Network Connection.");
            console.log(error);
          });
        
      }
      $scope.loadPost = function(){
            var obj = {
              'userId': $rootScope.userDetails.userID
            }
            httpService.makecall($rootScope.baseUrl+ '/getExperience', 'POST', obj).then(function(response){
              console.log('++++++++++getExperience++++++++');
              console.log(response);
              $scope.showPosts = response.data;
            }, 
            function(error){
              alert("Connection Error. Please Check Network Connection.");
              console.log(error);
            });

      };
      
      $scope.loadPost(); 


      $scope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams){
        
        if($scope.modal){
          if($scope.modal.isShown()){
            $scope.modal.hide();
            event.preventDefault();  
          }  
        }
          
      });
    }

    Date.prototype.getDayText = function(){
        var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        return days[this.getDay()];
    }
    Date.prototype.getMonthText = function(){
        var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return months[this.getMonth()];
    }

})();
