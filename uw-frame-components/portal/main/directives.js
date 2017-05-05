'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.main.directives', [])

  .directive('uwBody', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/body.html'),
      controller: 'PortalMainController',
    };
  })

  .directive('portalHeader', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/header.html'),
    };
  })

  .directive('sideBarMenu', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/sidebar-left.html'),
    };
  })

  .directive('username', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/username.html'),
    };
  })

  .directive('siteFooter', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/footer.html'),
      };
    })

  .directive('featuresModalTemplate', function() {
      return {
          restrict: 'E',
          templateUrl: require.toUrl('./partials/features-dialog-template.html'),
      };
  });
});
