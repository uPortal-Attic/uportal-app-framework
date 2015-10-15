'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.about.services', []);

  app.factory('portalAboutService', ['$http', 'miscService', 'FRAME_URLS', function($http, miscService, FRAME_URLS) {
    
    /**
    * Gets frame information from generated about-frame.json
    **/
    var getFrameDetails = function() {
      return getDetails(FRAME_URLS.aboutFrame);
    };
    
    /**
    * Get information 
    **/
    var getDetails = function(URL) {
      return $http.get(URL, {cache: true})
        .then(function(result){
          return result.data;
        },
        function(reason){
          miscService.redirectUser(reason.status, URL);
        });
    };
        
    return {
      getFrameDetails : getFrameDetails,
      getDetails : getDetails
    };

  }]);

  return app;

});

