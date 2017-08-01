'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.messages.directives', [])
    .directive('notificationsBell', function() {
      return {
        restrict: 'E',
        scope: {
          directiveMode: '@mode',
          headerCtrl: '=headerCtrl',
        },
        templateUrl: require.toUrl('./partials/notifications-bell.html'),
      };
    })
});
