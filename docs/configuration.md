# Configuring the frame

Applications can overwrite any constant listed below by adding it to
**js/override.js**. **override.js** need only contain what is different
("overridden") from **js/app-config.js**.

## Configuration options

### APP_FLAGS

+ **defaultTheme**: Sets the default theme (see /js/frame-config.js
for the array list of themes). Provide an array index number to just have
simple selection, set it to the string **'group'** to enable group selection,
or set it to any one of the themes names (e.g.: **'uw-greenbay'**). Group
selection requires a valid value for **SERVICE_LOC.groupURL** so that groups
are available.
+ **showSearch**: This boolean hides/shows the search bar at the top.
+ **isWeb**: A flag for special handling for the `uPortal-home` app. Other apps
should set this to `false`.
+ **gaSearchParam**: Default set to 'q'. This is the param that is tacked on to
the search result page. Google later strips it in Google Analytics.
+ **showUserSettingsPage**: If set, this will add a **settings** link to the
user drop down which will point at **/user-settings**. Default is **false**.
_as of 2.2.2_
+ **campusIdAttribute**: Default is **null**. Provide a session attribute for
campus ID (i.e. UW-Madison's **wiscEduStudentID** attribute) so that users can
see their ID in the username menu. _This is currently unimplemented._
+ **showFeedbackComponent**: If set to true, MyUW Feedback web component will be
activated in the header. Default is **false** _as of 18.1.0_.

### APP_OPTIONS

+ **appMenuTemplateURL**: A path to the HTML template for app-specific menu
items (appears in the side navigation menu that is triggered when clicking the
top bar hamburger icon button). See the [app navigation
doc](configurable-menu.md) to learn how to use this feature.
+ **appMenuItems**: An array of menu items to populate a  simple custom menu
(with links that have a text label, icon, and url). See the [app navigation
doc](configurable-menu.md).
+ **enablePushContentMenu**:
    - _CAUTION_
    - False by default
    - Only affects medium and large screens
    - Set to true to open side navigation upon page load as part of the page
content. The side nav will push content when open and give up the space
when closed
    - See the [app navigation doc](configurable-menu.md)

**Important:** Side navigation (appMenuTemplateURL/appMenuItems) depends on the
`<frame-page>` directive. Use the `<frame-page>` directive as the outermost
containing element for app view(s). A menu that doesn't use the frame-page
directive yields a hamburger button that does nothing when clicked. See
[frame-page.html][] to understand how
this is constructed.

### SERVICE_LOC

+ **aboutURL**: Additional data to show in **/session-info**.
+ **aboutPageURL**: A URL to get JSON data about the app. This data is used on the text/link content for the app's "About" page, as well as the app's "description" and "keywords" `<meta>` tags. See [About page](about-page.md) for more information.
+ **bannersURL**: Optional URL to source
  [banner messages JSON](messaging.md#configuring-banner-messages).
+ **sessionInfo**: Where the frame gets data about the logged in user. [Example][session.json].
+ **messagesURL**: An end point to a feed of messages.
[Example][sample-messages.json]. Messages at the
end point must match the data model displayed in the example.
    - _Note: Setting this attribute to `null` or an empty string turns off
inclusion of the portal-wide messages in the app._
+ **kvURL**: This is the key value service, a way to
store information in a key/value store. The store should support GET and PUT on
the same URL, where the URL includes the key. [A microservice called
KeyValueStore][KeyValueStore] implements a
back-end for this service. MyUW does and other portals may provide a shared
instance of this service as infrastructure, or as a microservice it's available
for multiple deployment, or as a simple JSON API it can be realized using other
technology.
+ **groupURL**: Service for reading the user's group memberships as understood
by the portal. Currently this only used for notifications.
[Example](https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/staticFeeds/groups.json).
+ **portalLayoutRestEndpoint**: If set, selecting a skin in beta settings will
also set the skin in the user's uPortal profile. e.g.: **'/portal/api/layout'**

### NAMES

+ **title**: The application's name
+ **guestUserName**: the name of the guest user. This is used on the return of
**SERVICE_LOC.sessionInfo**. If the name provided here matches the userName
field in the person object, then guest (not-logged-in) mode is enabled.
+ **fname**: The fname ("functional name") of the application directory entry
in uPortal corresponding to the app. The app-header "add to home" feature uses
this.

### SEARCH

+ **searchURL**: Where the user goes when launching a search via the header
search bar. In MyUW, use `/web/apps/search/` to launch searches into
uPortal-home portal-wide search.

### MESSAGES

+ **notificationsPageURL**: The URL for the full notifications view (i.e. Where
the "See all" link should go).

### MISC_URLS

+ **feedbackURL**: A link to a feedback form
+ **helpdeskURL**: Link to the relevant help desk
+ **loginURL**: How a user would login.
  In intentionally unauthenticated views, this is the href of the Login link.
  When calls to back end services fail apparently for lack of being logged in,
  this is the URL the framework will redirect through
  to attempt to log the user in again server-side.
+ **logoutURL**: The sign out link
+ **myuwHome**: The home page for MyUW
+ **rootURL**: The root URL used for what happens when they click the crest.
+ **addToHomeURLS**: An object with two fields. **layoutURL** and
**addToHomeActionURL**. This is used for the add to home feature in the
app-header directive.

### FOOTER_URLS

An array that consists of object that have 3 elements. These links show up in
the footer (hence the name).
+ **url**: The hyperlink of the footer
+ **target**: optional, but can be things like **_blank**
+ **title**: The hover text and the body of the anchor tag.

### APP_BETA_FEATURES

An array of features for inclusion in beta **/settings**.

![settings option](img/settings-option.png)

Each object in this array has 3 fields:

+ **id**: the id that will be stored in localStorage
+ **title**: The text next to the toggle switch on the settings page
+ **description**: The description under the toggle switch to describe what
this toggle does.

## Example override.js file

```javascript
define(['angular'], function(angular) {
  return angular.module('override', [])
  .constant('OVERRIDE', {
    'APP_OPTIONS': {
      'appMenuItems': [
        {
          'label': 'MyUW home',
          'icon': 'home',
          'url': '/web',
        },
      ],
    },
    'APP_FLAG': {
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

Explanation:

+ **Lines 1-3** include the the requirejs wrapper, setup for the angular module
(pulled in during the /portal/main.js execution),
and definition of the "OVERRIDE" constant. These lines should not change.
+ **Lines 4-12** are an example override for the **appMenuItems** attribute in
the **APP_OPTIONS** category. By default its set to null, but
with this config it will now include an item to add to the app's [configurable
menu](configurable-menu.md).
+ **Line 14-16** is an example of changing more than one config in a single
category.
+ **Lines 17-21** are overriding an array config category. This will append to
the default values. In this case it'll add a footer url for google.

In version 2.2.1 uPortal-app-framework added the option to add key/value pairs
to existing categories (e.g.: **APP_FLAGS**). This can be helpful if the
application has a few additional **APP_FLAGS** or **SERVICE_LOC**, as it may
avoid requiring an additional values service for these few additional values.

Questions about using `uPortal-app-framework`? [Ask on the user
list][uportal-user@].
Collaborating on developing `uPortal-app-framework`? Discuss on [the
development list][uportal-dev@].

## Tier-specific application configuration

One option is to additionally override `override.js` in tier-specific overlays.
This has the advantage that anything configurable in `override.js`
(that is, anything configured in app-config), and an additions to that,
are arbitrarily configurable in tier-specific overlays. This is powerful.
It also may duplicate application configuration that's the same in all tiers
into tier-specific overlays because it replaces the application's `override.js`
configuration of the frame.

Another, complementary option is to override `overlay-config.js` in
tier-specific overlays. This has the advantage of _not_ being `override.js` and
so not clobbering whatever the application was doing in `override.js`.
This has the disadvantage of _not_ being `override.js` and so not overriding
`app-config`. The framework has no current special support for
 `overlay-config.js` -- that is, the framework does not expect anything of that
 module, does not use it for anything, and does not consult it in interpreting
 framework configuration. `overlay-config` is currently whatever the downstream
 applications make of it -- if a particular application invents a constant
 configured in that module and gives that constant meaning, then that constant
 becomes configurable per-tier by overriding the implementation of this module
 in tier-specific overlays.

[KeyValueStore]: https://github.com/UW-Madison-DoIT/KeyValueStore
[uportal-dev@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-dev
[uportal-user@]: https://groups.google.com/a/apereo.org/forum/#!forum/uportal-user
[sample-messages.json]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/staticFeeds/sample-messages.json
[session.json]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/staticFeeds/session.json
[frame-page.html]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/portal/misc/partials/frame-page.html
