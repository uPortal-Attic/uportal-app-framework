# Adding dependencies to your frame-based app

Suppose you want to inject `ngMessages` (does not ship in `uportal-app-framework` out of the box) into your `uportal-app-framework` app.

These steps describe how to add it to the RequireJS configuration for `my-app`, which is merged into the base frame configuration at build time.

## Set up path and shim

1. Create an `app-config.js` file in the `/my-app/` directory (`/my-app/app-config.js`)
2. Set the **path** where requirejs can find your dependency (we get most dependencies from [cdnjs](https://cdnjs.com/))
3. Set the **shim** for your dependency (and note anything it depends upon)

Here is the content of that `app-config.js` file:

```js
'use strict';
define([], function() {
  return {
    paths: {
      'ngMessages': 'https://cdnjs.cloudflare.com/ajax/libs/angular-messages/1.6.0/angular-messages.min',
    },
    shims: {
      'ngMessages': {
        deps: ['angular'],
      },
    },
  };
});
```

This file returns an object with paths and shims with the relative path (webapp being the working directory here) to the artifacts.
To learn more about how `app-config.js` works, check out [config.js](https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/config.js) in uportal-app-framework's source code. It takes the returned object from `app-config.js` and merges it in with the frame configuration.

## Inject the dependency into your app module

Now that requirejs knows about the dependency, we can use it in the angular configuration.

Inject ngMessages into your app's `/my-app/main.js` file. Here's what the contents of `main.js` might look like:

```js
define([
  'angular', 'jquery', 'portal', 'ngRoute',
  'ngMessages', // your new dependency
  'portal/main/routes', 'portal/settings/routes',  'portal/notifications/route',
  'portal/features/route',  'portal/about/route',  'my-app/home/route',
  ],
  function(angular, $, portal, main, settings, notifications, features, about, home) {
    return angular
      .module('my-app', ['portal', 'ngMessages']) // ready for your app to use
      .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
          $routeProvider
            .when('/settings', settings.betaSettings)
            .when('/notifications', notifications)
            .when('/features', features)
            .when('/about', about)
            .when('/access-denied', main.accessDenied)
            .when('/server-error', main.serverError)
            .when('/demo', home.demo)
            .otherwise(home.demo);
  ]);
});
```

Your dependency should now be available to all of your angular controllers, directives, etc. If you encounter problems, check for compatibility with `uportal-app-framework` dependency versions (check [config.js](https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/config.js) to see all existing dependencies).
