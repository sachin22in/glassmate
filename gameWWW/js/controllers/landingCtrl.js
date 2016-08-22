(function () {
    'use strict';

    app.controller('landingCtrl', ['$scope','httpService','$rootScope','preloader','$state','$window','$interval', landingCtrl]);

    function landingCtrl($scope, httpService, $rootScope, preloader, $state, $window,$interval) { 
        $rootScope.winning =  new Audio('audio/winning.mp3');
        $rootScope.popup =  new Audio('audio/popup.mp3');
        $rootScope.door_open =  new Audio('audio/door_open.mp3');
        $rootScope.digit_enter =  new Audio('audio/digit_enter.mp3');
        $rootScope.all_buttons =  new Audio('audio/all_buttons.mp3');

        $scope.assetsLoaded = false;
        $scope.gameDetailLoaded = true;
        $scope.imageLocations= [
        	'img/client_logo_bg.png',
            'img/clinet_logo_text.png',
        	'img/door_closed.png',
        	'img/door_open_01.png',
        	'img/door_open_02.png',
        	'img/door_open_03.png',
        	'img/door_open_04.png',
        	'img/door_open_05.png',
        	'img/door_open_06.png',
        	'img/door_open_07.png',
        	'img/door_open_08.png',
        	'img/door_open_09.png',
        	'img/door_open_10.png',
        	'img/door_open_11.png',
        	'img/door_open_12.png',
        	'img/door_open_13.png',
        	'img/door_open_14.png',
            'img/door_wheel.png',
            'img/grand_prize_bg.png',
            'img/grand_prize_door_glow.png',
            'img/grand_prize_gold_bar_bg.jpg',
            'img/grand_prize_text_win.png',
            'img/grand_prize_winning_text.png',
            'img/grand_winning_glow.png',
            'img/grand_winnings_numbers.png',
            'img/key_panel_attempts_left_holder.png',
            'img/key_panel_bg.jpg',
            'img/key_panel_btn_prize_list_dis.png',
            'img/key_panel_btn_prize_list_normal.png',
            'img/key_panel_btn_prize_list_select.png',
            'img/key_panel_digit_0_dis.png',
            'img/key_panel_digit_0_normal.png',
            'img/key_panel_digit_0_select.png',
            'img/key_panel_digit_1_dis.png',
            'img/key_panel_digit_1_normal.png',
            'img/key_panel_digit_1_select.png',
            'img/key_panel_digit_2_dis.png',
            'img/key_panel_digit_2_normal.png',
            'img/key_panel_digit_2_select.png',
            'img/key_panel_digit_3_dis.png',
            'img/key_panel_digit_3_normal.png',
            'img/key_panel_digit_3_select.png',
            'img/key_panel_digit_4_dis.png',
            'img/key_panel_digit_4_normal.png',
            'img/key_panel_digit_4_select.png',
            'img/key_panel_digit_5_dis.png',
            'img/key_panel_digit_5_normal.png',
            'img/key_panel_digit_5_select.png',
            'img/key_panel_digit_6_dis.png',
            'img/key_panel_digit_6_normal.png',
            'img/key_panel_digit_6_select.png',
            'img/key_panel_digit_7_dis.png',
            'img/key_panel_digit_7_normal.png',
            'img/key_panel_digit_7_select.png',
            'img/key_panel_digit_8_dis.png',
            'img/key_panel_digit_8_normal.png',
            'img/key_panel_digit_8_select.png',
            'img/key_panel_digit_9_dis.png',
            'img/key_panel_digit_9_normal.png',
            'img/key_panel_digit_9_select.png',
            'img/key_panel_digit_back_dis.png',
            'img/key_panel_digit_back_normal.png',
            'img/key_panel_digit_back_select.png',
            'img/key_panel_digit_bg.png',
            'img/key_panel_digit_delete_dis.png',
            'img/key_panel_digit_delete_normal.png',
            'img/key_panel_digit_delete_select.png',
            'img/key_panel_divider.png',
            'img/key_panel_enter_btn_dis.png',
            'img/key_panel_enter_btu_normal.png',
            'img/key_panel_enter_btu_select.png',
            'img/key_panel_logo.png',
            'img/key_panel_logo_bg.png',
            'img/key_panel_sound_display.png',
            'img/key_panel_text_attempts_left.png',
            'img/key_panel_text_enter_digit.png',
            'img/popup_close_btn.png',
            'img/popup_defult_bg.png',
            'img/popup_text_ancillary_prizes.png',
            'img/popup_text_congratulations.png',
            'img/popup_text_grand_prize.png',
            'img/popup_text_incorrect_code.png',
            'img/popup_text_prize.png',
            'img/popup_text_sorry.png',
            'img/popup_text_you_win.png',
            'img/vault_bg_ipad.png',
            'img/intro_play_btn.png',
            'img/intro_play_btn_press.png',
            'img/fild_box_login.png',
            'img/left_side_bar.jpg',
            'img/right_side_bar.jpg',
            'img/login_bg.jpg',
            'img/login_submit_btn.png',
            'img/login_submit_btn_press.png',
            'img/door_black_dail.png',
            'img/Intro02.jpg',
            'img/Intro03.jpg',
            'img/Intro04.jpg',
            'img/Intro05.jpg',
            'img/Intro06.jpg',
            'img/Intro07.jpg'
        ];
        preloader.preloadImages($scope.imageLocations).then(function(){
        	
            $scope.assetsLoaded = true;
            $scope.playButtonPresent = false;
            if($scope.gameDetailLoaded){
                $rootScope.isAllLoaded = true;
                //$state.go('tab.home');
                $scope.playBtnAnimation();
            }
        	
        },function(){
        	console.log('error');
        });
        if(!$rootScope.loginResponse){
            $state.go('gameLogin');
        }
        // var gameLoginDetails = {
        //     "game_number": $rootScope.GAME_CONFIG.game_number,
        //     "password": $rootScope.GAME_CONFIG.game_password
        // }
        // $rootScope.loginResponse={};
        // $rootScope.loginResponse.attempts_left = 1658;
        // httpService.makecall($rootScope.baseUrl+ '/games/login', 'POST', gameLoginDetails).then(function(response){
        //     // console.log('++++++++++login++++++++');
        //     // console.log(response);
        //     // console.log(response.data.registration_fields);
        //     $scope.gameDetailLoaded = true;
        //     if($scope.assetsLoaded){
        //         $rootScope.isAllLoaded = true;
        //         //$state.go('tab.home');
        //         $scope.playBtnAnimation();
        //     }
        //     $rootScope.loginResponse = response.data;
        // }, 
        // function(error){
        //     alert("Connection Error. Please Check Network Connection.");
        //     console.log(error);
        // });
        $scope.openForm = function(){
            $rootScope.all_buttons.play();
            $('.playImg').removeClass('playButton');
            $('.playImg').addClass('playButtonActive');
            setTimeout(function(){
                $state.go('userDetail');
            },1000)
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
            $('.footer').outerWidth($('.homeContainer').outerWidth());
        }

        $scope.playBtnAnimation = function(){
            var count = 1;
            $rootScope.door_open.play();
            $scope.openDoorInterval = $interval(function(){
                switch(count) {
                    case 0:
                        count++;
                        break;
                    case 1:
                        $('.loading-screen-bg').addClass('introBG02');
                        count++;
                        break;
                    case 2:
                        $('.loading-screen-bg').addClass('introBG03');
                        count++;
                        break;
                    case 3:
                        $('.loading-screen-bg').addClass('introBG04');
                        count++;
                        break;
                    case 4:
                        $('.loading-screen-bg').addClass('introBG05');
                        count++;
                        break;
                    case 5:
                        $('.loading-screen-bg').addClass('introBG06');
                        count++;
                        break;
                    case 6:
                        $('.loading-screen-bg').addClass('introBG07');
                        count++;
                        break;
                    case 7:
                        $('.loadingMsg').hide();
                        $scope.playButtonPresent = true;
                        break;
                }
            }, 500)
        }
        
        $scope.setHeight(); 

        angular.element($window).bind('resize', function(){
            $scope.setHeight(); 
        })
    }
})();