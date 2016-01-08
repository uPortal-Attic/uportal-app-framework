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

    app.run(function($rootScope, $timeout, NAMES, THEMES){
      $rootScope.portal = {};
      $rootScope.portal.theme = THEMES[0]; //theme default

      //loading sequence
      $rootScope.portal.loading = {};
      $rootScope.portal.loading.startFade = true;
      $timeout(function(){
        $rootScope.portal.loading.hidden = true;
      }, 1500);
    });

    return app;

});
