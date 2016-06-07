(function () {
    'use strict';

    app.controller('homeCtrl', ['$scope','httpService','$rootScope','$window','ngDialog','$state', homeCtrl]);

    function homeCtrl($scope, httpService, $rootScope, $window, ngDialog, $state) { 

        if($rootScope.isAllLoaded == false){
            $state.go('landing');
        }
        console.log($rootScope.loginResponse);
        if($rootScope.loginResponse){
           $scope.attemptsValue =  $rootScope.loginResponse.attempts_left;
        }else{
            //$state.go('landing');   
        }

        $scope.setHeight = function(){
        	var ratio = $('.homeContainer').outerWidth()/1024;
        	$('.homeContainer').height(ratio* 768);

            var heightDiff = $(window).height() - $('.homeContainer').height() - 41;
            var heightDiffTop = heightDiff/2;
            if(heightDiff > 0){
                $('.homeContainer').css({'margin-top': heightDiffTop + 'px'});
            }
        }
        $scope.setHeight();	

        $scope.addDigit = function(digit){
            var value = $('.codeValue').html();
            value = value.slice(0, -1);
            if(value.length >=6){
                return false;
            }
            value = value + digit + '_';
            $('.codeValue').html(value);
        }
        $scope.validateCode = function(){
            var value = $('.codeValue').html();
            value = value.slice(0, -1);
            
            if(value.length < 6){
                $scope.openRequiredCodeModel();
                return false;
            }
            var obj = {
                "guess": value,
            }
            /*httpService.makecall($rootScope.baseUrl+ '/participants', 'POST', obj).then(function(response){
                console.log('++++++++++participants++++++++');
                console.log(response);
                $scope.attemptsValue--;
                if(response.data.is_winner){
                    $rootScope.correctCode = value;
                    $state.go('tab.openDoor');
                }else{
                    $scope.openInvalidModel();
                }
            }, 
            function(error){
                alert("Connection Error. Please Check Network Connection.");
                console.log(error);
            });*/

            if(value.length < 6){
                $scope.openInvalidModel();
                return false;
            }
            if(value == '999999'){
                $scope.openYouWonModel();
                return false;
            }
            if(value == '888888'){
                $rootScope.correctCode = value;
                $state.go('tab.openDoor');
                return false;
            }
            $scope.openInvalidModel();

        }
        $scope.openPrizeDetailPopup = function(){
            $scope.prizeDetailModel = ngDialog.open({ template: 'views/prizeDetailModel.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                showClose: false,
                closeByDocument: false
            })
        }
        $scope.openInvalidModel = function(){
            $scope.invalidCodeModel = ngDialog.open({ template: 'views/invalidCodeModel.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                showClose: false,
                closeByDocument: false
            })
        }
        $scope.openYouWonModel = function(){
            $scope.youWonModel = ngDialog.open({ template: 'views/youWonModel.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                showClose: false,
                closeByDocument: false
            })
        }
        $scope.openRequiredCodeModel = function(){
            $scope.requiredCodeModel = ngDialog.open({ template: 'views/invalidRequiredModel.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                showClose: false,
                closeByDocument: false
            })
        }
        $scope.closeRequiredCodeModel = function(){
            $scope.requiredCodeModel.close();
        }
        $scope.closeInvalidModel = function(){
            $scope.invalidCodeModel.close();
        }
        $scope.closeYouWonModel = function(){
            $scope.youWonModel.close();
        }
        $scope.closePrizeDetailModel = function(){
            $scope.prizeDetailModel.close();
        }
        $scope.clearDigit = function(flag){

            if(flag == 'all'){
                $('.codeValue').html('_');
                return false;
            }
            var value = $('.codeValue').html();
            value = value.slice(0, -2);
            
            value = value + '_';
            $('.codeValue').html(value);
        }

        angular.element($window).bind('resize', function(){
        	$scope.setHeight();	
        })
    }
})();