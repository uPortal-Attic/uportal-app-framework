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
      if($rootScope.portal && $rootScope.portal.theme) {
        frameTitle = $rootScope.portal.theme.title;
        if(frameTitle !== NAMES.title && !APP_FLAGS.isWeb) {
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

      if(NAMES.title) {
        setTitle();
      }
      // https://github.com/Gillespie59/eslint-plugin-angular/issues/231
      // eslint-disable-next-line angular/on-watch
      $rootScope.$watch('portal.theme', function(newValue, oldValue) {
        if(newValue && newValue !== oldValue) {
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
  ['$log', '$scope', 'mainService', 'portalShibbolethService', 'NAMES',
  'APP_FLAGS', '$sessionStorage', '$rootScope',
  function($log, $scope, mainService, portalShibbolethService, NAMES,
           APP_FLAGS, $sessionStorage, $rootScope) {
    var vm = this;
    vm.user = [];
    vm.username = '';
    vm.campusId = '';
    vm.firstLetter = '';
    vm.profileUrl = $sessionStorage.portal.theme.profileUrl ?
      $sessionStorage.portal.theme.profileUrl : '';
    vm.campusIdAttribute = APP_FLAGS.campusIdAttribute;
    /**
     * Listen for theme changes and update profileUrl accordingly
     */
    $scope.$on('themeChanged', function(event, data) {
      vm.profileUrl = data.profileUrl ? data.profileUrl : '';
    });

    // Get the user's attributes from Shibboleth
    portalShibbolethService.getUserAttributes()
      .then(function(result) {
        var displayName = '';
        var givenName = '';
        angular.forEach(result, function(key) {
          // Set username
          if (key.name === 'displayName') {
            displayName = key.values[0];
          }
          // Set fall-back username
          if (key.name === 'givenName') {
            givenName = key.values[0];
          }
          // Set campus ID
          if (vm.campusIdAttribute && key.name === vm.campusIdAttribute) {
            vm.campusId = key.values[0];
          }
        });
        // Determine which username to use
        if (displayName != '' && angular.isString(displayName)) {
          vm.username = displayName;
          vm.firstLetter = displayName.substring(0, 1);
        } else if (givenName != '' && angular.isString(givenName)) {
          vm.username = givenName;
          vm.firstLetter = givenName.substring(0, 1);
        } else {
          vm.username = '?';
          vm.firstLetter = '?';
        }
        return result;
      })
      .catch(function(error) {
        $log.warn('Couldn\'t get user\'s session info from Shibboleth');
        $log.error(error);
      });

    // Check if user is guest and if avatar is enabled
    mainService.getUser().then(function(result) {
      vm.user = result;
      // Check if is guest
      if (NAMES.guestUserName && vm.user
        && vm.user.userName === NAMES.guestUserName) {
        $rootScope.GuestMode = true;
      } else {
        // Get first letter of first name or display name
        if ($sessionStorage.optAvatar) {
          $rootScope.optAvatar = true;
          vm.firstLetter = 'PIC';
        } else {
          $rootScope.optAvatar = false;
        }
      }
      return result;
    }).catch(function() {
      $log.warn('could not get user');
    });
  }])

  /* Header */
  .controller('PortalHeaderController', ['$rootScope', '$scope', '$location',
    'NAMES', 'APP_FLAGS', 'MISC_URLS', 'notificationsService',
    function($rootScope, $scope, $location, NAMES, APP_FLAGS, MISC_URLS,
             notificationsService) {
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
