# Upgrading
At a glance notes for upgrading apps between major versions.

# 7.x.x to 8.x.x
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

# 6.x.x to 7.x.x
- Wrap routed views in a `<frame-page>` directive.
  - remove extraneous `<app-header>` directives.
- Remove `app-options-template` attribute from existing `<frame-page>` directives. Replace with a partial in `overrides.js`:
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

# 5.x.x to 6.x.x
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

# 4.x.x to 5.x.x
- Update the notifications page url attribute name in `override.js` (note the pluralization)
  - from `NOTIFICATIONS.notificationFullURL`
  - to `MESSAGES.notificationsPageURL`
- Update location for getting notifications feed in `override.js`
  - from `SERVICE_LOC.notificationsURL`
  - to `SERVICE_LOC.messagesURL`
- Remove `NOTIFICATIONS` and `FEATURES` attribute groups from `override.js`
- Add a default theme configuration to override.js
  - e.g. set `APP_FLAGS.defaultTheme` to `'uw-madison'`

# 3.x.x to 4.x.x
- Rename custom directives that include the word `widget`
