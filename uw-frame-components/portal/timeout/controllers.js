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
    '$sessionStorage', '$log', '$location', '$timeout',
    '$mdDialog', '$window', 'MISC_URLS', 'portalShibbolethService',
  function(
    $sessionStorage, $log, $location, $timeout,
    $mdDialog, $window, MISC_URLS, portalShibbolethService
  ) {
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
     * Trigger a Session Expired dialog box
     */
    function triggerDialog() {
      var alert = $mdDialog.alert({
        title: 'Session Expired',
        textContent: 'Your session has expired. ' +
          'Please click below to login, or close this window to logout.',
        ok: 'Login',
      });
      $mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
          $window.location.replace(MISC_URLS.loginURL);
        });
    }

    init();
  }]);
});
