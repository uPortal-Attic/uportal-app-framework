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

define(['angular', 'moment'], function(angular, moment) {
  return angular.module('portal.widgets.controllers', [])

  /**
   * Base widget controller (for /partials/widget-card.html).
   * First point of access for all widget types -- determines
   * the type and sets launch button url for un-typed (basic) widgets.
   */
  .controller('WidgetCardController', [
    '$scope', '$log', '$transclude', '$timeout', 'widgetService',
    function($scope, $log, $transclude, $timeout, widgetService) {
    /**
     * Check for widget types that require extra configuration
     * (including null/undefined case), default to provided
     * widget type.
     * @param {Object} widget - The widget object provided by widgetService
     * @return {*} - A string for the widget type
     */
    var widgetType = function widgetType(widget) {
      // Check for types that need handling
      switch (widget.widgetType) {
        case 'list-of-links':
          if (widget.widgetConfig.getLinksURL) {
            widgetService.getWidgetJson(widget).then(
              function(links) {
                if (!(links.content && links.content.links)) {
                  $log.warn('Undefined dynamic links content for '
                  + widget.fname + ': dynamic response was [' + links + ']');
                }
                widget.widgetConfig.links = links.content.links;
                return links.content.links;
              })
              .catch(function(error) {
                $log.warn('List of links widget ' + widget.fname + ' failed.');
                $log.error(error);
              });
          }
          return 'list-of-links';
        case null:
          // If widgetType doesn't exist, show a basic widget
          return 'basic';
        default:
          return widget.widgetType;
      }
    };

      /**
       * Enable keyboard activation of transcluded remove button
       * so it plays nice with the aria-role "button"
       * @param {object} event The DOM event that called the function
       */
    $scope.triggerRemoveButton = function(event) {
      event.preventDefault();
      // If user pressed enter key, manually trigger the remove button
      if (event.keyCode === 13) {
        var removeButton =
          angular.element(event.target.querySelector('.widget-remove'));
        // Make sure we correctly targeted a button
        if (removeButton[0].tagName === 'BUTTON') {
          // Break current $apply cycle to ensure this fires
          $timeout(function() {
            removeButton.triggerHandler('click');
          }, 0);
        }
      }
    };

    /**
     * Initial widget setup -- gets data for a single widget
     * from the provided fname attribute, makes transcluded content
     * focusable
     * @param {string} fname
     */
    $scope.initializeWidget = function(fname) {
      // Initialize scope variables
      $scope.widget = {};
      $scope.widgetType = '';
      $scope.tabindex = '-1';

      if (fname) {
        // Get widget data for provided app (fname)
        widgetService.getSingleWidgetData(fname)
        .then(function(data) {
          // Set scope variables
          if (data) {
            $scope.widget = data;
            $scope.widgetType = widgetType(data);
          }
          // If there's a remove button, make it focusable by keyboard
          if ($transclude.isSlotFilled('removeButton')) {
            $scope.tabindex = '1';
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

    // Initialize the widget
      $scope.initializeWidget($scope.fname);
  }])

  /**
   * Controller for un-typed (basic) widgets.
   * Sets launch button url for these widgets.
   */
  .controller('BasicWidgetController', [
    '$scope', '$log', '$localStorage', 'widgetService',
    function($scope, $log, $localStorage, widgetService) {
      /**
       * Set the launch button url for static content,
       * exclusive mode, and basic widgets
       * @return {*}
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
    }])

    // External Message Controller
  .controller('WidgetExternalMessageController', [
    '$scope', '$log', 'widgetService',
    function($scope, $log, widgetService) {
      var widget = $scope.widget;
      widgetService.getWidgetExternalMessage(widget).then(
        function(externalMessage) {
        if (externalMessage && externalMessage.messageText) {
          $scope.widget.externalMessageText = externalMessage.messageText;
          if (externalMessage.learnMoreUrl) {
            $scope.widget.externalMessageLearnMoreUrl =
              externalMessage.learnMoreUrl;
          }
        }
        return externalMessage;
      }).catch(function() {
        $log.warn('Could not get external widget message for ' + widget.fname);
      });
    },
  ])

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
     * @param {string} dateString - A hideously ugly date string
     * @return {*} A Date object or null
     */
    $scope.getPrettyDate = function(dateString) {
      // Create a new date if a date string was provided, otherwise return null
      return dateString ? new Date(dateString) : null;
    };

    /**
     * Remove leading/trailing spaces from RSS titles
     * @param {string} title - The RSS title
     * @return {string} The trimmed title
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
            $scope.data = result ? result : {};
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
    '$scope', '$log', '$window', '$filter', 'widgetService',
    function($scope, $log, $window, $filter, widgetService) {
    // Scope functions
    /**
     * Navigate to the url provided by the action item
     * @param {string} url - A path provided by the action item
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
     * @param {Object} item - Object for a single action item
     */
    var assembleActionItemsList = function(item) {
      // Get number from provided url
      widgetService.getActionItemQuantity(item.feedUrl)
        .then(function(data) {
          // Make sure we got a something back
          if (data) {
            // Make sure quantity is a number
            if (!Number.isInteger(data.quantity)) {
              // Log problem and don't include in list
              $log.warn('ACTION ITEMS CONTROLLER: '
                + 'Got non-integer quantity from ' + item.feedUrl);
              // Reduce display limit (only once) to make room for error
              if (!$scope.hasQuantityError) {
                $scope.itemsLimit -= 1;
              }
              // Show error
              $scope.hasQuantityError = true;

              // Add an error to the error array
              $scope.actionItemErrors.push({
                textPlural: item.textPlural,
                actionUrl: item.actionUrl,
              });
            } else {
              // Add an action item to scope array
              $scope.actionItems.push({
                textSingular: item.textSingular,
                textPlural: item.textPlural,
                actionUrl: item.actionUrl,
                quantity: data.quantity,
              });
            }
          } else {
            // no data
            // Add an error to the error array
            $scope.actionItemErrors.push({
              textPlural: item.textPlural,
              actionUrl: item.actionUrl,
            });
          }

          return data;
        })
        .catch(function(error) {
          // Log a service failure error
          $log.warn('ACTION ITEMS CONTROLLER: '
            + 'Problem getting action item data from: ' + item.feedUrl);
          $scope.hasServiceError = true;

          // Add an error to the error array
          $scope.actionItemErrors.push({
            textPlural: item.textPlural,
            actionUrl: item.actionUrl,
          });

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
          $log.warn('ACTION ITEMS CONTROLLER: '
            + 'An action item was missing one or '
            + 'more required configuration options');

          if (!$scope.config.actionItems[i].textPlural) {
            $scope.config.actionItems[i].textPlural = 'misconfigured things';
          }

          // Add an error to the error array
          $scope.actionItemErrors.push({
            textPlural: $scope.config.actionItems[i].textPlural,
            actionUrl: $scope.config.actionItems[i].actionUrl,
          });
        }

        // If this is the last time through the loop, turn off loading spinner
        // and reorder the list by quantity
        if (i === $scope.config.actionItems.length - 1) {
          $scope.actionItems =
          $filter('orderBy')($scope.actionItems, 'quantity', true);
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
      $scope.actionItemErrors = [];
      $scope.loading = true;
      $scope.hasServiceError = false;
      $scope.hasQuantityError = false;
      $scope.itemsLimit = 3;
      $scope.launchText =
        $scope.config.launchText ? $scope.config.launchText : 'See all';

      // Make sure we got a widget and necessary config
      if ($scope.widget && $scope.config.actionItems
        && $scope.config.actionItems.length != 0) {
        // Hand off to dedicated function
        checkActionItemsConfigs();
      } else {
        // Action items empty or we're missing something else
        $log.warn('ACTION ITEMS CONTROLLER: '
          + 'Action items widget has broken configuration');
        // Display error on widget
        $scope.hasServiceError = true;
        $scope.loading = false;
      }
    };

    initializeActionItems();
  }])

  // VARIABLE CONTENT widget type
  .controller('TimeSensitiveContentController', [
    '$scope', '$filter', '$log', function($scope, $filter, $log) {
    var init = function() {
      var callsToAction = [];

      if ($scope.config.callsToAction
        && angular.isArray($scope.config.callsToAction)
        && $scope.config.callsToAction.length > 0) {
          callsToAction = $scope.config.callsToAction;
      }

      var now = new Date();
      var templateIndex = indexWithinTemplateRange(now, callsToAction);
      if (templateIndex > -1) {
        displayTimeSensitiveContent(callsToAction[templateIndex]);
      }
    };

    var resolveDate = function(str, defaultEndOfDay) {
      // if it is valid ISO 8601 pass through
      var fullISODate = moment(str, moment.ISO_8601, true);
      if (fullISODate.isValid()) {
        return fullISODate.toDate();
      }

      // if it is a partial ISO string, fill in missing fields
      var partialISODate = moment(str, ['YYYY-MM-DD', 'MM-DD'], true);
      if (partialISODate.isValid()) {
        if (defaultEndOfDay) {
          return partialISODate.endOf('day').toDate();
        } else {
          return partialISODate.startOf('day').toDate();
        }
      }

      // this is not a valid date
      return moment.invalid().toDate();
    };

    var indexWithinTemplateRange = function(now, callsToAction) {
      var result = -1;
      // TODO: refactor as Array.prototype.findIndex when IE support is dropped
      // Check if today falls within any of the provided date ranges
      angular.forEach(callsToAction, function(callToAction, index) {
        if (result === -1) { // We haven't found a call to action
          var startDate =
            resolveDate(callToAction.activeDateRange.templateLiveDate);
          var endDate =
            resolveDate(callToAction.activeDateRange.templateRetireDate, true);
          if (moment().isBetween(startDate, endDate)) {
            result = index;
          }
        }
      });
      return result;
    };

    var resolveTemplateStatus = function(now, actionStart, actionEnd) {
      if (
        !(
          moment(now).isValid()
          && moment(actionStart).isValid()
          && moment(actionEnd).isValid()
        )
      ) {
        throw new TypeError('now, actionStart, and actionEnd must all be set');
      }

      if (moment(actionStart).isAfter(actionEnd)) {
        throw new RangeError('actionStart must be before actionEnd');
      }

      var statuses = [
        {
          name: 'upcoming',
          check: function() {
            return moment(now).isBefore(actionStart);
          },
        },
        {
          name: 'ongoing',
          check: function() {
            return moment(now).isBetween(actionStart, actionEnd);
          },
        },
         {
          name: 'lastDay',
          check: function() {
            return moment(now).isBetween(actionStart, actionEnd)
              && 1 === resolveDaysLeft(now, actionEnd);
          },
        },
        {
          name: 'ended',
          check: function() {
            return moment(now).isAfter(actionEnd);
          },
        },
      ];

      var result = '';
      // TODO: rewrite as Array.prototype.find when IE support is dropped
      angular.forEach(statuses, function(status) {
        if (status.check()) {
          result = status.name;
        }
      });

      return result;
    };

    var resolveDaysLeft = function(now, actionEnd) {
      // round dates up, rather than the default which rounds down
      return Math.ceil(moment(actionEnd).diff(now, 'days', true));
    };

    /**
     * Display time-sensitive content with provided configuration
     * @param {*} config - The provided configuration for a call to action
     */
    var displayTimeSensitiveContent = function(config) {
      var dates = config.activeDateRange;
      var now = new Date();
      var actionStart = resolveDate(dates.takeActionStartDate);
      var actionEnd = resolveDate(dates.takeActionEndDate, true);

      $scope.templateStatus =
        resolveTemplateStatus(now, actionStart, actionEnd);
      $scope.daysLeft = resolveDaysLeft(now, actionEnd);
      if (actionStart) {
        $scope.activePeriodStartDate = actionStart.getTime();
      }
      if (actionEnd) {
        $scope.activePeriodEndDate = actionEnd.getTime();
      }

      $scope.callToAction = config;
    };

    init();
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
            $log.warn('CUSTOM WIDGET CONTROLLER: '
              + 'Got nothing back from widget fetch from: ' +
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
     * @return {Array<Object>} An array containing only the desired
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
     * @param {string} template - The provided custom HTML template
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
      $log.warn('CUSTOM WIDGET CONTROLLER: ' + $scope.widget.fname +
        ' said it\'s a custom/generic widget, but didn\'t provide a template.');
    }
  }])

  // SWITCH widget type
  .controller('SwitchWidgetController', [
    '$scope', '$log', '$parse', 'widgetService',
    function($scope, $log, $parse, widgetService) {
      $scope.switching = true;

      /**
       * Fetch additional widget data
       */
      var initializeSwitchWidget = function() {
      // save widgetConfig as switchConfig so switch can then conditionally
      // mess with widgetConfig in activating a different widget type
      $scope.switchConfig = $scope.widget.widgetConfig;

      if ($scope.widget.widgetURL && $scope.switchConfig.expression
        && $scope.switchConfig.cases) {
        // Configured with a URL from which to get dynamic JSON,
        // and an expression to extract from that JSON,
        // and case(s) to match against,
        // so load that dynamic JSON, do the parsing and selecting
        widgetService.getWidgetJson($scope.widget).then(function(data) {
          // returns the new $scope.widget.widgetType, e.g. 'list-of-links'

          var parsedExpression = $parse($scope.switchConfig.expression);

          var dynamicValueToMatch = parsedExpression(data);

          /**
           * True when the case under consideration has a matchValue matching
           * dynamicValueToMatch. Used for finding the relevant case to switch
           * to, if any.
           * @param {*} caseToCheck
           * @return {String} widgetType
           */
          function matchesValue(caseToCheck) {
            return caseToCheck.matchValue === dynamicValueToMatch;
          }

          var caseToActivate = $scope.switchConfig.cases.find(matchesValue);

          // if none of the cases match, select the default case if configured
          if (!caseToActivate && $scope.switchConfig &&
            $scope.switchConfig.defaultCase) {
            caseToActivate = $scope.switchConfig.defaultCase;
          }

          // a case was selected for activation, so let's activate it
          if (caseToActivate) {
            if (caseToActivate.widgetUrl) {
              // switch the widget URL and re-fetch JSON using that new config
              $scope.widget.widgetURL = caseToActivate.widgetUrl;
              widgetService.getWidgetJson($scope.widget);
            }

            if (caseToActivate.widgetType) {
              // switch to the new type
              $scope.widget.widgetType = caseToActivate.widgetType;
            } else {
              $scope.widget.widgetType = 'basic';
            }

            if (caseToActivate.widgetConfig) {
              // switch to the new config
              $scope.widget.widgetConfig = caseToActivate.widgetConfig;
            }

            if ($scope.widget.widgetConfig
              && !$scope.widget.widgetConfig.launchText
              && $scope.switchConfig
              && $scope.switchConfig.launchText) {
              // honor base launchText if activated case does not have its own
                $scope.widget.widgetConfig.launchText =
                  $scope.switchConfig.launchText;
              }
          } else {
            $log.debug($scope.widget.fname +
              ' did not switch to any case (not even a default case) ' +
              'for activation, so falling back to being a basic widget.');

            $scope.widget.widgetType = 'basic';
            $scope.widget.widgetConfig = '';
          }
          $scope.switching = false;
          return $scope.widget.widgetType;
        }).catch(function(error) {
          $log.error('SWITCH WIDGET CONTROLLER: ' + $scope.widget.fname +
            ' errored fetching or processing JSON [' + $scope.widget.widgetURL
            + '] to switch on; falling back on being a basic widget.');

          $scope.widget.widgetType = 'basic';
          $scope.widget.widgetConfig = '';
          $scope.switching = false;
        });
      } else {
        $log.warn('SWITCH WIDGET CONTROLLER: '
          + $scope.widget.fname + ' not configured with ' +
          'URL from which to load JSON [' + $scope.widget.widgetURL + '],' +
          ' expression [' + $scope.switchConfig.expression + ']' +
          ' to parse from that JSON, or cases to match against,' +
          ' so falling back on being a basic widget.');

        $scope.widget.widgetType = 'basic';
        $scope.widget.widgetConfig = '';
        $scope.switching = false;
      }
    };

    initializeSwitchWidget();
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
