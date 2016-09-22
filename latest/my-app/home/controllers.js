'use strict';

define(['angular','require', 'marked'], function(angular, require, marked) {
  var app = angular.module('docs.main.controllers', []);

  app.controller('MarkdownPageController', ['$scope', '$routeParams', function($scope, $routeParams) {
    var title = $routeParams.markdownfilename;

    if (title) {
      title = title.charAt(0).toUpperCase() + title.slice(1);
      title = title.replace('-', ' ');
      $scope.title = title;
    }

    $scope.filename = 'markdown/' + $routeParams.markdownfilename + '.md';

  } ]);

  return app;

});
