define(['angular'], function(angular) {

    var config = angular.module('frame-config', []);
    config
        .constant('THEMES', [
          {
            "name" : "madison",
            "crest" : "img/uwcrest_web_sm.png",
            "title" : "MyUW"
          },
          {
            "name" : "system",
            "crest" : "img/uwsystem.png",
            "title" : "MyUW - System"
          },
          {
            "name" : "",
            "crest" : "",
            "title" : ""
          }
        ])
        .constant('FRAME_URLS', {
            'aboutFrame' : 'staticFeeds/about-frame.json'
        })
        .constant('FRAME_BETA_FEATURES', [
          {
            "id" : "sidebarShowSettings",
            "title" : "Sidebar Settings",
            "description" : "Shows the settings button to get to this page easier"
          },
          
        ]);

    return config;

});
