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

  /**
   * For UW-prefixed theme names, formats the name for a more
   * attractive display in the theme selection settings box.
   */
    .filter('formatThemeNameForDisplay', function() {
      return function(input) {
        if (input) {
          if (input.indexOf('uw-') > -1) {
            var partOne = input.slice(0, 3).toUpperCase();
            var partTwo = input.slice(input.indexOf('-') + 1)
              .replace(/-/g, ' ')
              .replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase()
                  + txt.substr(1).toLowerCase();
              });
            return partOne + partTwo;
          } else {
            return input.charAt(0).toUpperCase()
              + input.substr(1).toLowerCase();
          }
        }
      };
    })

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
      '$scope', '$q', '$window', '$localStorage',
      '$log', '$sessionStorage', '$rootScope',
      'KV_KEYS', 'keyValueService',
      function(
      $scope, $q, $window, $localStorage,
      $log, $sessionStorage, $rootScope,
      KV_KEYS, keyValueService
    ) {
      var init = function() {
        $scope.kvEnabled = keyValueService.isKVStoreActivated();
        $scope.KV_KEYS = KV_KEYS;
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

      $scope.avatarOptOut = function() {
        $rootScope.optAvatar = false;
        $sessionStorage.optAvatar = false;
      };

      $scope.avatarOptIn = function() {
        $rootScope.optAvatar = true;
        $sessionStorage.optAvatar = true;
      };

      init();
    }]);
 });
