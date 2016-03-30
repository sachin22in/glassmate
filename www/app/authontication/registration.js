
(function () {
    'use strict';

    angular.module('starter').controller('registrationCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService', registrationCtrl]);

    function registrationCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService) {  
     console.log("on");    
     $scope.user = {};
     //$scope.genderSelect = 'male';
        $scope.chnageGender = function(newGender){
            console.log(newGender);
            $scope.user.gender = newGender;
        };

     $scope.signup = function(){
          console.log($scope.user);
          var dataToSend = angular.copy($scope.user);
          delete dataToSend["confirmPassword"];
          console.log(dataToSend);

          httpService.makecall($rootScope.baseUrl+ '/signup', 'POST', dataToSend).then(function(response){
            console.log(response);
            if (response.data.statusCode == 'success') {
                $state.go('tabs.theWall');
            };
            if (response.data.statusCode == 'error') {
                alert("Already Registered");
            };
          }, 
          function(error){
            console.log(error);
          });

          // $http({
          //       url: $rootScope.baseUrl + 'userRegistration' + '/' + $scope.user.name + '/' + $scope.user.email + '/' + $scope.user.password + '/' + $scope.country.dial_code + '/' + $scope.user.city + '/' + $scope.user.city + '/' + $scope.user.nationality + '/' + $scope.user.languages + '/' + $scope.user.dob + '/' + $rootScope.invitationCode, 
          //       method: "GET",
          //   }).success(function(response){
          //       if(response.userRegistrationResult == -1){
          //           $state.go('login');
          //       }
          //   }).error(function(error){
          //        console.log(error);
          //   });
     };

     $scope.goTologin = function(){
     	$state.go('login');
     }; 


      $scope.goTosignup = function(){
     	$state.go('signup');
     }; 

     $scope.skipBanners = function(){
        $state.go('loginIntro');
     };  

     $rootScope.$ionicGoBack = function() {
         $ionicHistory.goBack();
        }; 
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
      to: new Date(), //Optional
      callback: function (val) { //Optional
        console.log(val);
        $scope.user.dob = new Date(val);
        console.log($scope.user.dob);
      }
    };
    $scope.openDatePicker = function(){
      $scope.datepickerObject.inputDate = $scope.user.dob || new Date();
      ionicDatePicker.openDatePicker($scope.datepickerObject);  
    }
    
   /* $scope.datepickerObject = {

       callback: function (val) {  //Mandatory
        datePickerCallback(val);
      }
    };*/

    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
      }
    };


  $scope.selectedCountry = {}
  
}

})();