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
        controller: 'NotificationsController',
        controllerAs: 'vm',
      };
    })

    .directive('notificationsListItem', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/notifications-list-item.html'),
      };
    })

    .directive('mascotAnnouncement', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/announcement-mascot.html'),
        scope: {
          mode: '@',
          headerCtrl: '=headerCtrl',
        },
        controller: 'AnnouncementsController',
        controllerAs: 'vm',
      };
    });
});
