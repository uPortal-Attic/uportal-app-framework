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
                                                  'KV_KEYS',
                                                  'keyValueService',
    function($scope, $q, KV_KEYS, keyValueService)
    {
      var init = function(){
        $scope.kvEnabled = keyValueService.isKVStoreActivated();
      };

      $scope.resetAnnouncements = function() {
        if(keyValueService.isKVStoreActivated()) {
          $scope.loading = true;
          $q.all([keyValueService.deleteValue(KV_KEYS.LAST_VIEWED_ANNOUNCEMENT_ID),
                  keyValueService.deleteValue(KV_KEYS.LAST_VIEWED_POPUP_ID)])
            .then(function(){
              $scope.loading = false;
            });
        }
      }

      init();
    }]);
  return app;
 });
