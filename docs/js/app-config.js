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
            'aboutURL' : null,
            'sessionInfo' : 'staticFeeds/session.json',
            'sidebarInfo' : 'staticFeeds/sidebar.json',
            'featuresInfo' : 'staticFeeds/features.json',
            'notificationsURL' : 'staticFeeds/notifications.json',
            'kvURL' : null,
            'groupURL' : null
        })
        .constant('NAMES', {
            'title' : 'Documentation',
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
            'logoutURL' : '/portal/Logout',
            'myuwHome' : 'https://my.wisc.edu',
            'whatsNewURL' : null

        })
        .constant('APP_BETA_FEATURES', [
          {
            "id" : "sidebarQuicklinks",
            "title" : "Sidebar Quicklinks",
            "description" : "Shows quicklinks to various campus sites in sidebar"
          }
        ]);

    return config;

});
