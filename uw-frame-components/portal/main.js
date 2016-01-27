define([
    'angular',
    'require',
    'app-config',
    'frame-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngAria',
    './about/controllers',
    './about/services',
    './main/controllers',
    './main/directives',
    './main/services',
    './misc/controllers',
    './misc/directives',
    './misc/filters',
    './misc/services',
    './notifications/controllers',
    './notifications/directives',
    './notifications/services',
    './search/controllers',
    './search/directives',
    './settings/controllers',
    './settings/directives',
    './storage/services',
    './features/controllers',
    './features/directives',
    './features/services',
    'sortable',
    'ui-bootstrap',
    'ui-gravatar'
], function(angular, require) {

    var app = angular.module('portal', [
        'app-config',
        'frame-config',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'ngAria',
        'portal.about.controllers',
        'portal.about.services',
        'portal.main.controllers',
        'portal.main.directives',
        'portal.main.services',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.services',
        'portal.notifications.controllers ',
        'portal.notifications.directives',
        'portal.notifications.services',
        'portal.search.controllers',
        'portal.search.directives',
        'portal.settings.controllers',
        'portal.settings.directives',
        'portal.storage.services',
        'portal.features.controllers',
        'portal.features.directives',
        'portal.features.services',
        'ui.bootstrap',
        'ui.gravatar',
        'ui.sortable'
    ]);

    app.config(['gravatarServiceProvider', function(gravatarServiceProvider){
      gravatarServiceProvider.defaults = {
        "default" : "https://yt3.ggpht.com/-xE0EQR3Ngt8/AAAAAAAAAAI/AAAAAAAAAAA/zTofDHA3-s4/s100-c-k-no/photo.jpg"
      };
      
    }]);

    app.run(function($http, $rootScope, $timeout,$sessionStorage, NAMES, THEMES, APP_FLAGS, SERVICE_LOC, filterFilter) {
      var loadingCompleteSequence = function() {
        
        //loading sequence
        $rootScope.portal.loading = {};
        $rootScope.portal.loading.startFade = true;
        $timeout(function(){
          $rootScope.portal.loading.hidden = true;
        }, 1500);
        
        //save theme to session storage so we don't have to do below again
        $sessionStorage.portal.theme = $rootScope.portal.theme;
      };
      
      var themeLoading = function(){
        if($sessionStorage.portal && $sessionStorage.portal.theme) {
          $rootScope.portal.theme = $sessionStorage.portal.theme;
          console.log('Using cached theme');
          loadingCompleteSequence();
          return;
        }
        var themeIndex = APP_FLAGS.defaultTheme || 0;
        if('group' == themeIndex) {
          var themeSet = false;
          var defaultThemeGo = function() {
            var themes = filterFilter(THEMES, {group : 'default'});
            themeSet = themes.length > 0;
            if(themeSet) {
              $rootScope.portal.theme = themes[0];
            } else {
              console.error('something is wrong with setup, no default theme. Setting to THEMES[0].');
              $rootScope.portal.theme = THEMES[0];
            }
          }
          //themeIndex is group which means we need to run groups service to get which theme they use
          if(SERVICE_LOC.groupURL) {
            //normally this $http would be in a service, but due to loading we moved it to the run block
            $http.get(SERVICE_LOC.groupURL, {cache : true}).then(function(result) {
              var groups = result.data.groups;
              //go through each theme and see if there in that group
              for(var i = 0; i < THEMES.length; i++) {
                var theme = THEMES[i];
                var groupToTest = theme.group;
                if('default'!==groupToTest) {//skip the default theme 
                  var filterTest = filterFilter(groups, { name : groupToTest });
                  if(filterTest && filterTest.length > 0) {
                    $rootScope.portal.theme = theme;
                    themeSet = true;
                    break;
                  }
                }
              }
              if(!themeSet) {
                defaultThemeGo();
              }
              loadingCompleteSequence();
            });
          } else {
            console.warn('theme was setup as group, but the groupURL was not provided, going default');
            //still not set, set to default theme
            defaultThemeGo();
            loadingCompleteSequence();
          }
        } else {
          //themeindex is a number, go with that
          $rootScope.portal.theme = THEMES[themeIndex]; //theme default
          loadingCompleteSequence();
        }
      }
      
      var lastLoginValid = function() {
        var timeLapsBetweenLogins = APP_FLAGS.loginDurationMills || 14400000;
        if($sessionStorage.portal && $sessionStorage.portal.lastAccessed) {
          var now = (new Date()).getTime();
          if(now - $sessionStorage.portal.lastAccessed <= timeLapsBetweenLogins) {//4 hours
            return true;
          }
        } 
        return false;
      }
      
      //loading sequence
      var init = function(){
        
        $rootScope.portal = $rootScope.portal || {};
        $sessionStorage.portal = $sessionStorage.portal || {};
        
        if(APP_FLAGS.loginOnLoad && !lastLoginValid()) {
          $http.get(SERVICE_LOC.loginSilentURL).then(function(result){
            console.log("login returned with " + result.data ? result.data.status : null);
            themeLoading();
            if("success" === result.data.status) {
              $sessionStorage.portal.lastAccessed = (new Date).getTime();
              $sessionStorage.portal.username = result.data.username;
            }
          },
          function(reason){
            console.warn('login erred unexpectely, portal down? ' + reason.status);
          });
        } else {
          themeLoading();
        }
      };
      init();
    });

    return app;

});
