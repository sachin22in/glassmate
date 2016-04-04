
(function () {
    'use strict';

    angular.module('starter').controller('theWallCtrl', ['$scope','$state', '$ionicModal','$http','$rootScope', 'httpService', '$location', '$ionicScrollDelegate','$ionicPopup','$timeout', theWallCtrl]);

    function theWallCtrl($scope, $state, $ionicModal, $http, $rootScope, httpService, $location, $ionicScrollDelegate, $ionicPopup, $timeout) {
      //console.log($rootScope.baseUrl);
      if($rootScope.userDetails){
        $scope.userDetails = $rootScope.userDetails;
      }else{
        $state.go('login');
        return;
      }

      $scope.catOfPost = 'Cat001';
      $scope.newpost = {};
      $scope.comment = {};
      $ionicModal.fromTemplateUrl('app/theWall/updateWall.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.modal = modal;
      });       
      $scope.openModal = function() {
        $scope.newpost = {};
        $scope.newpost.date = $scope.dates[0];
        $scope.newpost.startTime = 10;
        $scope.newpost.endTime = 20;
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $scope.closePostDetailModal = function(){
        $scope.postModal.hide();  
      }
      $scope.closeCheersPopup = function(){
        //alert();
        $scope.alertPopup.close();
      }
      $scope.showCheersPopup = function(post) {
        if(post.isLiked == $scope.userDetails.userID){
          return;
        }

        $scope.cheerModelPost = post;
        $scope.likeBy = '';
        var obj = {};
        obj.postId = post.postId;
        httpService.makecall($rootScope.baseUrl+ '/getCheersByPost', 'POST', obj).then(function(response){
          console.log('++++++++++getCheersByPost++++++++');
          console.log(response);
          
          if (response.data.statusCode == 'error') {
              alert("Some Error");
          };
          $scope.likeBy = response.data;

        }, 
        function(error){
          console.log(error);
        });
         $scope.alertPopup = $ionicPopup.show({
           templateUrl: 'app/theWall/cheerModel.html',
           cssClass: 'cheersModel',
           scope: $scope
         });

         $scope.alertPopup.then(function(res) {
           console.log('Thank you for not eating my delicious ice cream cone');
           console.log(res);
         });
      };
      $scope.openPostDetailModel = function(postDetail){

          if(postDetail.isLiked != $scope.userDetails.userID){
            return;
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
                  console.log(error);
                });
            });
          
      }
      
      $scope.postData = function(){
        console.log($scope.newpost);
        if($scope.newpost.placePic == undefined){
          alert("Please select place from droupdown");
        }
        
        
        if(!$rootScope.userDetails){
          alert("please Login");
          return;  
        }
        $scope.newpost.postBy = $rootScope.userDetails.userID;
        $scope.newpost.placeId = 9999;
        console.log($scope.newpost);
        httpService.makecall($rootScope.baseUrl+ '/newPost', 'POST', $scope.newpost).then(function(response){
            console.log('++++++++++newPost++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                $scope.newpost.postId = response.data.insertId;
                $scope.newpost.name = $scope.userDetails.name;
                $scope.newpost.picPath = $scope.userDetails.picPath;
                $scope.showPosts.push($scope.newpost);
                $scope.modal.hide();
            };
            if (response.data.statusCode == 'error') {
                alert("Some Error");
            };
            
          }, 
          function(error){
            console.log(error);
          });
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
      $scope.addComments = function(post){
        console.log($scope.comment.newComment);
        if(!$scope.comment.newComment){
          alert("Please Add Comment");
          return;
        }
        var obj = {
          'postId': post.postId,
          'commentBy': $rootScope.userDetails.userID,
          'commentDisc': $scope.comment.newComment
        }

        httpService.makecall($rootScope.baseUrl+ '/addComment', 'POST', obj).then(function(response){
          console.log('++++++++++addComment++++++++');
          console.log(response);
          if (response.data.statusCode == 'success') {
              //$scope.postModelDetail.isLiked = $rootScope.userDetails.userID
              $scope.comment.newComment = '';
              var commentsForPostObj = angular.copy(obj);
              commentsForPostObj.name = $rootScope.userDetails.name;
              commentsForPostObj.picPath = $rootScope.userDetails.picPath;

              $scope.commentsForPost.push(commentsForPostObj);
          };
          if (response.data.statusCode == 'error') {
              alert("Some Error");
          };
          
        }, 
        function(error){
          console.log(error);
        });
      }
      $scope.closeCheersConfirmPopup = function(){
        $scope.cheersConfirmPopup.close();
      }
      $scope.showCheersConfirmPopup = function(){
        $scope.cheersConfirmPopup = $ionicPopup.show({
           templateUrl: 'app/theWall/cheersConfirmModel.html',
           cssClass: 'cheersModel',
           scope: $scope
         });

         $scope.cheersConfirmPopup.then(function(res) {
            console.log(res);
           console.log('Thank you for not eating my delicious ice cream cone');
         });
      };
      $scope.likeThisPost = function(post){
        console.log(post);
        var obj = {
          'postId': post.postId,
          'likeId': $rootScope.userDetails.userID
        }
        httpService.makecall($rootScope.baseUrl+ '/addCheers', 'POST', obj).then(function(response){
          console.log('++++++++++addCheers++++++++');
          console.log(response);
          if (response.data.statusCode == 'success') {
              post.isLiked = $rootScope.userDetails.userID;
              $scope.alertPopup.close();
              post.likeCount = post.likeCount + 1;
              $timeout(function(){
                $scope.showCheersConfirmPopup();  
              },100)
              
          };
          if (response.data.statusCode == 'error') {
              alert("Some Error");
          };
          
        }, 
        function(error){
          console.log(error);
        });

      }
      $scope.loadPost = function(){
            var obj = {
              'userId': $rootScope.userDetails.userID
            }
            httpService.makecall($rootScope.baseUrl+ '/getPosts', 'POST', obj).then(function(response){
              console.log(response);
              $('.defaultSpinner').hide();
              $scope.showPosts = response.data;
            }, 
            function(error){
              $('.defaultSpinner').hide();
              alert("Connection Error. Please Check Network Connection.");
              console.log(error);
            });


      };
      $scope.selectResto = function(resto){
          var selectedResto = resto;
          $scope.restaurants = [];
          $scope.newpost.placeName = resto.restaurant.name + ' - ' + resto.restaurant.location.locality;
          $scope.newpost.placePic = resto.restaurant.featured_image;
          console.log(resto);
      }
      $scope.searchPlace = function(){
        //console.log($scope.newpost.place);

         var payload = {
            query : $scope.newpost.placeName,
            entity_id : 5,
            entity_type : 'city'
         }
         //console.log($rootScope.baseUrl);
          httpService.makecall($rootScope.baseUrl+ '/searchPlace', 'POST', payload).then(function(response){
            //console.log(response.data.restaurants);
            $scope.restaurants = response.data.restaurants;
            var temp = $(window).height();
            $location.hash('sliderDiv');
            $ionicScrollDelegate.anchorScroll(true);
            //$ionicScrollDelegate.scrollBottom();
          }, 
          function(error){
            console.log(error);
          });
      };
      $scope.dates = [];
      var i = 0;
      var tempDate = new Date();
      //$scope.newpost.selectedDate = angular.copy(tempDate);
      do{
        $scope.dates[i] = angular.copy(tempDate);
        tempDate.setDate(tempDate.getDate() + 1);
        i++;
      }while(i<14);
      //$scope.searchPlace();
      $scope.newpost.date = $scope.dates[0];
      $scope.newpost.startTime = 10;
      $scope.newpost.endTime = 20;
      $scope.selectDate = function(date){
        $scope.newpost.date = date;
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
