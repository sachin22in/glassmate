(function () {
    'use strict';

    angular.module('starter').controller('changePwdCtrl', ['$scope','$state','$rootScope','$ionicHistory','httpService', changePwdCtrl]);
    
    function changePwdCtrl($scope,$state,$rootScope,$ionicHistory, httpService) {       
        
      if($rootScope.userDetails){
        $scope.userDetails = $rootScope.userDetails;
      }else{
        $state.go('login');
        return;
      }
      $scope.pwd={};
      $rootScope.pwdChangeError = false;
      $scope.changePwd = function(changePwdFormCtrl){
            if (changePwdFormCtrl.$invalid) {
            angular.forEach(changePwdFormCtrl.$error, function(field) {
              angular.forEach(field, function(errorField){
                  errorField.$setTouched();
              })
            });
            return;
          };
          if($scope.pwd.confirmPassword != $scope.pwd.password){
            return;
          }
          console.log($scope.pwd);
          
          var dataToSend = angular.copy($scope.pwd);
          delete dataToSend["confirmPassword"];
          dataToSend.userID = $rootScope.userDetails.userID;
          console.log(dataToSend);
          //$state.go('dp');

          httpService.makecall($rootScope.baseUrl+ '/changePwd', 'POST', dataToSend).then(function(response){
            console.log('++++++++++changePwd++++++++');
            console.log(response);
            if (response.data.statusCode == 'success') {
                $rootScope.$windowGoBack();
            };
            if (response.data.statusCode == 'invalidPwd') {
                console.log("invalidPwd");
                $rootScope.pwdChangeError = true;
            };
            if (response.data.statusCode == 'error') {
                alert("Try Again");
            };
          }, 
          function(error){
            console.log(error);
          });

     	};
      $scope.changeProfilePic = function(){
          $state.go('tabs.changePic');
      }
    }
})();