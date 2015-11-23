'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.settings.controllers', []);

  /* Profile */
  app.controller('SettingsController', [ '$scope', 'OPTIONS', function($scope, OPTIONS) {
    $scope.options = OPTIONS;
  }]);
  return app;
 });
