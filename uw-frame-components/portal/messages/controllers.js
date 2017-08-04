'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.controllers', [])
    .controller('NotificationsController', ['$q', '$log', '$scope',
      '$rootScope', '$location', '$localStorage', '$filter', 'MESSAGES',
      'SERVICE_LOC', 'miscService', 'messagesService',
      function($q, $log, $scope, $rootScope, $location, $localStorage, $filter,
               MESSAGES, SERVICE_LOC, miscService, messagesService) {
        // //////////////////
        // Local variables //
        // //////////////////
        var vm = this;
        var allNotifications = [];
        var separatedNotifications = {};
        var dismissedNotificationIds = [];

        // Promises to run if filtering is turned on
        var promiseFilteredNotifications = {
          filteredByGroup:
            messagesService.getMessagesByGroup(allNotifications),
          filteredByData:
            messagesService.getMessagesByData(allNotifications),
          seenMessageIds:
            messagesService.getSeenMessageIds(),
        };

        // Promise to run if filtering is off
        var promiseAllNotifications = {
          seenMessageIds: messagesService.getSeenMessageIds(),
        };

        // ////////////////
        // Local methods //
        // ////////////////
        /**
         * Get all messages, then filter out announcements
         * and pass result on for filtering
         */
        var getNotifications = function() {
          messagesService.getAllMessages()
            .then(function(result) {
              // Ensure messages exist and check for group filtering
              if (result.messages && result.messages.length > 0) {
                // Use $filter to filter out announcements
                allNotifications = $filter('filter')(
                  result.messages,
                  {messageType: 'notification'}
                );
              }
              filterNotifications();
              return result;
            })
            .catch(function(error) {
              // HANDLE ERRORS
            });
        };

        /**
         * Determine whether or not notifications need to be filtered
         * by group or data, then execute the relevant promises
         */
        var filterNotifications = function() {
          // Check for group filtering
          // && !$localStorage.disableGroupFilteringForNotifications
          if (MESSAGES.groupFiltering) {
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

        /**
         * Handle resolution of promises to get notifications
         * @param result
         */
        var filterNotificationsSuccess = function(result) {
          // Check for filtered notifications
          var filteredNotifications = [];
          if (result.filteredByGroup && result.filteredByData) {
            // Combine the two filtered arrays into one (no dupes)
            filteredNotifications = $filter('filterForCommonElements')(
              result.filteredByGroup,
              result.filteredByData
            );
            configureNotificationsScope(filteredNotifications, result)
          } else {
            filteredNotifications = allNotifications;
            configureNotificationsScope(filteredNotifications, result);
          }
        };

        /**
         * Handle errors that occur while resolving promises to
         * get notifications
         * @param error
         */
        var filterNotificationsFailure = function(error) {
          $log.warn('Problem getting messages from messagesService');
        };

        /**
         * Separate seen and unseen notifications, then set scope variables
         * @param notifications
         * @param result
         */
        var configureNotificationsScope = function(notifications, result) {
          // Use $filter to separate seen/unseen
          if (result.seenMessageIds && result.seenMessageIds.length > 0) {
            separatedNotifications = $filter('filterSeenAndUnseen')(
              notifications,
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
          } else {
            // If there aren't any seen notification IDs, just set all
            // notifications
            vm.notifications = allNotifications;
          }

          // If user is anywhere other than the notifications page,
          // check for priority notifications and set them in scope
          if ($location.url().indexOf('notifications') === -1) {
            configurePriorityNotificationsScope();
          } else {
            clearPriorityNotificationsFlags();
          }

          // Set aria-label in notifications bell
          vm.status = 'You have '
            + (vm.notifications.length === 0 ? 'no ' : '')
            + 'notifications';
        };

        /**
         * Alert the UI to show priority notifications if they exist
         */
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

        /**
         * Alerts the UI that there are no priority notifications to show
         * @param duringWatchedEvent
         */
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

        /**
         * Kick off the fun
         */
        var init = function() {
          // Variables used in all notification directives
          vm.notifications = [];
          vm.dismissedNotifications = [];
          vm.priorityNotifications = [];
          // Variables used by notification-bell directive
          vm.notificationsUrl = MESSAGES.notificationsPageURL;
          vm.notificationsEnabled = MESSAGES.notificationsEnabled;
          vm.status = 'View notifications';


          if (vm.notificationsEnabled && !$rootScope.GuestMode) {
            getNotifications();
          }
        };

        // ////////////////
        // Scope methods //
        // ////////////////
        /**
         * On-click event to mark a notification as "seen"
         * @param notification
         * @param isHighPriority
         */
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
            messagesService.setNotificationsSeen(dismissedNotificationIds);
          }

          // Clear priority notification flags if it was a priority
          // notification
          if (isHighPriority) {
            clearPriorityNotificationsFlags();
          }
        };

        /**
         * On-click event to mark a notification as "unseen"
         * @param notification
         */
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
            messagesService.setNotificationsSeen(dismissedNotificationIds);
          }
        };

        /**
         * Track clicks on "Notifications" links in mobile menu and top bar
         * @param category
         * @param action
         * @param label
         */
        $scope.pushGAEvent = function(category, action, label) {
          miscService.pushGAEvent(category, action, label);
        };

        // INITIALIZE THE CONTROLLER
        init();
    }])

    .controller('AnnouncementsController', ['$q', '$log', '$filter',
      '$sessionStorage', '$scope', '$rootScope', '$document', '$sanitize',
      '$mdDialog', 'miscService', 'messagesService', 'MESSAGES',
      function($q, $log, $filter, $sessionStorage, $scope, $rootScope,
               $document, $sanitize, $mdDialog, miscService, messagesService,
               MESSAGES) {
        // //////////////////
        // Local variables //
        // //////////////////
        var vm = this;
        var allAnnouncements = [];
        var separatedAnnouncements = {};
        var seenAnnouncementIds = [];
        var popups = [];

        // Promises to run if filtering is turned on
        var promiseFilteredAnnouncements = {
          filteredByGroup:
            messagesService.getMessagesByGroup(allAnnouncements),
          seenMessageIds:
            messagesService.getSeenMessageIds(),
        };

        // Promise to run if filtering is off
        var promiseAllAnnouncements = {
          seenMessageIds: messagesService.getSeenMessageIds(),
        };

        // ////////////////
        // Local methods //
        // ////////////////
        /**
         * Get all messages, then filter out notifications
         * and pass result on for more filtering
         */
        var getAnnouncements = function() {
          // Get all messages, then filter out notifications
          messagesService.getAllMessages()
            .then(function(result) {
              // Ensure messages exist and check for group filtering
              if (result.messages && result.messages.length > 0) {
                // Use $filter to filter out announcements
                allAnnouncements = $filter('filter')(
                  result.messages,
                  {messageType: 'announcement'}
                );
              }
              filterAnnouncements();
              return result;
            })
            .catch(function(error) {
              // HANDLE ERRORS
            });
        };

        /**
         * If group filtering is enabled, filter announcements
         */
        var filterAnnouncements = function() {
          // If filtering is on, run filter promises
          if (MESSAGES.groupFiltering
            && !localStorage.disableGroupAnnouncementFiltering) {
            $q.all(promiseFilteredAnnouncements)
              .then(filterAnnouncementsSuccess)
              .catch(filterAnnouncementsFailure);
          } else {
            $q.all(promiseAllAnnouncements)
              .then(filterAnnouncementsSuccess)
              .catch(filterAnnouncementsFailure);
          }

          // If filtering is off, run all announcements promise
        };

        /**
         * Separate seen and unseen, then set mascot image or get popups
         * depending on directive mode.
         * @param result
         */
        var filterAnnouncementsSuccess = function(result) {
          var filteredAnnouncements = [];
          // Check for filtered messages
          if (result.filteredByGroup && result.filteredByGroup.length > 0) {
            // Set filtered announcements to the result
            filteredAnnouncements = result.filteredByGroup;
          } else {
            filteredAnnouncements = allAnnouncements;
          }

          // Separate seen and unseen
          if (result.seenMessageIds && result.seenMessageIds.length > 0) {
            separatedAnnouncements = $filter('filterSeenAndUnseen')(
              filteredAnnouncements,
              result.seenMessageIds
            );
            // Set local seenAnnouncementsIds (used for tracking seen
            // messages in the K/V store and sessionStorage
            angular.forEach(separatedAnnouncements.seen, function(value) {
              seenAnnouncementIds.push(value.id);
            });
          } else {
            separatedAnnouncements = {
              seen: [],
              unseen: filteredAnnouncements,
            };
          }

          // If directive mode need mascot, set it, otherwise
          // configure popups
          if (vm.mode === 'mascot' || vm.mode === 'mobile-menu') {
            // Set scope announcements
            vm.announcements = separatedAnnouncements.unseen;
            // Set the mascot image
            setMascot();
          } else {
            // Filter out low priority announcements
            popups = $filter('filter')(
              separatedAnnouncements.unseen,
              {priority: 'high'}
            );
            configurePopups();
          }
        };

        /**
         * Handle errors encountered while resolving promises
         * @param error
         */
        var filterAnnouncementsFailure = function(error) {

        };

        /**
         * Get the latest popup announcement and display it
         */
        var configurePopups = function() {
          // If they exist, put them in order by date, then id
          if (popups.length != 0) {
            var orderedPopups = $filter('orderBy')(
              popups,
              ['goLiveDate', 'id']
            );

            // Set the latest announcement as a scope variable
            // so it can be passed to the dialog
            $scope.latestAnnouncement = orderedPopups[0];

            // Display the latest popup announcement
            var displayPopup = function() {
              $mdDialog.show({
                templateUrl:
                  'portal/messages/partials/announcement-popup-template.html',
                parent: angular.element(document).find('div.my-uw')[0],
                clickOutsideToClose: true,
                openFrom: 'left',
                closeTo: 'right',
                preserveScope: true,
                scope: $scope,
                controller: function DialogController($scope, $mdDialog) {
                  $scope.closeDialog = function(action) {
                    $mdDialog.hide(action);
                  };
                },
              })
              .then(function(action) {
                // If dialog is closed by clicking "continue" button
                miscService.pushGAEvent(
                  'popup',
                  action,
                  $scope.latestAnnouncement.id
                );
                messagesService.setMessageSeen($scope.latestAnnouncement.id);
                return action;
              })
              .catch(function() {
                // If popup is closed by clicking outside or pressing escape
                miscService.pushGAEvent(
                  'popup', 'dismissed', $scope.latestAnnouncement.id);
                messagesService.setMessageSeen($scope.latestAnnouncement.id);
              });
            };
            displayPopup();
          }
        };

        /**
         * Set the mascot image and its fallback
         */
        var setMascot = function() {
          if ($rootScope.portal && $rootScope.portal.theme) {
            vm.mascotImage =
              $rootScope.portal.theme.mascotImg || 'img/robot-taco.gif';
          } else {
            vm.mascotImage = 'img/robot-taco.gif';
          }
          // https://github.com/Gillespie59/eslint-plugin-angular/issues/231
          // eslint-disable-next-line angular/on-watch
          $rootScope.$watch('portal.theme', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              vm.mascotImage = newVal.mascotImg || 'img/robot-taco.gif';
            }
          });
        };

        /**
         * Initialize scope variables and start getting stuff
         */
        var init = function() {
          // Initialize scope variables
          vm.hover = false;
          vm.active = false;
          vm.mode = $scope.mode;
          vm.announcements = [];

          if (MESSAGES.announcementsEnabled && !$rootScope.GuestMode) {
            getAnnouncements();
          }
        };

        // ////////////////
        // Scope methods //
        // ////////////////
        /**
         *
         * @param id
         * @param clickedReadMore
         */
        vm.markSingleAnnouncementSeen = function(id, clickedReadMore) {
          // Use $filter to filter out by ID
          vm.announcements = $filter('filterOutMessageWithId')(
            vm.announcements,
            id
          );

          // Add to seenAnnouncementsIds
          seenAnnouncementIds.push(id);

          // Call service to save results
          messagesService.setAnnouncementsSeen(seenAnnouncementIds);
        };

        /**
         * Add all IDs of unseen announcements to the seenAnnouncements
         * array, then call the messagesService to save results
         */
        vm.markAllAnnouncementsSeen = function() {

        };

        /**
         * Make mascot bobble when hovered
         */
        vm.toggleHover = function() {
          vm.hover = vm.hover ? false : true;
        };

        /**
         * Make mascot appear when clicked
         */
        vm.toggleActive = function() {
          vm.active = !vm.active;
        };

        /**
         * Reset mascot when menu is closed
         */
        $scope.$on('$mdMenuClose', function() {
          vm.hover = false;
          vm.active = false;
        });

        init();
      }])

    .controller('FeaturesPageController', ['$log', '$filter',
      'messagesService', 'MESSAGES', 'MISC_URLS',
      function($log, $filter, messagesService, MESSAGES, MISC_URLS) {
        var vm = this;

        vm.announcements = [];
        vm.MISC_URLS = MISC_URLS;

        if (MESSAGES.announcementsEnabled) {
          // Check if group filtering is enabled

          // If filtering is off, get all messages
          messagesService.getAllMessages()
            .then(function(result) {
              if (result.messages && result.messages.length > 0) {
                // Filter out notification messages using angular's built-in
                // 'filter'
                vm.announcements = $filter('filter')(
                  result.messages,
                  {messageType: 'announcement'}
                );
              }
              return vm.announcements;
            })
            .catch(function(error) {
              $log.warn('Could not get features');
            });
        }
    }]);
});
