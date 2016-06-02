(function () {
    'use strict';

    app.controller('openDoorCtrl', ['$scope','httpService','$rootScope','$window','$timeout','$interval', openDoorCtrl]);

    function openDoorCtrl($scope, httpService, $rootScope, $window, $timeout, $interval) {
        
        if($rootScope.correctCode){
            $('.codeValue').html($rootScope.correctCode + '_');
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
                console.log(count);
                   
                switch(count) {
                    case 0:
                        count++;
                        break;
                    case 1:
                        $('.doorWheel').hide(); 
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