define(['angular',
    'jquery',
    'portal',
    'portal/main/routes',
    'portal/settings/routes',
    'portal/notifications/route',
    'portal/features/route',
    'portal/about/route',
    'portal/widgets/routes',
    'portal/messages/routes',
  ], function(
      angular, $, portal, main, settings,
      notifications, features, about, widgets, messages
    ) {
    return angular.module('my-app', ['portal'])
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/settings', settings.betaSettings)
        .when('/user-settings', settings.userSettings)
        .when('/notifications', messages.notifications)
        .when('/features', messages.features)
        .when('/about', about)
        .when('/access-denied', main.accessDenied)
        .when('/server-error', main.serverError)
        .when('/sorry-safari', main.storageError)
        .when('/demo-widgets', widgets.demoWidgets)
        .when('/', main.main)
        .otherwise('/');
    }]);
});
