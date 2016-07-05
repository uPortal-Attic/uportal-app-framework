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
            "mascotImg" : "img/bucky.gif",
            "footerLinks":[{ "url" : "/web/static/myuw-help",
                "target" : "_blank",
                "title" : "Help"
              },
              { "url" : "https://my.wisc.edu/portal/p/feedback",
                "target" : "_blank",
                "title" : "Feedback"
              }]
          },
          {
            "name" : "uw-river-falls",
            "crest" : "img/uwrf-logo.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW River Falls Logo",
            "group" : "UW System-River Falls",
            "mascotImg" : "img/uwrf-mascot.gif",
            "footerLinks":[{ "url" : "https://technology.uwrf.edu/",
                "target" : "_blank",
                "title" : "UWRF Help"
              },
              { "url" : "https://my.uwrf.edu/portal/p/uwrf-feedback",
                "target" : "_blank",
                "title" : "Feedback"
              }]
          },
          {
            "name" : "uw-stevens-point",
            "crest" : "img/uwsp-logo-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Stevens Point Logo",
            "group" : "UW System-Stevens Point",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-milwaukee",
            "crest" : "img/uwm-logo-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW-Milwaukee Logo",
            "group" : "UW System-Milwaukee",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-whitewater",
            "crest" : "img/uww-logo-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW-Whitewater Logo",
            "group" : "UW System-Whitewater",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-stout",
            "crest" : "img/uws-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-Stout",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-oskhosh",
            "crest" : "img/uw-oshkosh-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-Oshkosh",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-greenbay",
            "crest" : "img/UWGB-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-Green Bay",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-lacrosse",
            "crest" : "img/UW-L-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Crest",
            "group" : "UW System-La Crosse",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-parkside",
            "crest" : "img/uwp-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Parkside",
            "group" : "UW System-Parkside",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-platteville",
            "crest" : "img/uw-platteville-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Platteville",
            "group" : "UW System-Platteville",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-superior",
            "crest" : "img/uw-superior-logo-52.jpg",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Superstatic",
            "group" : "UW System-Superior",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-eau-claire",
            "crest" : "img/uw-eauclaire-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Eau Claire",
            "group" : "UW System-Eau Claire",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-extension",
            "crest" : "img/ceoel-logo-reverse-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Extension",
            "group" : "UW System-Extension",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-colleges",
            "crest" : "img/uwc_vertlogo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Colleges",
            "group" : "UW System-Colleges",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
          },
          {
            "name" : "uw-system",
            "crest" : "img/uw-system-52.png",
            "title" : "MyUW",
            "subtitle" : "beta",
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW System Logo",
            "group" : "default",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
              }]
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
