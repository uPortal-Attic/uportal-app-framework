'use strict';

define(['angular', 'require'], function(angular, require) {

  var app = angular.module('portal.widgets.directives', []);

  /**
   Just the widget card -- gets the widget type from the scope
   **/
  app.directive('widget', function() {
    return {
      restrict: 'E',
      scope: {
        fname: '@'
      },
      templateUrl: require.toUrl('./partials/widget-card.html'),
      controller: 'WidgetCardController'
    };
  });

  app.directive('widgetIcon', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/widget-icon.html')
    }
  });

  app.directive('optionLink', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/type__option-link.html'),
      controller: 'OptionLinkController'
    };
  });

  app.directive('listOfLinks', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/type__list-of-links.html')
    };
  });

  app.directive('searchWithLinks', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/type__search-with-links.html'),
      controller: 'SearchWithLinksController'
    };
  });

  app.directive('rssWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/type__rss.html'),
      controller: 'RssWidgetController'
    };
  });

  app.directive('weatherWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/type__weather.html'),
      controller: 'WeatherWidgetController'
    }
  });

});
