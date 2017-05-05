'use strict';

define(['angular', 'require'], function(angular, require) {
    return angular.module('portal.notifications.directives', [])

    .directive('notifications', function() {
        return {
            restrict: 'E',
            templateUrl: require.toUrl('./partials/notifications.html'),
        };
    })

    .directive('notificationBell', function() {
        return {
            restrict: 'E',
            scope: {
              directiveMode: '@mode',
              headerCtrl: '=headerCtrl',
            },
            templateUrl: require.toUrl('./partials/notification-bell.html'),
        };
    })

    .directive('notificationsListItem', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/notifications-list-item.html'),
      };
    });
});
