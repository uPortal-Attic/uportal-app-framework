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

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.widgets.directives', [])

  /**
   * Just the widget card -- gets the widget type from scope
   */
  .directive('widget', ['miscService', function(miscService) {
    return {
      restrict: 'E',
      transclude: {
        'removeButton': '?removeButton',
      },
      scope: {
        fname: '@',
        failSilently: '@?',
        includeContextMenu: '@?',
      },
      templateUrl: require.toUrl('./partials/widget-card.html'),
      controller: 'WidgetCardController',
      link: {
        post: function(scope, element, attrs) {
          element.on('click', function(event) {
            var el = event.target;
            while (el && (!el.tagName || el.tagName.toLowerCase() !== 'a')) {
              el = el.parentNode;
            }
            if (el) {
              miscService.pushGAEvent(attrs.fname, 'widget click', el.href);
            }
          });
        },
      },
    };
  }])

  /**
   * Just the widget card -- gets the widget type from the scope
   */
  .directive('compactWidget', ['miscService', function(miscService) {
    return {
      restrict: 'E',
      transclude: {
        'removeButton': '?removeButton',
      },
      scope: {
        fname: '@',
      },
      templateUrl: require.toUrl('./partials/compact-widget-card.html'),
      controller: 'WidgetCardController',
      link: {
        post: function(scope, element, attrs) {
          element.on('click', function(event) {
            var el = event.target;
            while (el && (!el.tagName || el.tagName.toLowerCase() !== 'a')) {
              el = el.parentNode;
            }
            if (el) {
              miscService.pushGAEvent(
                attrs.fname, 'compact widget click', el.href);
            }
          });
        },
      },
    };
  }])

  /**
   * Show an external message
   */
  .directive('externalWidgetMessage', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
      },
      templateUrl: require.toUrl('./partials/external-message.html'),
      controller: 'WidgetExternalMessageController',
    };
  })

  /**
   * Widget type that alternates between basic appearance and time-sensitive
   * content with a countdown
   */
  .directive('timeSensitive', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__time-sensitive.html'),
      controller: 'TimeSensitiveContentController',
    };
  })

  .directive('widgetIcon', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/widget-icon.html'),
    };
  })

  .directive('optionLink', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__option-link.html'),
      controller: 'OptionLinkController',
    };
  })

  .directive('listOfLinks', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__list-of-links.html'),
    };
  })

  .directive('searchWithLinks', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__search-with-links.html'),
      controller: 'SearchWithLinksController',
    };
  })

  .directive('switchWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/widget-content.html'),
      controller: 'SwitchWidgetController',
    };
  })

  .directive('widgetContent', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/widget-content.html'),
    };
  })

  .directive('rssWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__rss.html'),
      controller: 'RssWidgetController',
    };
  })

  .directive('actionItems', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__action-items.html'),
      controller: 'ActionItemsController',
    };
  })

  /**
   * DEPRECATED
   */
  .directive('weatherWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__weather.html'),
      controller: 'WeatherWidgetController',
    };
  })

  .directive('remoteContentWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__remote-content.html'),
      controller: 'RemoteContentWidgetController',
    };
  })

  .directive('basicWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config',
      },
      templateUrl: require.toUrl('./partials/type__basic.html'),
      controller: 'BasicWidgetController',
    };
  });
});
