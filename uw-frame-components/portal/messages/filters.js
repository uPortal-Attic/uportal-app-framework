'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.filters', [])
    .filter('filterForFeatures', function() {
      return function(messages) {
        var filteredMessages = [];
        for (var i = 0; i < messages.length; i++) {
          // If the message has multiple types, check for announcement types
          if (angular.isArray(messages[i].messageType)) {
            if (messages[i].messageType.indexOf('mascotFeature') !== -1
              || messages[i].messageType.indexOf('popupFeature') !== -1) {
              // It's a feature type, add it
              filteredMessages.push(messages[i]);
            }
          } else {
            if (messages[i].messageType === 'mascotFeature'
              || messages[i].messageType === 'popupFeature') {
              // It's a feature type, add it
              filteredMessages.push(messages[i]);
            }
          }
        }

        console.log('filtered messages:');
        console.log(filteredMessages);

        return filteredMessages;
      };
    });
});
