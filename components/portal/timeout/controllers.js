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
    var intervalRef;
    var isContinue = true;

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
              refreshSession();
            } else {
              $log.info('Timeout data could not be found');
              if ($sessionStorage.portal
                  && $sessionStorage.portal.username
                  && $sessionStorage.portal.username !== 'guest') {
                // we know its not a guest session
                isContinue = false;
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

      var appID = toMillis(appInactiveTimeout);
      var checkID = toMillis(checkInactiveDelay);
      var warningID = appID - (2 * checkID);
      var dialogID = appID - checkID;
      var finalID = appID;

      if (inactiveDuration >= finalID) {
        isContinue = false;
        triggerDialog();
      } else if (inactiveDuration >= dialogID) {
        triggerDialog();
        $timeout(checkInactive, checkID, false);
      } else if (inactiveDuration >= warningID) {
        // Trigger dialog with one minute on the clock
        $timeout(checkInactive, dialogID - inactiveDuration, false);
        $interval.cancel(intervalRef);
      }
    }

    /**
     * Reload to continue the session
     */
    function reload() {
      $window.location.reload(true);
    }

    /**
     * Refresh the session
     */
    function refreshSession() {
      if (portalShibbolethService.shibServiceActivated()
          && appInactiveTimeout) {
        portalShibbolethService.getSession();
        isContinue = true;
        intervalRef = $interval(checkInactive,
            toMillis(checkInactiveDelay), 0, false);
      }
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
          '    <p>{{dialogText()}}</p>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions layout="row">' +
          '    <md-button aria-label="" ng-click="continueBtn()">' +
          '      {{continueLabel()}}' +
          '    </md-button>' +
          '  </md-dialog-actions>' +
          '</md-dialog> ',
        parent: angular.element(document).find('div.my-uw')[0],
        clickOutsideToClose: false,
        openFrom: 'left',
        closeTo: 'right',
        multiple: false,
        controller: function DialogController($scope, $mdDialog) {
          $scope.continueBtn = function() {
            if (isContinue) {
              refreshSession();
            } else {
              reload();
            }
            $mdDialog.hide();
          };
          $scope.continueLabel = function() {
            return (isContinue)?'OK':'Reload';
          };
          $scope.dialogText = function() {
            var result = 'Your session will expire soon due to inactivity. ' +
              'Please press OK to continue, otherwise you will be logged out.';
            if (!isContinue) {
              result = 'Your session has expired.' +
                ' Please reload the page to continue.';
            }
            return result;
          };
        },
      }).catch($log.error);
    }

    init();
  }]);
});
