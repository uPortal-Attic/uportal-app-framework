/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.controllers', [])

    .controller('MessagesController', [
      '$q', '$log', '$scope', '$document', '$localStorage',
      '$filter', 'APP_FLAGS', 'MISC_URLS',
      'SERVICE_LOC', 'mainService', 'messagesService',
      function($q, $log, $scope, $document, $localStorage,
        $filter, APP_FLAGS, MISC_URLS,
        SERVICE_LOC, mainService, messagesService) {
        // //////////////////
        // Local variables //
        // //////////////////
        var allMessages = [];
        $scope.APP_FLAGS = APP_FLAGS;
        $scope.MISC_URLS = MISC_URLS;
        $scope.showMessagesFeatures = false;

        // ////////////////
        // Local methods //
        // ////////////////
        /**
         * Get all messages, then pass result on for filtering
         */
        var getMessages = function() {
          messagesService.getAllMessages()
            .then(function(result) {
              // Ensure messages exist and check for group filtering
              if (angular.isArray(result) && result.length > 0) {
                allMessages = result;
              } else if (angular.isString(result)) {
                $scope.messagesError = result;
              }

              if ( $localStorage.showAllMessages ) {
                // simulate the side effect of filterMessages
                $scope.messages = allMessages;
                $scope.hasMessages = true;
                $scope.seenMessageIds = messagesService.getSeenMessageIds();
                triggerMessages($scope.messages);
              } else {
                filterMessages(allMessages);
                // side effects:
                // sets $scope.messages and $scope.hasMessages
                // and $scope.seenMessageIds
              }

              return allMessages;
            })
            .catch(function(error) {
              $log.warn('Problem getting all messages for messages controller');
              $log.warn(error);
              return error;
            });
        };
        // Promise to get seen message IDs
        var promiseSeenMessageIds = function() {
          return messagesService.getSeenMessageIds();
        };

        // Promise to resolve urls in messages
        var promiseMessagesByData = function(messages) {
          messagesService.getMessagesByData(messages)
            .then(dataMessageSuccess)
            .catch(filterMessagesFailure);
        };

        // Promise to resolve group memberships
        var promiseMessagesByGroup = function(messages) {
          return messagesService.getMessagesByGroup(messages);
        };
        /**
         * Determine whether or not messages need to be filtered
         * by group and data, then execute the relevant promises
         * @param {Object} allMessages
         */
        var filterMessages = function(allMessages) {
          var dateFilterMessages =
            $filter('filterByDate')(allMessages);
          var groupPromise = promiseMessagesByGroup(dateFilterMessages);

          $q.all([promiseSeenMessageIds(),
                  groupPromise])
            .then(filterMessagesSuccess)
            .catch(filterMessagesFailure);
          };

         /**
         * Separate the message types in scope for child controllers
         * @param {Object} result
         */
        var filterMessagesSuccess = function(result) {
          $scope.seenMessageIds = result[0];
          var grpMsg = result[1];

          var seenAndUnseen =
            $filter('filterSeenAndUnseen')(grpMsg, $scope.seenMessageIds);

          $q.all(promiseMessagesByData(seenAndUnseen.unseen));
        };

        var dataMessageSuccess = function(result) {
          $scope.messages = result;
          $scope.hasMessages = true;
          triggerMessages($scope.messages);
        };

        var triggerMessages = function(messages) {
          $document[0].dispatchEvent(new CustomEvent('myuw-has-notifications', {
            bubbles: true,
            detail: {
              notifications: messages,
            },
          }));
        };

        /**
         * Handle errors that occur while resolving promises to
         * get notifications
         * @param {Object} error
         */
        var filterMessagesFailure = function(error) {
          $log.warn('Problem getting messages from messagesService');
        };

        /**
         * Get messages if messaging features are enabled
         */
        var init = function() {
          $scope.hasMessages = false;
          $scope.messages = {};

          mainService.isGuest().then(function(isGuest) {
            $scope.guestMode = isGuest;
            if (!isGuest && SERVICE_LOC.messagesURL &&
              SERVICE_LOC.messagesURL.length > 0) {
              $scope.showMessagesFeatures = true;
              getMessages();
            }
            return isGuest;
          }).catch(function() {
            $log.warn('Problem checking guestMode');
          });
        };

        init();
      },
    ])

    .controller('NotificationsController', ['$q', '$log', '$document',
    '$scope', '$window', '$rootScope', '$filter', 'MESSAGES',
    'SERVICE_LOC', 'miscService', 'messagesService', 'orderByFilter',
    function($q, $log, $document, $scope, $window, $rootScope,
             $filter, MESSAGES, SERVICE_LOC, miscService, messagesService,
             orderByFilter) {
      // //////////////////
      // Local variables //
      // //////////////////
      var vm = this;
      var allNotifications = [];
      var separatedNotifications = {};
      var dismissedNotificationIds = [];
      var allSeenMessageIds = [];

      // Promise to get seen message IDs
      var promiseSeenMessageIds = {
        seenMessageIds: messagesService.getSeenMessageIds(),
      };

      // ///////////////////
      // Bindable members //
      // ///////////////////
      vm.notifications = [];
      vm.dismissedNotifications = [];
      vm.priorityNotifications = [];
      vm.notificationsUrl = MESSAGES.notificationsPageURL;
      vm.status = 'View notifications';
      vm.isLoading = true;
      vm.renderLimit = 3;
      vm.titleLengthLimit = 140;

      // //////////////////
      // Event listeners //
      // //////////////////

      /**
       * Process event where notifications have changed,
       * i.e. a dismissal, and ensure that all instances of the
       * controller are updated.
       */
      var notificationChange = $rootScope.$on('notificationChange',
        function() {
          configureNotificationsScope();
          configurePriorityNotificationsScope();
        });

      /**
       * When the parent controller has messages, initialize
       * things dependent on messages
       */
      $scope.$watch('$parent.hasMessages', function(hasMessages) {
        // If the parent scope has messages and notifications are enabled,
        // complete initialization
        if (hasMessages) {
          // Check if messages service failed
          if ($scope.$parent.messagesError) {
            vm.messagesError = $scope.$parent.messagesError;
          }
          // If messages config is set up, configure scope
          // Else hide messages features
          if (angular.equals($scope.$parent.showMessagesFeatures, true)) {
            configureNotificationsScope();
          } else {
            vm.showMessagesFeatures = false;
            vm.isLoading = false;
          }
        }
      });

      $document[0].addEventListener('myuw-notification-dismissed',
        function(event) {
          // The event passes a detail object with properties: "notificationId",
          // which is the "id" value of the dismissed notification, and
          // "dismissedFromOutside", which is used to sync states between this
          // and myuw-notifications
          if (event.detail.hasOwnProperty('dismissedFromOutside') == false) {
            var dismissedNotificationId = event.detail.notificationId;
            vm.dismissNotification(dismissedNotificationId, false);
          }
        }, false);

      // ////////////////
      // Local methods //
      // ////////////////
      /**
       * Get notifications from parent scope, then pass them on
       * for filtering by seen/unseen
       */
      var configureNotificationsScope = function() {
        if ($scope.$parent.messages) {
          allNotifications = $scope.$parent.messages;
          vm.showMessagesFeatures = true;
          // Get seen message IDs, then configure scope
          $q.all(promiseSeenMessageIds)
            .then(getSeenMessageIdsSuccess)
            .catch(getSeenMessageIdsFailure);
        }
      };

      /**
       * Separate seen and unseen notifications, then set scope variables
       * @param {Object} result
       */
      var getSeenMessageIdsSuccess = function(result) {
        if (result.seenMessageIds && angular.isArray(result.seenMessageIds)
          && result.seenMessageIds.length > 0) {
          // Save all seenMessageIds for later
          allSeenMessageIds = result.seenMessageIds;

          // Separate seen and unseen
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
        } else {
          // If there aren't any seen notification IDs, just set all
          // notifications
          vm.notifications = allNotifications;
        }

        // Configure priority notifications scope
        configurePriorityNotificationsScope();

        // Set aria-label in notifications bell
        vm.status = 'You have '
          + (vm.notifications.length === 0
            ? 'no' : vm.notifications.length)
          + ' notifications';

        // Stop loading spinner
        vm.isLoading = false;
      };

      /**
       * Handle errors getting seen message IDs
       * @param {Object} error
       */
      var getSeenMessageIdsFailure = function(error) {
        $log.warn('Couldn\'t get seen message IDs for notifications ' +
          ' controller.');
        // Stop loading spinner
        vm.isLoading = false;
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
        // If priority notifications exist, notify listeners
        messagesService.broadcastPriorityFlag(
          vm.priorityNotifications.length > 0
        );
        // If there is only one priority notification, track
        // rendering in analytics
        if (vm.priorityNotifications.length === 1) {
          vm.pushGAEvent(
            'Priority notification',
            'Render',
            vm.priorityNotifications[0].id
          );
        }
      };

      // ////////////////
      // Scope methods //
      // ////////////////
      /**
       * Check if user is viewing notifications page
       * @return {boolean}
       */
      vm.isNotificationsPage = function() {
        return $window.location.pathname === MESSAGES.notificationsPageURL;
      };

      /**
       * On-click event to mark a notification as "seen"
       * @param {Object} notification
       * @param {boolean} isHighPriority
       */
      vm.dismissNotification = function(notificationId, dismissedFromOutside) {
        // Add notification to dismissed array
        var dismissedNotification = $filter('filterMessageWithIdOnly')(
          vm.notifications,
          notificationId
        );

        vm.dismissedNotifications.push(dismissedNotification);

        vm.notifications = $filter('filterOutMessageWithId')(
          vm.notifications,
          notificationId
        );

        // Add notification's ID to local array of dismissed notification IDs
        dismissedNotificationIds.push(notificationId);

        // Call service to save changes if k/v store enabled
        if (SERVICE_LOC.kvURL) {
          messagesService.setMessagesSeen(allSeenMessageIds,
            dismissedNotificationIds, 'dismiss');
        }

        // Dispatch event to notify myuw-notifications on the dismissal
        $document[0].dispatchEvent(
          new CustomEvent('myuw-notification-dismissed', {
            detail: {
              notificationId: notificationId,
              dismissedFromOutside: dismissedFromOutside,
            },
          }
        ));
      };

      /**
       * On-click event to mark a notification as "unseen"
       * @param {Object} notification
       * @param {boolean} isHighPriority
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
          messagesService.setMessagesSeen(allSeenMessageIds,
            dismissedNotificationIds, 'restore');
        }

        // Dispatch event to notify myuw-notifications on the restoration
        $document[0].dispatchEvent(new CustomEvent('myuw-has-notifications', {
          bubbles: true,
          detail: {
            notifications: [notification],
          },
        }));

        notificationChange();
      };

      /**
       * Log a Google Analytics event for each notification rendered
       * when a user opens the notifications bell menu
       */
      vm.trackRenderedNotifications = function() {
        // Order notifications by priority flag
        var orderedNotifications = orderByFilter(
          vm.notifications,
          'priority'
        );
        // Slice array to first 3 entries (the ones that would be rendered)
        orderedNotifications = $filter('limitTo')(
          orderedNotifications,
          vm.renderLimit
        );
        // Log a render event for each rendered notification
        angular.forEach(orderedNotifications, function(notification) {
          vm.pushGAEvent(
            'Notification menu',
            'Rendered notification',
            notification.id
          );
        });
      };

      /**
       * Track clicks on "Notifications" links in mobile menu and top bar
       * @param {string} category - Context of the event
       * @param {string} action - Action taken
       * @param {string} label - Label/data pertinent to event
       */
      vm.pushGAEvent = function(category, action, label) {
        miscService.pushGAEvent(category, action, label);
      };
    }]
  );
});
