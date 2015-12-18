'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.features.services', []);

  app.factory('portalFeaturesService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC) {
    var featuresPromise = $http.get(SERVICE_LOC.featuresInfo, { cache: true});
    
    var getFeatures = function() {
      return featuresPromise.success(
        function(data, status) { //success function
          return data.features;
        }).error(function(data, status) { // failure function
          miscService.redirectUser(status, "Get features info");
        });
    };

    return {
      getFeatures : getFeatures
    };

  }]);

  return app;

});

