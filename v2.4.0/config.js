'use strict';
define([], function() {
  return {

    baseUrl: require.toUrl('.'),

    packages: [
        'portal',
        'my-app'
    ],

    paths: {
        'angular'       : "bower_components/angular/angular.min",
        'angular-mocks' : "bower_components/angular-mocks/angular-mocks",
        'angulartics'   : "bower_components/angulartics/dist/angulartics.min",
        'angulartics-google-analytics' : "bower_components/angulartics-google-analytics/dist/angulartics-ga.min",
        'app-config'    : "js/app-config",
        'override'      : "js/override",
        'frame-config'  : "js/frame-config",
        'jquery'        : "bower_components/jquery/dist/jquery.min",
        'jquery-ui'     : "bower_components/jquery-ui/jquery-ui.min",
        'marked'        : "bower_components/marked/lib/marked",
        'ngMarked'      : "bower_components/angular-marked/dist/angular-marked",
        'ngRoute'       : "bower_components/angular-route/angular-route.min",
        'ngSanitize'    : "bower_components/angular-sanitize/angular-sanitize.min",
        'ngStorage'     : "bower_components/ngstorage/ngStorage.min",
        'sortable'      : "js/sortable",
        'ui-bootstrap'  : "bower_components/angular-bootstrap/ui-bootstrap-tpls.min",
        'ui-gravatar'   : "bower_components/angular-gravatar/build/angular-gravatar.min",
        'ngAria'        : "bower_components/angular-aria/angular-aria.min"
    },

    shim: {
        'angular'       : { deps: ['marked','jquery'], exports: 'angular' },
        'angular-mocks' : { deps: ['angular'] },
        'angulartics'   : { deps: ['angular'], exports: 'angulartics' },
        'angulartics-google-analytics' : { deps: ['angulartics'] },
        'ngRoute'       : { deps: ['angular'] },
        'ngSanitize'    : { deps: ['angular'] },
        'ngMarked'      : { deps: ['marked','angular']},
        'ngStorage'     : { deps: ['angular'] },
        'ngAria'        : { deps: ['angular'] },
        'ui-bootstrap'  : { deps: ['angular'] },
        'ui-gravatar'   : { deps: ['angular'] }
    },

    waitSeconds : 0

  }
});
