
(function () {
    'use strict';

    angular.module('starter').controller('myPhotosCtrl', ['$scope','$ionicModal','$rootScope','httpService','$state', myPhotosCtrl]);

    function myPhotosCtrl($scope, $ionicModal, $rootScope, httpService, $state) {       
        	
	     $scope.photo = {};
	     $scope.photos= [];
	      
	      $scope.goBack = function(){
	        $state.go('tabs.profile');
	      }
	      $scope.convertDataForGallary = function(data){
	      	$scope.photos= [];
	      	var obj={};
	      	angular.forEach(data, function(value, key){
	      		obj={};
	      		obj.src =  $rootScope.baseUrlStatic + value.photoPath;
	      		obj.sub =  value.tags;
	      		$scope.photos.push(obj);
	      	});
			
	      }
	      $scope.loadPhotos = function(){
	      	$scope.objToSend={};
	      	$scope.objToSend.photoBy = $rootScope.userDetails.userID;
	        httpService.makecall($rootScope.baseUrl+ '/getMyPhotos', 'POST', $scope.objToSend).then(function(response){
	          console.log("+++++++++getMyPhotos+++++++");
	          console.log(response);
	          $scope.convertDataForGallary(response.data);
              //$scope.photos = response.data;
	          
	        }, 
	        function(error){
	        	alert("Check Connection.");
	          console.log(error);
	        });

	      }
	      $scope.loadPhotos();

        $scope.items = [
		  {
		    src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
		    sub: 'This is a <b>subtitle</b>'
		  },
		  {
		    src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
		    sub: '' /* Not showed */
		  },
		  {
		    src:'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
		    thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
		  }
		]
    }
})();