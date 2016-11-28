'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.notifications.controllers ', []);

  app.controller('PortalNotificationController', [ '$scope', '$rootScope', '$location', '$localStorage', 'NOTIFICATION',
    'SERVICE_LOC', 'filterFilter', 'notificationsService',
    function($scope, $rootScope, $location, $localStorage, NOTIFICATION, SERVICE_LOC, filterFilter, notificationsService) {

      /////////////////////
      // LOCAL VARIABLES //
      /////////////////////
      var dismissedNotificationIds;

      ///////////////////
      // SCOPE METHODS //
      ///////////////////
      /**
       * Dismiss a notification
       * This method moves the given notification into the array of dismissed notifications
       * @param notification Object, the notification with all its data
       * @param fromPriority Boolean, true if dismissal occurred in priority notifications alert
       */
      $scope.dismissNotification = function (notification, fromPriority) {
        // Remove notification from non-dismissed array
        removeNotificationById($scope.notifications, notification.id);

        // Add notification to dismissed array
        $scope.dismissedNotifications.push(notification);

        // Add notification's ID to local array of dismissed notification IDs
        dismissedNotificationIds.push(notification.id);

        // Call service to save changes if k/v store enabled
        if(SERVICE_LOC.kvURL) {
          notificationsService.setDismissedNotifications(dismissedNotificationIds);
        }

        // Clear priority notification flags if it was a priority notification
        if(fromPriority) {
          clearPriorityNotificationFlags();
        }
      };

      /**
       * Restore notification
       * This method moves the given notification into the array of unseen notifications
       * @param notification Object, the notification with all its data
       */
      $scope.restoreNotification = function(notification) {

        // Remove notification from dismissed array
        removeNotificationById($scope.dismissedNotifications, notification.id);

        // Add notification to non-dismissed array
        $scope.notifications.push(notification);

        // Remove the corresponding entry from local array of dismissed notification IDs
        var index = dismissedNotificationIds.indexOf(notification.id);
        if(index !== -1) {
          dismissedNotificationIds.splice(index, 1);
        }
        // Call service to save changes if k/v store enabled
        if(SERVICE_LOC.kvURL) {
          notificationsService.setDismissedNotifications(dismissedNotificationIds);
        }
      };

      ///////////////////
      // LOCAL METHODS //
      ///////////////////
      /**
       *  Get notifications
       *  The data returned depends on whether group filtering is enabled. This method also initializes the local
       *  array of dismissed notification IDs.
       */
      var getNotifications = function() {
        dismissedNotificationIds = [];
        if(NOTIFICATION.groupFiltering && !$localStorage.disableGroupFilteringForNotifications) {
          notificationsService.getNotificationsByGroups().then(getNotificationsSuccess, getNotificationsError);
        } else {
          notificationsService.getAllNotifications().then(getNotificationsSuccess, getNotificationsError);
        }
      };

      /**
       * Called if getNotifications completed successfully
       * @param data Object with two attributes:
       *  - notDismissed: An array of notification objects
       *  - dismissed: An array of notifications previously saved as "dismissed" in k/v store
       */
      var getNotificationsSuccess = function(data) {
        // SET NECESSARY SCOPE VARIABLES
        $scope.notifications = data.notDismissed ? data.notDismissed : [];
        $scope.dismissedNotifications = data.dismissed ? data.dismissed : [];
        $scope.status = "You have " + ($scope.isEmpty ? "no " : "") + "notifications";

        angular.forEach($scope.dismissedNotifications, function(value, key) {
          dismissedNotificationIds.push(value.id);
        });

        if($location.url().indexOf('notifications') === -1) {
          configurePriorityNotificationScope($scope.notifications);
        } else {
          clearPriorityNotificationFlags();
        }
      };

      /**
       * Called if getNotifications failed
       * Logging occurs in the service layer
       */
      var getNotificationsError = function() {
        $scope.isEmpty = true;
      };

      /**
       * Remove an entry with the given id from the given array
       * @param array Array of notifications
       * @param id String, the id of the notification to be removed
       */
      var removeNotificationById = function(array, id) {
        angular.forEach(array, function(value, key) {
          if (value.id === id) {
            array.splice(key, 1);
          }
        });
      };

      /**
       * Filter the array of notifications and add notifications with the "priority" flag to a separate array,
       * set hasPriorityNotifications flag if applicable
       * @param data Array of notification objects
       */
      var configurePriorityNotificationScope = function(data) {
        $scope.priorityNotifications = filterFilter(data, {priority : true});
        if ($scope.priorityNotifications && $scope.priorityNotifications.length > 0) {
          $scope.hasPriorityNotifications = true;
          if($scope.headerCtrl) {
            $scope.headerCtrl.hasPriorityNotifications = true;
          }
        } else {
          $scope.hasPriorityNotifications = false;
          if($scope.headerCtrl) {
            $scope.headerCtrl.hasPriorityNotifications = false;
          }
        }
      };

      /**
       * Reset priority notifications flags
       * @param duringOnEvent
       */
      var clearPriorityNotificationFlags = function(duringOnEvent) {
        $scope.priorityNotifications = [];
        $scope.hasPriorityNotifications = false;
        if($scope.headerCtrl) {
          $scope.headerCtrl.hasPriorityNotifications = false;
        }
        if(!duringOnEvent) {
          $rootScope.$broadcast('portalShutdownPriorityNotifications', { disable : true});
        }
      };

      /**
       * Initialize this controller
       * This method initializes scope variables, calls the notifications service to get notifications, and instantiates
       * some event listeners.
       */
      var init = function() {
        // Variables used in all notification directives
        $scope.notifications = [];
        $scope.dismissedNotifications = [];
        // Variables used by notification-bell directive
        $scope.notificationsUrl = NOTIFICATION.notificationFullURL;
        $scope.notificationsEnabled = NOTIFICATION.enabled;

        // Get notifications (dismissed vs. non-dismissed is handled in service)
        if(NOTIFICATION.enabled && !$rootScope.GuestMode) {
          getNotifications();
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

      };

      init();

  }]);

  return app;

});
