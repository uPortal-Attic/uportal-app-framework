define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'welcome' : false
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : 'samples/session.json',
            'sidebarInfo' : 'samples/sidebar.json',
            'welcomeInfo' : 'samples/welcome.json',
            'notificationsURL' : 'samples/notifications.json',
            'groupURL' : null
        })
        .constant('NAMES', {
            'title' : 'MyUW',
            'ariaLabelTitle' : 'My U W',
            'crest' : 'img/uwcrest_web_sm.png',
            'crestalt' : 'UW Crest',
            'sublogo' : ''
        })
        .constant('SEARCH',{
            'isWeb' : false,
            'searchURL' : 'https://my.wisc.edu/web/apps/search/'
        })
        .constant('NOTIFICATION', {
            'enabled' : false,
            'groupFiltering' : false,
            'notificationFullURL' : 'notifications'
        })
        .constant('MISC_URLS',{
            'feedbackURL' : 'https://my.wisc.edu/portal/p/feedback',
            'back2ClassicURL' : null,
            'whatsNewURL' : null
        });

    return config;

});
