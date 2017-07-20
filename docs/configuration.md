# Configuring the frame

Your application can overwrite any constant listed below by adding it to the `js/override.js` file. You only need to add what you want different than what is in `js/app-config.js`.

## Configuration options

### APP_FLAGS

+ `defaultTheme` : This is the default theme you want (see /js/frame-config.js for the array list of themes). Provide an array index number to just have simple selection, set it to the string `'group'` to enable group selection, or set it to any one of the themes names (e.g.: `'uw-greenbay'`). If you do group selection make sure you set the `SERVICE_LOC.groupURL`.
+ `showSearch` : This boolean hides/shows the search bar at the top.
+ `isWeb` : This boolean is a shortcut flag for the MyUW project. Majority of applications should set this to false.
+ `loginOnLoad` : A optional boolean flag that when set to `true` it will fire a login event during the loading sequence. `SERVICE_LOC.loginSilentURL` must be set.
+ `loginDurationMills` : number of milliseconds a login session is valid for. Default set to 4 hours (14400000).
+ `gaSearchParam` : Default set to 'q'. This is the param that is tacked on to your search result page. Google later strips it in Google Analytics.
+ `showUserSettingsPage` : If set, this will add a `settings` link to the user drop down which will point at `/user-settings`. Default is `false`. _as of 2.2.2_
+ `shibbolethSessionURL` : Default is `null`. When set to a proper string (like `'/Shibboleth.sso/Session.json'`) it then adds a timeout alert notifying users the session is no longer valid. The action of the pop-up is to forward them on to the `MISC_URLS.loginURL`. _as of 2.6.2_
+ `campusIdAttribute` : Default is `null`. Provide a Shibboleth attribute for campus ID (i.e. UW-Madison's `wiscEduStudentID` attribute) if you want users to see it in the username menu.

### SERVICE_LOC

+ `aboutURL` : If your application has some data that it would like to show in `/about` in addition to the frame information, provide that here.
+ `sessionInfo` : This is where the frame gets data about the user that is logged in. For an example of the expected output, see [this.](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/session.json)
+ `notificationsURL` : This is an end point of which you can have notifications. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/sample_notifications.json) for the example.
+ `kvURL` : This is the key value service. The key value service is a way to store information in a key/value store. The store should support GET and PUT on the same URL, where the URL includes the key. If you want this but not sure where to start, we wrote [a microservice called KeyValueStore](https://github.com/UW-Madison-DoIT/KeyValueStore) that you can use. You can also use the MyUW version under the storage context, but please contact MyUW devs before using for your application.
+ `groupURL` : This is a service which you can use to get group information. Currently this only used for notifications. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/groups.json) for an example.
+ `loginSilentURL` : See `APP_FLAGS.loginOnLoad` for usage.
+ `portalLayoutRestEndpoint` : If set and you change your skin in beta settings, it will also set the skin in uPortal. e.g.: `'/portal/api/layout'`

### NAMES

+ `title` : Your application's name
+ `guestUserName` : the name of your guest user. This is used on the return of `SERVICE_LOC.sessionInfo`. If the name provided here matches the userName field in the person object, then guest mode is enabled.
+ `fname` : Used to document what functional name your application is. This is the fname of the app in uPortal. This is used for the app-header "add to home" feature. If you are unsure of your fname and would like to use the add to home feature in the app-header directive, contact a MyUW developer.

### SEARCH

+ `searchURL` : The URL that you want the search to go to when you search something in the site header. Suggested default should be `https://my.wisc.edu/web/apps/search/`

### FEATURES

+ `enabled` : This boolean will enable the features page, Bucky announcements, and the modal popup. Make sure to configure `FEATURES.serviceURL` if you set this to true.
+ `serviceURL` : This feed provides announcements about your application. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/features.json) for an example.

### NOTIFICATION

+ `groupFiltering` : If set to `true`, you will get filtered features based on the `feature.groups` attribute and the group service list. Requires the `SERVICE_LOC.groupURL` to be configured. Note the `feature.groups` attribute can be a `String` or an `Array`.
+ `enabled` : a boolean that turns on/off the bell in the header.
+ `groupFiltering` : Enabled group filtered notifications. Must have `groupURL` set for this to work properly
+ `notificationFullURL` : The URL for the notifications full page.

### MISC_URLS

+ `feedbackURL` : A link to a feedback form
+ `helpdeskURL` : Link to your helpdesk page
+ `loginURL` : How a user would login. Used for guestMode, and for stale sessions when they hit a service.
+ `logoutURL` : The sign out link
+ `myuwHome` : The home page for MyUW
+ `rootURL` : The root URL used for what happens when they click the crest.
+ `addToHomeURLS` : An object with two fields. `layoutURL` and `addToHomeActionURL`. This is used for the add to home feature in the app-header directive.

### FOOTER_URLS

An array that consists of object that have 3 elements. These links show up in the footer (hence the name).
+ `url` : The hyperlink of the footer
+ `target` : optional, but can be things like `_blank`
+ `title` : The hover text and the body of the anchor tag.

### APP_BETA_FEATURES

An array of features that you want to show up in `/settings`.

![settings option](img/settings-option.png)

Each object in this array has 3 fields:
+ `id` : the id that will be stored in localStorage
+ `title` : The text next to the toggle switch on the settings page
+ `description` : The description under the toggle switch to describe what this toggle does.

## Example override.js file

```javascript
define(['angular'], function(angular) {
  return angular.module('override', [])
  .constant('OVERRIDE', {
    'FEATURES': {
      'enabled': true,
    },
    'APP_FLAG': {
      'loginOnLoad': true,
      'gaSearchParam': 'f',
    },
    'FOOTER_URLS': [{
      'url': 'http://www.google.com',
      'target': '_blank',
      'title': 'Google',
    }],
  });
});

```

Alright, lot going on here so lets take a walk through this.

+ `Lines 1-4` include the the requirejs wrapper, setup for the angular module (pulled in during the /portal/main.js execution),
and definition of the "OVERRIDE" constant. These lines should not change.
+ `Line 5` is an example override for the `enabled` attribute in the `FEATURES` category. By default its set to false, but
with this config it will now be true.
+ `Line 6` is an example of changing more than one config in a single category.
+ `Lines 7-11` are overriding an array config category. This will append to the default values. In this case it'll add a footer url for google.

In version 2.2.1 we added the option to add key/value pairs to existing categories (e.g.: `APP_FLAGS`). This can be helpful if your
application has additional `APP_FLAGS` or `SERVICE_LOC` but you don't want to create another value service just for that. However, if you have
a lot of these it may be wise just to create an app specific value service.

If you have questions please [ask the MyUW team](mailto:myuw-infra@office365.wisc.edu).
