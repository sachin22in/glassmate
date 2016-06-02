(function () {
    'use strict';

    app.controller('homeCtrl', ['$scope','httpService','$rootScope','$window','ngDialog','$state', homeCtrl]);

    function homeCtrl($scope, httpService, $rootScope, $window, ngDialog, $state) { 

        if($rootScope.isAllLoaded == false){
            $state.go('landing');
        }

        $scope.setHeight = function(){
        	var ratio = $('.homeContainer').outerWidth()/1024;
        	$('.homeContainer').height(ratio* 768);

            var heightDiff = $(window).height() - $('.homeContainer').height();

            if(heightDiff > 0){
                $('.homeContainer').css({'margin-top': heightDiff/2 + 'px'});
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
                $scope.openInvalidModel();
                return false;
            }
            if(value == '999999'){
                $scope.openYouWonModel();
            }
            if(value == '888888'){
                $rootScope.correctCode = value;
                $state.go('tab.openDoor');
            }

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