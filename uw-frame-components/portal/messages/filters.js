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
                var slash = url.lastIndexOf('/') +1;
                var fName = url.substr(slash);
                if (PortalAddToHomeService.inHome(fName)) {
                  message.actionButton.label = 'Added To Home';
                }

//              var resolvedURL =
//                MISC_URLS.addToHomeURLS.addToHomeActionURL + fName;
//              message.actionButton.url = resolvedURL;
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
