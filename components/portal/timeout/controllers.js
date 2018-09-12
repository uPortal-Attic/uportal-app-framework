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
  return angular.module('portal.timeout.controllers', [])
  .controller('PortalTimeoutController', [
    '$sessionStorage', '$log', '$timeout', '$interval',
    '$mdDialog', '$window', 'APP_OPTIONS', 'MISC_URLS',
    'portalShibbolethService', 'sessionInactivityService',
  function(
    $sessionStorage, $log, $timeout, $interval,
    $mdDialog, $window, APP_OPTIONS, MISC_URLS,
    portalShibbolethService, sessionInactivityService
  ) {
    var checkInactiveDelay = 1; // Minutes
    var appInactiveTimeout = APP_OPTIONS.inactivityTimeout; // Minutes

    /**
     * changes minutes to millis
     */
    function toMillis(minutes) {
      return minutes * 60000;
    }

    /**
     * initialize the controller
     */
    function init() {
      if (portalShibbolethService.shibServiceActivated()) {
        // initialize timeout and dialog
        portalShibbolethService.getTimeout().then(
          function(timeoutData) {
            if (timeoutData && timeoutData.expirationMills) {
              $timeout(triggerDialog, timeoutData.expirationMills);
              if (appInactiveTimeout) {
                $interval(checkInactive,
                    toMillis(checkInactiveDelay), 0, false);
              }
            } else {
              $log.info('Timeout data could not be found');
              if ($sessionStorage.portal
                  && $sessionStorage.portal.username
                  && $sessionStorage.portal.username !== 'guest') {
                // we know its not a guest session
                triggerDialog();
              }
            }
            return timeoutData;
          }
        ).catch(function() {
          $log.warn('could not get timeout');
        });
      }
    }

    /**
     * check if the session is close to timing out due to inactivity
     */
    function checkInactive() {
      var inactiveDuration = sessionInactivityService.getInactiveDuration();

      var warningInactiveDuration =
          toMillis(appInactiveTimeout - (2 * checkInactiveDelay));
      var dialogInactiveDuration =
          toMillis(appInactiveTimeout - checkInactiveDelay);
      var finalInactiveDuration =
          toMillis(appInactiveTimeout);

      if (inactiveDuration > finalInactiveDuration) {
        redirect();
      } else if (inactiveDuration > warningInactiveDuration) {
        // Trigger dialog with one minute on the clock
        $timeout(triggerDialog,
            dialogInactiveDuration - inactiveDuration, false);
      }
    }

    /**
     * Reload to continue the session
     */
    function reload() {
      $window.location.reload(true);
    }

    /**
     * Redirect to end the session;
     */
    function redirect() {
      $window.location.replace(MISC_URLS.loginURL);
    }

    /**
     * Trigger a Session Expired dialog box
     */
    function triggerDialog() {
      $mdDialog.show({
        /*
         * this template is inline to avoid accidentally
         * auto-renewing the session.
         */
        template:
          '<md-dialog class="dialog__session-expired" ' +
          'aria-label="are you still there">' +
          '  <md-toolbar>' +
          '    <div class="md-toolbar-tools">' +
          '      <h2>Are you still there?</h2>' +
          '    </div>' +
          '  </md-toolbar>' +
          '  <md-dialog-content class="md-dialog-content">' +
          '    <p>Your session will expire soon. Please reload the ' +
          'page to continue, otherwise you will be logged out.</p>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions layout="row">' +
          '    <md-button aria-label="" ng-click="reloadPage()">' +
          '      Reload' +
          '    </md-button>' +
          '  </md-dialog-actions>' +
          '</md-dialog> ',
        parent: angular.element(document).find('div.my-uw')[0],
        clickOutsideToClose: false,
        openFrom: 'left',
        closeTo: 'right',
        controller: function DialogController($scope, $mdDialog) {
          $scope.closeDialog = function() {
            $mdDialog.hide();
          };
          $scope.reloadPage = function() {
            reload();
          };
        },
      }).finally(function() {
        redirect();
      }).catch($log.error);
    }

    init();
  }]);
});
