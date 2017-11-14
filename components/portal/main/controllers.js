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
    '$location', 'NAMES', 'MISC_URLS', 'APP_FLAGS',
    'APP_OPTIONS', 'THEMES', 'miscService',
    function($localStorage, $sessionStorage, $scope, $rootScope, $document,
    $location, NAMES, MISC_URLS, APP_FLAGS, APP_OPTIONS, THEMES, miscService) {
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
      $scope.APP_OPTIONS = APP_OPTIONS;

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
  'APP_FLAGS', '$sessionStorage', '$localStorage', '$rootScope',
  function($log, $scope, mainService, NAMES,
           APP_FLAGS, $sessionStorage, $localStorage, $rootScope) {
    var vm = this;
    vm.user = [];
    vm.username = '?';
    vm.campusId = '';
    vm.firstLetter = '?';
    vm.usernameMenuFocus = '';
    vm.optAvatar = $sessionStorage.optAvatar;
    vm.profileUrl = ($sessionStorage.portal.theme
      && $sessionStorage.portal.theme.profileUrl) ?
      $sessionStorage.portal.theme.profileUrl : '';
    vm.campusIdAttribute = APP_FLAGS.campusIdAttribute;

    // Tell username menu which element to focus upon opening (accessibility)
    if (APP_FLAGS.showUserSettingsPage) {
      vm.usernameMenuFocus = 'user-settings';
    } else if ($localStorage.showSettings) {
      vm.usernameMenuFocus = 'beta-settings';
    } else {
      vm.usernameMenuFocus = 'log-out';
    }

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

  /* Main menu toggle controller */
  .controller('MenuToggleController', ['$mdSidenav', function($mdSidenav) {
    var vm = this;
    /**
     * Toggle the side navigation menu
     */
    vm.showMainMenu = function() {
      $mdSidenav('main-menu').toggle();
    };
  }])

  /* Side navigation controller */
  .controller('MainMenuController', ['$rootScope', '$scope', '$mdSidenav',
    '$mdMedia', '$window', '$localStorage', 'APP_OPTIONS', 'FOOTER_URLS',
    'MESSAGES', 'NAMES', 'SERVICE_LOC', 'miscService',
    function($rootScope, $scope, $mdSidenav, $mdMedia, $window, $localStorage,
             APP_OPTIONS, FOOTER_URLS, MESSAGES, NAMES, SERVICE_LOC,
             miscService) {
      var vm = this;

      // Scope variables
      vm.menuItems = [];
      vm.appName = '';
      vm.notificationsPageUrl = '';
      vm.hideMainMenu = false;
      vm.footerLinks = FOOTER_URLS;
      vm.openMenuByDefault = false;
      vm.hideMessagesFeatures = false;

      $scope.$on('HAS_PRIORITY_NOTIFICATIONS', function(event, data) {
        if (angular.isDefined(data.hasNotifications)) {
          vm.hasPriorityNotifications = data.hasNotifications;
        }
      });

      $scope.$on('HAS_UNSEEN_ANNOUNCEMENTS', function(event, data) {
        if (angular.isDefined(data.hasNotifications)) {
          vm.hasUnseenAnnouncements = data.hasAnnouncements;
        }
      });

      // Close side nav on scroll to avoid awkward UI
      $window.onscroll = function() {
        if (vm.isMenuOpen() && !$mdMedia('gt-sm')) {
          vm.closeMainMenu();
        }
      };

      /**
       * Check if the side nav menu is open
       * @return {boolean}
       */
      vm.isMenuOpen = function() {
        return $mdSidenav('main-menu').isOpen();
      };

      /**
       * Close the side navigation menu (used in ng-click)
       */
      vm.closeMainMenu = function() {
        if (vm.isMenuOpen()) {
          $mdSidenav('main-menu').close();
        }
      };

      /**
       * Track clicks on "Notifications" bell in mobile side nav
       * @param {string} category - Context of the event
       * @param {string} action - Action taken
       * @param {string} label - Label/data pertinent to event
       */
      vm.pushGAEvent = function(category, action, label) {
        miscService.pushGAEvent(category, action, label);
      };

      /**
       * Configure menu template, mobile menu top bar,
       * menu footer, and push content mode
       */
      var configureMainMenu = function() {
        // Use either custom template or defined menu items
        if (APP_OPTIONS.appMenuTemplateURL) {
          vm.appMenuTemplate = require.toUrl(APP_OPTIONS.appMenuTemplateURL);
        } else if (APP_OPTIONS.appMenuItems
          && APP_OPTIONS.appMenuItems.length > 0) {
          vm.menuItems = APP_OPTIONS.appMenuItems;
        } else {
          vm.hideMainMenu = true;
        }
        // Set mobile menu header values
        if (NAMES.title) {
          vm.appName = NAMES.title;
        }
        if (MESSAGES.notificationsPageURL) {
          vm.notificationsPageUrl = MESSAGES.notificationsPageURL;
        }
        // Add footer links
        if ($rootScope.portal && $rootScope.portal.theme
          && $rootScope.portal.theme.footerLinks) {
          vm.footerLinks =
            vm.footerLinks.concat($rootScope.portal.theme.footerLinks);
        }
        // Check if push content is set
        vm.openMenuByDefault =
          APP_OPTIONS.enablePushContentMenu && $mdMedia('gt-sm');
      };

      /**
       * Configure notifications/announcements features in main menu
       * if messages configuration is properly set up
       */
      var configureMessagesFeatures = function() {
        // If messages config is properly set up, set directive scope,
        // otherwise hide messages features
        if (SERVICE_LOC.messagesURL && SERVICE_LOC.messagesURL !== '') {
          // Set flags for notifications/announcements
          vm.hasPriorityNotifications = $localStorage.hasPriorityNotifications;
          vm.hasUnseenAnnouncements = $localStorage.hasUnseenAnnouncements;
        } else {
          vm.hideMessagesFeatures = true;
        }
      };

      /**
       * Check for menu configuration in app config
       */
      var init = function() {
        configureMainMenu();
        configureMessagesFeatures();
      };

      init();
  }])

  /* Footer */
  .controller('PortalFooterController', ['$scope', 'FOOTER_URLS',
    function($scope, FOOTER_URLS) {
      $scope.date = new Date();
      $scope.FOOTER_URLS = FOOTER_URLS;
  }]);
});
