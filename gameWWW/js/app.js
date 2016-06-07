var app = angular.module('starter', ['ui.router', 'ngDialog']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('tab', {
      url: "/tab",
      
      templateUrl: "views/tab.html",
      controller: "rightSideCtrl"
    })
    
    .state('landing', {
      url: "/landing",
          templateUrl: "views/landing.html",
          controller: 'landingCtrl'
     })

    
    .state('tab.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "views/home.html",
          controller: 'homeCtrl'
        }
      }
    })
    .state('tab.openDoor', {
      url: "/openDoor",
      views: {
        'home-tab': {
          templateUrl: "views/doorOpen.html",
          controller: 'openDoorCtrl'
        }
      }
    })
    
   $urlRouterProvider.otherwise("landing");

})
.run(function($rootScope, $window) {
  $rootScope.isAllLoaded = false;
  $rootScope.baseUrl = 'http://ec2-52-34-200-40.us-west-2.compute.amazonaws.com/api';
  $rootScope.GAME_CONFIG = {
    'game_number': 999999,
    'game_password': "1234"
  }
})