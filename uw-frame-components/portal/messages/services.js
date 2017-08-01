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
      'FEATURES',
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
               FEATURES,
               KV_KEYS) {

        /////////////////////
        // Local variables //
        /////////////////////
        var promises;

        ///////////////////
        // Local methods //
        ///////////////////

        /////////////////////
        // Exposed methods //
        /////////////////////

        /**
         * @typedef {Object} Message
         * @property {number} id
         * @property {array] messageType
         * @property {string} title
         * @property {string} titleShort
         * @property {string} description
         * @property {string} descriptionShort
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

        var getFilteredMessages = function() {

        };

        var getUnseenMessages = function() {

        };

        var setMessageSeen = function() {

        };

        return {
          getAllMessages: getAllMessages,
          getFilteredMessages: getFilteredMessages,
          getUnseenMessages: getUnseenMessages,
          setMessageSeen: setMessageSeen
        };
    }]);
});
