# Adding dependencies to your frame-based app

Suppose you want to inject `ngMarked` (does not ship in `uw-frame` out of the box) into your `uw-frame`-based app.

Add it to the RequireJS configuration for `my-app`, which is merged into the base frame configuration at build time.

## Paths and shims

Let's inject them into the `requirejs` configuration. We inject `marked` and `ngMarked` into the
project via the `/my-app/app-config.js`.

Here is the content of that file:

```JavaScript
'use strict';
define([], function() {

  return {
    paths : {
      'marked'        : "path/or/uri/to/marked",
      'ngMarked'      : "path/or/uri/to/angular-marked"
    },

    shims : {
      'ngMarked'      : { deps: ['marked','angular']}
    }

  }
});
```

It just returns an object with paths and shims with the relative path (webapp being the working directory here) to the artifacts.
To learn more about how `app-config.js`works, check out [/config.js](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/config.js) in uw-frame's source code. It takes the returned object from `app-config.js` and merges it in with the frame configuration.

## Injecting the angular module into your app

Now that require knows about the artifact, we can now use that module in the angular configuration. In your app's `my-app/main.js`, you would inject marked and ngMarked, then add the `'hc.marked'` module. Here's what the contents of `main.js` might look like:

```JavaScript
define(['angular'
, 'jquery'
, 'portal'
, 'marked'
, 'ngMarked'
, 'portal/main/routes'
, 'portal/settings/routes'
, 'portal/notifications/route'
, 'portal/features/route'
, 'portal/about/route'
, 'my-app/home/route'
, 'my-app/home/controllers']
, function(angular, $, portal, marked, ngMarked , main, settings, notifications, features, about, home) {
    var app = angular.module('my-app', ['portal', 'hc.marked', 'docs.main.controllers']);
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/settings', settings.betaSettings).
            when('/notifications', notifications).
            when('/features', features).
            when('/about', about).
            when('/access-denied', main.accessDenied).
            when('/server-error', main.serverError).
            when('/demo', home.demo).
            when('/home', home.docHome).
            when('/md/:markdownfilename', home.md).
            otherwise(home.docHome);
    }]);

    return app

});
```

And that should be it.
