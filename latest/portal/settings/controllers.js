'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.settings.controllers', []);


      app.controller('PortalBetaSettingsController', [ '$sessionStorage', '$scope', '$mdTheming', 'portalSkinService', 'THEMES', 'APP_BETA_FEATURES', 'FRAME_BETA_FEATURES', function($sessionStorage, $scope,$mdTheming, portalSkinService, THEMES, APP_BETA_FEATURES, FRAME_BETA_FEATURES) {

    $scope.options = FRAME_BETA_FEATURES.concat(APP_BETA_FEATURES);
    $scope.$watch('portal.theme', function(newValue, oldValue) {
      if($scope.portal.theme) {
        $sessionStorage.portal.theme = $scope.portal.theme;
        $sessionStorage.portal.theme.themeVersion = THEMES.themeVersion;
        $mdTheming.generateTheme($sessionStorage.portal.theme.name,null);
        // Set browser color
        $mdTheming.setBrowserColor({
          theme: $sessionStorage.portal.theme.name,
          palette: $scope.portal.theme.name + '-primary',
          hue: '500'
        });
        if($scope.portal.theme && $scope.portal.theme.portalSkinKey) {
          portalSkinService.setPortalSkin($scope.portal.theme.portalSkinKey);
        }
      }
    });
  }]);

  app.controller('PortalUserSettingsController', ['$scope',
                                                  '$q',
                                                  '$window',
                                                  '$localStorage',
                                                  '$sessionStorage',
                                                  'KV_KEYS',
                                                  'NOTIFICATION',
                                                  'FEATURES',
                                                  'keyValueService',
    function($scope, $q, $window, $localStorage, $sessionStorage, KV_KEYS, NOTIFICATION, FEATURES, keyValueService)
    {
      var init = function(){
        $scope.kvEnabled = keyValueService.isKVStoreActivated();
        $scope.KV_KEYS = KV_KEYS;
        $scope.NOTIFICATION = NOTIFICATION;
        $scope.FEATURES = FEATURES;
      };

      $scope.resetAnnouncements = function() {
        delete $sessionStorage.seenAnnouncmentIds;
        delete $sessionStorage.seenPopupIds;
        if(keyValueService.isKVStoreActivated()) {
          $scope.loadingResetAnnouncements = true;
          $q.all([keyValueService.deleteValue(KV_KEYS.VIEWED_ANNOUNCEMENT_IDS),
                  keyValueService.deleteValue(KV_KEYS.VIEWED_POPUP_IDS)])
            .then(function(){
              $window.location.reload();
              $scope.loadingResetAnnouncements = false;
            });
        }
      }

      $scope.resetKey = function(key, loadingKey) {
        $scope[loadingKey] = true;
        keyValueService.deleteValue(key).then(function(){
          $window.location.reload();
          $scope[loadingKey] = false;
        });
      }

      init();
    }]);
  return app;

 });
