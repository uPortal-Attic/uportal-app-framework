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
  return angular.module('portal.search.controllers', [])
  .controller('PortalSearchController', [
    'miscService',
    'PortalSearchService',
    '$location',
    '$rootScope',
    '$scope',
    '$localStorage',
    '$routeParams',
    '$window',
    'SEARCH',
    'APP_FLAGS',
    function(miscService,
             PortalSearchService,
             $location,
             $rootScope,
             $scope,
             $localStorage,
             $routeParams,
             $window,
             SEARCH,
             APP_FLAGS) {
      // scope functions
      $scope.onSelect = function(portlet) {
          if (APP_FLAGS.isWeb) {
              $location.path('apps/search/'+ portlet.name);
              $scope.showSearch = false;
              $scope.showSearchFocus = false;
          } else {
              // frame app redirect
              $window.location = SEARCH.searchURL + portlet.name;
          }
      };

      $scope.submit = function() {
        if ($scope.initialFilter != '') {
          if (APP_FLAGS.isWeb) {
              $location.path('apps/search/'+ $scope.initialFilter);
              $scope.showSearch = false;
              $scope.showSearchFocus = false;
          } else {
              // frame app redirect
              $window.location = SEARCH.searchURL + $scope.initialFilter;
          }
        }
      };

      $scope.toggleSearch = function() {
        $scope.searchExpanded = $scope.searchExpanded ? false : true;
      };

      $scope.$on('$locationChangeStart', function(event) {
        if ($location.url().indexOf('search') == -1) {
          $scope.initialFilter = '';
        }
      });

      // init function
      var init = function() {
        $scope.initialFilter = '';
        $scope.filterMatches = [];
        $scope.searchExpanded = false;
        $scope.showSearchFocus = false;
        $scope.portletListLoading = true;
        if ($localStorage && $localStorage.typeaheadSearch) {
            // TODO : Add in search for somewhere for frame
            $scope.$watch('initialFilter', function(newVal, oldVal) {
                if (!newVal || !$scope.portlets) {
                    $scope.filterMatches = [];
                    return;
                }
                // this is where you would run your filter function
                $scope.filterMatches = [];
            });
        }

        $scope.searchService = PortalSearchService;
        $scope.$watch('searchService.getQuery()', function(newVal, oldVal) {
          if (!newVal) {
            return;
          }
          $scope.initialFilter = newVal;
          PortalSearchService.resetQuery();
        });
      };
      init();
    }]);
});
