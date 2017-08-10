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
            separatedMessages.unseen.push(message);
          } else {
            separatedMessages.seen.push(message);
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
