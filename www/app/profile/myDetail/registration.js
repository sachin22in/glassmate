
(function () {
    'use strict';

    angular.module('starter').controller('myDetailCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService', myDetailCtrl]);

    function myDetailCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService) {  
     $scope.user = {};
     $scope.signupError = false;
     $scope.disableEdit = true;
     //$scope.genderSelect = 'male';
     $scope.user = angular.copy($rootScope.userDetails);
     console.log($scope.user);
      $scope.chnageGender = function(newGender){
          console.log(newGender);
          $scope.user.gender = newGender;
      };
      $scope.enableEdit = function(){
        $scope.disableEdit = false;
      };
     $scope.signup = function(signupFormCtrl){
      
          if (signupFormCtrl.$invalid) {
            angular.forEach(signupFormCtrl.$error, function(field) {
              angular.forEach(field, function(errorField){
                  errorField.$setTouched();
              })
            });
            return;
          };
          
          
          console.log($scope.user);
         
          var dataToSend = {};
          dataToSend.dob = $scope.user.dob;
          dataToSend.email = $scope.user.email;
          dataToSend.gender = $scope.user.gender;
          dataToSend.mobile = $scope.user.mobile;
          dataToSend.name = $scope.user.name;
          dataToSend.userID = $scope.user.userID;
          //$state.go('dp');

          httpService.makecall($rootScope.baseUrl+ '/updateDetails', 'POST', dataToSend).then(function(response){
            console.log('++++++++++updateDetails++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {

                $rootScope.userDetails = $scope.user;
                console.log($rootScope.userDetails);
                $scope.disableEdit = true;
            };
            if (response.data.statusCode == 'error') {
                $scope.signupError = true;
                //alert("Already Registered");
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

     
     $scope.$ionicGoBack = function() {
         $state.go('tabs.profile');
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

      $scope.datepickerObject.inputDate = new Date($scope.user.dob) || new Date();
      console.log($scope.datepickerObject.inputDate);
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