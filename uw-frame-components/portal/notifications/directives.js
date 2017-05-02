'use strict';

define(['angular', 'require'], function(angular, require){

    var app = angular.module('portal.notifications.directives', []);

    app.directive('notifications', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/notifications.html')
        }
    });

    app.directive('notificationBell', function(){
        return {
            restrict : 'E',
            scope : {
              directiveMode : '@mode',
              headerCtrl : '=headerCtrl'
            },
            templateUrl : require.toUrl('./partials/notification-bell.html')
        }
    });

    app.directive('notificationsListItem', function() {
      return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/notifications-list-item.html')
      }
    });
  

    return app;

});

