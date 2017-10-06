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
    'PortalSearchService',
    '$location',
    '$window',
    'SEARCH',
    'APP_FLAGS',
    function(PortalSearchService,
             $location,
             $window,
             SEARCH,
             APP_FLAGS) {
      var vm = this;
      // scope functions

      vm.submit = function() {
        if (vm.initialFilter != '') {
          if (APP_FLAGS.isWeb) {
              $location.path('apps/search/'+ vm.initialFilter);
          } else {
              // frame app redirect
              $window.location = SEARCH.searchURL + vm.initialFilter;
          }
        }
      };

      vm.toggleSearch = function() {
        vm.searchExpanded = !vm.searchExpanded;
      };

      // init function
      var init = function() {
        vm.initialFilter = '';
        vm.searchExpanded = false;
      };
      init();
    }]);
});
