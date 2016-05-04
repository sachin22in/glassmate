
(function () {
    'use strict';

    angular.module('starter').controller('RightNowTabCtrl', ['$scope','$ionicLoading', '$compile','$timeout','httpService','$rootScope', RightNowTabCtrl]);

    function RightNowTabCtrl($scope,$ionicLoading, $compile, $timeout, httpService, $rootScope ) {  

    	var rightNowData = [];

		var markers = [];
		var map;

		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 12,
		    center: {lat: 18.587388, lng: 73.697398}
		  });

		}

		function initData() {
		  clearMarkers();
		  for (var i = 0; i < rightNowData.length; i++) {
		    addMarkerWithTimeout(rightNowData[i], i * 200);
		  }
		}

		// var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
  //       var compiled = $compile(contentString)($scope);

  //       var infowindow = new google.maps.InfoWindow({
  //         content: compiled[0]
  //       });


		function addMarkerWithTimeout(position, timeout) {
		  window.setTimeout(function() {

		    markers.push(new google.maps.Marker({
		      position: position,
		      map: map,
		      animation: google.maps.Animation.DROP
		    }));

		    // google.maps.event.addListener(markers[markers.length-1], 'click', function() {
		    //    infowindow.open(map,markers[markers.length-1]);
		    // });

		  }, timeout);
		}

		function clearMarkers() {
		  for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		  }
		  markers = [];
		}


		$scope.getPlaceData= function(){
			httpService.makecall($rootScope.baseUrl+ '/gerRightNowLocation', 'POST').then(function(response){
	            console.log('++++++++++gerRightNowLocation++++++++');
	            console.log(response);
	            var temp = response.data;
	            var tempObj = {};
	            temp.forEach(function(val, key){
	            	console.log(val);
	            	console.log(key);
	            	tempObj = {};
	            	tempObj.lat = parseFloat(val.placeLat);
	            	tempObj.lng = parseFloat(val.placeLon);
	            	rightNowData.push(tempObj);
	            })
	            //console.log(rightNowData);
	            initData();
	          }, 
	          function(error){
	            alert("Connection Error. Please Check Network Connection.");
	            console.log(error);
	          });

			
		}

	      $scope.initMap = function(){
	      	initMap();
	      }
    }
})();