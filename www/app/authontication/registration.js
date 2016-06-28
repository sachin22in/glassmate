
(function () {
    'use strict';

    angular.module('starter').controller('registrationCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService','$ionicModal', registrationCtrl]);

    function registrationCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService, $ionicModal) {  
     $scope.user = {};
     $scope.signupError = false;
     //$scope.genderSelect = 'male';
        $scope.chnageGender = function(newGender){
            console.log(newGender);
            $scope.user.gender = newGender;
        };

     $scope.signup = function(){
      //$scope.initOTPModal();
          if ($scope.signupForm.$invalid) {
            angular.forEach($scope.signupForm.$error, function(field) {
              angular.forEach(field, function(errorField){
                  errorField.$setTouched();
              })
            });
            return;
          };
          if($scope.user.confirmPassword != $scope.user.password){
            return;
          }
          if(!$scope.otpValidate){
            $scope.initOTPModal();
            return;
          }
          console.log($scope.signupForm);
          console.log($scope.user);
         
          
          var dataToSend = angular.copy($scope.user);
          delete dataToSend["confirmPassword"];
          console.log(dataToSend);
          //$state.go('dp');

          httpService.makecall($rootScope.baseUrl+ '/signup', 'POST', dataToSend).then(function(response){
            console.log('++++++++++newPost++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                delete dataToSend["password"];
                $rootScope.userDetails = dataToSend;
                $rootScope.userDetails.userID = response.data.insertId;
                $state.go('dp');
            };
            if (response.data.statusCode == 'error') {
                $scope.signupError = true;
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
         $state.go('landing');
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

    // otp verification code
    $scope.otpValidate = false;
    $scope.closeOtpModel = function(){
      $scope.OTPModal.hide();
    }
    $scope.initOTPModal = function(){

      $scope.otpObj={};

      $ionicModal.fromTemplateUrl('app/authontication/otp.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) { 
          $scope.OTPModal = modal;
          $scope.OTPModal.show();
      });


      $scope.sendOTP = function(){
        $scope.OTP = $scope.generateOTP();
console.log($scope.OTP);
        alert($scope.OTP);
        var URL = 'http://login.smsgatewayhub.com/RestAPI/MT.svc/mt';
        var data = {"Account":{"User":"Glassmates","Password":"fiesta86","SenderId":"WEBSMS","Channel":"2","DCS":"0","SchedTi me":null,"GroupId":null},"Messages":[{"Number":"919558515827","Text":"Hello test message % ignore123 %"}]};

          /*$http({
              method: 'POST',
              url: URL,
              headers: {
             'Content-Type': undefined
          },
              crossDomain: true,
              data: data
          })
          .then(function(response){
              
          }, 
          function(error){
              console.log(error);
          });*/

       }
       $scope.generateOTP = function(){
          return Math.floor(Math.random()*900000) + 10000;
       }
       $scope.validateOTP = function(){
          var otpValue = $('#otp').val().replace('-', '');
          console.log(otpValue);
          if($scope.OTP == otpValue){
            $scope.otpValidate = true;
            $scope.OTPModal.hide();
            $scope.signup();
          }else{
            alert("Invalid OTP, Please Try again.");
          }
       }
    
       $scope.sendOTP();

    }

    $scope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams){
        
        if($scope.OTPModal){
          if($scope.OTPModal.isShown()){
            $scope.OTPModal.hide();
            event.preventDefault();  
          }  
        }

      });

  $scope.selectedCountry = {}
  
}

})();