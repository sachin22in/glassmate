(function () {
    'use strict';

    app.controller('landingCtrl', ['$scope','httpService','$rootScope','preloader','$state', landingCtrl]);

    function landingCtrl($scope, httpService, $rootScope, preloader, $state) { 
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
        ];
        preloader.preloadImages($scope.imageLocations).then(function(){
        	console.log("success");
            $scope.assetsLoaded = true;
            if($scope.gameDetailLoaded){
                $rootScope.isAllLoaded = true;
                $state.go('tab.home');
            }
        	
        },function(){
        	console.log('error');
        });

        var gameLoginDetails = {
            "game_number": $rootScope.GAME_CONFIG.game_number,
            "password": $rootScope.GAME_CONFIG.game_password
        }
        $rootScope.loginResponse={};
        $rootScope.loginResponse.attempts_left = 1658;
       /* httpService.makecall($rootScope.baseUrl+ '/games/login', 'POST', gameLoginDetails).then(function(response){
            console.log('++++++++++login++++++++');
            console.log(response);
            $scope.gameDetailLoaded = true;
            if($scope.assetsLoaded){
                $rootScope.isAllLoaded = true;
                $state.go('tab.home');
            }
            $rootScope.loginResponse = response.data;
        }, 
        function(error){
            alert("Connection Error. Please Check Network Connection.");
            console.log(error);
        });*/
    }
})();