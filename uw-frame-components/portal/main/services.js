'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.main.services', []);

  app.factory('mainService', ['$http', 'miscService', 'SERVICE_LOC', function($http, miscService, SERVICE_LOC) {
    var prom = $http.get(SERVICE_LOC.sessionInfo, { cache: true});
    var userPromise;

    var getUser = function() {
      if (userPromise) {
        return userPromise;
      }

      userPromise = prom.then(
          function(data, status) { //success function
            return data.data.person;
          }, function(data, status) { // failure function
            miscService.redirectUser(status, "Get User Info");
          });
      return userPromise;
    };

    return {
      getUser: getUser
    };

  }]);

  return app;

});

