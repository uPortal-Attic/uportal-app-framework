# Upgrading

At a glance notes for upgrading apps between major versions.

## 20 to 21

The framework no longer attempts to count down to Shibboleth SP session timeout
and no longer attempts to proactively display a dialog indicating the session
will expire / has expired.

`activityTimeout` and `shibbolethSessionURL` no longer have effect.

`portal.timeout.controllers` and `portal.timeout.services` packages are removed.

`PortalTimeoutController`, `portalShibbolethService`,
and `sessionInactivityService` are removed.

## 19 to 20

Frame 20 adopts `myuw-banner` v3 and relies upon myuw banner back-end v2,
which changes the data model for banner messages to support learn more links
and ARIA labels. Implementing apps not setting the banner URL and so not using
the banner message feature are unaffected. Implementing apps using this feature
will need to use a compatible banner message backend so that the frame
recognizes the banner message data model.

## 18 to 19

19 drops the "silent login" feature in favor of detecting when calls to the
server are failing for lack of authentication and redirecting through uPortal
login setting the `refUrl` parameter to encourage a redirect from uPortal back
to the current path when the session is (re-)established.

`MISC_URLS.loginURL` *must not* have a request parameter on it in 19.
So, `/portal/Login`, not `/portal/Login?profile=...`. Note that an application
using the app framework may not need to override `MISC_URLS.loginURL` at all.

## 17 to 18

18.0.0 drops direct instantiation of Google Analytics in favor of hard-coded
usage of Google Tag Manager. Tag Manager is an additional layer of abstraction
in front of, among other things, Google Analytics.

Configuring a Google Analytics property id in `config.json`
no longer has any effect.

In order for an application using framework version 18 and later to continue to
participate in Google Analytics, WPS will need to provision it in one or both of
the relevant Google Tag Manager organizations.

## 11.x.x to 12.x.x

12.0.0 removes features that supported "announcements" and `/features`. This may
break downstream apps relying upon these in their routes, as it did for
`uPortal-home` (cf. [uPortal-home #781][]). `messageType` in `messages.json` no
longer has any effect: all messages are treated as if they were of `messageType`
`notification`. The `addToHome` special action URL syntax is no longer
supported. In practice this means adopters need to carefully intentionally port
forward local `messages.json` in light of what features are now supported and
what has been removed.

## 10.x.x to 11.x.x

The addition of web components led to some html structural changes, which caused
some CSS selectors to change. The most notable of the changes is the removal of
`md-toolbar`. If you relied on these selectors, see
[this changeset from PR #838](https://github.com/uPortal-Project/uportal-app-framework/pull/838/files/91878bc59802a1eec4c4be74de09f363961d19a6)
for more detail.

## 9.x.x to 10.x.x

The deprecated `$rootScope.GuestMode` has been removed. Replace references with
a direct call to `mainService.isGuest()` where possible. If you rely on
`GuestMode` within a partial, you can populate a locally scoped variable within
the controller, upon initialization.

```
$scope.guestMode = true;

mainService.isGuest().then(function(result) {
  $scope.guestMode = result;
  return result;
 }).catch(function() {
   $log.warn('Problem checking guestMode');
 });
 ```

## 8.x.x to 9.x.x

The framework will include in the document title the value of the `app-title`
attribute, if set, on the `frame-page` directive.

With the removal of the `<app-header>`, support for the
`APP_OPTIONS.optionsTemplateURL` config has been **removed**.

A similar `appMenuTemplateURL` configuration replaces the removed feature. The
framework displays the content referenced by `appMenuTemplateURL`, if set and
not superseded by `appMenuItems`, in the side navigation menu. Templates built
for reference by `optionsTemplateURL` may need minor layout/appearance
adjustments for suitability for use as `appMenutemplateURL`. (#684)

To upgrade:

+ Update pages that were using `<app-header>` directly to use `<frame-page>`
  instead. The `page-title` attribute on `frame-page` results in a similar
  within-page `h1` heading as before.
+ Update applications previously using `APP_OPTIONS.optionsTemplateURL` to use
  `APP_OPTIONS.appMenuTemplateURL` instead. HTML templates previously used
  as `optionsTemplateURL` may need a bit of tweaking for suitability for use as
  an `appMenuTemplateURL`.

## 7.x.x to 8.x.x

- move the data name/value pairs from the audience filter into a new `data`
  object  in messages.json
  - from
  ```json
  {
    "messages": [
      {
        "id": "",
        "audienceFilter": {
          "groups": [],
          "dataUrl": "",
          "dataObject": "",
          "dataArrayFilter": {}
        }
      }
    ]
  }
  ```
  - to
  ```json
  {
    "messages": [
      {
        "id": "",
        "audienceFilter": {
          "groups": []
        },
        "data": {
          "dataUrl": "",
          "dataObject": "",
          "dataArrayFilter": {}
        }
      }
    ]
  }
  ```

## 6.x.x to 7.x.x

- Wrap routed views in a `<frame-page>` directive.
  - remove extraneous `<app-header>` directives.
- Remove `app-options-template` attribute from existing `<frame-page>`
  directives. Replace with a partial in `overrides.js`:
  - from
    ```html
    <frame-page app-title="App Name Here"
          app-icon="fa-clock-o"
          white-background='false'
          app-option-template="{{vm.showAdminPanel ? 'my-app/admin-actions/adminActionsSidebarToggle.html' : ''}}"
          app-single-option="true">
    ```
  - to
    ```html
    <frame-page app-title="App Name Here"
          app-icon="fa-clock-o"
          white-background='false'>
    ```
    ```javascript
    var example = {
      'APP_OPTIONS': {
        'optionsTemplateURL': 'my-app/app-options/appOptions.html',
      },
    };
    ```

## 5.x.x to 6.x.x

- Change pom.xml to reflect new dependency version (and name).
  - from
    ```xml
    <dependency>
      <groupId>edu.wisc.my.apps</groupId>
      <artifactId>uw-frame</artifactId>
      <type>war</type>
      <version>5.2.1</version>
    </dependency>
    ```
  - to
    ```xml
    <dependency>
      <groupId>org.apereo.uportal</groupId>
      <artifactId>uportal-app-framework</artifactId>
      <type>war</type>
      <version>6.0.0</version>
    </dependency>
    ```

## 4.x.x to 5.x.x

- Update the notifications page url attribute name in `override.js` (note the
  pluralization)
  - from `NOTIFICATIONS.notificationFullURL`
  - to `MESSAGES.notificationsPageURL`
- Update location for getting notifications feed in `override.js`
  - from `SERVICE_LOC.notificationsURL`
  - to `SERVICE_LOC.messagesURL`
- Remove `NOTIFICATIONS` and `FEATURES` attribute groups from `override.js`
- Add a default theme configuration to override.js
  - e.g. set `APP_FLAGS.defaultTheme` to `'uw-madison'`

## 3.x.x to 4.x.x

- Rename custom directives that include the word `widget`

[uPortal-home #781]: https://github.com/uPortal-Project/uportal-home/pull/871
