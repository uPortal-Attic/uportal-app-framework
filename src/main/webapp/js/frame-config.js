define(['angular'], function(angular) {

    var config = angular.module('frame-config', []);
    config
        .constant('FRAME_URLS', {
            'aboutFrame' : 'staticFeeds/about-frame.json'
        });

    return config;

});
