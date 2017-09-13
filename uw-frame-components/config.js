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
// eslint-disable-next-line requirejs/no-js-extension
define(['./my-app/app-config.js'], function(myAppConfig) {
  /**
   * taken from https://plainjs.com/javascript/utilities/merge-two-javascript-objects-19/
   */
  function extend(obj, src) {
    Object.keys(src).forEach(function(key) {
      obj[key] = src[key];
    });
    return obj;
  }

  var framePaths = {
      'angular': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min',
      'angular-animate': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min',
      'angular-mocks': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-mocks',
      'angulartics': 'https://cdnjs.cloudflare.com/ajax/libs/angulartics/1.1.0/angulartics.min',
      'angulartics-google-analytics': [
          'https://cdnjs.cloudflare.com/ajax/libs/angulartics-google-analytics/0.2.1/angulartics-ga.min',
          'js/noop',
      ],
      'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min',
      'jquery-ui': 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min',
      'ngAria': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-aria.min',
      'ngMaterial': 'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.1/angular-material.min',
      'ngRoute': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min',
      'ngSanitize': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-sanitize.min',
      'ngStorage': 'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.10/ngStorage.min',
      'ui-bootstrap': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min',
      'ui-gravatar': 'https://cdnjs.cloudflare.com/ajax/libs/angular-gravatar/0.4.2/angular-gravatar.min',
      'app-config': 'js/app-config',
      'frame-config': 'js/frame-config',
      'override': 'js/override',
      'sortable': 'js/sortable',
  };

  var frameShims = {
      'angular': {deps: ['jquery'], exports: 'angular'},
      'angular-animate': {deps: ['angular'], exports: 'angular-animate'},
      'angular-mocks': {deps: ['angular']},
      'angulartics': {deps: ['angular'], exports: 'angulartics'},
      'angulartics-google-analytics': {deps: ['angulartics']},
      'ngRoute': {deps: ['angular']},
      'ngSanitize': {deps: ['angular']},
      'ngStorage': {deps: ['angular']},
      'ngAria': {deps: ['angular']},
      'ngMaterial': {
        deps: ['angular', 'ngAria', 'angular-animate', 'angular-mocks'],
        exports: 'ngMaterial',
      },
      'ui-bootstrap': {deps: ['angular']},
      'ui-gravatar': {deps: ['angular']},
  };

  var allPaths;
  if (myAppConfig.paths) {
    allPaths = extend(framePaths, myAppConfig.paths);
  } else {
    allPaths = framePaths;
  }

  var allShims;
  if (myAppConfig.shims) {
    allShims = extend(frameShims, myAppConfig.shims);
  } else {
    allShims = frameShims;
  }

  return {
    baseUrl: require.toUrl('.'),
    packages: [
        'portal',
        'my-app',
    ],
    paths: allPaths,
    shim: allShims,
    waitSeconds: 0,
  };
});
