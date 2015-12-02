'use strict';

define(['angular', 'require'], function(angular, require) {

  var app = angular.module('portal.main.directives', []);

  app.directive('uwHeaderAnnouncement', function(){
    return {
      restrict : 'E',
      templateUrl : require.toUrl('./partials/announcement.html'),
      controller : "PortalPopupController",
      scope {
        mode : "BUCKY"
      }
    };
  });

  return app;

});
