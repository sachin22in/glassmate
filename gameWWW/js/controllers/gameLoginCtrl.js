(function () {
    'use strict';
    app.controller('gameLoginCtrl', ['$scope','httpService','$rootScope','preloader','$state','$window', gameLoginCtrl]);

    function gameLoginCtrl($scope, httpService, $rootScope, preloader, $state, $window) { 

        $scope.user = {};
        // if($rootScope.loginResponse){
        //    $scope.user =  $rootScope.userDetails;
        // }else{
        //     $state.go('landing');
        // }

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
            $('.footer').outerWidth($('.homeContainer').outerWidth());
        }
        $scope.submitForm = function(){
            console.log($scope.loginDetailsForm);
            if($scope.loginDetailsForm.$valid){
                console.log($scope.user);
                $('.submitImg').removeClass('submitButton');
                $('.submitImg').addClass('submitButtonActive');
                var gameLoginDetails = {
                    "game_number": $scope.user.gameid,
                    "password": $scope.user.gamePass
                }
                httpService.makecall($rootScope.baseUrl+ '/games/login', 'POST', gameLoginDetails).then(function(response){
                    // console.log('++++++++++login++++++++');
                    // console.log(response);
                    // console.log(response.data.registration_fields);
                    
                    if(response.data.is_ended == false && response.data.is_started == true && response.data.is_launched == true){
                        console.log(response.data);
                        $rootScope.loginResponse = response.data;  
                        $state.go('landing');  
                    }else{
                        alert("Game is not Active.");
                    }

                    
                }, 
                function(error){
                    alert("Connection Error. Please Check Network Connection.");
                    console.log(error);
                });

               // $state.go('tab.home');
                
            }else{
                alert("Please Enter Required Details");
            }
            
            
        }
               
       $scope.setHeight(); 
        //$rootScope.loginResponse
        //$scope.loginFormField = $rootScope.loginResponse.registration_fields;
        //console.log($scope.loginFormField);
        angular.element($window).bind('resize', function(){
            $scope.setHeight(); 
        })
    }
})();