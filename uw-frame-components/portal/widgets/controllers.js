'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.widgets.controllers', []);

  /**
   * Controller for 'optionLink' directive
   */
  app.controller('FrameOptionLinkController', ['$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
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

  /**
   * Controller for search-width-links widget type
   */
  app.controller('FrameSearchWithLinksController', ['$scope', '$sce', function($scope, $sce) {
    $scope.secureURL = $sce.trustAsResourceUrl($scope.config.actionURL);
  }]);

  /**
   *
   */
  app.controller('FrameRSSWidgetController', ['$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
    /**
     *
     * @param dateString
     * @returns {*}
     */
    $scope.getPrettyDate = function(dateString) {
      // Create a new date if a date string was provided, otherwise return null
      return dateString ? new Date(dateString) : null;
    };

    /**
     * Initialize rss widget
     */
    var rssWidgetInit = function() {
      $scope.loading = true;
      // Only initialize if everything is provided
      if ($scope.widget && $scope.widget.widgetURL && $scope.widget.widgetType) {
        // Set defaults if any config attributes are missing
        if (!$scope.config) {
          $scope.config = {};
        }
        if (!$scope.config.lim) {
          $scope.config.lim = 5;
        }
        if (!$scope.config.titleLim) {
          $scope.config.titleLim = 40;
        }
        if (!$scope.config.showShowing) {
          $scope.config.showShowing = false;
        }

        // Get widget JSON
        widgetService.getRssAsJson($scope.widget.widgetURL)
          .then(function(result) {
            $scope.loading = false;
            $scope.data = result;

            // Make sure we got a 302
            if ($scope.status !== 'ok') {
              $scope.error = true;
              $scope.loading = false;
            } else {
              // Make sure the feed isn't empty
              if (!$scope.items || $scope.items.length == 0) {
                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.error = true;
              } else {
                // Show 'show more' if the feed is longer than the display limit
                if (!$scope.config.showShowing && $scope.items.length > $scope.config.lim) {
                  $scope.config.showShowing = true;
                }
              }
            }
          })
          .catch(function(error) {
            $log.error('Couldn\'t get rss as JSON');
            $log.error(error);

            $scope.error = true;
            $scope.isEmpty = true;
            $scope.loading = false;
          });
      }
    };

    rssWidgetInit();

  }]);


  /**
   * Controller for 'generic' and 'custom' widget types
   */
  app.controller('FrameCustomWidgetController', ['$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
    $scope.loading = false;
    /**
     * Configure widget content
     */
    var populateWidgetContent = function() {
      if ($scope.widget.widgetURL && $scope.widget.widgetType) {

        $scope.loading = true;

        // Fetch widget json
        widgetService.getWidgetJson($scope.widget).then(function(data) {
          $scope.loading = false;
          if (data) {
            $scope.widget.widgetData = data;
            $scope.content = $scope.portlet.widgetData;
            if (angular.isArray($scope.content) && $scope.content.length == 0) {
              $scope.isEmpty = true;
            } else if ($scope.widget.widgetConfig && $scope.widget.widgetConfig.evalString && eval($scope.widget.widgetConfig.evalString)) {
              // ideally this would do a check on an embedded object for emptiness
              // example : '$scope.content.report.length === 0'
              $scope.isEmpty = true;
            }
          } else {
            $log.warn('Got nothing back from widget fetch from ' + $scope.widget.widgetURL);
            $scope.isEmpty = true;
          }
        }, function() {
          $scope.loading = false;
        });
      }
    };

    // Make sure widget provided a custom html template
    if ($scope.widget.widgetTemplate) {
      $scope.content = [];
      $scope.template = $scope.widget.widgetTemplate;
      $scope.isEmpty = false;
      $scope.widget.widgetData = [];
      populateWidgetContent();
    } else {
      $log.error($scope.widget.fname + ' said it\'s a widget, but no template defined.');
      $scope.isEmpty = true;
    }
  }]);

  /**
   * Base widget functions -- determines widget type and sets launch button url for un-typed widgets
   */
  app.controller('FrameWidgetController', ['$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
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
    };

    // SERVICE CALLS
    widgetService.getMarketplaceEntry($scope.fname)
      .then(function(data) {
        $scope.widget = data;
        $scope.widgetType = vm.widgetType(data);
        console.log($scope.widget);
      })
      .catch(function(error) {
        $log.error('Something went wrong in WidgetController');
        $log.message(error);
      });

    // LOCAL FUNCTIONS
    vm.widgetType = function widgetType(widget) {
      var type = widget.widgetType;

      // Check for widget types with extra configuration (including null type), default to the stated widgetType
      switch(type) {
        case 'list-of-links':
          if (widget.widgetConfig.links.length === 1 && widget.altMaxUrl && widget.widgetConfig.links[0].href === widget.url) {
            // If the list of links only has one link and it's the same as the launch button url, display default widget view
            return 'basic';
          } else {
            return 'list-of-links'
          }
        case 'generic':
          // DEPRECATED: Included for backwards compatibility. Use 'custom' instead.
          return 'custom';
        case null:
          return 'basic';
        default:
          return type;
      }
    };

  }]);

});
