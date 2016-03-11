Your application can overwrite any constant listed below by adding it to the `js/override.js` file. You only need to add what you want different than what is in `js/app-config.js`.

## Example
```javascript
define(['angular'], function(angular) {
  var config = angular.module('override', []);
  config
      .constant('OVERRIDE', {
                              'FEATURES' : { 'enabled' : true },
                              'APP_FLAG' : { 'loginOnLoad' : true, 'gaSearchParam' : 'f' },
                              'FOOTER_URLS' : [{ "url" : "http://www.google.com",
                                                 "target" : "_blank",
                                                 "title" : "Google"
                                               }]
                            })
  return config;
});

```

Alright, lot going on here so lets take a walk through this.
+ `Line 1` is just the `requirejs` wrapper, no biggy.
+ `Line 2 & 3` are just setting up this module in angular. This will be pulled in during the `/portal/main.js` execution.
+ `Line 4` defines the constant "OVERRIDE". This will contain the json that will be overwritten
+ `Line 5` is an example override for something in the `FEATURES` category. Each category must be the object name. In this instance that is `FEATURES`. The value is `JSON` and each key is a key shown below of which you wish to override. In this instance we are overwriting `enabled`. By default its set to `false`, but with this config it will now be `true`.
+ `Line 6` is an example of changing more than one config in a single category
+ `Line 7-10` is an interesting example. Its an array config category. This will append to the default values. In this case it'll add a footer url for google.

A feature that was introduced in 2.2.1 is you can add key/value pairs to existing categories (e.g.: `APP_FLAGS`). This can be helpful if your application has additional `APP_FLAGS` or `SERVICE_LOC` but you don't want to create another value service just for that. However, if you have a lot of these it may be wise just to create an app specific value service.

If you have questions please ask the MyUW team.

## The Configuration Options

#### APP_FLAGS
+ `defaultTheme` : This is the default theme you want (see frame-config.js for the array list of themes). Provide an index number to just have simple selection, or set to the string `'group'` to enable group selection. If you do group selection make sure you set the `SERVICE_LOC.groupURL`.
+ `showSearch` : This boolean hides/shows the search bar at the top.
+ `isWeb` : This boolean is a shortcut flag for the MyUW project. Majority of applications should set this to false.
+ `loginOnLoad` : A optional boolean flag that when set to `true` it will fire a login event during the loading sequence. `SERVICE_LOC.loginSilentURL` must be set.
+ `loginDurationMills` : number of milliseconds a login session is valid for. Default set to 4 hours (14400000).
+ `gaSearchParam` : Default set to 'q'. This is the param that is tacked on to your search result page. Google later strips it in Google Analytics.

#### SERVICE_LOC
+ `aboutURL` : If your application has some data that it would like to show in `/about` in addition to the frame information, provide that here.
+ `sessionInfo` : This is where the frame gets data about the user that is logged in. For an example of the expected output, see [this.](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/session.json)
+ `notificationsURL` : This is an end point of which you can have notifications. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/sample_notifications.json) for the example.
+ `kvURL` : This is the key value service. The key value service is a way to store information in a key/value store. The store should support GET and PUT on the same URL, where the URL includes the key. If you want this but not sure where to start, we wrote [a microservice called KeyValueStore](https://github.com/UW-Madison-DoIT/KeyValueStore) that you can use. You can also use the MyUW version under the storage context, but please contact MyUW devs before using for your application.
+ `groupURL` : This is a service which you can use to get group information. Currently this only used for notifications. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/groups.json) for an example.
+ `loginSilentURL` : See `APP_FLAGS.loginOnLoad` for usage.

#### NAMES
+ `title` : Your application's name
+ `guestUserName` : the name of your guest user. This is used on the return of `SERVICE_LOC.sessionInfo`. If the name provided here matches the userName field in the person object, then guest mode is enabled.
+ `fname` : Used to document what functional name your application is. This is the fname of the app in uPortal. This is used for the app-header "add to home" feature. If you are unsure of your fname and would like to use the add to home feature in the app-header directive, contact a MyUW developer.

#### SEARCH
+ `searchURL` : The URL that you want the search to go to when you search something in the site header. Suggested default should be `https://my.wisc.edu/web/apps/search/`

#### FEATURES _(new as of 2.2.0)_
+ `enabled` : This boolean will enable the features page, Bucky announcements, and the modal popup. Make sure to configure `FEATURES.serviceURL` if you set this to true.
+ `serviceURL` : This feed provides announcements about your application. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/features.json) for an example.
#### NOTIFICATION
+ `groupFiltering` : If set to `true`, you will get filtered features based on the `feature.groups` attribute and the group service list. Requires the `SERVICE_LOC.groupURL` to be configured. Note the `feature.groups` attribute can be a `String` or an `Array`.

![http://goo.gl/0IJOWS](http://goo.gl/0IJOWS)

+ `enabled` : a boolean that turns on/off the bell in the header.
+ `groupFiltering` : Enabled group filtered notifications. Must have `groupURL` set for this to work properly
+ `notificationFullURL` : The URL for the notifications full page.

#### MISC_URLS
+ `back2ClassicURL` : The URL to get back to classic MyUW. Used by screen reader button.
+ `feedbackURL` : A link to a feedback form
+ `helpdeskURL` : Link to your helpdesk page
+ `loginURL` : How a user would login. Used for guestMode, and for stale sessions when they hit a service.
+ `logoutURL` : The sign out link
+ `myuwHome` : The home page for MyUW
+ `rootURL` : The root URL used for what happens when they click the crest.
+ `addToHomeURLS` : An object with two fields. `layoutURL` and `addToHomeActionURL`. This is used for the add to home feature in the app-header directive.

#### FOOTER_URLS

![http://goo.gl/LRG1wa](http://goo.gl/LRG1wa)

This is an array that consists of object that have 3 elements. These links show up in the footer (hence the name).
+ `url` : The hyperlink of the footer
+ `target` : optional, but can be things like `_blank`
+ `title` : The hover text and the body of the anchor tag.

#### APP_BETA_FEATURES
This constant is an array of features that you want to show up in `/settings`.

![http://goo.gl/j9LmYA](http://goo.gl/j9LmYA)

Each object in this array has 3 fields:
+ `id` : the id that will be stored in localStorage
+ `title` : The text next to the toggle switch on the settings page
+ `description` : The description under the toggle switch to describe what this toggle does.
