'use strict';

define(['angular', 'require'], function(angular, require) {

  var app = angular.module('portal.features.directives', []);

  app.directive('buckyAnnouncement', function(){
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/announcement.html'),
      controller : "PortalPopupController",
      scope : {
        mode : '@',
        headerCtrl : '=headerCtrl'
      }
    };
  });

  return app;

});
