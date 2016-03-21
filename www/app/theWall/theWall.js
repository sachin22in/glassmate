
(function () {
    'use strict';

    angular.module('starter').controller('theWallCtrl', ['$scope','$ionicModal','$http','$rootScope', 'httpService', theWallCtrl]);

    function theWallCtrl($scope,$ionicModal, $http, $rootScope, httpService) {
      //console.log($rootScope.baseUrl);
      $scope.catOfPost = 'Cat001';
      $scope.newpost = {};
      $ionicModal.fromTemplateUrl('app/theWall/updateWall.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.modal = modal;
      });       
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $scope.closePostDetailModal = function(){
        $scope.postModal.hide();  
      }
      $ionicModal.fromTemplateUrl('app/theWall/postDetail.html', {
      scope: $scope,
      animation: 'slide-in-up '
      }).then(function(postModal) { 
          $scope.postModal = postModal;
      });
      $scope.openPostDetailModel = function(){
          $scope.postModal.show();  
      }


      $scope.postData = function(){
        console.log($scope.newpost.postDisc);
        /*$http({
            url: $rootScope.baseUrl + 'newPost' + '/' + $scope.newpost.postDisc + '/' + 'bhopal' + '/' + 'U00000032' + '/' + $scope.catOfPost,
            method: "GET",
        }).success(function(response){
            console.log(response);
            $scope.modal.hide();
            //$scope.showPosts = response.InitialWallResult;
            
        }).error(function(error){
             console.log(error);
             alert("error");l
        });*/
      }
      $scope.checkLikedByMe = function(likeByString){
        if(likeByString.search("U00000032") == -1){
          return false;
        }else{
          return true;
        };
      }
      $scope.likeThisPost = function(post){
        console.log(post);
            $http({
                url: $rootScope.baseUrl + 'likeBy' + '/' + post.commentId + '/' + 'U00000032',
                method: "GET",
            }).success(function(response){
                console.log(response);
                post.likeCount = response.likeByResult.likeCount;
                post.likeBy = response.likeByResult.likeBy;
            }).error(function(error){
                 console.log(error);
                 alert("error");l
            });
      }
      $scope.loadPost = function(){
            $http({
                url: $rootScope.baseUrl + 'InitialWall' + '/' + 'rahul12@gmail.com' + '/' + 'u4d3DMykMu',
                method: "GET",
            }).success(function(response){
                console.log(response);
                $scope.showPosts = response.InitialWallResult;
                
            }).error(function(error){
                 console.log(error);
                 alert("error");l
            });

      };
      $scope.selectResto = function(resto){
          var selectedResto = resto;
          $scope.restaurants = [];
          $scope.newpost.place = resto.restaurant.name + ' - ' + resto.restaurant.location.locality;
          console.log(resto);
      }
      $scope.searchPlace = function(){
        //console.log($scope.newpost.place);
         var payload = {
            query : $scope.newpost.place,
            entity_id : 5,
            entity_type : 'city'
         }
         //console.log($rootScope.baseUrl);
          httpService.makecall($rootScope.baseUrl+ '/searchPlace', 'POST', payload).then(function(response){
            //console.log(response.data.restaurants);
            $scope.restaurants = response.data.restaurants;
          }, 
          function(error){
            console.log(error);
          });
      };
      $scope.dates = [];
      var i = 0;
      var tempDate = new Date();
      //$scope.selectedDate = angular.copy(tempDate);
      do{
        $scope.dates[i] = angular.copy(tempDate);
        tempDate.setDate(tempDate.getDate() + 1);
        i++;
      }while(i<14);
      console.log($scope.dates);
      //$scope.searchPlace();
      $scope.selectedDate = $scope.dates[0];
      $scope.selectDate = function(date){
        $scope.selectedDate = date;
      }

      $scope.datepickerObject = {
        titleLabel: 'Date of Birth', //Optional
        todayLabel: 'Today', //Optional
        closeLabel: 'Close', //Optional
        setLabel: 'Set', //Optional
        errorMsgLabel : 'Please select time.', //Optional
        setButtonType : 'button-assertive', //Optional
        modalHeaderColor:'bar-positive', //Optional
        modalFooterColor:'bar-positive', //Optional
        templateType:'popup', //Optional
        mondayFirst: true, //Optional
        from: new Date(2014, 5, 1), //Optional
        to: new Date(2016, 7, 1), //Optional
        callback: function (val) { //Optional
          //datePickerCallback(val);
          $scope.interestedDate = val;
        }
      };
      $scope.slider = {
        min: 10,
        max: 20,
        showTicksValues: true,
        options: {
          floor: 0,
          ceil: 24
        }
      };
      $scope.loadPost();   
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
