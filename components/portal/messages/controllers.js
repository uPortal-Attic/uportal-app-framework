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

    .controller('MessagesController', ['$q', '$log', '$scope', '$rootScope',
      '$location', '$localStorage', '$sessionStorage', '$filter', '$mdDialog',
      'APP_FLAGS', 'MISC_URLS', 'SERVICE_LOC', 'miscService', 'messagesService',
      function($q, $log, $scope, $rootScope, $location, $localStorage,
               $sessionStorage, $filter, $mdDialog, APP_FLAGS, MISC_URLS,
               SERVICE_LOC, miscService, messagesService) {
        // //////////////////
        // Local variables //
        // //////////////////
        var allMessages = [];
        $scope.APP_FLAGS = APP_FLAGS;
        $scope.MISC_URLS = MISC_URLS;
        $scope.showMessagesFeatures = true;
        $scope.seenMessageIds = [];
        var seenIdOverride = false;

        // ////////////////
        // Local methods //
        // ////////////////
        /**
         * Get all messages, regardless of validity
         * Call configureMessages to filter messages to the subset
         * which are user-appropriate
         */
        var getMessages = function() {
          messagesService.getAllMessages()
            .then(function(result) {
              if (angular.isArray(result) && result.length > 0) {
                allMessages = result;
                configureMessages(allMessages);
              } else if (angular.isString(result)) {
                $scope.messagesError = result;
              }
              configureMessages(allMessages);
              return allMessages;
            })
            .catch(function(error) {
              $log.warn('Problem getting all messages for messages controller');
              return error;
            });
        };

        // Promise to get seen message IDs
        var promiseSeenMessageIds = function() {
          if (seenIdOverride) {
            // seenIdOverride prevents race condition in calls to the service
            return $q.resolve($scope.seenMessageIds);
          }
          return messagesService.getSeenMessageIds();
        };

        // Promise to resolve data urls in messages
        var promiseMessagesByData = function(messages) {
          return messagesService.getMessagesByData(messages);
        };

        // Promise to resolve group memberships
        var promiseMessagesByGroup = function(messages) {
         return messagesService.getMessagesByGroup(messages);
        };

        /**
         * Filters raw messages by group membership and
         * valid begin/end dates.
         * Resolves URLs in messages.
         *
         * @param {Object} messages
         */
        var configureMessages = function(messages) {
          $q.all([promiseSeenMessageIds(),
          promiseMessagesByData(messages),
          promiseMessagesByGroup(messages)])
          .then(function(result) {
            $scope.seenMessageIds = result[0];
            var dataMessages = result[1];
            var groupedMessages = result[2];
            var filteredMessages = $filter('filterForCommonElements')(
              groupedMessages,
              dataMessages
            );
            var dateFilteredMessages =
              $filter('filterByDate')(filteredMessages);
            var userViewedMessages =
              $filter('filterSeenAndUnseen')(dateFilteredMessages,
                 $scope.seenMessageIds);
            $scope.messages = userViewedMessages.unseen;
            $scope.seenMessages = userViewedMessages.seen;
            $scope.hasMessages = true;
            $rootScope.$broadcast('messagesConfigured');
            return result;
          })
            .catch(function(error) {
              $log.warn(error);
              $scope.showMessagesFeatures = false;
            });
        };
        var reconfigureMessages = $rootScope.$on('configureMessages',
          function(event, data) {
            configureMessages(allMessages);
          });

        /**
         * Marks a single message as seen.
         *
         * @param {Object} message
         */
        $scope.$on('dismissMessage',
        function(event, message) {
          messagesService.dismissMessage(message);
          var index = $scope.seenMessageIds.indexOf(message.id);
          if (index == -1) {
            $scope.seenMessageIds.push(message.id);
            $scope.seenMessages.push(message);

            seenIdOverride = true;
            configureMessages(allMessages);
          }
            $rootScope.$emit('configureMessages');
        });

        $scope.$on('resetMessages', function() {
          getMessages();
        });

        /**
         * Marks a single message as unseen.
         *
         * @param {Object} message
         */
        $scope.$on('messageRestored',
          function(event, message) {
          messagesService.restoreMessage(message)
          .then(function(result) {
            configureMessages(allMessages);
            return true;
          })
          .catch(function(error) {
            handleMessageError(error);
            return false;
          });
        });

        var handleMessageError = function(error) {
          $log.warn(error);
          $scope.showMessagesFeatures = false;
        };

        /**
         * Get messages if messaging features are enabled
         */
        var init = function() {
          $scope.hasMessages = false;
          $scope.messages = {};

          if (!$rootScope.GuestMode && SERVICE_LOC.messagesURL
            && SERVICE_LOC.messagesURL !== '') {
            getMessages();
          } else {
            // Messages features aren't configured properly, possibly
            // on purpose. Communicate this and hide features.
            $scope.showMessagesFeatures = false;
            $scope.messagesError = 'SERVICE_LOC.messageURL is not configured ' +
              '-- hiding messages features.';
          }
        };

        init();
      },
    ])

    .controller('NotificationsController', ['$q', '$log', '$scope', '$window',
      '$rootScope', '$location', '$localStorage', '$filter', 'MESSAGES',
      'SERVICE_LOC', 'miscService', 'messagesService', 'orderByFilter',
      function($q, $log, $scope, $window, $rootScope, $location, $localStorage,
               $filter, MESSAGES, SERVICE_LOC, miscService, messagesService,
               orderByFilter) {
        // //////////////////
        // Local variables //
        // //////////////////
        var vm = this;

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
        vm.showMessagesFeatures = true;
        vm.titleLengthLimit = 140;

        var configureNotifications = function() {
          vm.isLoading = true;
          var parentMessages = null;
          if ($scope.$parent.messages) {
            parentMessages =
              $filter('separateMessageTypes')($scope.$parent.messages);
          } else {
            parentMessages = [];
          }
          vm.notifications = parentMessages.notifications;

          var parentSeenMessages = null;
          if ($scope.$parent.seenMessages) {
            parentSeenMessages =
              $filter('separateMessageTypes')($scope.$parent.seenMessages);
          } else {
            parentSeenMessages = [];
          }

          vm.dismissedNotifications = parentSeenMessages.notifications;
          vm.priorityNotifications = $filter('filter')(
            vm.notifications,
            {priority: 'high'}
          );
          if ($scope.$parent.messagesError) {
            notificationError($scope.$parent.messagesError);
          }
          // Set aria-label in notifications bell
          vm.status = 'You have '
            + (vm.notifications.length === 0
              ? 'no' : vm.notifications.length)
            + ' notifications';

          if (vm.priorityNotifications.length === 1) {
              vm.pushGAEvent(
                'Priority notification',
                'Render',
                vm.priorityNotifications[0].id
              );
          }
          // Stop loading spinner
          vm.isLoading = false;
      };

        var notificationError = function(error) {
          vm.messagesError = $scope.$parent.messagesError;
          if (error) {
            $log.warn(error);
          }
          vm.showMessagesFeatures = false;
          vm.isLoading = false;
        };

        // //////////////////
        // Event listeners //
        // //////////////////
        // configuremessages with group override

        /**
         * Process event where notifications have changed,
         * i.e. a dismissal, and ensure that all instances of the
         * controller are updated.
         */
        var notificationChange = $rootScope.$on('messagesConfigured',
          function() {
            configureNotifications();
          });
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
         */
        vm.dismissNotification = function(notification) {
          vm.isLoading = true;
          vm.notifications = $filter('filterOutMessageWithId')(
            vm.notifications,
            notification.id
          );
          if (notification.priority == 'high') {
            vm.priorityNotifications = $filter('filterOutMessageWithId')(
              vm.priorityNotifications,
              notification.id
            );
          }
          $scope.$emit('dismissMessage', notification);
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

          $scope.$emit('messageRestored', notification);
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
    }])

    .controller('AnnouncementsController', ['$q', '$log', '$filter',
      '$sessionStorage', '$scope', '$rootScope', '$document', '$sanitize',
      '$mdDialog', 'miscService',
      'messagesService', 'PortalAddToHomeService', 'MISC_URLS',
      function($q, $log, $filter, $sessionStorage, $scope, $rootScope,
               $document, $sanitize, $mdDialog, miscService,
               messagesService, PortalAddToHomeService, MISC_URLS) {
        // //////////////////
        // Local variables //
        // //////////////////
        var vm = this;
        var allAnnouncements = [];
        var separatedAnnouncements = {};
        var seenAnnouncementIds = [];
        var popups = [];
        var allSeenMessageIds = [];

        // Promise to get seen message IDs
        var promiseSeenMessageIds = {
          seenMessageIds: messagesService.getSeenMessageIds(),
        };

        // ///////////////////
        // Bindable members //
        // ///////////////////
        vm.hover = false;
        vm.active = false;
        vm.mode = $scope.mode;
        vm.announcements = [];
        vm.showMessagesFeatures = true;

        // //////////////////
        // Event listeners //
        // //////////////////
        /**
         * When the parent controller has messages, initialize
         * things dependent on messages
         */
        $scope.$watch('$parent.hasMessages', function(hasMessages) {
          // If the parent scope has messages and messages config is set up,
          // complete initialization
          if (hasMessages) {
            if (angular.equals($scope.$parent.showMessagesFeatures, true)) {
              configureAnnouncementsScope();
            } else {
              vm.showMessagesFeatures = false;
              vm.isLoading = false;
            }
          }
        });

        // ////////////////
        // Local methods //
        // ////////////////
        /**
         * Inherit announcements from parent controller messages
         */
        var configureAnnouncementsScope = function() {
          if ($scope.$parent.messages.announcements) {
            allAnnouncements = $scope.$parent.messages.announcements;
            // Get seen message IDs, then configure scope
            $q.all(promiseSeenMessageIds)
              .then(getSeenMessageIdsSuccess)
              .catch(getSeenMessageIdsFailure);
          }
        };

        /**
         * Separate seen and unseen, then set mascot image or get popups
         * depending on directive mode.
         * @param {Object} result - Data returned by promises
         */
        var getSeenMessageIdsSuccess = function(result) {
          if (result.seenMessageIds && angular.isArray(result.seenMessageIds)
            && result.seenMessageIds.length > 0) {
            // Save all seenMessageIds for later
            allSeenMessageIds = result.seenMessageIds;

            // Separate seen and unseen
            separatedAnnouncements = $filter('filterSeenAndUnseen')(
              allAnnouncements,
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
              unseen: allAnnouncements,
            };
          }

          $filter('addToHome')(
            separatedAnnouncements.unseen,
            MISC_URLS, PortalAddToHomeService
          );


          // If directive mode need mascot, set it, otherwise
          // configure popups
          if (vm.mode === 'mascot' || vm.mode === 'mobile-menu') {
            // Set scope announcements
            vm.announcements = separatedAnnouncements.unseen;
            // Set the mascot image
            setMascot();
            // Notify listeners if there are unseen announcements
            messagesService.broadcastAnnouncementFlag(
              vm.announcements.length > 0
            );
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
         * @param {Object} error
         */
        var getSeenMessageIdsFailure = function(error) {
          // HANDLE ERRORS
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
                seenAnnouncementIds.push($scope.latestAnnouncement.id);
                messagesService.setMessagesSeen(allSeenMessageIds,
                  seenAnnouncementIds, 'dismiss');
                return action;
              })
              .catch(function() {
                // If popup is closed by clicking outside or pressing escape
                miscService.pushGAEvent(
                  'popup', 'dismissed', $scope.latestAnnouncement.id);
                seenAnnouncementIds.push($scope.latestAnnouncement.id);
                messagesService.setMessagesSeen(allSeenMessageIds,
                  seenAnnouncementIds, 'dismiss');
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

        // ////////////////
        // Scope methods //
        // ////////////////
        /**
         * Remove dismissed announcement from scope announcements,
         * then update storage
         * @param {string} id
         */
        vm.markSingleAnnouncementSeen = function(id) {
          // Use $filter to filter out by ID
          vm.announcements = $filter('filterOutMessageWithId')(
            vm.announcements,
            id
          );
          // Notify up the chain so main menu knows about it
          messagesService.broadcastAnnouncementFlag(
            vm.announcements.length > 0
          );
          // Add to seenAnnouncementsIds
          seenAnnouncementIds.push(id);
          // Call service to save results
          messagesService.setMessagesSeen(allSeenMessageIds,
            seenAnnouncementIds, 'dismiss');
          miscService.pushGAEvent('mascot', 'dismissed', id);
        };

        vm.moreInfoButton = function(actionButton) {
          miscService.pushGAEvent('mascot', 'more info', actionButton.url);
        };

        vm.takeButtonAction = function(actionButton) {
          var url = actionButton.url;
          var actionType = 'other';
          var addToHome = 'addToHome';
          if (url.indexOf(addToHome) !== -1) {
              actionType = addToHome;
          }

          miscService.pushGAEvent('mascot', actionType, actionButton.url);

          if (actionType == addToHome) {
            var slash = url.lastIndexOf('/') + 1;
            var fName = url.substr(slash);
            $rootScope.addPortletToHome(fName);
            actionButton.label = 'On your home';
            actionButton.disabled = true;
          }
        };

        /**
         * Add all IDs of unseen announcements to the seenAnnouncements
         * array, then call the messagesService to save results
         */
        vm.markAllAnnouncementsSeen = function() {
          angular.forEach(separatedAnnouncements.unseen, function(value) {
            seenAnnouncementIds.push(value.id);
          });
          messagesService.setMessagesSeen(allSeenMessageIds,
            seenAnnouncementIds, 'dismiss');
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
      }])

    .controller('FeaturesPageController', ['$scope', '$q',
      '$log', 'messagesService', 'MISC_URLS',
      function($scope, $q, $log, messagesService, MISC_URLS) {
        var vm = this;

        vm.announcements = [];
        vm.MISC_URLS = MISC_URLS;

        // //////////////////
        // Event listeners //
        // //////////////////
        /**
         * When the parent controller has messages, initialize
         * things dependent on messages
        $scope.$watch('$parent.hasMessages', function(hasMessages) {
          // If the parent scope has messages and notifications are enabled,
          // complete initialization
          if (hasMessages) {
            if ($scope.$parent.messages.announcements) {
              vm.announcements = $scope.$parent.messages.announcements;
              // Notify service there are no more announcements to see
              messagesService.broadcastAnnouncementFlag(false);
              $q.all(promiseSeenMessageIds)
                .then(getSeenMessageIdsSuccess)
                .catch(function() {
                  $log.log('Problem getting seen IDs on features page');
                });
            }
          }
        });
        /**
         * Get seen message IDs, then mark all announcements seen
         * @param {Object} result - Data returned by promises
         */
        var getSeenMessageIdsSuccess = function(result) {
          var originalSeenMessageIds = [];
          var newSeenMessageIds = [];

          // Set already-seen messages if any exist
          if (result.seenMessageIds && angular.isArray(result.seenMessageIds)
            && result.seenMessageIds.length > 0) {
            // Save all seenMessageIds for later
            originalSeenMessageIds = result.seenMessageIds;
          }

          // Add IDs of all announcements to seen array
          angular.forEach(vm.announcements, function(value) {
            newSeenMessageIds.push(value.id);
          });

          // Mark all announcements seen
          messagesService.setMessagesSeen(originalSeenMessageIds,
            newSeenMessageIds, 'dismiss');
        };
    }]);
});
