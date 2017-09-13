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

define(['angular', 'require'], function(angular, require) {
  return angular.module('portal.main.controllers', [])

  .controller('PortalMainController', [
    '$localStorage', '$sessionStorage', '$scope', '$rootScope', '$document',
    '$location', 'NAMES', 'MISC_URLS', 'APP_FLAGS', 'THEMES', 'miscService',
    function($localStorage, $sessionStorage, $scope, $rootScope, $document,
    $location, NAMES, MISC_URLS, APP_FLAGS, THEMES, miscService) {
    var defaults = {
      layoutMode: 'list', // other option is 'widgets
    };

    /**
     * set the frame title using theme
     */
    function setTitle() {
      var frameTitle = '';
      if ($rootScope.portal && $rootScope.portal.theme) {
        frameTitle = $rootScope.portal.theme.title;
        if (frameTitle !== NAMES.title && !APP_FLAGS.isWeb) {
          frameTitle = ' | ' + frameTitle;
        } else {
          // since frame title equals the title in NAMES lets not duplicate it
          frameTitle = '';
        }
      }
      $document[0].title=NAMES.title + frameTitle;
    }

    // =====functions ======
    var init = function() {
      $scope.$storage = $localStorage.$default(defaults);

      $scope.NAMES=NAMES;
      $scope.APP_FLAGS=APP_FLAGS;
      $scope.MISC_URLS=MISC_URLS;
      $scope.THEMES = THEMES.themes;

      if (NAMES.title) {
        setTitle();
      }
      // https://github.com/Gillespie59/eslint-plugin-angular/issues/231
      // eslint-disable-next-line angular/on-watch
      $rootScope.$watch('portal.theme', function(newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          setTitle();
        }
      });

      // class for ng-view
      $scope.routeClass = 'route' +
        angular.lowercase($location.path().replace(new RegExp('/', 'g'), '-'));
    };

    $scope.resetAll = function() {
      $scope.resetLocal();
      $scope.resetSession();
      $scope.reload();
    };

    $scope.resetLocal = function() {
        $localStorage.$reset(defaults);
    };

    $scope.resetSession = function() {
        $sessionStorage.$reset();
    };

    $scope.reload = function() {
        location.reload();
    };
    $scope.pushGAEvent = function(category, action, label) {
      miscService.pushGAEvent(category, action, label);
    };

    // run init
    init();
  }])

  /* Username */
  .controller('SessionCheckController',
  ['$log', '$scope', 'mainService', 'NAMES',
  'APP_FLAGS', '$sessionStorage', '$rootScope',
  function($log, $scope, mainService, NAMES,
           APP_FLAGS, $sessionStorage, $rootScope) {
    var vm = this;
    vm.user = [];
    vm.username = '?';
    vm.campusId = '';
    vm.firstLetter = '?';
    vm.optAvatar = $sessionStorage.optAvatar;
    vm.profileUrl = ($sessionStorage.portal.theme
      && $sessionStorage.portal.theme.profileUrl) ?
      $sessionStorage.portal.theme.profileUrl : '';
    vm.campusIdAttribute = APP_FLAGS.campusIdAttribute;
    /**
     * Listen for theme changes and update profileUrl accordingly
     */
    $scope.$on('themeChanged', function(event, data) {
      vm.profileUrl = data.profileUrl ? data.profileUrl : '';
    });

    // Check if user is guest and if avatar is enabled
    mainService.getUser().then(function(result) {
      vm.user = result;
      $rootScope.GuestMode = (vm.user.userName === NAMES.guestUserName);

      if (vm.user.firstName || vm.user.displayName) {
        vm.username = vm.user.firstName ?
          vm.user.firstName.toLowerCase() : vm.user.displayName.toLowerCase();
      }
      vm.firstLetter = vm.username.substring(0, 1);

      // This is a placeholder until a campusId source is added.
      // Set campus ID
      if (vm.campusIdAttribute && vm.user[vm.campusIdAttribute]) {
        vm.campusId = vm.user[vm.campusIdAttribute];
      }

      return result;
    }).catch(function() {
      $log.warn('could not get user');
    });
  }])

  /* Header */
  .controller('PortalHeaderController', ['$rootScope', '$scope', '$location',
    'APP_FLAGS', 'MISC_URLS', 'messagesService',
    function($rootScope, $scope, $location, APP_FLAGS, MISC_URLS,
             messagesService) {
      var vm = this;
      vm.navbarCollapsed = true;
      vm.showLogout = true;
      $scope.showSearch = false;
      $scope.showSearchFocus = false;
      $scope.APP_FLAGS = APP_FLAGS;
      $scope.MISC_URLS = MISC_URLS;

      vm.toggleSearch = function() {
        $scope.showSearch = !$scope.showSearch;
        $scope.showSearchFocus = !$scope.showSearchFocus;
        vm.navbarCollapsed = true;
      };
      vm.toggleMenu = function() {
        $scope.showSearch = false;
        vm.navbarCollapsed = !vm.navbarCollapsed;
      };
  }])

  /* Footer */
  .controller('PortalFooterController', ['$scope', 'FOOTER_URLS',
    function($scope, FOOTER_URLS) {
      $scope.date = new Date();
      $scope.FOOTER_URLS = FOOTER_URLS;
  }]);
});
