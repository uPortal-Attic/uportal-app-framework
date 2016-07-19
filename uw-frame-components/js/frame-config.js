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
            "footerLinks": [{ "url" : "/web/static/myuw-help",
                             "target" : "_blank",
                             "title" : "Help"
                           },
                           { "url" : "https://my.wisc.edu/portal/p/feedback",
                             "target" : "_blank",
                             "title" : "Feedback"
                           }],
            "materialTheme" : {
              "primary" : {
                '50': 'FED5D7',
                '100': 'FC8B8F',
                '200': 'FB545A',
                '300': 'F90E17',
                '400': 'E3060E',
                '500': 'C5050C',
                '600': 'A7040A',
                '700': '890308',
                '800': '6B0307',
                '900': '4E0205',
                'A100': 'FED5D7',
                'A200': 'FC8B8F',
                'A400': 'E3060E',
                'A700': '890308',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                  // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                  '200', '300', '400', 'A100'],
                'contrastLightColors': undefined    // could also specify this if default was 'dark'
              },
              "accent" : {
                '50': 'B8E9FD',
                '100': '6DD3FC',
                '200': '36C2FA',
                '300': '05A4E4',
                '400': '058FC6',
                '500': '0479A8',
                '600': '03638A',
                '700': '034E6C',
                '800': '02384E',
                '900': '012330',
                'A100': 'B8E9FD',
                'A200': '0479A8',
                'A400': '058FC6',
                'A700': '034E6C',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                  // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                  '200', '300', '400', 'A100'],
                'contrastLightColors': undefined    // could also specify this if default was 'dark'
              },
              "warn" : {
                '50': 'FFFFFF',
                '100': 'F9E7D7',
                '200': 'F2C9A6',
                '300': 'EAA368',
                '400': 'E6934D',
                '500': 'E28332',
                '600': 'D7731E',
                '700': 'BC651B',
                '800': 'A15717',
                '900': '874813',
                'A100': 'FFFFFF',
                'A200': 'F9E7D7',
                'A400': 'E6934D',
                'A700': 'BC651B',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                  // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                  '200', '300', '400', 'A100'],
                'contrastLightColors': undefined    // could also specify this if default was 'dark'
              }
            }
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
            "footerLinks": [
             { "url" : "https://technology.uwrf.edu/",
               "target" : "_blank",
                "title" : "UWRF Help"
             },
             { "url" : "https://my.uwrf.edu/portal/p/uwrf-feedback",
               "target" : "_blank",
               "title" : "Feedback"
             }],
            "materialTheme" : {
              "primary" : "red",
              "accent" : "blue",
              "warn" : "deep-orange"
            }
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
              }],
            "materialTheme" : {
             "primary" : "deep-purple",
             "accent" : "amber",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "grey",
             "accent" : "amber",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "purple",
             "accent" : "deep-purple",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "blue",
             "accent" : "light-blue",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "grey",
             "accent" : "amber",
             "warn" : "red"
            }
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
            }],
            "materialTheme" : {
             "primary" : "green",
             "accent" : "grey",
             "warn" : "red"
            }
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
            }],
            "materialTheme" : {
             "primary" : "red",
             "accent" : "grey",
             "warn" : "blue"
            }
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
              }],
              "materialTheme" : {
               "primary" : "green",
               "accent" : "grey",
               "warn" : "red"
              }
          },
          {
            "name" : "uw-platteville",
            "crest" : "img/uw-platteville-logo-52.png",
            "title" : "MyUW",
            "subtitle" : null,
            "ariaLabelTitle" : "My U W",
            "crestalt" : "UW Platteville",
            "group" : "UW System-Platteville",
            "mascotImg" : "img/uwp-pete.png",
            "footerLinks":[{ "url" : "https://kb.wisconsin.edu/myuwsystem/",
                "target" : "_blank",
                "title" : "Help"
            }],
            "materialTheme" : {
             "primary" : "blue",
             "accent" : "deep-orange",
             "warn" : "red"
            }
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
            }],
            "materialTheme" : {
             "primary" : "grey",
             "accent" : "amber",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "blue",
             "accent" : "amber",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "blue",
             "accent" : "grey",
             "warn" : "red"
            }
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
              }],
            "materialTheme" : {
             "primary" : "red",
             "accent" : "grey",
             "warn" : "blue"
            }
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
                          }],
            "materialTheme" : {
              "primary" : "green",
              "accent" : "blue",
              "warn" : "deep-orange"
            }
          }
        ])
        .constant('FRAME_URLS', {
            'aboutFrame' : 'staticFeeds/about-frame.json'
        })
        .constant('KV_KEYS', {
          "VIEWED_ANNOUNCEMENT_IDS" : "viewedannouncementids",
          "VIEWED_POPUP_IDS" : "viewedpopupids",
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
