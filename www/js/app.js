

angular.module('starter', ['ionic', 'ionic-datepicker', 'rzModule', 'ion-gallery', 'ngImgCrop', 'ngSanitize', 'ui.mask'])
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
    .state('socialDetails', {
      url: "/socialDetails",
          templateUrl: "app/authontication/socialDetails.html"
     })
    .state('dp', {
      url: "/dp",
          templateUrl: "app/authontication/dpUpload.html",
          controller: 'dpUploadCtrl'
     })
    .state('otp', {
      url: "/otp",
          templateUrl: "app/authontication/otp.html",
          controller: 'otpCtrl'
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
    .state('tabs.experience', {
      url: "/experience",
      views: {
        'home-tab': {
          templateUrl: "app/experience/home.html",
          controller: 'experienceCtrl'
        }
      }
    })
    .state('tabs.offers', {
      url: "/offers",
      views: {
        'home-tab': {
          templateUrl: "app/offers/home.html",
          controller: 'offerCtrl'
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
    .state('tabs.myDetail', {
      url: "/myDetail",
      views: {
        'home-tab': {
          templateUrl: "app/profile/myDetail/myDetail.html"
        }
      }
    })
    .state('tabs.myPosts', {
      url: "/myPosts",
      views: {
        'home-tab': {
          templateUrl: "app/profile/myPosts/theWall.html",
          controller: 'myPostsCtrl'
        }
      }
    })
    .state('tabs.changePic', {
      url: "/changePic",
      views: {
        'home-tab': {
          templateUrl: "app/profile/changePic/dpUpload.html",
          controller: 'changePicCtrl'
        }
      }
    })
    .state('tabs.changePwd', {
      url: "/changePwd",
      views: {
        'home-tab': {
          templateUrl: "app/profile/changePwd.html",
          controller: 'changePwdCtrl'
        }
      }
    })

   $urlRouterProvider.otherwise("login");

})
.run(function($rootScope, $ionicHistory, $ionicViewService, $window, $state) {
    // $rootScope.baseUrl = 'http://54.169.243.198/restAPI/app/service';
    // $rootScope.baseUrlStatic = 'http://54.169.243.198/restAPI/app/glassmateStatic';
     // $rootScope.baseUrl = 'http://192.168.0.100:3000/glassmate';
     // $rootScope.baseUrlStatic = 'http://192.168.0.100:3000/glassmateStatic';
     // $rootScope.baseUrl = 'http://localhost:3000/glassmate';
     // $rootScope.baseUrlStatic = 'http://localhost:3000/glassmateStatic';
     $rootScope.baseUrl = 'http://the-glassmates2016.rhcloud.com/restAPI';
     $rootScope.baseUrlStatic = 'http://the-glassmates2016.rhcloud.com/static';
     
    $('#loaderDiv').hide();

    $rootScope.$windowGoBack = function(){
      $window.history.back();      
    }
    //alert(localStorage.getItem("glassmatesUserDetails"));
    if(localStorage.getItem("glassmatesUserDetails")){
      $rootScope.userDetails = JSON.parse(localStorage.getItem("glassmatesUserDetails"));
      $state.go('tabs.theWall');
    }else{
      $state.go('landing');
    }


    var onSuccess = function(position) {
      $rootScope.GPSLocation = position;
        // alert('Latitude: '          + position.coords.latitude          + '\n' +
        //       'Longitude: '         + position.coords.longitude         + '\n' +
        //       'Altitude: '          + position.coords.altitude          + '\n' +
        //       'Accuracy: '          + position.coords.accuracy          + '\n' +
        //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //       'Heading: '           + position.coords.heading           + '\n' +
        //       'Speed: '             + position.coords.speed             + '\n' +
        //       'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    //navigator.geolocation.getCurrentPosition(onSuccess, onError);

    var watchID = navigator.geolocation.watchPosition(onSuccess, onError);

})
.factory('httpMyInterceptor', function($q) {  
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
        },
        responseError: function(rejection){
          if(rejection.config.method == 'POST'){
              $('#loaderDiv').hide();
          }
          return $q.reject(rejection);
        }
    };

    return interceptor;
})
.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('httpMyInterceptor');
}]);