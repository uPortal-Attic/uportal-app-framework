Customization to the uw-frame constants is all done in `js/app-config.js`. Your application can overwrite any constants in this file to manipulate various things. At a minimum you should overwrite the app-config.js and have every constant defined. If you don't have every field defined it should be fine. For example, if you are not using `SERVICE_LOC.aboutURL` you don't have to define it as null. However, you do have to define `SERVICE_LOC`, even if its just an empty object.

#### APP_FLAGS
+ `features` : This boolean will enable the features page, Bucky announcements, and the modal popup. Make sure to configure `SERVICE_LOC.featuresInfo` if you set this to true.
+ `showSearch` : This boolean hides/shows the search bar at the top.
+ `isWeb` : This boolean is a shortcut flag for the MyUW project. Majority of applications should set this to false.

#### SERVICE_LOC
+ `aboutURL` : If your application has some data that it would like to show in `/about` in addition to the frame information, provide that here.
+ `sessionInfo` : This is where the frame gets data about the user that is logged in. For an example of the expected output, see [this.](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/session.json)
+ `featuresInfo` : This feed provides announcements about your application. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/features.json) for an example.
+ `notificationsURL` : This is an end point of which you can have notifications. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/sample_notifications.json) for the example.
+ `kvURL` : This is the key value service. The key value service is a way to store information in a key/value store. The store should support GET and PUT on the same URL, where the URL includes the key. If you want this but not sure where to start, we wrote [a microservice called KeyValueStore](https://github.com/UW-Madison-DoIT/KeyValueStore) that you can use. You can also use the MyUW version under the storage context, but please contact MyUW devs before using for your application.
+ `groupURL` : This is a service which you can use to get group information. Currently this only used for notifications. See [this](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/staticFeeds/groups.json) for an example.

#### NAMES
+ `title` : Your application's name
+ `guestUserName` : the name of your guest user. This is used on the return of `SERVICE_LOC.sessionInfo`. If the name provided here matches the userName field in the person object, then guest mode is enabled.
+ `fname` : Used to document what functional name your application is. This is the fname of the app in uPortal. This is used for the app-header "add to home" feature. If you are unsure of your fname and would like to use the add to home feature in the app-header directive, contact a MyUW developer.

#### SEARCH
+ `searchURL` : The URL that you want the search to go to when you search something in the site header. Suggested default should be `https://my.wisc.edu/web/apps/search/`

#### NOTIFICATION

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