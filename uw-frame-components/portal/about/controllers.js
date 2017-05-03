'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.about.controllers', [])
	.controller('PortalAboutController', ['$log', '$scope', 'portalAboutService', 'SERVICE_LOC', function($log, $scope, portalAboutService, SERVICE_LOC) {
    portalAboutService.getFrameDetails()
      .then(function(result) {
          $scope.frameInfo = result;
          return result;
      }).catch(function() {
        $log.warn('issue getting frame details');
      });

    $scope.appInfo = null;
    if(SERVICE_LOC.aboutURL) {
      portalAboutService.getDetails(SERVICE_LOC.aboutURL)
        .then(function(result) {
          $scope.appInfo = result;
          return result;
        }).catch(function() {
          $log.warn('issue getting frame info');
        });
    }
  }]);
});
