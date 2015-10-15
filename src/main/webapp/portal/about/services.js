'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.about.services', []);

  app.factory('portalAboutService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC) {
    
    /**
    * Gets frame information from generated about-frame.json
    **/
    var getFrameDetails = function() {
      return $http.get("staticFeeds/about-frame.json", {cache: true})
        .then(function(result){
          return result.data;
        },
        function(reason){
          miscService.redirectUser(reason.status, 'frame details json feed call');
        });
    };
    
    var getDetails = function(URL) {
      return null;
    };
        
    return {
      getFrameDetails : getFrameDetails,
      getDetails : getDetails
    };

  }]);

  return app;

});

