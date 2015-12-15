'use strict';

define(['angular','require'], function(angular, require) {
  var app = angular.module('portal.main.controllers', []);

  app.controller('PortalMainController', ['$localStorage', '$sessionStorage','$scope', '$rootScope', '$document', '$location', 'NAMES', 'MISC_URLS', 'APP_FLAGS','THEMES','miscService', function($localStorage, $sessionStorage, $scope, $rootScope, $document, $location, NAMES, MISC_URLS, APP_FLAGS,THEMES, miscService) {
    var defaults = {
            showSidebar: APP_FLAGS.showSidebar,
            sidebarQuicklinks: false,
            showKeywordsInMarketplace : false,
            homeImg : "img/square.jpg",
            sidebarShowProfile: false,
            profileImg: "img/terrace.jpg",
            typeaheadSearch: false,
            exampleWidgets: false,
            layoutMode : 'list', //other option is 'widgets'
            gravatarEmail : null,
            useGravatar : false,
            webPortletRender : false,
            lastSeenFeature : -1
            };


    //=====functions ======
    var init = function(){
      $scope.$storage = $localStorage.$default(defaults);

      $scope.NAMES=NAMES;
      $scope.classicURL=MISC_URLS.back2ClassicURL;
      $scope.APP_FLAGS=APP_FLAGS;
      $scope.MISC_URLS=MISC_URLS;
      $scope.THEMES = THEMES;

      if(NAMES.title) {
        $document[0].title=NAMES.title;
      }

      //class for ng-view
      $scope.routeClass = "route" + angular.lowercase($location.path().replace(new RegExp('/', 'g'), '-'));
    }

    // $scope.switchTheme = function(choice) {
    //   $rootScope.portal.school = choice.name;
    //   $rootScope.portal.crest = choice.crest;
    //   $rootScope.portal.title = choice.title;
    //
    // }

    $scope.resetLocal = function() {
        $localStorage.$reset(defaults);
    };

    $scope.clearSession = function() {
        $sessionStorage.$reset();
    };

    $scope.reload = function() {
        location.reload();
    }
    $scope.pushGAEvent = function (category, action, label) {
      miscService.pushGAEvent(category, action, label);
    }
    $scope.openSidebar = function() {
      $scope.$storage.showSidebar = true;
      miscService.pushGAEvent('Sidebar','Show/Hide Sidebar', 'Show Sidebar');
    }
    $scope.closeSidebar = function() {
      $scope.$storage.showSidebar = false;
      miscService.pushGAEvent('Sidebar','Show/Hide Sidebar', 'Hide Sidebar');
    };

    //run init
    init();
  } ]);

  /* Username */
  app.controller('SessionCheckController', [ '$scope', 'mainService', 'NAMES', 'FOOTER_URLS', '$rootScope', function($scope, mainService, NAMES, FOOTER_URLS, $rootScope) {
    var that = this;
    that.user = [];
    
    $scope.FOOTER_URLS = FOOTER_URLS;

    //initialize GuestMode
    $rootScope.GuestMode = false;
    mainService.getUser().then(function(result){
      that.user = result;
      //check if is guest
      if (NAMES.guestUserName && that.user && that.user.userName === NAMES.guestUserName)
        $rootScope.GuestMode = true;

    });
  }]);

  /* Header */
  app.controller('PortalHeaderController', ['$rootScope', '$scope','$location', 'NAMES', 'APP_FLAGS', 'MISC_URLS', function($rootScope, $scope, $location, NAMES, APP_FLAGS, MISC_URLS) {
    this.navbarCollapsed = true;
    this.showLogout = !APP_FLAGS.showSidebar;
    $scope.showSearch = false;
    $scope.showSearchFocus = false;
    $scope.APP_FLAGS = APP_FLAGS;
    $scope.MISC_URLS = MISC_URLS;

    this.toggleSearch = function() {
        $scope.showSearch = !$scope.showSearch;
        $scope.showSearchFocus = !$scope.showSearchFocus;
    }
  }]);

  /* Footer */
  app.controller('PortalFooterController', ['$scope', function($scope) {
      $scope.date = new Date();

  }]);

  app.controller('PortalSidebarController',[ '$localStorage', '$scope', 'mainService', 'miscService', 'MISC_URLS', 'APP_FLAGS', function($localStorage, $scope, mainService, miscService, MISC_URLS, APP_FLAGS) {
      $scope.$storage = $localStorage;
      $scope.sidebar = [];
      $scope.MISC_URLS = MISC_URLS;
      $scope.APP_FLAGS = APP_FLAGS;
      mainService.getSidebar().then(function(result){
          $scope.sidebar = result.data.sidebar;
      });

      this.canSee = function(storageVar) {
          if(storageVar === '')
              return true;
          else {
              return $scope.$storage[storageVar];
          }
      }
  }]);

  return app;

});
