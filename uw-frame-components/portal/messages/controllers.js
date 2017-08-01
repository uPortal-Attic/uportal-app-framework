'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.controllers', [])
    .controller('MessagesController', ['$log',
      function($log) {
        $log.log('THIS IS THE MESSAGES CONTROLLER');
    }])

    .controller('NotificationsController', ['$scope', '$rootScope',
      '$location', '$localStorage', 'NOTIFICATION', 'SERVICE_LOC',
      'filterFilter', 'miscService',
      function($scope, $rootScope, $location, $localStorage, NOTIFICATION,
               SERVICE_LOC, filterFilter, miscService) {

    }])

    .controller('FeaturesPageController', ['$log', '$filter', 'messagesService', 'FEATURES', 'MISC_URLS',
      function($log, $filter, messagesService, FEATURES, MISC_URLS) {
        var vm = this;

        vm.features = [];
        vm.MISC_URLS = MISC_URLS;

        if (FEATURES.enabled) {
          // Check if group filtering is enabled for features

          // If filtering is off, get all messages
          messagesService.getAllMessages()
            .then(function(result) {
              if (result.messages && result.messages.length > 0) {
                // Filter out notification messages
                vm.features = $filter('filterForFeatures')(result.messages);
              }
              return vm.features;
            })
            .catch(function(error) {
              $log.warn('Could not get features');
            })
        }

    }]);
});
