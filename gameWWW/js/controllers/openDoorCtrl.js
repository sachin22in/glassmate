(function () {
    'use strict';

    app.controller('openDoorCtrl', ['$scope','httpService','$rootScope','$window','$timeout','$interval','$state', openDoorCtrl]);

    function openDoorCtrl($scope, httpService, $rootScope, $window, $timeout, $interval,$state) {
        
        if($rootScope.correctCode){
            $('.codeValue').html($rootScope.correctCode );
        }
        if($rootScope.isAllLoaded == false){
            $state.go('landing');
        }

        if($rootScope.loginResponse){
           $scope.attemptsValue =  $rootScope.loginResponse.attempts_left;
        }else{
            $state.go('landing');   
        }

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

        angular.element($window).bind('resize', function(){
        	$scope.setHeight();	
        })

        $scope.initAnimation = function(){
            var count = 0;
            // $timeout(function() {
            //     $('.doorClose').addClass('door7');
            //     $('.doorWheel').hide();    
            // }, 300);
            $scope.openDoorInterval = $interval(function(){
                
                   
                switch(count) {
                    case 0:
                        count++;
                        break;
                    case 1:
                        $('.rotateDoorimg').hide(); 
                        $('.dialimg').hide(); 
                        $('.doorClose').addClass('door1');
                        count++;
                        break;
                    case 2:
                        $('.doorClose').addClass('door2');
                        count++;
                        break;
                    case 3:
                        $('.doorClose').addClass('door3');
                        count++;
                        break;
                    case 4:
                        $('.doorClose').addClass('door4');
                        count++;
                        break;
                    case 5:
                        $('.doorClose').addClass('door5');
                        count++;
                        break;
                    case 6:
                        $('.doorClose').addClass('door6');
                        count++;
                        break;
                    case 7:
                        $('.doorClose').addClass('door7');
                        count++;
                        break;
                    case 8:
                        $('.doorClose').addClass('door8');
                        count++;
                        break;
                    case 9:
                        $('.doorClose').addClass('door9');
                        count++;
                        break;
                    case 10:
                        $('.doorClose').addClass('door10');
                        count++;
                        //$interval.cancel($scope.openDoorInterval);
                        break;
                    case 11:
                        $('.doorClose').addClass('door11');
                        count++;
                         //$interval.cancel($scope.openDoorInterval);
                        break;
                    case 12:
                        $('.doorClose').addClass('door12');
                        count++;
                         //$interval.cancel($scope.openDoorInterval);
                        break;
                    case 13:
                        $('.doorClose').addClass('door13');
                        count++;
                         $interval.cancel($scope.openDoorInterval);
                        break;
                    
                }
            }, 500)
            //$('.doorClose').addClass('openDoor1');


        }

        $scope.initAnimation();

    }
})();