'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.features.directives', [])
  .directive('buckyAnnouncement', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/announcement.html'),
      controller: 'PortalPopupController',
      scope: {
        mode: '@',
        headerCtrl: '=headerCtrl',
      },
    };
  });
});
