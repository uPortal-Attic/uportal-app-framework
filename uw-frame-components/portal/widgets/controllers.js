'use strict';

define(['angular','require'], function(angular, require) {

  var app = angular.module('portal.widgets.controllers', []);

  /**
   * Controller for 'optionLink' directive
   */
  app.controller('OptionLinkController', ['$scope', function($scope) {
    /**
     * Set up default configuration if no config exists
     */
    var configInit = function() {
      $scope.config = {
        singleElement: false,
        arrayName: 'array',
        value: 'value',
        display: 'display'
      };
    };

    /**
     * Set up the widget based on received configuration
     */
    var populateWidgetContent = function() {
      // if ($scope.portlet.widgetURL && $scope.portlet.widgetType) {
      //   // Initialize portlet widget json
      //   $scope.portlet.widgetData = [];
      //   // Fetch widget JSON
      //   layoutService.getWidgetJson($scope.portlet).then(function(data) {
      //     if (data) {
      //       if ($scope.config.singleElement) {
      //         // Set the default selected url
      //         $scope.portlet.selectedUrl = $scope.portlet.widgetData[$scope.config.value];
      //       } else if ($scope.portlet.widgetData[$scope.config.arrayName] && $scope.portlet.widgetData[$scope.config.arrayName].length > 0) {
      //         $scope.portlet.selectedUrl = $scope.portlet.widgetData[$scope.config.arrayName][0][$scope.config.value];
      //       }
      //     } else {
      //       console.warn('Got nothing back from widget fetch for ' + $scope.portlet.fname);
      //     }
      //   });
      // }
    };

    // Set default values if no config was received
    if (!$scope.config) {
      configInit();
    }
    // Set up widget content
    populateWidgetContent();
  }]);

  app.controller('WidgetController', ['$scope', function($scope) {
    //
  }]);

});
