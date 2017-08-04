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

        /**
         * Get everything at the messages service endpoint
         * @returns {Array} An array of message objects
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

        /**
         * Filter the array of messages based on each message's groups
         * attribute
         * @param messages An array of message objects
         * @returns {Array} A filtered array of messages
         */
        var getMessagesByGroup = function(messages) {
          return portalGroupService.getGroups()
            .then(function(groups) {
              var messagesByGroup = [];
              angular.forEach(messages, function(message) {
                var added = false;
                // For each group for the current notification
                angular.forEach(message.audienceFilter.groups,
                  function(messageGroup) {
                    if (!added) {
                      // Check for matches against the groups returned
                      // by portalGroupService

                      // var inGroup = $.grep(groups, function(group) {
                      //   return group.name === messageGroup;
                      // }).length;
                      // if (inGroup > 0) {
                      //   // If user is in this group, he should see this
                      //   // notification
                      //   messagesByGroup.push(message);
                      //   added = true;
                      // }
                    }
                });
              });
              return messagesByGroup;
            })
            .catch(function(error) {
              $log.warn('Problem getting groups from portalGroupService');
              miscService.redirectUser(
                error.status, 'Unable to retrieve groups');
            });
        };

        /**
         * Filter the array of messages based on if
         * data was requested before showing
         * @param messages An array of message objects
         * @returns {filteredMessages[]} an array of messages that
         *   includes only non-data messages and messages that requested
         *   data and had data
         */
        var getMessagesByData = function(messages) {
          // Initialize method variables
          var promises = [];
          var filteredMessages = [];

          angular.forEach(messages, function(message) {
            if (message.audienceFilter.dataUrl) {
              // If the message has a dataUrl, add it to promises array
              promises.push($http.get(message.audienceFilter.dataUrl)
                .then(function(result) {
                  var objectToFind = result.data;
                  // If dataObject specified, try to use it
                  if (result && message.audienceFilter.dataObject) {
                    objectToFind =
                      objectToFind[message.audienceFilter.dataObject];
                  }
                  // If dataArrayFilter specified, then use it to filter
                  if (objectToFind && message.audienceFilter.dataArrayFilter) {
                    var arrayFilter = angular.fromJson(
                      message.audienceFilter.dataArrayFilter
                    );
                    // If you try to do an array filter on a non-array,
                    // return blank
                    if (!angular.isArray(objectToFind)) {
                      return;
                    }
                    if ($filter('filter')(
                        objectToFind,
                        arrayFilter
                      ).length > 0) {
                      return message;
                    }
                  } else if (objectToFind) {
                    return message;
                  }
                  return message;
                }).catch(function(error) {
                  $log.warn('Error retrieving data for notification');
                  $log.error(error);
                }
              ));
            } else {
              filteredMessages.push(message);
            }
          });

          // Once all the promises are prepared, run 'em
          return $q.all(promises)
            .then(function(result) {
              angular.forEach(result, function(message) {
                if (message) {
                  filteredMessages.push(message);
                }
              });
              return filteredMessages;
            });
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
          return [2, 3];
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
