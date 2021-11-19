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
  return angular.module('portal.settings.controllers', [])

  .controller('PortalBetaSettingsController', [
    '$sessionStorage', '$scope', '$rootScope', '$mdTheming',
    'portalSkinService', 'THEMES', 'APP_BETA_FEATURES', 'FRAME_BETA_FEATURES',
    function(
      $sessionStorage, $scope, $rootScope, $mdTheming, portalSkinService,
      THEMES, APP_BETA_FEATURES, FRAME_BETA_FEATURES
    ) {
    $scope.options = FRAME_BETA_FEATURES.concat(APP_BETA_FEATURES);
    $scope.$watch('portal.theme', function(newValue, oldValue) {
      if ($scope.portal.theme) {
        $sessionStorage.portal.theme = $scope.portal.theme;
        $sessionStorage.portal.theme.themeVersion = THEMES.themeVersion;
        $mdTheming.generateTheme($sessionStorage.portal.theme.name, null);
        // Set browser color
        $mdTheming.setBrowserColor({
          theme: $sessionStorage.portal.theme.name,
          palette: $scope.portal.theme.name + '-primary',
          hue: '500',
        });
        if ($scope.portal.theme && $scope.portal.theme.portalSkinKey) {
          portalSkinService.setPortalSkin($scope.portal.theme.portalSkinKey);
        }
        // Tell scope the theme changed
        $rootScope.$broadcast('themeChanged', $scope.portal.theme);
      }
    });
  }])
    .controller('PortalUserSettingsController', [
      '$scope', '$q', '$http','$window', 'newLayoutResetService', '$localStorage', '$timeout', '$mdToast',
      '$log', '$sessionStorage', '$rootScope', '$mdDialog',
      'KV_KEYS', 'keyValueService', 'miscService', 'APP_FLAGS', 'SERVICE_LOC',
      function(
      $scope, $q, $http, $window, newLayoutResetService, $localStorage, $timeout, $mdToast,
      $log, $sessionStorage, $rootScope, $mdDialog,
      KV_KEYS, keyValueService, miscService, APP_FLAGS, SERVICE_LOC
    ) {
      var init = function() {
        $scope.kvEnabled = keyValueService.isKVStoreActivated();
        $scope.KV_KEYS = KV_KEYS;
      };

      $scope.resetNewLayout = function() {
        newLayoutResetService.resetNewLayoutPOST().then(
        function() {
          $scope.resetLayoutSuccess = true;
          $scope.resetLayoutFail = false;
          $log.log('reset layout succeeded');

          var logInAgainRequiredAlert = $mdDialog.alert()
          .title('MyUW session reset required')
          .textContent('You have reset your layout. When you close this dialog, MyUW will attempt to log you in again so that this change takes effect. You can then click MyUW in the upper left corner to return to the MyUW front page to view your reset layout.')
          .ok('Log me in again now');

        $mdDialog
          .show(logInAgainRequiredAlert)
          .finally(function() {
            miscService.redirectUser(302, 'Redirect after layout reset.');
          });

          return true;
        }).catch(function() {
          $scope.resetLayoutSuccess= false;
          $scope.resetLayoutFail = true;

          // broken: this toast doesn't actually render
          $mdToast.showSimple('Reset layout failed');

          $log.log('Reset layout failed');
        });
      };



      $scope.resetMessages = function() {
        delete $sessionStorage.seenMessageIds;
        if (keyValueService.isKVStoreActivated()) {
          $scope.loadingResetMessages = true;
          keyValueService.deleteValue(KV_KEYS.VIEWED_MESSAGE_IDS)
            .then(function() {
              $window.location.reload();
              $scope.loadingResetMessages = false;
              return false;
            }).catch(function() {
              $log.warn('could not reset in-app messages');
            });
        }
      };

      $scope.resetKey = function(key, loadingKey) {
        $scope[loadingKey] = true;
        keyValueService.deleteValue(key).then(function() {
          $window.location.reload();
          $scope[loadingKey] = false;
          return false;
        }).catch(function() {
          $log.warn('could not reset key');
        });
      };

      init();
    }]);
 });
