'use strict';

define(['angular', 'require'], function(angular, require) {

  var app = angular.module('portal.widgets.directives', []);

  /**
   Just the widget card -- gets the widget type from the scope
   **/
  app.directive('frameWidget', function() {
    return {
      restrict: 'E',
      scope: {
        fname: '@'
      },
      templateUrl: require.toUrl('./partials/frame-widget-card.html'),
      controller: 'FrameWidgetController'
    };
  });

  app.directive('frameWidgetIcon', function() {
    return {
      restrict: 'E',
      templateUrl: require.toUrl('./partials/frame-widget-icon.html')
    }
  });

  app.directive('frameOptionLink', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/frame-option-link.html'),
      controller: 'FrameOptionLinkController'
    };
  });

  app.directive('frameListOfLinks', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/frame-list-of-links.html')
    };
  });

  app.directive('frameSearchWithLinks', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/frame-search-with-links.html'),
      controller: 'FrameSearchWithLinksController'
    };
  });

  app.directive('rssWidget', function() {
    return {
      restrict: 'E',
      scope: {
        widget: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/rss-widget.html'),
      controller: 'FrameRSSWidgetController'
    };
  });


});
