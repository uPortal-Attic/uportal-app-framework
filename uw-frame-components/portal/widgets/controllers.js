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
  return angular.module('portal.widgets.controllers', [])

  /**
   * Base widget controller (for /partials/widget-card.html).
   * First point of access for all widget types -- determines
   * the type and sets launch button url for un-typed (basic) widgets.
   */
  .controller('WidgetCardController', [
    '$scope', '$log', '$localStorage', 'widgetService',
    function($scope, $log, $localStorage, widgetService) {
    /**
     * Check for widget types that require extra configuration
     * (including null/undefined case), default to provided
     * widget type.
     * @param widget The widget object provided by widgetService
     * @returns {*} A string for the widget type
     */
    var widgetType = function widgetType(widget) {
      // Check for types that need handling
      switch (widget.widgetType) {
        case 'list-of-links':
          if (widget.widgetConfig.getLinksURL) {
            widgetService.getWidgetJson(widget).then(
              function(links) {
                widget.widgetConfig.links = links.content.links;
                return links.content.links;
              })
              .catch(function(error) {
                $log.warn('List of links widget ' + widget.fname + ' failed.');
                $log.error(error);
              });
            return 'list-of-links';
          }
          // If the list of links only has one link and it's the
          // same as the launch button url, display a basic widget
          if (widget.widgetConfig.links.length === 1 && widget.altMaxUrl &&
              widget.widgetConfig.links[0].href === widget.url) {
            return 'basic';
          } else {
            return 'list-of-links';
          }
        case 'generic':
          // DEPRECATED: Backwards compatibility. Use 'custom' instead.
          return 'custom';
        case null:
          // If widgetType doesn't exist, show a basic widget
          return 'basic';
        default:
          return widget.widgetType;
      }
    };

    /**
     * Initial widget setup -- gets data for a single widget
     * from the provided fname attribute
     */
    $scope.initializeWidget = function(fname) {
      // Initialize scope variables
      $scope.widget = {};
      $scope.widgetType = '';

      if (fname) {
        // Get widget data for provided app (fname)
        widgetService.getSingleWidgetData(fname)
        .then(function(data) {
          // Set scope variables
          if (data) {
            $scope.widget = data;
            $scope.widgetType = widgetType(data);
          }
          return data;
        })
        .catch(function(error) {
          $log.warn('WidgetCardController couldn\'t get data for: ' + fname);
          $log.error(error);
        });
      } else {
        $log.warn('WidgetCardController didn\'t get an fname.');
      }
    };

    /**
     * Set the launch button url for static content,
     * exclusive mode, and basic widgets
     * @returns {*}
     */
    $scope.renderUrl = function renderUrl() {
      var widget = $scope.widget;
      // Check for static content or exclusive mode portlets (rare)
      if (widget.altMaxUrl == false) {
        if (widget.staticContent != null) {
          return 'static/' + widget.fname;
        } else if (widget.renderOnWeb || $localStorage.webPortletRender) {
          return 'exclusive/' + widget.fname;
        }
      }
      return widget.url;
    };

    // Initialize the widget
      $scope.initializeWidget($scope.fname);
  }])

  // OPTION LINK widget type
  .controller('OptionLinkController', [
    '$scope', '$log', 'widgetService',
    function($scope, $log, widgetService) {
    /**
     * Set up default configuration if no config exists
     */
    var configInit = function() {
      $scope.config = {
        singleElement: false,
        arrayName: 'array',
        value: 'value',
        display: 'display',
      };
    };

    /**
     * Fetch additional widget data
     */
    var populateWidgetContent = function() {
      var widget = $scope.widget;
      var config = $scope.config;
      if (widget.widgetURL && widget.widgetType) {
        // Initialize widget data
        widget.widgetData = [];
        // Get data and set widget content
        widgetService.getWidgetJson(widget).then(function(data) {
          if (data) {
            if (config.singleElement) {
              // Set the default selected url
              widget.selectedUrl =
                widget.widgetData[config.value];
            } else if (widget.widgetData[config.arrayName] &&
              widget.widgetData[config.arrayName].length > 0) {
              // If multiple values come back,
              // set selected url to the first entry
              widget.selectedUrl =
                widget.widgetData[config.arrayName][0][config.value];
            }
          } else {
            $log.warn(
              'OptionLinkController couldn\'t get json for: ' +
              widget.fname
            );
          }
          return data;
        }).catch(function() {
          $log.warn('could not getWidgetJson');
        });
      }
    };

    // Set default values if no config was received
    if (!$scope.config) {
      configInit();
      $log.warn('OptionLinkController didn\'t receive a widget config');
    }
    // Set up widget content
    populateWidgetContent();
  }])

  // SEARCH WITH LINKS widget type
  .controller('SearchWithLinksController', [
    '$scope', '$sce', function($scope, $sce) {
    // Have faith our entity files aren't trying to bamboozle us
    $scope.secureURL = $sce.trustAsResourceUrl($scope.config.actionURL);
  }])

  // RSS widget type
  .controller('RssWidgetController', [
    '$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
    /**
     * Turn the provided date string into an actual
     * Date so it can be filtered into something prettier.
     * @param dateString A hideously ugly date string
     * @returns {*} A Date object or null
     */
    $scope.getPrettyDate = function(dateString) {
      // Create a new date if a date string was provided, otherwise return null
      return dateString ? new Date(dateString) : null;
    };

    /**
     * Remove leading/trailing spaces from RSS titles
     * @param title The RSS title
     * @returns String The trimmed title
     */
    $scope.trim = function(title) {
      return title.trim();
    };

    /**
     * Set defaults if any values are missing from provided widgetConfig
     */
    var checkForWidgetConfig = function() {
      if (!$scope.config) {
        $scope.config = {};
      }
      if (!$scope.config.lim) {
        $scope.config.lim = 5;
      }
      if (!$scope.config.titleLim) {
        if ($scope.config.showdate) {
          $scope.config.titleLim = 35;
        } else {
          $scope.config.titleLim = 45;
        }
      }
      if (!$scope.config.showShowing) {
        $scope.config.showShowing = false;
      }
      // Set sensible fallbacks in case widget
      // config would create display problems.
      if ($scope.config.lim > 6) {
        $scope.config.lim = 6;
      }
      if ($scope.config.titleLim > 50) {
        $scope.config.titleLim = 50;
      }
    };

    /**
     * Initialize rss widget
     */
    var initializeRssWidget = function() {
      // Trigger loading spinner
      $scope.loading = true;

      // Only initialize if widget's json provides all the stuff we need
      if ($scope.widget && $scope.widget.widgetURL) {
        // Make sure config has values
        checkForWidgetConfig();

        // Get rss feed from provided url
        widgetService.getRssAsJson($scope.widget.widgetURL)
          .then(function(result) {
            // If we got data, load it and turn off loading spinner
            $scope.data = result;
            $scope.loading = false;

            // Check for errors or emptiness and update display as needed
            if ($scope.data.status !== 'ok') {
              $scope.error = true;
              $scope.loading = false;
            } else {
              if (!$scope.data.items || $scope.data.items.length == 0) {
                $scope.isEmpty = true;
                $scope.loading = false;
                $scope.error = true;
              } else {
                // Show 'show more' if the feed is longer than the display limit
                if (!$scope.config.showShowing &&
                  $scope.data.items.length > $scope.config.lim) {
                  $scope.config.showShowing = true;
                }
              }
            }
            return result;
          })
          .catch(function(error) {
            // If the service couldn't get data, display error messages
            $log.warn('Couldn\'t get rss as JSON');
            $log.error(error);

            $scope.error = true;
            $scope.isEmpty = true;
            $scope.loading = false;
          });
      }
    };

    // Initialize the widget
    initializeRssWidget();
  }])

  // ACTION ITEMS widget type
  .controller('ActionItemsController', [
    '$scope', '$log', '$window', 'widgetService',
    function($scope, $log, $window, widgetService) {
    // Scope functions
    /**
     * Navigate to the url provided by the action item
     * @param url A path provided by the action item
     */
    $scope.goToAction = function(url) {
      // Go there if the url exists
      if (url) {
        $window.location.href = url;
      }
    };

    // Local functions
    /**
     * Gets the quantity for the provided item from its feedUrl, then
     * builds a new actionItem object to add to scope.
     * @param item Object for a single action item
     */
    var assembleActionItemsList = function(item) {
      // Get number from provided url
      widgetService.getActionItemQuantity(item.feedUrl)
        .then(function(data) {
          // Make sure we got a something back
          if (data) {
            // Add an action item to scope array
            $scope.actionItems.push({
              textSingular: item.textSingular,
              textPlural: item.textPlural,
              actionUrl: item.actionUrl,
              quantity: data.quantity,
            });
          }

          return data;
        })
        .catch(function(error) {
          // Log a service failure error
          $log.warn('Problem getting action item data from: ' + item.feedUrl);
          $log.error(error);
          $scope.error = true;
          $scope.loading = false;
        });
    };

    /**
     * Make sure each action item in widgetConfig has the necessary fields
     * configured and passes on for assembly if so.
     */
    var checkActionItemsConfigs = function() {
      // For each entry in actionItems, get the number of items
      for (var i = 0; i < $scope.config.actionItems.length; i++) {
        // Make sure the current item has required fields configured
        if ($scope.config.actionItems[i].textSingular
          && $scope.config.actionItems[i].textPlural
          && $scope.config.actionItems[i].actionUrl
          && $scope.config.actionItems[i].feedUrl) {
          // Pass current item to function to call widgetService
          assembleActionItemsList($scope.config.actionItems[i]);
        } else {
          // Log a missing-config error
          $log.warn('An action item was missing one or '
            + 'more required configuration options');
        }

        // If this is the last time through the loop, turn off loading spinner
        if (i === $scope.config.actionItems.length - 1) {
          $scope.loading = false;
        }
      }
    };

    /**
     * Initialize bindable members and kick off error checking and
     * scope assembly.
     */
    var initializeActionItems = function() {
      // Initialize bindable members
      $scope.actionItems = [];
      $scope.loading = true;
      $scope.error = false;
      $scope.itemsLimit = 3;

      // Make sure we got a widget and necessary config
      if ($scope.widget && $scope.config.actionItems
        && $scope.config.actionItems.length != 0) {
        // Hand off to dedicated function
        checkActionItemsConfigs();
      } else {
        // Action items empty or we're missing something else
        $log.warn('Action items widget has broken configuration');
        // Display error on widget
        $scope.error = true;
        $scope.loading = false;
      }
    };

    initializeActionItems();
  }])

  // CUSTOM & GENERIC widget types
  .controller('CustomWidgetController', [
    '$scope', '$log', 'widgetService', function($scope, $log, widgetService) {
    /**
     * Fetch additional widget data
     */
    var populateWidgetContent = function() {
      if ($scope.widget.widgetURL && $scope.widget.widgetType) {
        // Trigger loading spinner
        $scope.loading = true;

        // Fetch additional widget data
        widgetService.getWidgetJson($scope.widget).then(function(data) {
          $scope.loading = false;
          if (data) {
            $scope.widget.widgetData = data;
            $scope.content = $scope.widget.widgetData;
            if (angular.isArray($scope.content) && $scope.content.length == 0) {
              $scope.isEmpty = true;
            } else if ($scope.widget.widgetConfig &&
              $scope.widget.widgetConfig.evalString &&
              eval($scope.widget.widgetConfig.evalString)) {
              $scope.isEmpty = true;
            }
          } else {
            $log.warn('Got nothing back from widget fetch from: ' +
              $scope.widget.widgetURL);
            $scope.isEmpty = true;
          }
          return data;
        }).catch(function() {
          // After we get widget data, turn off loading spinner
          $scope.loading = false;
        });
      }
    };

    /**
     * Filter array for provided values of a given object --
     * used Leave Balances widget
     *
     * @param {Array<Object>} array The array to filter
     * @param {Object} object The array entry to search through
     * @param {Array<String>} strings
     *        The string values to test against each entry
     * @returns {Array<Object>} An array containing only the desired
     */
    $scope.filteredArray = function(array, object, strings) {
      if (array && object && strings) {
        return array.filter(function(entry) {
          for (var i = 0; i < strings.length; i++) {
            if (entry[object].indexOf(strings[i]) != -1) {
              return true;
            }
          }
        });
      } else {
        return [];
      }
    };

    /**
     * Initialize scope variables before getting widget content
     * @param template The provided custom HTML template
     */
    var initializeCustomWidget = function(template) {
      $scope.content = [];
      $scope.template = template;
      $scope.isEmpty = false;
      $scope.widget.widgetData = [];
      populateWidgetContent();
    };

    // Initialize widget if we received a custom HTML template,
    // otherwise display empty widget and log a warning
    if ($scope.widget.widgetTemplate) {
      initializeCustomWidget($scope.widget.widgetTemplate);
    } else {
      $scope.loading = false;
      $scope.isEmpty = true;
      $log.warn($scope.widget.fname +
        ' said it\'s a custom/generic widget, but didn\'t provide a template.');
    }
  }])

  // WEATHER widget type
  .controller('WeatherWidgetController', [
    '$scope', '$log', '$q', 'widgetService', 'keyValueService',
    function($scope, $log, $q, widgetService, keyValueService) {
    // Local variables
    var fetchKey = 'userWeatherPreference';

    /**
     * Change temperature unit of measurement
     */
    $scope.cycleUnits = function() {
      var userPreference = $scope.nextUnits;
      var value = {};

      // Switch temperature based on which unit is next
      switch (userPreference) {
        case 'F':
          convertKelvinToFahrenheit();
          $scope.currentUnits = 'F';
          $scope.nextUnits = 'C';
          break;
        case 'C':
          convertFahrenheitToCelsius();
          $scope.currentUnits = 'C';
          $scope.nextUnits = 'K';
          break;
        case 'K':
          convertCelsiusToKelvin();
          $scope.currentUnits = 'K';
          $scope.nextUnits = 'F';
          break;
        default:
          convertCelsiusToKelvin();
          $scope.currentUnits = 'K';
          $scope.nextUnits = 'F';
      }

      // Set user preference
      value.userWeatherPreference = $scope.currentUnits;

      // Remember the user's preferred unit of measurement
      keyValueService.setValue(fetchKey, value);
    };

    /**
     * Fetch additional widget data
     */
    var populateWidgetContent = function() {
      // Declare asynchronous promises to be executed in $q.all()
      var widgetPromise = widgetService.getWidgetJson($scope.widget);
      var userPreferencesPromise = keyValueService.getValue(fetchKey);

      // Execute promises, then resolve when both have returned something
      $q.all( [widgetPromise, userPreferencesPromise] ).then(function(data) {
        // Turn off loading spinner
        $scope.loading = false;

        // If we got some data, populate widget content
        if (
          data && 2 === data.length && data[0] && data[1] &&
          (!data[0].errors || (data[0].errors && 0 >= data[0].errors.length))
        ) {
          // Set local variables
          var allTheWeathers = data[0];
          var myPref = data[1];
          var userPreference = myPref.userWeatherPreference;

          // Set scope variables
          if (allTheWeathers) {
            $scope.weatherData = allTheWeathers.weathers;
          }
          $scope.currentUnits = 'F';
          $scope.nextUnits = 'C';

          // If the user doesn't have a preference, default to Fahrenheit
          if (
            userPreference === null ||
            userPreference === '' ||
            angular.isUndefined(userPreference)
          ) {
            userPreference = 'F';
          }

          // Cycle units until we match with the user's preference
          while (userPreference != $scope.currentUnits) {
            $scope.cycleUnits();
          }
        } else {
          // Log any errors getting data
          $scope.error = true;
          $log.warn('WeatherWidgetController could\'t get widget json');
        }

        // Return to resolve $q.all()
        return data;
      }).catch(function() {
        $scope.loading = false;
        $scope.error = true;
        $log.warn(
          'WeatherWidgetController wrote a check it simply couldn\'t cash');
      });
    };

    /**
     * Convert from Fahrenheit to Celsius
     */
    var convertFahrenheitToCelsius = function() {
      var ratio = (5 / 9);
      var offset = 32;
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature =
          ($scope.weatherData[i].currentWeather.temperature -
          offset) * ratio;
        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature =
            ($scope.weatherData[i].forecast[j].highTemperature -
            offset) * ratio;
          $scope.weatherData[i].forecast[j].lowTemperature =
            ($scope.weatherData[i].forecast[j].lowTemperature -
            offset) * ratio;
        }
      }
    };

    /**
     * Convert from Celsius to Fahrenheit
     */
    var convertCelsiusToFahrenheit = function() {
      var ratio = (9 / 5);
      var offset = 32;
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature =
          ($scope.weatherData[i].currentWeather.temperature *
          ratio) + offset;

        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature =
            ($scope.weatherData[i].forecast[j].highTemperature *
            ratio) + offset;
          $scope.weatherData[i].forecast[j].lowTemperature =
            ($scope.weatherData[i].forecast[j].lowTemperature *
            ratio) + offset;
        }
      }
    };

    /**
     * Convert from Celsius to Kelvin
     */
    var convertCelsiusToKelvin = function() {
      var offset = 273;
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature =
          ($scope.weatherData[i].currentWeather.temperature + offset);

        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature =
            ($scope.weatherData[i].forecast[j].highTemperature + offset);
          $scope.weatherData[i].forecast[j].lowTemperature =
            ($scope.weatherData[i].forecast[j].lowTemperature + offset);
        }
      }
    };

    /**
     * Convert from Kelvin to Fahrenheit (via Celsius)
     */
    var convertKelvinToFahrenheit = function() {
      convertKelvinToCelsius();
      convertCelsiusToFahrenheit();
    };

    /**
     * Convert from Kelvin to Celsius
     */
    var convertKelvinToCelsius = function() {
      var offset = 273;
      for (var i = 0; i < $scope.weatherData.length; i++) {
        $scope.weatherData[i].currentWeather.temperature =
          ($scope.weatherData[i].currentWeather.temperature - offset);

        for (var j = 0; j < $scope.weatherData[i].forecast.length; j++) {
          $scope.weatherData[i].forecast[j].highTemperature =
            ($scope.weatherData[i].forecast[j].highTemperature - offset);
          $scope.weatherData[i].forecast[j].lowTemperature =
            ($scope.weatherData[i].forecast[j].lowTemperature - offset);
        }
      }
    };

    // Initialize weather widget
    $scope.loading = false;
    if ($scope.widget.widgetURL) {
      $scope.loading = true;
      $scope.weatherData = [];
      $scope.currentUnits = 'F';
      $scope.nextUnits = 'C';
      populateWidgetContent();
    } else {
      $log.warn('WeatherWidgetController did not receive a widgetURL');
    }
  }]);
});
