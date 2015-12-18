'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.settings.controllers', []);

  /* Profile */
  app.controller('SettingsController', [ '$scope', 'APP_BETA_FEATURES', 'FRAME_BETA_FEATURES', function($scope, APP_BETA_FEATURES, FRAME_BETA_FEATURES) {
    $scope.options = FRAME_BETA_FEATURES.concat(APP_BETA_FEATURES);
  }]);
  return app;
 });
