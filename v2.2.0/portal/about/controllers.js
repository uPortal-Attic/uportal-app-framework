'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.about.controllers', []);
	
	
	app.controller('PortalAboutController', ['$scope', 'portalAboutService', 'SERVICE_LOC', function($scope, portalAboutService, SERVICE_LOC) {
    portalAboutService.getFrameDetails()
      .then(function(result){
          $scope.frameInfo = result;
      }, function(){});
    
    $scope.appInfo = null;
    if(SERVICE_LOC.aboutURL) {
      portalAboutService.getDetails(SERVICE_LOC.aboutURL)
        .then(function(result){
          $scope.appInfo = result;
        }, function(){
          console.warn("issue getting frame info");
        });
    }
  }]);
	return app;
});