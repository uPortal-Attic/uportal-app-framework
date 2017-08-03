'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.services', [])
    .factory('messagesService', [
      '$http',
      '$log',
      '$localStorage',
      '$q',
      '$filter',
      'portalGroupService',
      'miscService',
      'keyValueService',
      'SERVICE_LOC',
      'MESSAGES',
      'KV_KEYS',
      function($http,
               $log,
               $localStorage,
               $q,
               $filter,
               portalGroupService,
               miscService,
               keyValueService,
               SERVICE_LOC,
               MESSAGES,
               KV_KEYS) {
        // //////////////////
        // Local variables //
        // //////////////////
        // var promises;

        // ////////////////
        // Local methods //
        // ////////////////

        // //////////////////
        // Exposed methods //
        // //////////////////

        /**
         * @typedef {Object} Message
         * @property {number} id
         * @property {string} title
         * @property {string} titleShort
         * @property {string} description
         * @property {string} descriptionShort
         * @property {string} messageType
         * @property {string} goLiveDate
         * @property {string} expireDate
         * @property {string} featureImageUrl
         * @property {string} priority
         * @property {Object} actionButton
         * @property {Object} moreInfoButton
         * @property {Object} confirmButton
         */

        var getAllMessages = function() {
          return $http.get(SERVICE_LOC.messagesURL)
            .then(function(response) {
              return response.data;
            })
            .catch(function(error) {
              miscService.redirectUser(error.status, 'Get all messages');
            });
        };

        var getMessagesByGroup = function() {

        };

        var getMessagesByData = function() {

        };

        var getSeenMessageIds = function() {
          if (!keyValueService.isKVStoreActivated()) {
            return $q.resolve([]);
          }
          // return keyValueService.getValue(KV_KEYS.SEEN_MESSAGE_IDS)
          //   .then(function(data) {
          //     if (data && angular.isString(data.value)) {
          //       // If data exists and is a string, check for emptiness
          //       if (data.value) {
          //         // If string contains things, return parsed JSON
          //         return angular.fromJson(data.value);
          //       } else {
          //         // If it's empty, return empty array
          //         return [];
          //       }
          //     } else if (data && angular.isArray(data)) {
          //       // If data exists but it's just JSON, return the data
          //       return data;
          //     } else {
          //       // If nothing exists, return empty array
          //       return [];
          //     }
          //   })
          //   .catch(function(error) {
          //     $log.error('Could not get seen message IDs');
          //     $log.error(error);
          //     return [];
          //   });
          return [];
        };

        var setNotificationsSeen = function(ids) {
          keyValueService.setValue(KV_KEYS.VIEWED_NOTIFICATION_IDS, ids);
        };

        var setAnnouncementsSeen = function(ids) {
          keyValueService.setValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS, ids);
        };

        return {
          getAllMessages: getAllMessages,
          getMessagesByGroup: getMessagesByGroup,
          getMessagesByData: getMessagesByData,
          getSeenMessageIds: getSeenMessageIds,
          setNotificationsSeen: setNotificationsSeen,
          setAnnouncementsSeen: setAnnouncementsSeen,
        };
    }]);
});
