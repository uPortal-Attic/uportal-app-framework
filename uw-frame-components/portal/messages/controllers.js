'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.controllers', [])
    .controller('NotificationsController', ['$q', '$log', '$scope',
      '$rootScope', '$location', '$localStorage', '$filter', 'NOTIFICATION',
      'SERVICE_LOC', 'miscService', 'messagesService',
      function($q, $log, $scope, $rootScope, $location, $localStorage, $filter,
               NOTIFICATION, SERVICE_LOC, miscService, messagesService) {
        // //////////////////
        // Local variables //
        // //////////////////
        var vm = this;
        var allNotifications = [];
        var separatedNotifications = {};
        var dismissedNotificationIds = [];

        var promiseFilteredNotifications = {
          filteredByGroup:
            messagesService.getMessagesByGroup(allNotifications),
          filteredByData:
            messagesService.getMessagesByData(allNotifications),
          seenMessageIds:
            messagesService.getSeenMessageIds(),
        };

        var promiseAllNotifications = {
          seenMessageIds: messagesService.getSeenMessageIds(),
        };

        // ////////////////
        // Local methods //
        // ////////////////
        var getNotifications = function() {
          messagesService.getAllMessages()
            .then(function(result) {
              // Ensure messages exist and check for group filtering
              if (result.messages && result.messages.length > 0) {
                // Use $filter to filter out announcements
                allNotifications = $filter('filter')(
                  result.messages,
                  {announcementInfoUrl: null}
                );
              }
              filterNotifications();
              return true;
            })
            .catch(function(error) {

            });
        };

        var filterNotifications = function() {
          // Check for group filtering
          if (NOTIFICATION.groupFiltering &&
            !$localStorage.disableGroupFilteringForNotifications) {
            // Call filtered notifications promises, then pass on to
            // the completion function
            $q.all(promiseFilteredNotifications)
              .then(filterNotificationsSuccess)
              .catch(filterNotificationsFailure);
          } else {
            // Call all notifications promises, then pass on to
            // completion function
            $q.all(promiseAllNotifications)
              .then(filterNotificationsSuccess)
              .catch(filterNotificationsFailure);
          }
        };

        var filterNotificationsSuccess = function(result) {
          // Use $filter to separate seen/unseen
          if (result.seenMessageIds && result.seenMessageIds.length > 0) {
            separatedNotifications = $filter('filterSeenAndUnseen')(
              allNotifications,
              result.seenMessageIds
            );
            // Set scope notifications and dismissed notifications
            vm.notifications = separatedNotifications.unseen;
            vm.dismissedNotifications = separatedNotifications.seen;

            // Set local dismissedNotificationIds (used for tracking
            // dismissed messages in the K/V store
            angular.forEach(vm.dismissedNotifications, function(value) {
              dismissedNotificationIds.push(value.id);
            });

            // If user is anywhere other than the notifications page,
            // check for priority notifications and set them in scope
            if ($location.url().indexOf('notifications') === -1) {
              configurePriorityNotificationsScope();
            } else {
              clearPriorityNotificationsFlags();
            }
          } else {
            // If there aren't any seen notification IDs, just set all
            // notifications
            vm.notifications = allNotifications;
          }

          // Set aria-label in notifications bell
          vm.status = 'You have '
            + (vm.notifications.length === 0 ? 'no ' : '')
            + 'notifications';
        };

        var filterNotificationsFailure = function(error) {
          $log.warn('Problem getting messages from messagesService');
        };

        var configurePriorityNotificationsScope = function() {
          // Use angular's built-in filter to grab priority notifications
          vm.priorityNotifications = $filter('filter')(
            vm.notifications,
            {priority: 'high'}
          );
          // If priority notifications exist and the view has a
          // headerController in scope (from directive), set necessary flags
          if ($scope.headerCtrl) {
            $scope.headerCtrl.hasPriorityNotifications
              = vm.priorityNotifications.length > 0;
          }
        };

        var clearPriorityNotificationsFlags = function(duringWatchedEvent) {
          vm.priorityNotifications = [];
          if ($scope.headerCtrl) {
            $scope.headerCtrl.hasPriorityNotifications
              = vm.priorityNotifications.length > 0;
          }
          if (!duringWatchedEvent) {
            $rootScope.$broadcast('portalShutdownPriorityNotifications',
              {disable: true});
          }
        };

        var init = function() {
          // Variables used in all notification directives
          vm.notifications = [];
          vm.dismissedNotifications = [];
          vm.priorityNotifications = [];
          // Variables used by notification-bell directive
          vm.notificationsUrl = NOTIFICATION.notificationFullURL;
          vm.notificationsEnabled = NOTIFICATION.enabled;
          vm.status = 'View notifications';

          if (NOTIFICATION.enabled && !$rootScope.GuestMode) {
            getNotifications();
          }
        };

        // ////////////////
        // Scope methods //
        // ////////////////
        vm.dismissNotification = function(notification, isHighPriority) {
          vm.notifications = $filter('filterOutMessageWithId')(
            vm.notifications,
            notification.id
          );

          // Add notification to dismissed array
          vm.dismissedNotifications.push(notification);

          // Add notification's ID to local array of dismissed notification IDs
          dismissedNotificationIds.push(notification.id);

          // Call service to save changes if k/v store enabled
          if (SERVICE_LOC.kvURL) {
            messagesService.setSeenMessages(dismissedNotificationIds);
          }

          // Clear priority notification flags if it was a priority
          // notification
          if (isHighPriority) {
            clearPriorityNotificationsFlags();
          }
        };

        vm.restoreNotification = function(notification) {
          // Remove notification from dismissed array
          vm.dismissedNotifications = $filter('filterOutMessageWithId')(
            vm.dismissedNotifications,
            notification.id
          );

          // Add notification to non-dismissed array
          vm.notifications.push(notification);

          // Remove the corresponding entry from
          // local array of dismissed notification IDs
          var index = dismissedNotificationIds.indexOf(notification.id);
          if (index !== -1) {
            dismissedNotificationIds.splice(index, 1);
          }
          // Call service to save changes if k/v store enabled
          if (SERVICE_LOC.kvURL) {
            messagesService.setSeenMessages(dismissedNotificationIds);
          }
        };

        // INITIALIZE THE CONTROLLER
        init();
    }])

    .controller('FeaturesPageController', ['$log', '$filter',
      'messagesService', 'FEATURES', 'MISC_URLS',
      function($log, $filter, messagesService, FEATURES, MISC_URLS) {
        var vm = this;

        vm.features = [];
        vm.MISC_URLS = MISC_URLS;

        if (FEATURES.enabled) {
          // Check if group filtering is enabled for features

          // If filtering is off, get all messages
          messagesService.getAllMessages()
            .then(function(result) {
              if (result.messages && result.messages.length > 0) {
                // Filter out notification messages using angular's built-in
                // 'filter'
                vm.features = $filter('filter')(
                  result.messages,
                  {announcementInfoUrl: ''}
                );
              }
              return vm.features;
            })
            .catch(function(error) {
              $log.warn('Could not get features');
            });
        }
    }]);
});
