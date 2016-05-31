define(['angular'], function(angular) {

    var config = angular.module('frame-config', []);
    config
        .constant('THEMES', [
          {
            "name" : "uw-madison",
            "crest" : "img/uw-madison-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW-Madison",
            "mascotImg" : "img/bucky.gif"
          },
          {
            "name" : "uw-river-falls",
            "crest" : "img/uw-riverfalls-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW River Falls Logo",
            "group" : "UW System-River Falls"
          },
          {
            "name" : "uw-stevens-point",
            "crest" : "img/uwsp-logo-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Stevens Point Logo",
            "group" : "UW System-Stevens Point"
          },
          {
            "name" : "uw-milwaukee",
            "crest" : "img/uwm-logo-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW-Milwaukee Logo",
            "group" : "UW System-Milwaukee"
          },
          {
            "name" : "uw-whitewater",
            "crest" : "img/uww-logo-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW-Whitewater Logo",
            "group" : "UW System-Whitewater"
          },
          {
            "name" : "uw-stout",
            "crest" : "img/uws-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-Stout"
          },
          {
            "name" : "uw-oskhosh",
            "crest" : "img/uw-oshkosh-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-Oshkosh"
          },
          {
            "name" : "uw-greenbay",
            "crest" : "img/UWGB-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-Green Bay"
          },
          {
            "name" : "uw-lacrosse",
            "crest" : "img/UW-L-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-La Crosse"
          },
          {
            "name" : "uw-parkside",
            "crest" : "img/uwp-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Parkside",
            "group" : "UW System-Parkside"
          },
          {
            "name" : "uw-platteville",
            "crest" : "img/uw-platteville-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Platteville",
            "group" : "UW System-Platteville"
          },
          {
            "name" : "uw-superior",
            "crest" : "img/uw-superior-logo-52.jpg",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Superstatic",
            "group" : "UW System-Superior"
          },
          {
            "name" : "uw-system",
            "crest" : "img/uw-system-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW System Logo",
            "group" : "default"
          }
        ])
        .constant('FRAME_URLS', {
            'aboutFrame' : 'staticFeeds/about-frame.json'
        })
        .constant('KV_KEYS', {
          "LAST_VIEWED_ANNOUNCEMENT_ID" : "lastviewedannouncementid",
          "LAST_VIEWED_POPUP_ID" : "lastviewedpopupid",
          'DISMISSED_NOTIFICATION_IDS' : 'notification:dismiss'
        })
        .constant('FRAME_BETA_FEATURES', [
          {
            "id" : "showSettings",
            "title" : "Beta Settings",
            "description" : "Shows/Hides the Beta Settings"
          },
          {
            "id" : "disableGroupFilteringForNotifications",
            "title" : "Disable Notification Filter",
            "description" : "This flag disables notification group filtering if you have it enabled. (page refresh required)"
          }
        ]);

    return config;

});
