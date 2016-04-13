

angular.module('starter', ['ionic', 'ionic-datepicker', 'rzModule', 'ion-gallery', 'ngImgCrop', 'ngSanitize'])
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
          templateUrl: "app/authontication/signup.html"
     })
    .state('dp', {
      url: "/dp",
          templateUrl: "app/authontication/dpUpload.html",
          controller: 'dpUploadCtrl'
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
          controller:"NavCtrl"
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
    .state('tabs.photos', {
      url: "/photos",
      views: {
        'home-tab': {
          templateUrl: "app/photos/photos.html",
          controller: 'photosCtrl'
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
    .state('tabs.myPhotos', {
      url: "/myPhotos",
      views: {
        'home-tab': {
          templateUrl: "app/profile/myPhotos/photos.html",
          controller: 'myPhotosCtrl'
        }
      }
    })

   $urlRouterProvider.otherwise("landing");

})
.run(function($rootScope) {
    //alert();
    // $rootScope.baseUrl = 'http://54.169.243.198/restAPI/app/service';
    // $rootScope.baseUrlStatic = 'http://54.169.243.198/restAPI/app/glassmateStatic';
     $rootScope.baseUrl = 'http://192.168.0.104:3000/glassmate';
     $rootScope.baseUrlStatic = 'http://192.168.0.104:3000/glassmateStatic';
    $('#loaderDiv').hide();

})
.factory('httpMyInterceptor', function() {  
    var interceptor = {
        request: function(request) {
            if(request.method == 'POST'){
              $('#loaderDiv').show();
            } 
            return request;
        },
        response: function(response) {
            if(response.config.method == 'POST'){
              $('#loaderDiv').hide();
            }
            return response;
        }
    };

    return interceptor;
})
.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('httpMyInterceptor');
}]);