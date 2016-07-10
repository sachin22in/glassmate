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
            $state.go('landing');   
        }
        $('.rotateDoorimg').show(); 
        $('.dialimg').show();

        $scope.setHeight = function(){
            $('.homeContainer').width('100%');
            var ratio = $('.homeContainer').outerWidth()/1024;
            
            if(((ratio* 768) + $('.footer').height()) <  $(window).height() ){
                $('.homeContainer').height(ratio* 768);
                var heightDiff = $(window).height() - $('.homeContainer').height() - $('.footer').height();
                var heightDiffTop = heightDiff/2;
                if(heightDiff > 0){
                    $('.homeContainer').css({'margin-top': heightDiffTop + 'px'});
                }
            }else{
                var containerHeight = $(window).height() - $('.footer').height()-30;
                var containerWidth = (containerHeight*1024)/768;
                $('.homeContainer').height(containerHeight);
                $('.homeContainer').outerWidth(containerWidth);
                $('.homeContainer').css({'margin-top': '10px'});

            }

            $('.mainContainer').removeClass('max700');            
            $('.mainContainer').removeClass('max620');            
            $('.mainContainer').removeClass('max520');            
            $('.mainContainer').removeClass('max400');            

                var containerWidth =  $('.homeContainer').outerWidth();
                if(containerWidth < 700){
                    $('.mainContainer').addClass('max700');
                }
                if(containerWidth < 620){
                    $('.mainContainer').addClass('max620');
                }
                if(containerWidth < 520){
                    $('.mainContainer').addClass('max520');
                }
                if(containerWidth < 400){
                    $('.mainContainer').addClass('max400');
                }
        }
        
        $scope.setHeight();	

        $scope.addDigit = function(digit){
            var value = $('.codeValue').html();
            if(value.slice(value.length-1,value.length) == '_'){
                value = value.slice(0, -1);    
            }
            if(value.length >= $rootScope.loginResponse.digits){
                //value = value.slice(0, -1);
                $('.codeValue').html(value);
                return false;
            }
            if (value.length != ($rootScope.loginResponse.digits-1)) {
                value = value + digit + '_';    
            }else{
                value = value + digit ;
            }
            

            $('.codeValue').html(value);
        }
        $scope.animateRotate = function(d, callback){
            
               var elem = $(".rotateDoorimg");

            $({deg: 0}).animate({deg: d}, {
                duration: 3000,
                step: function(now){
                    elem.css({
                         transform: "rotate(" + now + "deg)"
                    });
                },
                complete: function(){
                    callback();
                }
            });
        }
        $scope.myPanel = false;
        $scope.validateCode = function(){
            
            var value = $('.codeValue').html();
            //value = value.slice(0, -1);
            
            if(value.length < $rootScope.loginResponse.digits){
                $scope.openRequiredCodeModel();
                return false;
            }
            var obj = {};
            if($rootScope.userDetails){
                obj = $rootScope.userDetails;
            }
            
            obj.guess = value;
            console.log(obj);

            httpService.makecall($rootScope.baseUrl+ '/participants', 'POST', obj).then(function(response){
                console.log('++++++++++participants++++++++');
                console.log(response);
                
                $scope.myPanel = false;
                $scope.attemptsValue--;
                

                if(response.data.is_winner){
                    $rootScope.correctCode = value;
                    $state.go('tab.openDoor');
                }else{
                    $('.codeValue').html('_');
                    $scope.openInvalidModel();
                }
                // if(value == '999999'){
                //     $('.codeValue').html('_');
                //     $scope.openYouWonModel();
                //     return false;
                // }
                // if(value == '888888'){
                //     $rootScope.correctCode = value;
                //     $state.go('tab.openDoor');
                //     return false;
                // }
                // $('.codeValue').html('_');
                // $scope.openInvalidModel();

            }, 
            function(error){
                alert("Connection Error. Please Check Network Connection.");
                console.log(error);
                $scope.myPanel = false;
            });

            

            $scope.myPanel = true;
            $scope.animateRotate(360, function(){
                // $scope.myPanel = false;
                // if(value == '999999'){
                // 	$('.codeValue').html('_');
                //     $scope.openYouWonModel();
                //     return false;
                // }
                // if(value == '888888'){
                //     $rootScope.correctCode = value;
                //     $state.go('tab.openDoor');
                //     return false;
                // }
                // $('.codeValue').html('_');
                // $scope.openInvalidModel();
            });
            

            

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
            if(value.slice(value.length-1,value.length) == '_'){
                value = value.slice(0, -2);    
            }else{
                value = value.slice(0, -1);
            }
            
            
            value = value + '_';
            $('.codeValue').html(value);
        }

        angular.element($window).bind('resize', function(){
        	$scope.setHeight();	
        })
    }
})();