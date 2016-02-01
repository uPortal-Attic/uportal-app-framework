'use strict';

define(['angular'], function(angular) {

  var app = angular.module('portal.search.controllers', []);
  app.controller('PortalSearchController', [ 'miscService', '$location', '$rootScope', '$scope', '$localStorage','$routeParams','SEARCH', 'APP_FLAGS', function(miscService, $location,$rootScope, $scope, $localStorage, $routeParams, SEARCH, APP_FLAGS) {
      $scope.initialFilter = '';
      $scope.filterMatches = [];
      $scope.portletListLoading = true;
      if($localStorage && $localStorage.typeaheadSearch) {
          //TODO : Add in search for somewhere for frame
      }      
      $scope.$watch('initialFilter', function(newVal, oldVal) {
          if (!newVal || !$scope.portlets) {
              $scope.filterMatches = [];
              return;
          }

          $scope.filterMatches = [];//this is where you would run your filter function
      });

      $scope.onSelect = function(portlet) {
          if($rootScope.portal.config.APP_FLAGS.isWeb) {
              $location.path("apps/search/"+ portlet.name);
              $scope.showSearch = false;
              $scope.showSearchFocus = false;
          } else {
              //frame app redirect
              window.location = SEARCH.searchURL + portlet.name;
          }
      };

      $scope.submit = function(){
        if($scope.initialFilter != "") {
          if($rootScope.portal.config.APP_FLAGS.isWeb) {
              $location.path("apps/search/"+ $scope.initialFilter);
              $scope.showSearch = false;
              $scope.showSearchFocus = false;
          } else {
              //frame app redirect
              window.location = SEARCH.searchURL + $scope.initialFilter;
          }
        }
      };
        
      $scope.$on('$locationChangeStart', function(event) {
        if ($location.url().indexOf('search') == -1) {
          $scope.initialFilter = '';
        }
      });
    }]);

    return app;

});
