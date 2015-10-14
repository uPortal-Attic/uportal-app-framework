'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.controllers ', []);

  app.controller('PortalNotificationController', [ '$scope', '$rootScope', 'NOTIFICATION', 'SERVICE_LOC', 'notificationsService', 'miscService', function($scope, $rootScope, NOTIFICATION, SERVICE_LOC, notificationsService, miscService){
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
    
    $scope.dismissedCount = function() {
      return $rootScope.dismissedNotificationIds ? $rootScope.dismissedNotificationIds.length : 0;
    }
    
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
      if(SERVICE_LOC.kvURL) { //key value store enabled, we can store dismiss of notifications
        notificationsService.setDismissedNotifications($rootScope.dismissedNotificationIds); 
      }
    }
    
    $scope.undismiss = function(notification) {
      var index = $rootScope.dismissedNotificationIds.indexOf(notification.id);
      if(index !== -1) {
      	$rootScope.dismissedNotificationIds.splice(index,1);
      }
      if(SERVICE_LOC.kvURL) { //key value store enabled, we can store dismiss of notifications
        notificationsService.setDismissedNotifications($rootScope.dismissedNotificationIds); 
      }
    }
    
    $scope.switch = function(mode) {
      $scope.mode = mode;
    }

    var init = function(){
      
      if(!$scope.directiveMode) { //means we are on the actual notification tab
        miscService.pushPageview();
      }
      $scope.mode = 'new';
      $scope.notifications = [];
      $rootScope.dismissedNotificationIds = $rootScope.dismissedNotificationIds || [];
      $scope.count = 0;
      $scope.isEmpty = false;
      $scope.notificationUrl = NOTIFICATION.notificationFullURL;
      $scope.notificationsEnabled = NOTIFICATION.enabled;

      if(NOTIFICATION.enabled) {
        if(SERVICE_LOC.kvURL && $rootScope.dismissedNotificationIds.length === 0) { 
          //key value store enabled, we can store dismiss of notifications
          notificationsService.getDismissedNotificationIds().then(dismissedSuccessFn);
        }
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
