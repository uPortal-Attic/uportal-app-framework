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
      '$q', '$log', '$scope', '$rootScope', '$location', '$localStorage',
      '$sessionStorage', '$filter', '$mdDialog', 'APP_FLAGS', 'MISC_URLS',
      'SERVICE_LOC', 'mainService', 'miscService', 'messagesService',
      function($q, $log, $scope, $rootScope, $location, $localStorage,
               $sessionStorage, $filter, $mdDialog, APP_FLAGS, MISC_URLS,
               SERVICE_LOC, mainService, miscService, messagesService) {
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
          console.log("trigger", messages);
          document.dispatchEvent(new CustomEvent('myuw-has-notifications', {
            bubbles: true,
            detail: {
              notifications: messages
            }
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
});
