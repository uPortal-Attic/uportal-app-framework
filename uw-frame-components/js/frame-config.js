define(['angular'], function(angular) {

    var config = angular.module('frame-config', []);
    config
        .constant('THEMES',
        {"themeVersion": 2,
        /* THOU SHALT INCREMENT THIS VERSION NUMBER IF THOU CHANGEST ANY OF THE THEMES BELOW  */
         "themes":
        [
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
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100', 'A200']
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
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200']
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
                'contrastDefaultColor': 'dark',
                'contrastLightColors': ['700', '800', '900', 'A700']
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
              "primary" : {
                '50': '#fcdae1',
                '100': '#f693a8',
                '200': '#f25f7e',
                '300': '#ed1d49',
                '400': '#da113c',
                '500': '#be0f34',
                '600': '#a20d2c',
                '700': '#850b24',
                '800': '#69081d',
                '900': '#4d0615',
                'A100': '#fcdae1',
                'A200': '#f693a8',
                'A400': '#da113c',
                'A700': '#850b24',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100', '200', 'A100', 'A200']
              },
              "accent" : {
                '50': '#ebecec',
                '100': '#c5c5c6',
                '200': '#a8a9aa',
                '300': '#848687',
                '400': '#757677',
                '500': '#666768',
                '600': '#575859',
                '700': '#484849',
                '800': '#39393a',
                '900': '#292a2a',
                'A100': '#ebecec',
                'A200': '#c5c5c6',
                'A400': '#757677',
                'A700': '#484849',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200']
              },
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
             "primary" : {
               '50': '#efebf7',
               '100': '#c5b4e0',
               '200': '#a78dd0',
               '300': '#805abb',
               '400': '#7048af',
               '500': '#623f99',
               '600': '#543683',
               '700': '#462d6e',
               '800': '#382458',
               '900': '#2a1b42',
               'A100': '#efebf7',
               'A200': '#c5b4e0',
               'A400': '#7048af',
               'A700': '#462d6e',
               'contrastDefaultColor': 'light',
               'contrastDarkColors': ['50', '100', '200', 'A100', 'A200']
             },
             "accent" : {
               '50': '#ffffff',
               '100': '#fffaeb',
               '200': '#ffebb3',
               '300': '#ffd86b',
               '400': '#ffd04d',
               '500': '#ffc82e',
               '600': '#ffc00f',
               '700': '#f0b100',
               '800': '#d19a00',
               '900': '#b38400',
               'A100': '#ffffff',
               'A200': '#fffaeb',
               'A400': '#ffd04d',
               'A700': '#f0b100',
               'contrastDefaultColor': 'dark',
             },
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
             "primary" : {
               '50': '#858585',
               '100': '#5e5e5e',
               '200': '#424242',
               '300': '#1f1f1f',
               '400': '#0f0f0f',
               '500': '#000000',
               '600': '#000000',
               '700': '#000000',
               '800': '#000000',
               '900': '#000000',
               'A100': '#858585',
               'A200': '#5e5e5e',
               'A400': '#0f0f0f',
               'A700': '#000000',
               'contrastDefaultColor': 'light',
               'contrastDarkColors': ['50', 'A100']
             },
             "accent" : {
               '50': '#ffffff',
               '100': '#ffeebd',
               '200': '#ffdf85',
               '300': '#ffcd3d',
               '400': '#ffc51f',
               '500': '#ffbd00',
               '600': '#e0a600',
               '700': '#c29000',
               '800': '#a37900',
               '900': '#856200',
               'A100': '#ffffff',
               'A200': '#ffeebd',
               'A400': '#ffc51f',
               'A700': '#c29000',
               'contrastDefaultColor': 'dark',
               'contrastLightColors': ['800', '900']
             },
             "warn" : "deep-orange"
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
             "primary" : {
               '50': '#c7b7dc',
               '100': '#9f83c2',
               '200': '#825eb0',
               '300': '#5f4185',
               '400': '#513771',
               '500': '#422d5c',
               '600': '#332347',
               '700': '#251933',
               '800': '#160f1e',
               '900': '#07050a',
               'A100': '#c7b7dc',
               'A200': '#9f83c2',
               'A400': '#513771',
               'A700': '#251933',
               'contrastDefaultColor': 'light',
               'contrastDarkColors': ['50', '100', 'A100', 'A200']
             },
             "accent" : {
               '50': '#ffffff',
               '100': '#ffffff',
               '200': '#ffffff',
               '300': '#fffffe',
               '400': '#f6f6e9',
               '500': '#ededd3',
               '600': '#e4e4bd',
               '700': '#dbdba8',
               '800': '#d2d292',
               '900': '#c9c97c',
               'A100': '#ffffff',
               'A200': '#ffffff',
               'A400': '#f6f6e9',
               'A700': '#dbdba8',
               'contrastDefaultColor': 'dark'
             },
             "warn" : "amber"
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
             "primary" : {
               '50': '#9acdff',
               '100': '#4ea8ff',
               '200': '#168cff',
               '300': '#0068cd',
               '400': '#0058af',
               '500': '#004990',
               '600': '#003971',
               '700': '#002a53',
               '800': '#001a34',
               '900': '#000b16',
               'A100': '#9acdff',
               'A200': '#4ea8ff',
               'A400': '#0058af',
               'A700': '#002a53',
               'contrastDefaultColor': 'light',
               'contrastDarkColors': ['50', '100', 'A100', 'A200']
             },
             "accent" : {
               '50': '#ffffff',
               '100': '#fdecd2',
               '200': '#fbd59c',
               '300': '#f8b858',
               '400': '#f6ab3a',
               '500': '#f59f1d',
               '600': '#e9900a',
               '700': '#cc7e09',
               '800': '#ae6c08',
               '900': '#915a06',
               'A100': '#ffffff',
               'A200': '#fdecd2',
               'A400': '#f6ab3a',
               'A700': '#cc7e09',
               'contrastDefaultColor': 'dark',
               'contrastLightColors': ['800', '900', 'A700']
             },
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
             "accent" : {
               '50': '#ffffff',
               '100': '#fff7e1',
               '200': '#ffe8a9',
               '300': '#fed462',
               '400': '#fecc43',
               '500': '#fec425',
               '600': '#febc07',
               '700': '#e5a801',
               '800': '#c69101',
               '900': '#a87b01',
               'A100': '#ffffff',
               'A200': '#fff7e1',
               'A400': '#fecc43',
               'A700': '#e5a801',
               'contrastDefaultColor': 'dark',
               'contrastLightColors': ['900']
             },
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
             "primary" : {
               '50': '#85eaca',
               '100': '#43deae',
               '200': '#23c794',
               '300': '#188a67',
               '400': '#147053',
               '500': '#0f5640',
               '600': '#0a3c2d',
               '700': '#062219',
               '800': '#010806',
               '900': '#000000',
               'A100': '#85eaca',
               'A200': '#43deae',
               'A400': '#147053',
               'A700': '#062219',
               'contrastDefaultColor': 'light',
               'contrastDarkColors': ['50', '100', '200', 'A100', 'A200']
             },
             "accent" : {
               '50': '#ffffff',
               '100': '#fdfefc',
               '200': '#e3edd4',
               '300': '#c2d9a1',
               '400': '#b4d08c',
               '500': '#a6c776',
               '600': '#98be60',
               '700': '#8ab54b',
               '800': '#79a041',
               '900': '#698a38',
               'A100': '#ffffff',
               'A200': '#fdfefc',
               'A400': '#b4d08c',
               'A700': '#8ab54b',
               'contrastDefaultColor': 'dark',
               'contrastLightColors': ['900']
             },
             "warn" : "amber"
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
              "primary" : {
                '50': '#cbd2ee',
                '100': '#91a1db',
                '200': '#677dce',
                '300': '#3a54b3',
                '400': '#32499c',
                '500': '#2b3e85',
                '600': '#24336e',
                '700': '#1c2857',
                '800': '#151e40',
                '900': '#0d1328',
                'A100': '#cbd2ee',
                'A200': '#91a1db',
                'A400': '#32499c',
                'A700': '#1c2857',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': ['50', '100', 'A100', 'A200'],
                'contrastLightColors': undefined
              },
              "accent" : {
                '50': '#ffffff',
                '100': '#fbebc9',
                '200': '#f7d995',
                '300': '#f1c153',
                '400': '#efb636',
                '500': '#edac1a',
                '600': '#d79a11',
                '700': '#bb860f',
                '800': '#9f720c',
                '900': '#825d0a',
                'A100': '#ffffff',
                'A200': '#fbebc9',
                'A400': '#efb636',
                'A700': '#bb860f',
                'contrastDefaultColor': 'dark',
                'contrastDarkColors': undefined,
                'contrastLightColors': ['800', '900']
              },
              "warn" : {
                '50': '#ffffff',
                '100': '#fae6d9',
                '200': '#f3c6a8',
                '300': '#ea9d69',
                '400': '#e78c4e',
                '500': '#e37a33',
                '600': '#d96a1e',
                '700': '#bf5c1a',
                '800': '#a44f16',
                '900': '#894213',
                'A100': '#ffffff',
                'A200': '#fae6d9',
                'A400': '#e78c4e',
                'A700': '#bf5c1a',
                'contrastDefaultColor': 'dark',
                'contrastDarkColors': undefined,
                'contrastLightColors': ['700', '800', '900', 'A700']
              }
            }
          },
          {
            "name" : "uw-extension",
            "crest" : "img/uwex-logo-white-52.png",
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
             "primary" : {
               '50': '#b0d2f8',
               '100': '#6aaaf2',
               '200': '#368ded',
               '300': '#1269ca',
               '400': '#105bae',
               '500': '#0d4c92',
               '600': '#0b3d76',
               '700': '#082f5a',
               '800': '#05203e',
               '900': '#031122',
               'A100': '#b0d2f8',
               'A200': '#6aaaf2',
               'A400': '#105bae',
               'A700': '#082f5a',
               'contrastDefaultColor': 'light',
               'contrastDarkColors': ['50', '100', 'A100', 'A200']
             },
             "accent" : {
               '50': '#ffffff',
               '100': '#ffffff',
               '200': '#ffffff',
               '300': '#fcfcf8',
               '400': '#f2f1e4',
               '500': '#e8e6cf',
               '600': '#dedbba',
               '700': '#d4d0a6',
               '800': '#cac691',
               '900': '#c0bb7c',
               'A100': '#ffffff',
               'A200': '#ffffff',
               'A400': '#f2f1e4',
               'A700': '#d4d0a6',
               'contrastDefaultColor': 'dark',
               'contrastLightColors': ['900']
             },
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
        ]})
        .constant('FRAME_URLS', {
            'aboutFrame' : 'staticFeeds/about-frame.json'
        })
        .constant('KV_KEYS', {
          "VIEWED_ANNOUNCEMENT_IDS" : "viewedannouncementids",
          "VIEWED_POPUP_IDS" : "viewedpopupids",
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
