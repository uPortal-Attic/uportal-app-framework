'use strict';

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.settings.directives', [])

  .directive('uwSettingOption', function() {
    return {
        restrict: 'E',
        templateUrl: require.toUrl('./partials/setting-option.html'),
    };
  });
});
