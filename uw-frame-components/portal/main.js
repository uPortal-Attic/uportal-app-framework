define([
    'angular',
    'require',
    'jquery',
    'app-config',
    'override',
    'frame-config',
    'ngRoute',
    'ngSanitize',
    'ngStorage',
    'ngAria',
    'ngMaterial',
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
    './search/services',
    './settings/controllers',
    './settings/directives',
    './storage/services',
    './features/controllers',
    './features/directives',
    './features/services',
    'sortable',
    'ui-bootstrap',
    'ui-gravatar',
    'angulartics',
    'angulartics-google-analytics'
], function(angular, require) {

    var app = angular.module('portal', [
        'app-config',
        'override',
        'frame-config',
        'ngRoute',
        'ngSanitize',
        'ngStorage',
        'ngAria',
        'ngMaterial',
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
        'portal.search.services',
        'portal.settings.controllers',
        'portal.settings.directives',
        'portal.storage.services',
        'portal.features.controllers',
        'portal.features.directives',
        'portal.features.services',
        'ui.bootstrap',
        'ui.gravatar',
        'ui.sortable',
        'angulartics',
        'angulartics.google.analytics'
    ]);

    app.config(['gravatarServiceProvider', '$analyticsProvider', '$mdThemingProvider', 'THEMES' , function(gravatarServiceProvider, $analyticsProvider, $mdThemingProvider, THEMES){
      gravatarServiceProvider.defaults = {
        "default" : "https://yt3.ggpht.com/-xE0EQR3Ngt8/AAAAAAAAAAI/AAAAAAAAAAA/zTofDHA3-s4/s100-c-k-no/photo.jpg"
      };

      $analyticsProvider.firstPageview(true);
      $mdThemingProvider.alwaysWatchTheme(true);

      //theme config
      for(var i = 0; i < THEMES.length; i++) {
        var cur = THEMES[i];
        if(cur) {
          if(cur.materialTheme) {
            $mdThemingProvider.theme(cur.name);
            //set up primary
            if(cur.materialTheme.primary) {
              $mdThemingProvider.definePalette(cur.name + "-primary", cur.materialTheme.primary);
              $mdThemingProvider.theme(cur.name)
                .primaryPalette(cur.name + "-primary");
            }
            //set up accent
            if(cur.materialTheme.accent) {
              $mdThemingProvider.definePalette(cur.name + "-accent", cur.materialTheme.accent);
              $mdThemingProvider.theme(cur.name)
                .accentPalette(cur.name + "-accent");
            }
            //set warn
            if(cur.materialTheme.warn) {
              $mdThemingProvider.definePalette(cur.name + "-warn", cur.materialTheme.warn);
              $mdThemingProvider.theme(cur.name)
                .warnPalette(cur.name + "-warn");
            }
          }
        }
        cur = null;
      }
    }]);

    app.run(function($location,
                     $http,
                     $rootScope,
                     $timeout,
                     $sessionStorage,
                     $mdTheming,
                     THEMES,
                     OVERRIDE,
                     filterFilter,
                     APP_FLAGS,
                     SERVICE_LOC,
                     NAMES,
                     SEARCH,
                     FEATURES,
                     NOTIFICATION,
                     MISC_URLS,
                     FOOTER_URLS,
                     APP_BETA_FEATURES) {
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
          if(APP_FLAGS.debug) {
            console.log('Using cached theme');
          }
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
              if(APP_FLAGS.debug) {
                console.error('something is wrong with setup, no default theme. Setting to THEMES[0].');
              }
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
            }, function(reason){
              if(APP_FLAGS.debug) {
                console.error("We got a error back from groupURL, setting theme to default");
              }
              defaultThemeGo();
              loadingCompleteSequence();
            });
          } else {
            if(APP_FLAGS.debug) {
              console.warn('theme was setup as group, but the groupURL was not provided, going default');
            }
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
        var timeLapseBetweenLogins = APP_FLAGS.loginDurationMills || 14400000;
        if($sessionStorage.portal && $sessionStorage.portal.lastAccessed) {
          var now = (new Date()).getTime();
          if(now - $sessionStorage.portal.lastAccessed <= timeLapseBetweenLogins) {//4 hours
            return true;
          }
        }
        return false;
      }

      var searchRouteParameterInit = function(){
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
          var searchValue = '', paramToTackOn = '';
          if(next.$$route && next.$$route.searchParam) {
            paramToTackOn = APP_FLAGS.gaSearchParam || 'q';
            searchValue = next.params[next.$$route.searchParam];
            if(searchValue && $location.search()[paramToTackOn] !== searchValue) {
              event.preventDefault();
              //change route to have param of the search param
              $location.search(paramToTackOn,searchValue);
            }
          }
        });
      }

      //List of config. VERY IMPORTANT THAT THE CONFIGS has a corrisponding configsName in the same index
      var configs = [APP_FLAGS, SERVICE_LOC, NAMES, SEARCH, FEATURES, NOTIFICATION, MISC_URLS, FOOTER_URLS, APP_BETA_FEATURES];
      //TODO: make better
      var configsName = ['APP_FLAGS', 'SERVICE_LOC', 'NAMES', 'SEARCH', 'FEATURES', 'NOTIFICATION', 'MISC_URLS', 'FOOTER_URLS', 'APP_BETA_FEATURES'];

      var configureAppConfig = function(){
        if(APP_FLAGS.debug) {
          console.log(new Date() + " : start app-config override");
        }
        var count = 0, groups = 0;
        for(var i in configsName) {
          var curConfig = configsName[i];
          if(OVERRIDE[curConfig]) {
            groups++;
            if(Array.isArray(configs[i])){//arrays are special, append
              Array.prototype.push.apply(configs[i], OVERRIDE[curConfig]);
              count++;
            } else {//treat as an object
              for(var key in OVERRIDE[curConfig]) {//for each config value object
                configs[i][key] = OVERRIDE[curConfig][key];
                count++;
              }
            }
          }
        }
        if(APP_FLAGS.debug) {
          console.log(new Date() + " : ended app-config override");
          console.log("Overwrote " + count + " configs in " + groups + " config groups.");
        }
      };

      //loading sequence
      var init = function(){
        searchRouteParameterInit();
        $rootScope.portal = $rootScope.portal || {};
        $sessionStorage.portal = $sessionStorage.portal || {};
        configureAppConfig();

        if(APP_FLAGS.loginOnLoad && !lastLoginValid()) {
          $http.get(SERVICE_LOC.loginSilentURL).then(function(result){
            if(APP_FLAGS.debug) {
              console.log("login returned with " + (result.data ? result.data.status : null));
            }
            themeLoading();
            if("success" === result.data.status) {
              $sessionStorage.portal.lastAccessed = (new Date).getTime();
              $sessionStorage.portal.username = result.data.username;
              if (NAMES.guestUserName && result.data.username === NAMES.guestUserName) {
                $rootScope.GuestMode = true;
              }

            }
          },
          function(reason){
            themeLoading(); //still continue with theme loading so they don't get stuck on loading
          });
        } else {
          themeLoading();
        }
      };
      init();
    });

    return app;

},
function(angular, require, $){
  //error block
  $('#loading-splash').html('<b>An error has occured during loading, please try refreshing the page. If the issue persists please contact the helpdesk.</b>');
});
