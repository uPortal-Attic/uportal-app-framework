define(['angular'], function(angular) {

    var config = angular.module('frame-config', []);
    config
        .constant('THEMES', [
          {
            "name" : "madison",
            "crest" : "img/uwcrest_web_sm.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest"
          },
          {
            "name" : "system",
            "crest" : "img/uwsystem.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest"
          },
          {
            "name" : "",
            "crest" : "",
            "title" : "",
            "subtitle" : "",
            "ariaLabelTitle" : "",
            "crestalt" : ""
          }
        ])
        .constant('FRAME_URLS', {
            'aboutFrame' : 'staticFeeds/about-frame.json'
        })
        .constant('FRAME_BETA_FEATURES', [
          {
            "id" : "showSettings",
            "title" : "Beta Settings",
            "description" : "Shows/Hides the Beta Settings"
          },

        ]);

    return config;

});
