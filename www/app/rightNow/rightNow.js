
(function () {
    'use strict';

    angular.module('starter').controller('RightNowTabCtrl', ['$scope','$ionicLoading', '$compile','$timeout', RightNowTabCtrl]);

    function RightNowTabCtrl($scope,$ionicLoading, $compile, $timeout) {  

    	var neighborhoods = [
		  {lat: 18.587388, lng: 73.697398},
		  {lat: 18.595726, lng: 73.720058},
		  {lat: 18.595626, lng: 73.795340},
		  {lat: 18.496866, lng: 73.939670}
		];

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
		  for (var i = 0; i < neighborhoods.length; i++) {
		    addMarkerWithTimeout(neighborhoods[i], i * 200);
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
			initData();
		}

	      $scope.initMap = function(){
	      	initMap();
	      }
    }
})();