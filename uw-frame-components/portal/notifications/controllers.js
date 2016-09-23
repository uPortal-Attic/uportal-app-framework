'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.controllers ', []);

  app.controller('PortalNotificationController', [ '$scope',
                                                   '$rootScope',
                                                   '$location',
                                                   '$localStorage',
                                                   'NOTIFICATION',
                                                   'SERVICE_LOC',
                                                   'filterFilter',
                                                   'notificationsService',
                                           function($scope,
                                                    $rootScope,
                                                    $location,
                                                    $localStorage,
                                                    NOTIFICATION,
                                                    SERVICE_LOC,
                                                    filterFilter,
                                                    notificationsService){


    var configurePriorityNotificationScope = function(data){
      $scope.priorityNotifications = filterFilter(data, {priority : true});
      if ($scope.priorityNotifications && $scope.priorityNotifications.length > 0) {
        $scope.hasPriorityNotifications = true;
        $('.page-content').addClass('has-priority-nots');
        if($scope.headerCtrl) {
          $scope.headerCtrl.hasPriorityNotifications = true;
        }
      } else {
        $('.page-content').removeClass('has-priority-nots');
        $scope.hasPriorityNotifications = false;
        if($scope.headerCtrl) {
          $scope.headerCtrl.hasPriorityNotifications = false;
        }
      }
    };

    var clearPriorityNotificationFlags = function(duringOnEvent) {
      $scope.priorityNotifications = [];
      $scope.hasPriorityNotifications = false;
      if($scope.headerCtrl) {
        $scope.headerCtrl.hasPriorityNotifications = false;
      }
      $('.page-content').removeClass('has-priority-nots');
      if(!duringOnEvent) {
        $rootScope.$broadcast('portalShutdownPriorityNotifications', { disable : true});
      }
    }

    var successFn = function(data){
      //success state
      $scope.count = data ? data.length : 0;
      $scope.isEmpty = ($scope.count === 0);
      $scope.status = "You have "+ ($scope.isEmpty ? "no " : "") + "notifications";
      $scope.notifications = data;
      if($location.url().indexOf('notifications') === -1) {
        configurePriorityNotificationScope(data);
      } else {
        clearPriorityNotificationFlags();
      }
    };

    var errorFn = function(data){
      //error state (logging of error happens at service layer)
      $scope.count = 0;
      $scope.isEmpty = true;
    };

    var dismissedSuccessFn = function(data) {
      if(Array.isArray(data))
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

    $scope.isDismissed = function(notification) {
      for(var i = 0; i < $rootScope.dismissedNotificationIds.length; i++) {
        if(notification.id === $rootScope.dismissedNotificationIds[i]) {
          return true;
        }
      }
      return false;
    };

    $scope.dismiss = function (notification, fromPriority) {
      $rootScope.dismissedNotificationIds.push(notification.id);
      if(SERVICE_LOC.kvURL) { //key value store enabled, we can store dismiss of notifications
        notificationsService.setDismissedNotifications($rootScope.dismissedNotificationIds);
      }
      if(fromPriority) {
        clearPriorityNotificationFlags();
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
      $scope.notifications = [];
      $rootScope.dismissedNotificationIds = $rootScope.dismissedNotificationIds || [];
      $scope.count = 0;
      $scope.isEmpty = false;
      $scope.notificationUrl = NOTIFICATION.notificationFullURL;
      $scope.notificationsEnabled = NOTIFICATION.enabled;

      if(NOTIFICATION.enabled && !$rootScope.GuestMode) {
        if(SERVICE_LOC.kvURL && $rootScope.dismissedNotificationIds.length === 0) {
          //key value store enabled, we can store dismiss of notifications
          notificationsService.getDismissedNotificationIds().then(dismissedSuccessFn);
        }
        if(NOTIFICATION.groupFiltering && !$localStorage.disableGroupFilteringForNotifications) {
          notificationsService.getNotificationsByGroups().then(successFn, errorFn);
        } else {
          notificationsService.getAllNotifications().then(successFn, errorFn);
        }

        $scope.$on('$locationChangeStart', function(event) {
          if ($location.url().indexOf('notification') === -1) {
            configurePriorityNotificationScope($scope.notifications);
          } else {
            clearPriorityNotificationFlags();
          }
        });
        $scope.$on('portalShutdownPriorityNotifications', function(event, data) {
          clearPriorityNotificationFlags(true);
        });
      }

    }

    init();
  }]);

  return app;

});
