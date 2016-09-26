'use strict';

define(['angular', 'require'], function(angular, require) {

  var app = angular.module('portal.main.directives', []);

  app.directive('uwBody', function(){
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/body.html'),
      controller : "PortalMainController"
    };
  });

  app.directive('portalHeader', function() {
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/header.html')
    }
  });

  app.directive('sideBarMenu', function(){
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/sidebar-left.html')
    }
  });

  app.directive('username', function() {
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/username.html')
    }
  });

  app.directive('siteFooter', function() {
      return {
        restrict : 'E',
        templateUrl : require.toUrl('./partials/footer.html')
      }
    });

  app.directive('betaHeader', function() {
      return {
          restrict : 'E',
          templateUrl : require.toUrl('./partials/beta-header.html')
      }
  });
  app.directive('featuresModalTemplate', function() {
      return {
          restrict : 'E',
          templateUrl : require.toUrl('./partials/features-dialog-template.html')
      }
  });

  return app;

});
