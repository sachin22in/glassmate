

angular.module('starter', ['ionic', 'ionic-datepicker', 'rzModule'])
.config(function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('tabs', {
      url: "/tab",
      
      templateUrl: "templates/tabs.html",
      controller: "profileNavCtrl"
    })
    
    .state('landing', {
      url: "/landing",
          templateUrl: "app/authontication/landing.html",
          controller: 'AuthCtrl'
     })
    .state('login', {
      url: "/login",
          templateUrl: "app/authontication/login.html"
     })
      .state('signup', {
      url: "/signup",
          templateUrl: "app/authontication/signup.html",
     })
    

      /* INTEREST*/
    .state('tabs.theWall', {
      url: "/theWall",
      views: {
        'home-tab': {
          templateUrl: "app/theWall/theWall.html",
          controller:"theWallCtrl"
        },
        'menu-left@tabs': {
          templateUrl: "app/theWall/wallfilter.html",
          controller:""
            }
 
      }
    })
    .state('tabs.rightNow', {
      url: "/rightNow",
      views: {
        'home-tab': {
          templateUrl: "app/rightNow/rightNow.html",
          controller: 'RightNowTabCtrl'
        }
      }
    })
    .state('tabs.profile', {
      url: "/profile",
      views: {
        'home-tab': {
          templateUrl: "app/profile/profile.html",
          controller: 'ProfileTabCtrl'
        }
      }
    })

   $urlRouterProvider.otherwise("landing");

})
.run(function($rootScope) {
    //alert();
    $rootScope.baseUrl = 'http://synebyte.com/web125849serv_travelbuddha/Service1.svc/';

});
