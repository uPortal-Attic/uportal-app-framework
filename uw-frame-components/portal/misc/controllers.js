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
  return angular.module('portal.misc.controllers', [])

  /* AddToHomeController */
    .controller('AddToHomeController', [
      '$log', '$scope', '$timeout', 'PortalAddToHomeService',
      function($log, $scope, $timeout, PortalAddToHomeService) {
        $scope.addToHome = function() {
          if (!$scope.inHome
            && PortalAddToHomeService.canAddToHome($scope.fname)) {
            $scope.savingAddToHome = true;
            PortalAddToHomeService.addToHome($scope.fname).then(
              function() {
                // success
                $scope.inHome = true;
                $scope.successfullyAdded = true;
                return true;
              }).catch(function() {
                // failed
                $scope.addToHomeFailed = true;
              }
            );
          }
        };

        var checkInHome = function(fname) {
          PortalAddToHomeService.inHome(fname).then(function(data) {
            $scope.inHome = data;
            return data;
          }).catch(function() {
            $log.warn('could not check inHome for ' + fname);
          });
        };

        var init = function() {
          // default it to being in your home to avoid service loading lag
          $scope.inHome = true;

          if (PortalAddToHomeService.canAddToHome()) {
            if ($scope.fname) {
              // check if in home layout
              checkInHome($scope.fname);
            } else {
              $scope.$watch('fname', function() {
                // must be using 2 way binding, add a watch on the fname
                if ($scope.fname) {
                  checkInHome($scope.fname);
                }
              });
            }
          }
        };

        init();
      }])

    .controller('AppHeaderOptionsController', ['APP_OPTIONS',
      function(APP_OPTIONS) {
        var vm = this;

        // If an options template is specified, set scope variable
        if (APP_OPTIONS.optionsTemplateURL) {
          vm.optionsTemplate = require.toUrl(APP_OPTIONS.optionsTemplateURL);
        }
    }]);
});
