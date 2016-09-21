define(['angular'], function(angular) {

  /*Keep in sync with docs/markdown/Configuration.md*/

  var config = angular.module('override', []);
  config
    //see Configuration.md for howto
    .constant('OVERRIDE', {

    });

  return config;

});