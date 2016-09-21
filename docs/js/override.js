define(['angular'], function(angular) {

  /*Keep in sync with docs/mardown/configuration.md*/

    var config = angular.module('override', []);
    config
        //see configuration.md for howto
        .constant('OVERRIDE', {
          'APP_FLAGS' : {
            'showSearch' : false
          },
          'NAMES' : {
            'title' : 'UW Frame Documentation',
            'fname' : 'uw-frame-fname'
          },
          'MISC_URLS' : {
            'rootURL' : '#/',
            'logoutURL' : 'https://github.com/UW-Madison-DoIT/uw-frame'
          },
          "NOTIFICATION" : {
            enabled : false
          },
          "FEATURES" : {
            enabled : false
          }
        });

    return config;

});
