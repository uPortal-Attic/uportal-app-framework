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
        type: '@'
      },
      templateUrl: require.toUrl('./partials/widget-card.html'),
      controller: 'WidgetController'
    };
  });

  app.directive('optionLink', function() {
    return {
      restrict: 'E',
      scope: {
        portlet: '=app',
        config: '=config'
      },
      templateUrl: require.toUrl('./partials/option-link.html'),
      controller: 'OptionLinkController'
    };
  });

});
