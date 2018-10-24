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
  return (
    angular
        .module('portal.misc.controllers', [])

    /* AddToHomeController */
        .controller('AddToHomeController', [
          '$log',
          '$scope',
          '$timeout',
          '$mdToast',
          'PortalAddToHomeService',
          function($log, $scope, $timeout, $mdToast, PortalAddToHomeService) {
          /**
           * Check if the given app is in the user's home layout already.
           * If not, trigger the prompt to add it.
           * @param {String} fname
           */
            var checkInHome = function(fname) {
              PortalAddToHomeService.inHome(fname)
                  .then(function(data) {
                    $scope.inHome = data;

                    // If not in home, show toast to add it
                    if (!$scope.inHome) {
                      $timeout(function() {
                        showAddToHomeToast();
                      }, 1500);
                    }

                    return data;
                  })
                  .catch(function() {
                    $log.warn('could not check inHome for ' + fname);
                  });
            };

            /**
           * Show a dismissible toast prompting the user to add the app to their
           * home layout. Dismissing toast persists for the session.
           */
            var showAddToHomeToast = function() {
              $mdToast.show({
                position: 'top right',
                hideDelay: false,
                scope: $scope,
                preserveScope: true,
                parent: angular
                    .element(document)
                    .find('div.add-to-home-parent')[0],
                templateUrl: require.toUrl(
                    '/portal/misc/partials/toast-add-to-home.html'
                ),
                controller: function ToastAddToHomeController(
                    $scope,
                    $mdToast,
                    PortalAddToHomeService
                ) {
                  $scope.addToHome = function() {
                    if (
                      !$scope.inHome &&
                    PortalAddToHomeService.canAddToHome($scope.appFname)
                    ) {
                      $scope.savingAddToHome = true;
                      PortalAddToHomeService.addToHome($scope.appFname)
                          .then(function() {
                            // success
                            $scope.inHome = true;
                            $scope.successfullyAdded = true;
                            $timeout(function() {
                              $scope.dismissToast();
                            }, 1000);
                            return true;
                          })
                          .catch(function() {
                            // failed
                            $scope.addToHomeFailed = true;
                          });
                    }
                  };

                  $scope.dismissToast = function() {
                    $mdToast.hide();
                    PortalAddToHomeService.dismissForSession();
                  };
                },
              });
            };

            /**
           * Check for if current app can be added to home and user
           * hasn't already dismissed a chance to do so during this session.
           */
            var init = function() {
            // Default it to being in your home to avoid service loading lag
              $scope.inHome = true;

              if (PortalAddToHomeService.canAddToHome()) {
              // Make sure user didn't already dismiss
              // add to home toast
                if (!PortalAddToHomeService.isDismissed()) {
                  if ($scope.appFname) {
                  // Check if in home layout
                    checkInHome($scope.appFname);
                  } else {
                    $scope.$watch('appFname', function() {
                    // Must be using 2 way binding, add a watch on the fname
                      if ($scope.appFname) {
                        checkInHome($scope.appFname);
                      }
                    });
                  }
                }
              }
            };

            init();
          },
        ])

        .controller('SkipToContentController', [
          '$scope',
          '$location',
          '$anchorScroll',
          '$document',
          function($scope, $location, $anchorScroll, $document) {
          /**
           * Sets URL hash, scrolls, and sets focus to specified element by id
           * @throws {TypeError} when null argument or when element referenced by
           * id does not exist
           */
            $scope.skipToHere = function(htmlElemementId) {
              $location.hash(htmlElemementId);
              $anchorScroll();
              $document[0].getElementById(htmlElemementId).focus();
            };
          },
        ])
  );
});
