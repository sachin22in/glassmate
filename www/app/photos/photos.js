
(function () {
    'use strict';

    angular.module('starter').controller('photosCtrl', ['$scope','$ionicModal', photosCtrl]);

    function photosCtrl($scope, $ionicModal) {       
        console.log($scope);
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
	      $('.dpSpinner').hide();
	      $scope.loadDone = function(){
	        $('.dpSpinner').hide();
	        console.log($scope.myCroppedImage);
	      }
	      $scope.loadStart = function(){
	        //$('.dpSpinner').show();
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

	        httpService.makecall($rootScope.baseUrl+ '/profilePic', 'POST', $scope.objToSend).then(function(response){
	          console.log(response);
	          if (response.data.statusCode == 'success') {
	              $rootScope.userDetails.picPath = '/ProfilePic/' + $rootScope.userDetails.userID + '.png';
	              $state.go('tabs.theWall');
	          }else{
	            alert('error');
	          };
	          
	        }, 
	        function(error){
	          console.log(error);
	        });
	      }
	      var handleFileSelect=function(evt) {
	        console.log(evt);
	        //$('.dpSpinner').show();
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