'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.widgets.controllers', []);

  /**
   * Controller for 'optionLink' directive
   */
  app.controller('OptionLinkController', ['$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
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
      if ($scope.widget.widgetURL && $scope.widget.widgetType) {
        // Initialize portlet widget json
        $scope.widget.widgetData = [];
        // Fetch widget JSON
        widgetService.getWidgetJson($scope.widget).then(function(data) {
          if (data) {
            if ($scope.config.singleElement) {
              // Set the default selected url
              $scope.widget.selectedUrl = $scope.widget.widgetData[$scope.config.value];
            } else if ($scope.widget.widgetData[$scope.config.arrayName] && $scope.widget.widgetData[$scope.config.arrayName].length > 0) {
              $scope.widget.selectedUrl = $scope.widget.widgetData[$scope.config.arrayName][0][$scope.config.value];
            }
          } else {
            console.warn('Got nothing back from widget fetch for ' + $scope.widget.fname);
          }
        });
      }
    };

    // Set default values if no config was received
    if (!$scope.config) {
      configInit();
    }
    // Set up widget content
    populateWidgetContent();
  }]);

  app.controller('WidgetController', ['$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
    var vm = this;

    // BINDABLE MEMBERS
    $scope.widget = {};
    $scope.widgetType = '';

    /**
     *
     * @returns {*}
     */
    $scope.renderUrl = function renderUrl() {
      var widget = $scope.widget;
      if (widget.staticContent != null && widget.altMaxUrl == false) {
        return 'static/' + widget.fname;
      } else if (widget.altMaxUrl == false && (widget.renderOnWeb || $localStorage.webPortletRender)) {
        return 'exclusive/' + widget.fname;
      } else {
        return widget.url;
      }
    }

    // SERVICE CALLS
    widgetService.getMarketplaceEntry($scope.fname)
      .then(function(data) {
        $scope.widget = data;
        $scope.widgetType = vm.widgetType(data);
        console.log($scope.widget);
      })
      .catch(function() {
        $log.error('Something went wrong in WidgetController');
      });

    // LOCAL FUNCTIONS
    vm.widgetType = function widgetType(widget) {
      var type = widget.widgetType;

      if (type) {
        if (type === 'option-link') {
          return 'option-link';
        } else if (type === 'weather') {
          return 'weather';
        } else if (type === 'rss') {
          return 'rss';
        } else if (type === 'list-of-links') {
          if (widget.widgetConfig.links.length === 1 && widget.altMaxUrl && widget.widgetConfig.links[0].href === widget.url) {
            // If the list of links only has one link and it's the same as the launch button url, display default widget view
            return 'basic';
          } else {
            return 'list-of-links'
          }
        } else if (type === 'search-with-links') {
          return 'search-with-links';
        } else if (type === 'generic') {
          // DEPRECATED: Included for backwards compatibility. Use 'custom' instead.
          return 'custom';
        } else if (type === 'custom') {
          return 'custom';
        } else {
          return 'widget';
        }
      } else {
        // Didn't receive a widgetType (null) -- Return default widget experience
        return 'BASIC';
      }
    };

  }]);

});
