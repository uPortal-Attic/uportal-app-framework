define(['angular'], function(angular) {

  /*Keep in sync with docs/mardown/configuration.md*/

    var config = angular.module('app-config', []);
    config
        .value('APP_FLAGS', {
            'showSearch' : true,
            'isWeb' : false,
            'defaultTheme' : 0,
            'loginOnLoad' : false,
            'showUserSettingsPage' : false,
            'debug' : false
        })
        .value('SERVICE_LOC', {
            'aboutURL' : null,
            'sessionInfo' : 'staticFeeds/session.json',
            'notificationsURL' : '/web/staticFeeds/notifications.json',
            'loginSilentURL' : '/portal/Login?silent=true',
            'kvURL' : '/storage',
            'groupURL' : '/portal/api/groups'
        })
        .value('NAMES', {
            'title' : 'App Name',
            'guestUserName' : 'guest',
            'fname' : 'sample-fname'
        })
        .value('SEARCH',{
            'searchURL' : 'https://my.wisc.edu/web/apps/search/'
        })
        .value('FEATURES', {
            'enabled' : false,
            'groupFiltering' : false,
            'serviceURL' : 'staticFeeds/features.json'
        })
        .value('NOTIFICATION', {
            'enabled' : true,
            'groupFiltering' : true,
            'notificationFullURL' : '/web/notifications'
        })
        .value('MISC_URLS',{
            'feedbackURL' : 'https://my.wisc.edu/portal/p/feedback',
            'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/',
            'loginURL' : '/portal/Login?profile=bucky',
            'logoutURL' : '/portal/Logout',
            'myuwHome' : 'https://my.wisc.edu',
            'rootURL' : '/web',
            'addToHomeURLS' : {
              'layoutURL' : '/portal/web/layoutDoc?tab=UW Bucky Home',
              'addToHomeActionURL' : '/portal/web/layout?tabName=UW Bucky Home&action=addPortlet&fname='
            }

        })
        .value('FOOTER_URLS', [
          { "url" : "/web/static/myuw-help",
            "target" : "_blank",
            "title" : "Help"
          },
          { "url" : "https://my.wisc.edu/portal/p/feedback",
            "target" : "_blank",
            "title" : "Feedback"
          }
        ])
        .value('APP_BETA_FEATURES', [
          {
            "id" : "toogleSomething",
            "title" : "Sample Toggle",
            "description" : "This is just an example of a toggle. Look at your localStorage after you switch this on for the first time."
          }
        ]);

    return config;

});
