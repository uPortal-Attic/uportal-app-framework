'use strict';

define(['angular'], function(angular) {
  return angular.module('portal.messages.controllers', [])
    .controller('MessagesController', ['$log',
      function($log) {
        $log.log('THIS IS THE MESSAGES CONTROLLER');
    }]);
});
