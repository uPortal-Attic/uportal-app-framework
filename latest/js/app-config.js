define(['angular'], function(angular) {

    var config = angular.module('app-config', []);
    config
        .constant('APP_FLAGS', {
            'features' : false,
            'showSidebar' : false,
            'showSearch' : false,
            'isWeb' : false
        })
        .constant('SERVICE_LOC', {
            'sessionInfo' : 'staticFeeds/session.json',
            'sidebarInfo' : 'staticFeeds/sidebar.json',
            'featuresInfo' : 'staticFeeds/features.json',
            'notificationsURL' : 'staticFeeds/notifications.json'
        })
        .constant('NAMES', {
            'title' : 'uw-frame Docs',
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
            'feedbackURL' : 'https://my.wisc.edu/portal/p/feedback',
            'helpdeskURL' : 'https://kb.wisc.edu/helpdesk/',
            'myuwHome' : 'https://my.wisc.edu',
            'rootURL' : '/uw-frame/',
            'logoutURL' : 'https://github.com/UW-Madison-DoIT/uw-frame',
        })
        .constant('APP_BETA_FEATURES', []);

    return config;

});
