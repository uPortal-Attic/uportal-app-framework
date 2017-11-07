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
    './messages/controllers',
    './messages/directives',
    './messages/filters',
    './messages/services',
    './main/controllers',
    './main/directives',
    './main/services',
    './misc/controllers',
    './misc/directives',
    './misc/filters',
    './misc/services',
    './search/controllers',
    './search/directives',
    './search/services',
    './settings/controllers',
    './settings/directives',
    './settings/services',
    './storage/services',
    './timeout/controllers',
    './timeout/services',
    './widgets/controllers',
    './widgets/directives',
    './widgets/services',
    'sortable',
    'ui-bootstrap',
    'ui-gravatar',
    'angulartics-google-analytics',
], function(angular, require) {
    // Define a stub in case this angular module is undefined, i.e. was blocked
    try {
        angular.module('angulartics.google.analytics');
    } catch (e) {
      angular.module('angulartics.google.analytics', []);
    }

    return angular.module('portal', [
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
        'portal.messages.controllers',
        'portal.messages.directives',
        'portal.messages.filters',
        'portal.messages.services',
        'portal.misc.controllers',
        'portal.misc.directives',
        'portal.misc.filters',
        'portal.misc.services',
        'portal.search.controllers',
        'portal.search.directives',
        'portal.search.services',
        'portal.settings.controllers',
        'portal.settings.directives',
        'portal.settings.services',
        'portal.storage.services',
        'portal.timeout.controllers',
        'portal.timeout.services',
        'portal.widgets.controllers',
        'portal.widgets.directives',
        'portal.widgets.services',
        'ui.bootstrap',
        'ui.gravatar',
        'ui.sortable',
        'angulartics',
        'angulartics.google.analytics',
    ])

    .config([
      'gravatarServiceProvider', '$analyticsProvider',
      '$mdThemingProvider', 'THEMES',
      function(gravatarServiceProvider, $analyticsProvider,
        $mdThemingProvider, THEMES) {
      gravatarServiceProvider.defaults = {
        'default': 'https://yt3.ggpht.com/-xE0EQR3Ngt8/AAAAAAAAAAI/AAAAAAAAAAA/zTofDHA3-s4/s100-c-k-no/photo.jpg',
      };

      $analyticsProvider.firstPageview(true);
      $mdThemingProvider.alwaysWatchTheme(true);
      $mdThemingProvider.generateThemesOnDemand(true);

      // Theme config
      for (var i = 0; i < THEMES.themes.length; i++) {
        var cur = THEMES.themes[i];
        if (cur) {
          if (cur.materialTheme) {
            $mdThemingProvider.theme(cur.name);
            // Set up primary
            if (cur.materialTheme.primary) {
              if (angular.isString(cur.materialTheme.primary)) {
                $mdThemingProvider.theme(cur.name)
                  .primaryPalette(cur.materialTheme.primary);
                // Enable browser color (mobile only)
                $mdThemingProvider.enableBrowserColor({
                  theme: $mdThemingProvider.theme(cur.name),
                  palette: cur.materialTheme.primary,
                  hue: '500',
                });
              } else {
                $mdThemingProvider.definePalette(
                  cur.name + '-primary',
                  cur.materialTheme.primary
                );
                $mdThemingProvider.theme(cur.name)
                  .primaryPalette(cur.name + '-primary');
                // Enable browser color (mobile only)
                $mdThemingProvider.enableBrowserColor({
                  theme: $mdThemingProvider.theme(cur.name),
                  palette: cur.name + '-primary',
                  hue: '500',
                });
              }
            }
            // Set up accent
            if (cur.materialTheme.accent) {
              if (angular.isString(cur.materialTheme.accent)) {
                $mdThemingProvider.theme(cur.name)
                  .accentPalette(cur.materialTheme.accent);
              } else {
                $mdThemingProvider.definePalette(
                  cur.name + '-accent',
                  cur.materialTheme.accent
                );
                $mdThemingProvider.theme(cur.name)
                  .accentPalette(cur.name + '-accent');
              }
            }
            // Set up warn
            if (cur.materialTheme.warn) {
              if (angular.isString(cur.materialTheme.warn)) {
                $mdThemingProvider.theme(cur.name)
                  .warnPalette(cur.materialTheme.warn);
              } else {
                $mdThemingProvider.definePalette(
                  cur.name + '-warn',
                  cur.materialTheme.warn
                );
                $mdThemingProvider.theme(cur.name)
                  .warnPalette(cur.name + '-warn');
              }
            }
          }
        }
        cur = null;
      }
    }])

    .run(function($location,
                     $log,
                     $http,
                     $rootScope,
                     $timeout,
                     $sessionStorage,
                     $mdTheming,
                     $injector,
                     THEMES,
                     OVERRIDE,
                     filterFilter,
                     APP_FLAGS,
                     APP_OPTIONS,
                     SERVICE_LOC,
                     NAMES,
                     SEARCH,
                     MESSAGES,
                     MISC_URLS,
                     FOOTER_URLS,
                     APP_BETA_FEATURES) {
      var loadingCompleteSequence = function() {
        // loading sequence
        $rootScope.portal.loading = {};
        $rootScope.portal.loading.startFade = true;
        $timeout(function() {
          $rootScope.portal.loading.hidden = true;
        }, 1500);

        // save theme to session storage so we don't have to do below again
        $sessionStorage.portal.theme = $rootScope.portal.theme;
      };

      // Safari in Private Browsing Mode throws a QuotaExceededError
      // whenever any calls to localStorage.setItem are made. This block
      // tests if localStorage is working. If not, we redirect the user to
      // a new URL with an explanation of the error and a link to go back
      // to MyUW home.
      if (angular.isObject(localStorage)) {
        try {
          localStorage.setItem('localStorage', 1);
          localStorage.removeItem('localStorage');
        } catch (e) {
          Storage.prototype._setItem = Storage.prototype.setItem;
          Storage.prototype.setItem = function() {};
          $location.path('/sorry-safari');
        }
      }

      var generateTheme = function(name) {
        if (!name) {
          name = $rootScope.portal.theme.name;
        }
        $rootScope.portal.theme.themeVersion = THEMES.themeVersion;
        var mdTheme = $mdTheming.THEMES[name];
        if (mdTheme) {
          $mdTheming.generateTheme(name, null);
        }
      };

      var themeLoading = function() {
        if ($sessionStorage.portal &&
          $sessionStorage.portal.theme &&
          $sessionStorage.portal.theme.themeVersion === THEMES.themeVersion
        ) {
          $rootScope.portal.theme = $sessionStorage.portal.theme;
          generateTheme();
          if (APP_FLAGS.debug) {
            $log.info('Using cached theme');
          }
          loadingCompleteSequence();
          return;
        }
        var themeIndex = APP_FLAGS.defaultTheme || 0;
        if ('group' == themeIndex) {
          var themeSet = false;
          var defaultThemeGo = function() {
            var themes = filterFilter(THEMES.themes, {group: 'default'});
            themeSet = themes.length > 0;
            if (themeSet) {
              $rootScope.portal.theme = themes[0];
              generateTheme();
            } else {
              if (APP_FLAGS.debug) {
                $log.error(
                  'something is wrong with setup, no default theme. ' +
                  'Setting to THEMES.themes[0].'
                );
              }
              $rootScope.portal.theme = THEMES.themes[0];
              generateTheme();
            }
          };
          // themeIndex is group which means we need to
          // run groups service to get which theme they use
          if (SERVICE_LOC.groupURL) {
            // normally this $http would be in a service,
            // but due to loading we moved it to the run block
            $http.get(SERVICE_LOC.groupURL, {cache: true})
            .then(function(result) {
              var groups = result.data.groups;
              // go through each theme and see if there in that group
              for (var i = 0; i < THEMES.themes.length; i++) {
                var theme = THEMES.themes[i];
                var groupToTest = theme.group;
                if ('default'!==groupToTest) {// skip the default theme
                  var filterTest = filterFilter(groups, {name: groupToTest});
                  if (filterTest && filterTest.length > 0) {
                    $rootScope.portal.theme = theme;
                    generateTheme();
                    themeSet = true;
                    break;
                  }
                }
              }
              if (!themeSet) {
                defaultThemeGo();
              }
              loadingCompleteSequence();
              return result;
            }).catch(function(reason) {
              if (APP_FLAGS.debug) {
                $log.error(
                  'We got a error back from groupURL, setting theme to default'
                );
              }
              defaultThemeGo();
              loadingCompleteSequence();
            });
          } else {
            if (APP_FLAGS.debug) {
              $log.warn(
                'theme was setup as group, but the groupURL ' +
                'was not provided, going default'
              );
            }
            // still not set, set to default theme
            defaultThemeGo();
            loadingCompleteSequence();
          }
        } else if (angular.isString(themeIndex)) {
          // themeindex is a theme name, search!
          var theme = findThemeByName(themeIndex);
          if (theme) {
            $rootScope.portal.theme = theme;
            generateTheme();
          } else {
            if (APP_FLAGS.debug) {
              $log.warn('APP_FLAGS.defaultTheme was set to ' + themeIndex +
              ' however we could not find that theme name. Please check ' +
              'frame-config.js for a list of available themes. ' +
              'Falling back to the default theme (uw-system).');
            }
            defaultThemeGo();
          }
          loadingCompleteSequence();
        } else {
          // themeindex is a number, go with that
          $rootScope.portal.theme = THEMES.themes[themeIndex]; // theme default
          generateTheme();
          loadingCompleteSequence();
        }
      };

      var findThemeByName = function(theName) {
        var themes = filterFilter(THEMES.themes, {name: theName});
        if (themes && themes.length > 0) {
          return themes[0];
        } else {
          return null;
        }
      };

      var lastLoginValid = function() {
        var portal = $sessionStorage.portal;
        var timeLapseBetweenLogins = APP_FLAGS.loginDurationMills || 14400000;
        if (portal && portal.lastAccessed) {
          if (Date.now() - portal.lastAccessed <= timeLapseBetweenLogins) {
            return true;
          }
        }
        return false;
      };

      var searchRouteParameterInit = function() {
        // https://github.com/Gillespie59/eslint-plugin-angular/issues/231
        // eslint-disable-next-line angular/on-watch
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
          if (next && next.searchParam) {
            var paramToTackOn = APP_FLAGS.gaSearchParam || 'q';
            var searchValue = next.params[next.searchParam];
            if (
              searchValue &&
              $location.search()[paramToTackOn] !== searchValue
            ) {
              event.preventDefault();
              // change route to have param of the search param
              $location.search(paramToTackOn, searchValue);
            }
          }
        });
      };

      // List of config. VERY IMPORTANT THAT THE CONFIGS has a
      // corresponding configsName in the same index
      var configs = [
        APP_FLAGS, APP_OPTIONS, SERVICE_LOC, NAMES, SEARCH, MESSAGES,
        MISC_URLS, FOOTER_URLS, APP_BETA_FEATURES,
      ];
      // TODO: make better
      var configsName = [
        'APP_FLAGS', 'APP_OPTIONS', 'SERVICE_LOC', 'NAMES', 'SEARCH',
        'MESSAGES', 'MISC_URLS', 'FOOTER_URLS', 'APP_BETA_FEATURES',
      ];

      var configureAppConfig = function() {
        if (APP_FLAGS.debug) {
          $log.info(new Date() + ' : start app-config override');
        }
        var count = 0;
        var groups = 0;
        for (var i = 0; i < configsName.length; i++) {
          var curConfig = configsName[i];
          if (OVERRIDE[curConfig]) {
            groups++;
            if (angular.isArray(configs[i])) {// arrays are special, append
              Array.prototype.push.apply(configs[i], OVERRIDE[curConfig]);
              count++;
            } else {// treat as an object
              for (var key in OVERRIDE[curConfig]) {
                if ({}.hasOwnProperty.call(OVERRIDE[curConfig]), key) {
                  configs[i][key] = OVERRIDE[curConfig][key];
                  count++;
                }
              }
            }
          }
        }
        if (APP_FLAGS.debug) {
          $log.info(new Date() + ' : ended app-config override');
          $log.info(
            'Overwrote ' + count + ' configs in ' + groups + ' config groups.'
          );
        }
      };

      // loading sequence
      var init = function() {
        searchRouteParameterInit();
        $rootScope.portal = $rootScope.portal || {};
        $sessionStorage.portal = $sessionStorage.portal || {};
        configureAppConfig();

        if (APP_FLAGS.loginOnLoad && !lastLoginValid()) {
          $http.get(SERVICE_LOC.loginSilentURL).then(function(result) {
            if (APP_FLAGS.debug) {
              $log.info(
                'login returned with ' +
                (result.data ? result.data.status : null)
              );
            }
            themeLoading();
            if ('success' === result.data.status) {
              $sessionStorage.portal.lastAccessed = (new Date).getTime();
              $sessionStorage.portal.username = result.data.username;
              if (NAMES.guestUserName &&
                result.data.username === NAMES.guestUserName) {
                $rootScope.GuestMode = true;
              }
            }
            return result;
          }).catch(function(reason) {
            // continue with theme loading so they don't get stuck on loading
            themeLoading();
          });
        } else {
          themeLoading();
        }
      };
      init();
    });
});
