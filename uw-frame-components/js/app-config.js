define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'features' : false,
            'showSearch' : true,
            'isWeb' : false
        })
        .constant('SERVICE_LOC', {
            'aboutURL' : null,
            'sessionInfo' : 'staticFeeds/session.json',
            'featuresInfo' : 'staticFeeds/features.json',
            'notificationsURL' : 'staticFeeds/notifications.json',
            'kvURL' : null,
            'groupURL' : null
        })
        .constant('NAMES', {
            'title' : 'App Name',
            'guestUserName' : 'guest'
        })
        .constant('SEARCH',{
            'searchURL' : 'https://my.wisc.edu/web/apps/search/'
        })
        .constant('NOTIFICATION', {
            'enabled' : false,
            'groupFiltering' : false,
            'notificationFullURL' : 'notifications'
        })
        .constant('MISC_URLS',{
            'back2ClassicURL' : null,
            'feedbackURL' : 'https://my.wisc.edu/portal/p/feedback',
            'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/',
            'loginURL' : '/portal/Login?profile=bucky',
            'logoutURL' : '/portal/Logout',
            'myuwHome' : 'https://my.wisc.edu',
            'rootURL' : '/web'

        })
        .constant('FOOTER_URLS', [
          { "url" : "/web/static/myuw-help",
            "target" : "_blank",
            "title" : "Help"
          },
          { "url" : "https://my.wisc.edu/portal/p/feedback",
            "target" : "_blank",
            "title" : "Feedback"
          }
        ])
        .constant('APP_BETA_FEATURES', [
          {
            "id" : "toogleSomething",
            "title" : "Sample Toggle",
            "description" : "This is just an example of a toggle. Look at your localStorage after you switch this on for the first time."
          }
        ]);

    return config;

});
