
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
      $scope.placeChnage = false;
      $scope.catOfPost = 'Cat001';
      $scope.newpost = {};
      $scope.comment = {};
      $scope.postCitys = [];
      $rootScope.filterOptions = {};
      //$scope.filterOptions = {placeCity: 'Delhi'};
      $ionicModal.fromTemplateUrl('app/theWall/updateWall.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.modal = modal;
      });   
      $ionicModal.fromTemplateUrl('app/theWall/notificationModal.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.notificationModal = modal;
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
      $scope.hideDeletCheers = function(){
        console.log("abc");
        $('.profileDP .ion-close').removeClass('showDelete');
      }
      $scope.closeProfilePopup = function(){
        $scope.profilePopup.close();
      }
      
      $scope.checkforProfile = function(postDetail){
        if(($scope.userDetails.userID != postDetail.postBy)){
          if((postDetail.isLiked != $scope.userDetails.userID)){
            $scope.showProfile(postDetail.userID);
          }else{
            if(!postDetail.likeApproved){
              $scope.showProfile(postDetail.userID);  
            }
          }
        }

      }
      $scope.showProfile = function(userId){
          
          $scope.profileDetails = {};
          var obj = {
            'userID': userId
          }
          httpService.makecall($rootScope.baseUrl+ '/gerProfileDetails', 'POST', obj).then(function(response){
            console.log('++++++++++gerProfileDetails++++++++');
            console.log(response);
            var temp = response.data;
                $scope.profileDetails = temp[0];
            if (response.data.statusCode == 'success') {
                
            };
            if (response.data.statusCode == 'error') {
                alert("Some Error");
            };

          }, 
          function(error){
            alert("Connection Error. Please Check Network Connection.");
            console.log(error);
          });


          $scope.profilePopup = $ionicPopup.show({
             templateUrl: 'app/theWall/profilePopup.html',
             cssClass: 'profilePopup',
             scope: $scope
           });

           $scope.profilePopup.then(function(res) {
             console.log('Thank you for not eating my delicious ice cream cone');
           });
        
      };
      $scope.onHold = function(e, postModelDetail){
        if(postModelDetail.postBy == $scope.userDetails.userID){
          navigator.vibrate(100);
          $(e.target).siblings('.ion-close').addClass('showDelete');  
        }
        
        //e.target.addClass('showDelete');
      }
      $scope.closeCheersPopup = function(){
        //alert();
        $scope.alertPopup.close();
      }
      $scope.showCheersPopup = function(post) {
        if(post.postBy == $scope.userDetails.userID){
          return;
        }
        
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
          alert("Connection Error. Please Check Network Connection.");
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
      $scope.deleteCheers = function(postId, likeId){
        var obj = {};
        obj.postId = postId;
        obj.likeId = likeId;
        httpService.makecall($rootScope.baseUrl+ '/deleteCheers', 'POST', obj).then(function(response){
          console.log('++++++++++deleteCheers++++++++');
          console.log(response);
          if (response.data.statusCode == 'success') {
              angular.forEach($scope.likeBy, function(value, key){
                console.log(value);
                if(value.postId == postId && value.likeId == likeId){
                  console.log(key);
                  $scope.likeBy.splice(key, 1);
                  $scope.postModelDetail.likeCount = $scope.postModelDetail.likeCount - 1;
                  if(likeId == $scope.postModelDetail.isLiked){
                    $scope.postModelDetail.isLiked = null;  
                  }
                }
              });
              $scope.closeUnCheersConfirmPopup();
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
        console.log($scope.newpost);
        if($scope.placeChnage){
          alert("Please select place from droupdown");
          return;
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
            alert("Connection Error. Please Check Network Connection.");
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
          alert("Connection Error. Please Check Network Connection.");
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
      $scope.closeUnCheersConfirmPopup = function(){
        $scope.unCheersConfirmPopup.close();
      }
      $scope.showUnCheersConfirmPopup = function(e, postId, likeId){
        $scope.unCheersConfirmPopupData = {};
        $scope.unCheersConfirmPopupData.postId = postId;
        $scope.unCheersConfirmPopupData.likeId = likeId;
        $scope.unCheersConfirmPopup = $ionicPopup.show({
           templateUrl: 'app/theWall/unCheersConfirmModel.html',
           cssClass: 'cheersModel',
           scope: $scope
         });
         $scope.unCheersConfirmPopup.then(function(res) {
            console.log(res);
           console.log('Thank you for not eating my delicious ice cream cone');
         });
         console.log();
         e.stopPropagation();
         e.preventDefault();
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
          alert("Connection Error. Please Check Network Connection.");
          console.log(error);
        });

      };
      $scope.hideNotificationModal = function(){
        $scope.notificationModal.hide();
      }
      $scope.openNotificationModal = function(){
        $scope.notificationModal.show();
      }
      $scope.rejectCheers = function(postId, likeId, index){
        var obj = {
          'postId': postId,
          'likeId': likeId
        }
        httpService.makecall($rootScope.baseUrl+ '/deleteCheers', 'POST', obj).then(function(response){
          console.log('++++++++++deleteCheers++++++++');
          console.log(response);
          $scope.notificationData.splice(index, 1);
        }, 
        function(error){
          alert("Connection Error. Please Check Network Connection.");
          console.log(error);
        });
      }
      $scope.acceptCheers = function(postId, likeId, index){
        var obj = {
          'postId': postId,
          'likeId': likeId
        }
        httpService.makecall($rootScope.baseUrl+ '/acceptCheers', 'POST', obj).then(function(response){
          console.log('++++++++++acceptCheers++++++++');
          console.log(response);
          $scope.notificationData.splice(index, 1);
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
            httpService.makecall($rootScope.baseUrl+ '/getPosts', 'POST', obj).then(function(response){
              console.log('++++++++++getPosts++++++++');
              console.log(response);
              $('.defaultSpinner').hide();
              $scope.showPosts = response.data;
            }, 
            function(error){
              $('.defaultSpinner').hide();
              alert("Connection Error. Please Check Network Connection.");
              console.log(error);
            });


            httpService.makecall($rootScope.baseUrl+ '/getPendingCheersByUser', 'POST', obj).then(function(response){
              console.log('++++++++++getPendingCheersByUser++++++++');
              console.log(response);
              
              if (response.data.statusCode == 'error') {
                  alert("Some Error");
              };
              $scope.notificationData = response.data;

            }, 
            function(error){
              alert("Connection Error. Please Check Network Connection.");
              console.log(error);
            });

      };
      $scope.selectResto = function(resto){
          var selectedResto = resto;
          $scope.restaurants = [];
          $scope.newpost.placeName = resto.restaurant.name + ' - ' + resto.restaurant.location.locality;
          $scope.newpost.placePic = resto.restaurant.featured_image;
          $scope.newpost.placeLat = resto.restaurant.location.latitude;
          $scope.newpost.placeLon = resto.restaurant.location.longitude;
          $scope.newpost.placeCity = resto.restaurant.location.city;
          $scope.placeChnage = false;
          console.log(resto);
      }
      $scope.clearSelectResto = function(){
          // $scope.newpost.placeName = undefined;
          // $scope.newpost.placePic = undefined;
          $scope.placeChnage = true;
      }
      $scope.searchPlace = function(){
        //console.log($scope.newpost.place);
        if(!$rootScope.GPSLocation){
          alert("Sorry We can't get your position");
          return false;
        }
         var payload = {
            query : $scope.newpost.placeName,
            lat : $rootScope.GPSLocation.coords.latitude,
            lon : $rootScope.GPSLocation.coords.longitude
         }
         //console.log($rootScope.baseUrl);
          httpService.makecall($rootScope.baseUrl+ '/searchPlace', 'POST', payload).then(function(response){
            //console.log(response.data.restaurants);
            $scope.restaurants = response.data.restaurants;
            //var temp = $(window).height();
            //$location.hash('sliderDiv');
            //$ionicScrollDelegate.anchorScroll(true);
            //$ionicScrollDelegate.scrollBottom();
          }, 
          function(error){
            alert("Connection Error. Please Check Network Connection.");
              
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


      $scope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams){
        
        if($scope.alertPopup){
            if(!$scope.alertPopup.$$state.status){
                $scope.alertPopup.close();
                event.preventDefault();  
                return false;
            }  
        }
        if($scope.cheersConfirmPopup){
            if(!$scope.cheersConfirmPopup.$$state.status){
                $scope.cheersConfirmPopup.close();
                event.preventDefault();  
                return false;
            }  
        }
        if($scope.unCheersConfirmPopup){
            if(!$scope.unCheersConfirmPopup.$$state.status){
                $scope.unCheersConfirmPopup.close();
                event.preventDefault();  
                return false;
            }  
        }
        if($scope.profilePopup){
            if(!$scope.profilePopup.$$state.status){
                $scope.profilePopup.close();
                event.preventDefault();  
                return false;
            }  
        }        

        if($scope.postModal){
          if($scope.postModal.isShown()){
            $scope.postModal.hide();
            event.preventDefault();  
          }  
        }
        if($scope.notificationModal){
          if($scope.notificationModal.isShown()){
            $scope.notificationModal.hide();
            event.preventDefault();  
          }  
        }
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
