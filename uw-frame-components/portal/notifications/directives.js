'use strict';

define(['angular', 'require'], function(angular, require){

    var app = angular.module('portal.notifications.directives', []);

    app.directive('notifications', function(){
        return {
            restrict : 'E',
            templateUrl : require.toUrl('./partials/notifications.html')
        }
    });

    app.directive('notificationPartials', function(){
        return {
            restrict : 'E',
            scope : {
              directiveMode : '@mode',
              headerCtrl : '=headerCtrl'
            },
            templateUrl : require.toUrl('./partials/notification-partials.html')
        }
    });
  

    return app;

});

