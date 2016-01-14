'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.settings.controllers', []);

  /* Profile */
  app.controller('SettingsController', [ '$sessionStorage', '$scope', 'APP_BETA_FEATURES', 'FRAME_BETA_FEATURES', function($sessionStorage, $scope, APP_BETA_FEATURES, FRAME_BETA_FEATURES) {
    $scope.options = FRAME_BETA_FEATURES.concat(APP_BETA_FEATURES);
    $scope.$watch('portal.theme', function() {
      $sessionStorage.portal.theme = $scope.portal.theme;
    });
  }]);
  return app;
 });
