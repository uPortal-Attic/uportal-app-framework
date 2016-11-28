'use strict';
define(['./my-app/app-config.js'], function(myAppConfig) {

  //taken from https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
  function extend(obj, src) {
      Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
      return obj;
  }

  var allPaths, allShims, framePaths, frameShims;

  framePaths = {
      'angular'       : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min",
      'angular-animate' : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min",
      'angular-mocks' : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-mocks",
      'angulartics'   : "https://cdnjs.cloudflare.com/ajax/libs/angulartics/1.0.3/angulartics.min",
      'angulartics-google-analytics' : [
          "https://cdnjs.cloudflare.com/ajax/libs/angulartics-google-analytics/0.2.1/angulartics-ga.min",
          "js/noop"
      ],
      'jquery'        : "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min",
      'jquery-ui'     : "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min",
      'ngAria'        : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-aria.min",
      'ngMaterial'    : "https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.min",
      'ngRoute'       : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min",
      'ngSanitize'    : "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-sanitize.min",
      'ngStorage'     : "https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min",
      'ui-bootstrap'  : "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min",
      'ui-gravatar'   : "https://cdnjs.cloudflare.com/ajax/libs/angular-gravatar/0.4.2/angular-gravatar.min",
      'app-config'    : "js/app-config",
      'frame-config'  : "js/frame-config",
      'override'      : "js/override",
      'sortable'      : "js/sortable"
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
