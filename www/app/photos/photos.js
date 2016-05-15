
(function () {
    'use strict';

    angular.module('starter').controller('photosCtrl', ['$scope','$ionicModal','$rootScope','httpService', photosCtrl]);

    function photosCtrl($scope, $ionicModal, $rootScope, httpService) {       
        $ionicModal.fromTemplateUrl('app/photos/picUploadModal.html', {
        scope: $scope,
        animation: 'slide-in-up '
        }).then(function(modal) { 
          $scope.uploadPicModal = modal;
      	}); 

        $scope.openUploadPicModal = function(){
        	$scope.uploadPicModal.show();
        	angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        	$('.dpSpinner').hide();
        }
        $scope.closeUploadPicModal = function(){
        	$scope.uploadPicModal.hide();
        }

        $scope.myImage='';
	     $scope.myCroppedImage='';
	     $scope.photo = {};
	     $scope.photos= [];
	      $('.dpSpinner').hide();
	      $scope.loadDone = function(){
	        $('.dpSpinner').hide();
	      }
	      $scope.loadStart = function(){
	        $('.dpSpinner').show();
	      }
	      $scope.chooseFile = function(){
	        $('#fileInput').click();
	      }
	      $scope.skip = function(){
	        $state.go('tabs.theWall');
	      }
	      $scope.savePicture = function(){
	        $scope.objToSend = {};
	        $scope.objToSend.myCroppedImage = $('#cropImg').attr('src');
	        $scope.objToSend.userID = $rootScope.userDetails.userID;
	        $scope.objToSend.tags = $scope.photo.tags;

	        httpService.makecall($rootScope.baseUrl+ '/uploadPic', 'POST', $scope.objToSend).then(function(response){
	          console.log(response);
	          if (response.data.statusCode == 'success') {
	              $scope.closeUploadPicModal();
	              $scope.loadPhotos();
	          }else{
	            alert('error');
	          };
	          
	        }, 
	        function(error){
	        	alert("Check Connection.");
	          console.log(error);
	        });
	      }
	      var handleFileSelect=function(evt) {
	        console.log(evt);
	        $('.dpSpinner').show();
	        var file=evt.currentTarget.files[0];
	        if(!file){
	          $('.dpSpinner').hide();
	          return;
	        }
	        var reader = new FileReader();
	        reader.onload = function (evt) {
	          $scope.$apply(function($scope){
	            $scope.myImage=evt.target.result;
	            //console.log($scope.myImage);
	          });
	        };
	        reader.readAsDataURL(file);
	      };
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

	        httpService.makecall($rootScope.baseUrl+ '/getAllPhotos', 'POST', $scope.objToSend).then(function(response){
	          console.log("+++++++++getAllPhotos+++++++");
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

	      $scope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams){
	        
	        if($scope.uploadPicModal){
	          if($scope.uploadPicModal.isShown()){
	            $scope.uploadPicModal.hide();
	            event.preventDefault();  
	          }  
	        }
	     
	      });
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