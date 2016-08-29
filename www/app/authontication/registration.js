
(function () {
    'use strict';

    angular.module('starter').controller('registrationCtrl', ['$scope','$state','$rootScope','$ionicHistory','$http','$location', 'ionicDatePicker', 'httpService','$ionicModal', registrationCtrl]);

    function registrationCtrl($scope,$state,$rootScope,$ionicHistory,$http, $location, ionicDatePicker, httpService, $ionicModal) {  
     $scope.user = {};
     $scope.signupError = false;
     $scope.showDetails = false;
     if($rootScope.socialLoginDetails){
        $scope.user = $rootScope.socialLoginDetails;
     }
     //$scope.genderSelect = 'male';
      $scope.chnageGender = function(newGender){
          console.log(newGender);
          $scope.user.gender = newGender;
      };

     $scope.fbLogin = function(){
        facebookConnectPlugin.login( ["email","public_profile", "user_birthday", "user_location"],
          $scope.loginSucess,
          $scope.loginFail );  
     }

     $scope.loginSucess = function(response){
      
            facebookConnectPlugin.api( "me/?fields=id,name,birthday,email,gender,picture{url},location", ["public_profile"],
                   $scope.detailSucess,
                    $scope.detailFail ); 
    };

    $scope.detailSucess= function (response) { 
         alert(JSON.stringify(response));
         
         
        processSocialData(response); 
    };  
    var processSocialData = function(response){
         alert('in');
          $scope.enabeSocialLogin = true;
         
         $rootScope.socialLoginDetails = {};
         if(response.email){$rootScope.socialLoginDetails.email = response.email;}
         if(response.name){$rootScope.socialLoginDetails.name = response.name;}
         if(response.gender){$rootScope.socialLoginDetails.gender = response.gender;}
         if(response.birthday){$rootScope.socialLoginDetails.location = response.birthday;}
         if(response.location){if(response.location.name){$rootScope.socialLoginDetails.dob = response.location.name;}}
         $state.go('socialDetails');
    }
    $scope.detailFail= function (response) { 
          alert("Oops, Problem With Login. Please Try Again. DetailFail");
          alert(JSON.stringify(response)) 
    }; 
    $scope.loginFail = function(response){
        alert("Oops, Problem With Login. Please Try Again. LoginFail");
            alert(JSON.stringify(response))
     }; 

     $scope.checkSocialStatus = function(){
        console.log('init check');
      httpService.makecall($rootScope.baseUrl+ '/socialCheck', 'POST', $rootScope.socialLoginDetails).then(function(response){
            console.log('++++++++++socialCheck++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                $rootScope.userDetails = response.data;
                localStorage.setItem("glassmatesUserDetails", JSON.stringify(response.data));
                $state.go('tabs.theWall');
            };
            if (response.data.statusCode == 'notFound') {
                $scope.showDetails = true;
            };
          }, 
          function(error){
            console.log(error);
          });
     };
     $scope.socialSignUp = function(){
      //$scope.initOTPModal();
          if ($scope.signupForm.$invalid) {
            angular.forEach($scope.signupForm.$error, function(field) {
              angular.forEach(field, function(errorField){
                  errorField.$setTouched();
              })
            });
            return;
          };
          
          if(!$scope.otpValidate){
            $scope.initOTPModal();
            return;
          }
          console.log($scope.signupForm);
          console.log($scope.user);
         
          
          var dataToSend = angular.copy($scope.user);
          console.log(dataToSend);
          //$state.go('dp');

          httpService.makecall($rootScope.baseUrl+ '/signup', 'POST', dataToSend).then(function(response){
            console.log('++++++++++newPost++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                $rootScope.userDetails = dataToSend;
                $rootScope.userDetails.userID = response.data.insertId;
                localStorage.setItem("glassmatesUserDetails", JSON.stringify($rootScope.userDetails));
                $state.go('tabs.theWall');
            };
            if (response.data.statusCode == 'error') {
                $scope.signupError = true;
                alert("Already Registered");
            };
          }, 
          function(error){
            console.log(error);
          });

     };
     $scope.signup = function(){
      //$scope.initOTPModal();
      //$state.go('socialDetails');
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
                localStorage.setItem("glassmatesUserDetails", JSON.stringify($rootScope.userDetails));
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
      $scope.OTP = '';
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
       
        //var URL = 'http://login.smsgatewayhub.com/RestAPI/MT.svc/mt';
        //var data = {"Account":{"User":"Glassmates","Password":"fiesta86","SenderId":"WEBSMS","Channel":"2","DCS":"0","SchedTi me":null,"GroupId":null},"Messages":[{"Number":"919558515827","Text":"Hello test message % ignore123 %"}]};

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

          $http({
        url: 'https://login.smsgatewayhub.com/smsapi/pushsms.aspx?user=excellent&pwd=222647%20&to='+ $scope.user.mobile +'&sid=WEBSMS&msg=Your GlassMates One Time Password is '+ $scope.OTP +' &fl=0&gwid=2', 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }).success(function(){
         
      });

       }
       $scope.generateOTP = function(){
          var tempOTP = Math.floor(Math.random()*900000) + 10000;
          if(tempOTP.length < 6){
            return $scope.generateOTP();
          }else{
            return tempOTP;
          }
       }
       $scope.validateOTP = function(){
          var otpValue = $('#otp').val().replace('-', '');
          console.log(otpValue);
          if($scope.OTP == otpValue){
            $scope.otpValidate = true;
            $scope.OTPModal.hide();
            if($location.hash() == 'socialDetails'){
              $scope.socialSignUp();
            }else{
              $scope.signup();  
            }
            
          }else{
            alert("Invalid OTP, Please Try again.");
          }
       }
    
       $scope.sendOTP();

    }

    $scope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams){
        
        if($scope.OTPModal){
          if($scope.OTPModal.isShown()){
            //$scope.OTPModal.hide();
            event.preventDefault();  
          }  
        }

      });

  $scope.selectedCountry = {}
  
}

})();