define(['angular'], function(angular) {

  /*Keep in sync with docs/markdown/configuration.md*/

    var config = angular.module('override', []);
    config
        //see configuration.md for howto
        .constant('OVERRIDE', {
          'SERVICE_LOC':{  'notificationsURL' : 'staticFeeds/sample_notifications.json'}
        });

    return config;

});
