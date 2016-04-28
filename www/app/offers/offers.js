
(function () {
    'use strict';

    angular.module('starter').controller('offerCtrl', ['$scope','$state', '$ionicModal','$http','$rootScope', 'httpService', '$location', '$ionicScrollDelegate','$ionicPopup','$timeout','ionicDatePicker', offerCtrl]);

    function offerCtrl($scope, $state, $ionicModal, $http, $rootScope, httpService, $location, $ionicScrollDelegate, $ionicPopup, $timeout, ionicDatePicker) {
      //console.log($rootScope.baseUrl);
      if($rootScope.userDetails){
        $scope.userDetails = $rootScope.userDetails;
      }else{
        $state.go('login');
        return;
      }
      $scope.placeChnage = false;
      $scope.catOfPost = 'Cat001';
      $scope.addOffer = {};
      $scope.comment = {};

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
          $scope.addOffer.startDate = new Date(val);
        }
      };
      $scope.datepickerObjectEndDate = {
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
          $scope.addOffer.endDate = new Date(val);
        }
      };

      $ionicModal.fromTemplateUrl('app/offers/addOffers.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.modal = modal;
      });   
          
      $scope.openModal = function() {
        $scope.addOffer = {};
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $scope.closePostDetailModal = function(){
        $scope.postModal.hide();  
      }
      
      $scope.openDatePicker = function(){
        $scope.datepickerObject.inputDate = new Date();
        ionicDatePicker.openDatePicker($scope.datepickerObject);  
      }
      $scope.openDatePickerEndDate = function(){
        $scope.datepickerObjectEndDate.inputDate = new Date();
        ionicDatePicker.openDatePicker($scope.datepickerObjectEndDate);  
      }
      
      $scope.onHoldDelete = function(post){
        if($scope.userDetails.isAdmin == 0){
          return;
        }

        $scope.deletePopup = $ionicPopup.confirm({
           title: 'Delete Offer',
           template: 'Are you sure you want to delete this Offer?'
         });

         $scope.deletePopup.then(function(res) {
           if(res) {
             $scope.deleteOffer(post);
           } else {

             //console.log('You are not sure');
           }
         });

      }
      $scope.deleteOffer = function(post){
        var obj = {
          'offerId': post.offerId
        }
        httpService.makecall($rootScope.baseUrl+ '/deleteOffer', 'POST', obj).then(function(response){
          console.log('++++++++++deleteOffer++++++++');
          console.log(response);
          //$scope.notificationData.splice(index, 1);
        }, 
        function(error){
          alert("Connection Error. Please Check Network Connection.");
          console.log(error);
        });
      }
      $scope.postData = function(){
        console.log($scope.addOffer);
        if(!$scope.addOffer.offerDetail){
          alert("Please add experience detail.");
          return;
        }
        if(!$scope.addOffer.startDate){
          alert("Please select start date.");
          return;
        }
        if(!$scope.addOffer.endDate){
          alert("Please select end date.");
          return;
        }
        if($scope.placeChnage){
          alert("Please select place from droupdown");
          return;
        }
        if(!$scope.addOffer.placeName){
          alert("Please select Place");
          return;
        }
        
        
        $scope.addOffer.offerBy = $rootScope.userDetails.userID;
        console.log($scope.addOffer);
          
        httpService.makecall($rootScope.baseUrl+ '/addOffer', 'POST', $scope.addOffer).then(function(response){
            console.log('++++++++++addOffer++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                $scope.addOffer.offerId = response.data.insertId;
                $scope.addOffer.name = $scope.userDetails.name;
                $scope.addOffer.picPath = $scope.userDetails.picPath;
                $scope.showPosts.push($scope.addOffer);
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
      $scope.selectResto = function(resto){
          var selectedResto = resto;
          $scope.restaurants = [];
          $scope.addOffer.placeName = resto.restaurant.name + ' - ' + resto.restaurant.location.locality;
          $scope.addOffer.placePic = resto.restaurant.featured_image;
          $scope.placeChnage = false;
          console.log(resto);
      }
      $scope.clearSelectResto = function(){
          // $scope.addOffer.placeName = undefined;
          // $scope.addOffer.placePic = undefined;
          $scope.placeChnage = true;
      }
      $scope.searchPlace = function(){
        //console.log($scope.addOffer.place);

         var payload = {
            query : $scope.addOffer.placeName,
            entity_id : 5,
            entity_type : 'city'
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
      $scope.loadPost = function(){
            var obj = {
              'userId': $rootScope.userDetails.userID
            }
            httpService.makecall($rootScope.baseUrl+ '/getOffers', 'POST', obj).then(function(response){
              console.log('++++++++++getOffers++++++++');
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
        if($scope.postModal){
          if($scope.postModal.isShown()){
            $scope.postModal.remove();
            event.preventDefault();  
          }  
        }
        if($scope.notificationModal){
          if($scope.notificationModal.isShown()){
            $scope.notificationModal.remove();
            event.preventDefault();  
          }  
        }
        if($scope.modal){
          if($scope.modal.isShown()){
            $scope.modal.remove();
            event.preventDefault();  
          }  
        }

        if($scope.alertPopup){
            if(!$scope.alertPopup.$$state.status){
                $scope.alertPopup.close();
                event.preventDefault();  
            }  
        }
        if($scope.cheersConfirmPopup){
            if(!$scope.cheersConfirmPopup.$$state.status){
                $scope.cheersConfirmPopup.close();
                event.preventDefault();  
            }  
        }
        if($scope.unCheersConfirmPopup){
            if(!$scope.unCheersConfirmPopup.$$state.status){
                $scope.unCheersConfirmPopup.close();
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
