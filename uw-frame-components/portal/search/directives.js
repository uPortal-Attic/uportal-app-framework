'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.search.directives', [])

  .directive('search', [function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/search.html'),
      controller: 'PortalSearchController',
    };
  }]);
});
