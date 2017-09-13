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
  return angular.module('portal.messages.filters', [])
    .filter('separateMessageTypes', ['$filter', function($filter) {
      return function(messages) {
        var separatedMessages = {
          notifications: [],
          announcements: [],
        };
        separatedMessages.announcements = $filter('filter')(
          messages,
          {messageType: 'announcement'}
        );
        separatedMessages.notifications = $filter('filter')(
          messages,
          {messageType: 'notification'}
        );
        return separatedMessages;
      };
    }])
    .filter('addToHome', function() {
      return function(messages, MISC_URLS, PortalAddToHomeService) {
        angular.forEach(messages, function(message) {
          if (message.actionButton) {
            var url = message.actionButton.url;
            var addToHome = 'addToHome';

             if (url.indexOf(addToHome) !== -1) {
                var slash = url.lastIndexOf('/') + 1;
                var fName = url.substr(slash);
                if (PortalAddToHomeService.inHome(fName)) {
                  message.actionButton.label = 'Added To Home';
                }
             }
            }
          });
        };
      })
    .filter('filterSeenAndUnseen', function() {
      return function(messages, seenMessageIds) {
        var separatedMessages = {
          seen: [],
          unseen: [],
        };
        // Split messages in separate arrays
        // based on whether the id matches a seen id
        angular.forEach(messages, function(message) {
          if (seenMessageIds.indexOf(message.id) != -1) {
            separatedMessages.seen.push(message);
          } else {
            separatedMessages.unseen.push(message);
          }
        });
        return separatedMessages;
      };
    })
    .filter('filterOutMessageWithId', function() {
      return function(messages, idToFilterOut) {
        angular.forEach(messages, function(value, key) {
          if (value.id === idToFilterOut) {
            messages.splice(key, 1);
          }
        });
        return messages;
      };
    })
    .filter('filterForCommonElements', function() {
      return function(array1, array2) {
        return array1.filter(function(element) {
          return array2.indexOf(element) != -1;
        });
      };
    });
});
