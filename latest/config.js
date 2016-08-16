'use strict';
define(['./my-app/app-config.js'], function(myAppConfig) {

  //taken from https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
  function extend(obj, src) {
      Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
      return obj;
  }

  var allPaths, allShims, framePaths, frameShims;

  framePaths = {
      'angular'       : "bower_components/angular/angular.min",
      'angular-mocks' : "bower_components/angular-mocks/angular-mocks",
      'angular-animate' : 'bower_components/angular-animate/angular-animate',
      'angulartics'   : "bower_components/angulartics/dist/angulartics.min",
      'angulartics-google-analytics' : "vendor/angulartics-ga.min",
      'app-config'    : "js/app-config",
      'frame-config'  : "js/frame-config",
      'override'      : "js/override",
      'jquery'        : "bower_components/jquery/dist/jquery.min",
      'jquery-ui'     : "bower_components/jquery-ui/jquery-ui.min",
      'ngMaterial'    : "bower_components/angular-material/angular-material.min",
      'ngRoute'       : "bower_components/angular-route/angular-route.min",
      'ngSanitize'    : "bower_components/angular-sanitize/angular-sanitize.min",
      'ngStorage'     : "bower_components/ngstorage/ngStorage.min",
      'sortable'      : "js/sortable",
      'ui-bootstrap'  : "bower_components/angular-bootstrap/ui-bootstrap-tpls.min",
      'ui-gravatar'   : "bower_components/angular-gravatar/build/angular-gravatar.min",
      'ngAria'        : "bower_components/angular-aria/angular-aria.min"
  };

  frameShims = {
      'angular'       : { deps: ['jquery'], exports: 'angular' },
      'angular-animate'  : { deps: ['angular'], exports: 'angular-animate'   },
      'angular-mocks' : { deps: ['angular'] },
      'angulartics'   : { deps: ['angular'], exports: 'angulartics' },
      'angulartics-google-analytics' : { deps: ['angulartics'] },
      'ngRoute'       : { deps: ['angular'] },
      'ngSanitize'    : { deps: ['angular'] },
      'ngStorage'     : { deps: ['angular'] },
      'ngAria'        : { deps: ['angular'] },
      'ngMaterial'    : { deps: ['angular', 'ngAria', 'angular-animate','angular-mocks'], exports: 'ngMaterial'},
      'ui-bootstrap'  : { deps: ['angular'] },
      'ui-gravatar'   : { deps: ['angular'] }
  };

  if(myAppConfig.paths) {
    allPaths = extend(framePaths,myAppConfig.paths);
  } else {
    allPaths = framePaths;
  }

  if(myAppConfig.shims) {
    allShims = extend(frameShims, myAppConfig.shims);
  }
  else {
    allShims = frameShims;
  }

  return {
    baseUrl: require.toUrl('.'),
    packages: [
        'portal',
        'my-app'
    ],
    paths: allPaths,
    shim: allShims,
    waitSeconds : 0
  }
});
