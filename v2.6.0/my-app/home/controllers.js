'use strict';

define(['angular','require', 'marked'], function(angular, require, marked) {
  var app = angular.module('docs.main.controllers', []);

  app.controller('MarkdownPageController', ['$scope', '$routeParams', function($scope, $routeParams) {
    $scope.title = $routeParams.markdownfilename;
    if($scope.title) {
      $scope.title = $scope.title.replace('-',' ');
    }
    $scope.filename = 'markdown/' + $routeParams.markdownfilename + '.md';

  } ]);

  return app;

});
