'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.controllers ', []);

  app.controller('NotificationController', [ '$scope', '$rootScope', 'NOTIFICATION', 'notificationsService', function($scope, $rootScope, NOTIFICATION, notificationsService){
    var successFn = function(data){
      //success state
      $scope.count = data.length;
      $scope.isEmpty = ($scope.count === 0);
      $scope.status = "You have "+ ($scope.isEmpty ? "no " : "") + "notifications";
      $scope.notifications = data;
    };

    var errorFn = function(data){
      //error state (logging of error happens at service layer)
      $scope.count = 0;
      $scope.isEmpty = true;
    };
    
    var dismissedSuccessFn = function(data) {
      $rootScope.dismissedNotificationIds = data;
    };
    
    $scope.countWithDismissed = function() {
      var count = 0;
      if($rootScope.dismissedNotificationIds && $scope.notifications) {
        for(var i = 0; i < $scope.notifications.length; i++) {
          var curNot = $scope.notifications[i];
          var dismissed = false;
          if(curNot.dismissable) {
            for(var j =0; j < $rootScope.dismissedNotificationIds.length; j++) {
              dismissed = curNot.id === $rootScope.dismissedNotificationIds[j];
              if(dismissed) {
                break;
              }
            }
          }
          if(!dismissed) {
            count++;
          }
        }
      }
      
      return count;
    }
    
    $scope.shouldShow = function(notification) {
      var res = $scope.isDismissed(notification);
      return $scope.mode === 'new' ? !res : res;
    }
    
    $scope.isDismissed = function(notification) {
      for(var i = 0; i < $rootScope.dismissedNotificationIds.length; i++) {
        if(notification.id === $rootScope.dismissedNotificationIds[i]) {
          return true;
        }
      }
      return false;
    };
    
    $scope.dismiss = function (notification) {
      $rootScope.dismissedNotificationIds.push(notification.id);
      notificationsService.setDismissedNotifications($rootScope.dismissedNotificationIds);
    }
    
    $scope.switch = function(mode) {
      $scope.mode = mode;
    }

    var init = function(){
      $scope.mode = 'new';
      $scope.dismissedMode='';
      $scope.activeMode='active';
      $scope.notifications = [];
      $rootScope.dismissedNotificationIds = [];
      $scope.count = 0;
      $scope.isEmpty = false;
      $scope.notificationUrl = NOTIFICATION.notificationFullURL;
      $scope.notificationsEnabled = NOTIFICATION.enabled;

      if(NOTIFICATION.enabled) {
        notificationsService.getDismissedNotificationIds().then(dismissedSuccessFn);
        if(NOTIFICATION.groupFiltering) {
          notificationsService.getNotificationsByGroups().then(successFn, errorFn);
        } else {
          notificationsService.getAllNotifications().then(successFn, errorFn);
        }
      }
    }

    init();
  }]);

  return app;

});
