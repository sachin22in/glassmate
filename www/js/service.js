(function () {
    'use strict';

    angular.module('starter').factory('httpService', ['$http', zomatoAPI]);

    function zomatoAPI($http) { 
          
        return {
          makecall: function(url, method, data){
            return $http({
                method: method,
                url: url,
                crossDomain: true,
                data: data
              })
          }
        }
    }
})();