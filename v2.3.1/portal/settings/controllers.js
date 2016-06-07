'use strict';

define(['angular'], function(angular) {
  var app = angular.module('portal.settings.controllers', []);

  app.controller('PortalBetaSettingsController', [ '$sessionStorage', '$scope', 'APP_BETA_FEATURES', 'FRAME_BETA_FEATURES', function($sessionStorage, $scope, APP_BETA_FEATURES, FRAME_BETA_FEATURES) {
    $scope.options = FRAME_BETA_FEATURES.concat(APP_BETA_FEATURES);
    $scope.$watch('portal.theme', function() {
      $sessionStorage.portal.theme = $scope.portal.theme;
    });
  }]);

  app.controller('PortalUserSettingsController', ['$scope',
                                                  '$q',
                                                  '$window',
                                                  '$localStorage',
                                                  'KV_KEYS',
                                                  'NOTIFICATION',
                                                  'FEATURES',
                                                  'keyValueService',
    function($scope, $q, $window, $localStorage, KV_KEYS, NOTIFICATION, FEATURES, keyValueService)
    {
      var init = function(){
        $scope.kvEnabled = keyValueService.isKVStoreActivated();
        $scope.KV_KEYS = KV_KEYS;
        $scope.NOTIFICATION = NOTIFICATION;
        $scope.FEATURES = FEATURES;
      };

      $scope.resetAnnouncements = function() {
        if(keyValueService.isKVStoreActivated()) {
          $scope.loadingResetAnnouncements = true;
          $q.all([keyValueService.deleteValue(KV_KEYS.LAST_VIEWED_ANNOUNCEMENT_ID),
                  keyValueService.deleteValue(KV_KEYS.LAST_VIEWED_POPUP_ID)])
            .then(function(){
              delete $localStorage.lastSeenAnnouncementId ;
              delete $localStorage.lastSeenFeature;
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
