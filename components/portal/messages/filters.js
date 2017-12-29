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

define(['angular', 'moment'], function(angular, moment) {
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
              PortalAddToHomeService.inHome(fName).then(function(result, text) {
                if (result) {
                  message.actionButton.label = 'On your home';
                  message.actionButton.disabled = true;
                  return true;
                } else {
                  message.actionButton.label = 'Add to home';
                  message.actionButton.disabled = null;
                  return false;
                }
              })
              .catch(function() {
                message.actionButton.label = 'Add to home';
                message.actionButton.disabled = null;
                return false;
              });
            }
          }
        });
      };
    })
    .filter('filterByDate', function() {
      return function(messages) {
          var thePresent = moment.now();
          return messages.filter(function(message) {
            var goDate = moment(message.goLiveDate);
            var stopDate = moment(message.expireDate);

            // If neither date is populated, message is valid.
            if (!goDate.isValid() && !stopDate.isValid()) {
              return message;
            }

            // If both dates are populated,
            // check if current date is in range.
            if (goDate.isValid() && stopDate.isValid()) {
              if (goDate.isBefore(thePresent)
                && stopDate.isAfter(thePresent)) {
                return message;
              }
            }

            // Check for valid goLiveDate
            if (goDate.isValid() && !stopDate.isValid() &&
              goDate.isBefore(thePresent)) {
              return message;
            }

            // Check for valid expireDate
            if (stopDate.isValid() && !goDate.isValid() &&
             stopDate.isAfter(thePresent)) {
              return message;
            }
          });
        };
      })
    .filter('filterByGroup', ['$filter', function($filter) {
      return function(messages, groupsIAmAMemberOf) {
        var groupMessages = [];
        angular.forEach(messages, function(message) {
          // If the message has no groups defined, show it to everyone.
          if (!message.audienceFilter.groups ||
            message.audienceFilter.groups.length == 0) {
             groupMessages.push(message);
          } else {
            var added = false;
            // Iterate through the groups at which the message is tageted
            // If there's a match with groupsIAmAMemberOf, return it
            angular.forEach(message.audienceFilter.groups, function(group) {
              if (!added) {
                var index = groupsIAmAMemberOf.indexOf(group);
                if (index > - 1) {
                  groupMessages.push(message);
                  added = true;
                }
              }
            });
          }
        });
        return groupMessages;
      };
    }])
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
    })
    .filter('trim', function() {
      return function(input) {
        return input.trim();
      };
    });
});
