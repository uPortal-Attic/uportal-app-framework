# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Next release

* Add optional attribute `include-context-menu` on `widget` directive.
  attribute effectively defaults to `true`;
  when set to `false` suppresses the upper-right context menu on widgets.

## 17.0.1

+ Upgrade component `myuw-notifications` to v1.3.1
+ Fix the bug when using `myuw-nofitications`, showing the bell even messages are disabled
+ Fix `myuw-notifications` "See all" page and styles

## 17.0.0

### Breaking Changes

+ Replace existing notification menu with `myuw-notifications` v1.2.0 from myuw-web-components library


## 16.0.1

+ Check session info to identify if user is a guest to display a bubble vs login button
+ Remove myuw-profile from the side navigation drawer menu
+ Always keep myuw-profile button on header menu

## 16.0.0 - 2020-07-03

Breaking change: downgrade angular-resource to 1.5.8 from 1.7.8

## 15.0.4

+ Fix variable passing to myuw-profile in side navigation bar, so that its logout button points to the right address

## 15.0.3

+ Update import path to use latest unpkg version ( [#967][])

## 15.0.2

+ Upgrade myuw-profile web component to version 1.6.3
+ Remove `hide-xs` in `main-menu.html` to prevent hiding the myuw-profile on mobile on the drawer/left hand menu - we want it there all time
+ Run `npm audit fix` to fix some vulnerabilities in node modules

## 15.0.1

+ Update paths to settings pages
+ Remove Guest Login button, which now is taken care of by myuw-profile component

## 15.0.0 - 2020-07-03

### Breaking Change in 15.0.0

+ Replace existing profile menu with `myuw-profile` v1.6.3 from myuw-web-components library sourced via unpkg ( [#964][], [#967][] )
+ Two files related to old profile menu have been removed: components/portal/main/partials/username.html
  and buckyless/directives/username-menu.less
+ Remove unused username elements
+ Remove Guest Login button, which now is taken care of by myuw-profile component
+ Remove `hide-xs` in `main-menu.html` to prevent hiding the myuw-profile on mobile on the drawer/left hand menu - we want it there all time
+ Fix variable passing to myuw-profile in side navigation bar, so that its logout button points to the right address

### Other changes in 15.0.0

+ Upgrade myuw-help Web Component to version 1.5.3
+ Add tooltip to my-uw-help
+ Add role="toolbar" to myuw-app-bar
+ Update paths to settings pages
+ Adds `ngResource` 1.7.8
+ Updated dependencies

## 14.0.1 - 2020-04-08

+ Upgrade myuw-search Web Component to version 1.5.1 ( [#963][] )

## 14.0.0 - 2020-04-01

### Breaking Change in 14.0.0

+ Add $scope.apply inside myuw-search event listener to notify AngularJS of the change ( [#952][] )
+ Replace existing search form with `myuw-search` v1.5.0 from myuw-web-components library ( [#951][] )
+ Two files related to old search form have been reemoved: components/portal/search/directives.js and components/portal/search/partials/search.html

## 13.1.2 - 2020-03-09

+ Change CSS style `portal-header` -> `overflow-y: initial`
  rather than `overflow-y: hidden`. This had broken the new help dialog in
  e.g. Safari.

## 13.1.1 - 2020-03-06

+ Remove import and example usage of not-actually-used `myuw-compact-card`
  Web Component. (Apparently this was breaking support for
  recent-but-not-latest MS Edge browser.)
+ Upgrade myuw-help Web Component to version 1.5.2

## 13.1.0 - 2020-02-07

+ Add myuw-help web component to myuw-app-bar at top of page. ( [#941][] )

## 13.0.0 - 2020-01-06

BREAKING CHANGE: `recurrence` flag on messages that had been "experimental" in
prior releases is removed in this release. It had not been working reliably.
( [#933][] )

Also in this release:

+ feature: new optional `fail-silently` attribute on `widget` directive
  enables invoking a `widget` in contexts where it's not certain that the
  viewing user has permission on the widget or that it even exists ( [#927][] )
+ feature: add localhost demo of new compact card web component ( [#929][] )

+ tweak: Changes search bar prompt text to "Search for apps by keyword..." from
  "Search MyUW" ( [#922][] )

+ fix: upgrade `AngularJS` dependency to
  [1.7.8](https://github.com/angular/angular.js/blob/master/CHANGELOG.md#178-enthusiastic-oblation-2019-03-11)
  from 1.7.2, thereby picking up a bunch of little bug fixes
+ fix: upgrade `angular-material` dependency to
  [1.1.19](https://github.com/angular/material/blob/master/CHANGELOG.md#1119-2019-05-31)
  from 1.1.11, thereby picking up a bunch of little bug fixes
+ fix: update FontAwesome version to 5.0.13 ( [#925][] )

### Development process change

+ Added checkbox to Pull Request template reminding to consider security
  implications of change. Need for checks to ensure considering security
  implications of change was flagged in UW Cybersecurity Risk Management
  Framework review of MyUW; this is one tiny process change to partially
  address that finding. (#908)

## 12.2.0 - 2019-06-07

+ feature: new `remote-content` widget type
+ feature: in `list-of-links` widget type, new `widgetConfig` option
  `suppressLaunchButton` which will make the widget omit the launch button
  across the bottom of the widget.
+ documentation: stop documenting that omitting `launchText` in `list-of-links`
  widgets would supress the widget launch button. This didn't work and instead
  such list-of-links widgets would use default launch button text.

## 12.1.0 - 2019-05-10

### Deprecations in 12.1.10

+ "priority" notifications are deprecated. (#890)

### Enhancements in 12.1.0

+ Adds link to MyUW news in `about-page.json` (#887)
+ Adds myuw-banner component `1.1.1` to consume feed from
  [myuw-banner-message-backend][]. Optionally set new `SERVICE_LOC.bannersURL`
  to opt in to this feature; without that setting nothing changes.
  (#891, #893, #899)
+ Upgrades "Loading" splash screen to show a content preview (#898, #907)
+ Adds optional `launchUrl` and `launchUrlTarget` fields to `widgetConfig`,
  parallel to existing `launchText`. These customize the launch bar URL and
  target, only in the expanded mode of non-custom non-option-link widgets.
  ( [#904][] )

### Fixes in 12.1.0

+ Now uses `fname` rather than `nodeId` when generating HTML element IDs for
  widgets. In practice `nodeId` was always `-1` and so wasn't leading to unique
  HTML element IDs. (#885)
+ Prevent multiple session-expired dialogs from displaying. (#897)

### Documentation in 12.1.0

+ Corrects changelog and upgrading documentation to reflect `12.0.0`'s treating
  all messages as notifications. Otherwise catches up documentation  (#886)
+ Adjust "injecting dependencies" doc to cover a couple extra points of
  confusion (#900)

### Dependency upgrade in 12.1.0

+ Upgraded `remark-validate-links` to `^8.0.0` (#873)

## 12.0.0 - 2019-02-26

### Breaking change in 12.0.0

12.0.0 removes features that supported "announcements" and `/features`. This
may break downstream apps relying upon these in their routes, as it
did for `uPortal-home`. All messages are now treated as if they were
`messageType` `notification`, but notifications still do not support the
`addToHome` special action URL syntax that `announcements` had supported, so
announcements using that feature do not automatically port forward cleanly.

### Added

+ Tell IE users about recommended browsers during application bootstrapping,
  tracking this with a cookie so users aren't badgered too often. (#877, #881)

### Changed

+ Point directly to files in unpkg (#870)

### Fixed

+ List of links widget has more consistent appearance across browsers and screen
  sizes (#875)
+ Action items widget degrades to basic widget when configured with just one
  indicator and that one indicator is failing. ( [#876][] )

### Removed

+ All messages are now treated as if they were `messageType` `notiifcation`.
  Removed features that supported "announcements" (e.g. Mascot in top bar,
  /features page, etc.) (#878)

### Build

+ Mark fewer dependencies in `package-lock.json` optional. #883
+ Source `onetime` via  http rather than https. #883

### Deprecated

### Documentation

## 11.0.0 - 2018-11-19

### Breaking Change in 11.0.0

+ Replaced Angular Material toolbar directive with `myuw-app-bar` v1.5.3 from
  myuw-web-components library (#838)
  + CSS hierarchy has changed a bit to reflect the absence of the Angular
  Material toolbar. Custom CSS that targets elements within `md-toolbar` may be
  affected

### Added in 11.0.0

+ Link in widget contextual menu to app directory details page about the app.
  (#853)
+ CSS variables for each theme to enable `myuw-app-bar` cooperation with angular
  material theming (#838)
+ Added patched Web Components polyfill for AngularJS compatibility (#847, #854)

### Changed in 11.0.0

+ Regular side navigation now looks the same on mobile and desktop (#838)
+ `time-sensitive-content` widget type now only shows its feedback link after
  the action period has expired. (#852)
+ Inactive timeout dialog now provides less disruptive actions on timeout (#864)

### Fixed in 11.0.0

+ `list-of-links` no longer erroneously renders blank when it contains 2-4 links
  the first of which redundant with its launch bar. (#855)
+ `audienceFilter.groups` is now optional in messages. Omitting it is the same
  as setting it to `null` or to an empty array `[]`, namely that no one should
  be denied the message based on group memberships. (#846)
+ `goLiveDate` and `expireDate` are now independently optional in messages.
  Omitting `goLiveDate` means there is no date before which the message is not
  live. Omitting `expireDate` means there is no date after which the message is
  expired. (#846)
+ Improved spacing/appearance of push-content side navigation for desktop (#838)
+ Mobile search "Close" button now uses arrow icon, so not to be confused with
  "clear" functionality (#838)
+ `action-items` widgets now handle more kinds of errors more fluently (#839)

### Documentation in 11.0.0

+ Clarified `takeActionEndDate` in `time-sensitive-content` widget documentation
  (#861)

## 10.3.0 - 2018-09-19

### Added in 10.3.0

+ Added session inactivity checker, and updated logout dialog (#830, #837)

### Fixed in 10.3.0

+ `action-items` widget now detects and handles as an error when a quantity
  callback returns an empty String. (#836)
+ Use sentence-case within `time-sensitive-content` widget type (#832)

### Documentation in 10.3.0

+ Added localhost examples of `action-items` widget type (#835)
+ Added localhost examples of `time-sensitive-content` widget type (#831)

## 10.2.0 - 2018-09-12

### Added in 10.2.0

+ New `switch` widget type ( `<switch-widget>` directive), for composing
  composite widgets by dynamically switching over other types and configurations
  of widgets. (#820, #826)
+ New `<widget-content>` directive, factored out from the inline `ng-switch` in
  `<widget-card>`. Not a breaking change: `widget-card` behaves the same as
  before, its implementation now delegates to `<widget-content>` for the
  `md-card-content` part of the template. (#820)
+ New `<basic-widget>` directive, refactored out from the inline template in
  `<widget-card>`. Not a breaking change: `<widget-card>` behaves the same as
  before, its implementation now delegates to `<basic-widget>` in the basic
  widget case. (#820)

### Changed in 10.2.0

+ Default to handling unrecognized widget types as if they were `basic` widgets
  (#823)
+ Leverage `npm ci` to speed continuous integration builds (#812)

### Fixed in 10.2.0

+ Added `aria-label` describing mascot image (#808)
+ More reliably collapses trivial `list-of-links` widgets to `basic` widgets
  (#827)
+ Restored support for deprecated `generic` as alias for `custom` widget type.
  (#828)

### Removed in 10.2.0

+ Removes unused photo opt-out on settings page (#811)

## 10.1.1 - 2018-08-01

### Changed in 10.1.1

+ Update modules included in `package.json` and update `package-lock.json` to
  match (#804)
+ Error states for action items widget link to launch button for better UX
  (#807)

### Fixed in 10.1.1

+ Fixed compact mode widget removal (#805)
+ Action items widget type now fails gracefully when service returns non-number
  data (#807)

## 10.1.0 - 2018-07-26

### Added in 10.1.0

+ Out of the box example page now includes compact mode widget examples, rather
  than just expanded mode widget examples. (#791)
+ New `widgetConfig.maintenanceMessage` for customizing the message a widget
  shows when in `MAINTENANCE` lifecycle state (#798)

### Changed in 10.1.0

+ Widget actions are always visible, no longer only on hover (#794)
+ Increased padding on sides of expanded widget titles to accommodate menu
  button (#794)

### Fixed in 10.1.0

+ Fixed display bug in compact widgets. Compact widgets now correctly use the
  per-widget contextual menu. (#794)
+ Make widget removal button focusable by keyboard when present (#797)
+ Enable keyboard activation of widget removal button, when present (#800) &
  (#805)

## 10.0.0 - 2018-07-13

### Removed in 10.0.0

+ Removes `$rootScope.GuestMode` (#777)

### Added in 10.0.0

+ new filter `canAdd`, useful for filtering portlets on whether user can or
  cannot add them to layout (#791)

### Changed in 10.0.0

+ Changes list of links limit to 6 items. (#773)
+ Fixed list of links widget buttons clipping on some screen sizes (#781)
+ Moved widget info (description) and remove button into contextual menu to
  reduce burden on keyboard users (#786)
+ Upgrades Angular to version 1.7.2 (#788)

### Fixed in 10.0.0

+ Dates and titles in RSS widget no longer overlap each other (#780)
+ Removes unused `id` on the widget-removal div, thereby removing a source of
  HTML element `id` uniqueness constraint violations in the markup. (#787)

### Documentation in 10.0.0

+ Note in changelog message handling changes needing upgrade coordination (#733)

## 9.2.1 - 2018-06-08

### Changed in 9.2.1

+ Per UX guidance: When an app provides a theme name (i.e. "MyUW") and an app
  name (i.e. "STAR"), the two names now appear inline (#766)
+ Removed link to Features page ("What's New") from default app configuration
  (#770)

### Fixed in 9.2.1

+ Fixed potential upgrade path difficulty by making changes to "/about" and
  "/session-info" routes backward compatible (#765)
+ Increased z-index of all dialogs to highest value (101) to ensure they appear
  above other content (#771)
+ Added basic `<body>` styles (override Bootstrap values) to ensure Roboto is
  always preferred (#771)

## 9.2.0 - 2018-05-22

### Added in 9.2.0

+ New "session info" page containing the former content of the "About" page
  (uportal-app-framework version info, app info JSON) (#755)
  + To use: Add the `'portal/help/routes'` module in your main.js file (#765)
+ App config option `aboutPageURL` to get text and links for "About" page (#755)
+ Made Google's Roboto web font available (#761)

### Changed in 9.2.0

+ "About" page now sources meaningful content from `aboutPageURL` (#755)
+ Use Roboto font family (#761)
+ z-index values adjusted from highest (101) to lowest (51) stated values to
  play nicer with Angular Material (#760)
+ To better support open source commitment and downstream apps, replaced
  hard-coded MyUW/UW-Madison specific language in meta tags (now sourced from
  the same JSON file as the app's About page information) (#763)
+ SVG widget icons use the md-icon directive to scale properly (#764)

### Fixed in 9.2.0

+ When priority notification title is truncated, provide full title as tooltip
  (#754)
+ Fix route to newly-added version info page (#758)
+ Widgets with overlays can be removed (#760)
+ Notifications' action buttons now open in new tab (#762)

### Removed in 9.2.0

+ No longer used LoginOnLoad option removed (#753)

## 9.1.0 - 2018-04-17

### Added in 9.1.0

+ `showAllMessages` beta setting. When true disables all client-side message
  filtering. Useful for demos and testing. (#742)

### Changed in 9.1.0

+ `list-of-links` now offers tooltip with full title when it truncates any link
  title, not just those presented via `circle-button`s (#736)
+ RSS widgets now offer tooltip with full title when truncating item titles
  (#737)
+ Data urls only called when necessary (#747)

### Fixed in 9.1.0

+ `list-of-links` widgets are now `basic` widgets in the zero links edge case
  (#735)
+ `list-of-links` now `aria-label`s links, ensuring a non-truncated version of
  the link label is available to browsers (#736)

### Removed in 9.1.0

+ Support for `APP_OPTIONS.optionsTemplateURL` configuration is removed in this
  release. It had previously been documented as "deprecated" but the
  backwards-compatibility support didn't work out (#744), so in practice support
  for this feature was already removed as a breaking change for the `9.x`
  version series. (#745)

### Deprecated in 9.1.0

The `disableGroupFilteringForMessages` beta setting is deprecated. While it
still works in this release, the new `showAllMessages` beta setting is intended
to replace it. `disableGroupFilteringForMessages` will have no effect in some
future release. (#742)

## 9.0.2 - 2018-03-30

This release is to mop up some weirdness which happened with 9.0.1 and get a
clean artifact.

### Changed in 9.0.2

+ Minor CHANGELOG change
  (#731)
+ Fix positioning of frame-page title when using on-page side navigation (#738)

## 9.0.1 - 2018-03-29

BREAKING CHANGE:

This release fixes a bug in client-side filtering of `messages.json`. (#730)
Apps using this release or later will not have this bug. However, before relying
upon the previously broken group filtering in a `messages.json` shared across
multiple uPortal App Framework applications, all participating applications
would need to be upgraded to this version or later to avoid showing messages to
audiences for whom they may not have been intended.

### Added in 9.0.1

+ Adds resetters to user-settings page (#724)
+ `circle-button` now offers tooltip with full title when title is truncated
  (#727)

### Changed in 9.0.1

+ Out of the box example `list-of-links` widget now more self-documenting
  (#727, #729)

### Fixed in 9.0.1

+ `circle-button` no longer truncates `aria-label` representation of title
  (#727)
+ Message filtering now more precise (#730)

### Build engineering


### Documentation in 9.0.1

+ DEPRECATED: Font Awesome icons for `list-of-links` links. Use Material Icons
  instead. (#727)
+ Modest improvements to `list-of-links` widget type documentation (#727)
+ Adds glossary (#725)

## 9.0.0 - 2018-03-21

### Breaking changes

+ Removed jQuery UI sortable dependency (#721)
+ Removed `<app-header>` directive. This affects any framework apps using that
  directive outside of `<frame-page>`. `<frame-page>` usages should be
  unaffected. (#684)
+ With the removal of the `<app-header>`, the `APP_OPTIONS.optionsTemplateURL`
  config has been removed, superseded by a new `APP_OPTIONS.appMenuTemplateURL`.
  Templates may require minor layout/appearance adjustments for use in the new
  way. (#684)

To upgrade:

+ Add jQueryUI Sortable to frame app, or refer to
  [an example of angular-drag-and-drop-lists][uportal-home #795]
+ If using the "app-title" attribute on frame-page directive, that title will be
  used as the document title
+ Pages formerly using `app-header` can use the `page-title` attribute on
  `frame-page` to achieve a similar within-page `h1` heading as before.
+ Port forward `APP_OPTIONS.optionsTemplateURL` usages to
  `APP_OPTIONS.appMenuTemplateURL` usages. This content will now appear in the
  side navigation and may likely need a bit of tweaking if using a rigid
  CSS layout.

Also, this release fixes a bug in presenting mascot announcements. (#697).
Before relying upon a shared `messages.json` using the fixed mascot announcement
feature, all apps sourcing those messages will need to be upgraded to this
version or later to avoid showing users a broken mascot announcement experience.

### Added in 9.0.0

+ `mainService` now offers `computeWindowTitle(...)` (#679)
+ `<frame-page>` directive now offers `page-title` attribute to add a `<h1>`
  tag with the app icon and title to the page (#684)
+ When side navigation is open, keyboard focus will remain inside the menu and
  cycle through menu options until it's closed (#707)
+ Logs the dynamic list-of-links response in some dynamic list-of-links error
  cases (#715)
+ Core Infrastructure Initiative badge (#711)

### Changed in 9.0.0

+ `<frame-page>` sets document title per existing `app-title` attribute (#682)
+ The `show-add-to-home` attribute on the `<frame-page>` directive now displays
  a dismissible-for-session toast message prompting users to add the app to
  their home page, instead of a button. (#684)
+ `vm.showMessagesFeatures` variable moved out of default and into more
  logically appropriate spot (#694)
+ Improved appearance of add-to-home toast message (#706)

### Fixed in 9.0.0

+ External links in mascot announcements now work again. (#697)
+ "Skip to main content" link now skips more repeated navigation to reach
  closer to the main content. (#698) (#705)
+ Label widget cover dismiss button as "OK" rather than "Continue" (#675)
+ Fixed widget in-app message example (#714)

### Build engineering in 9.0.0

+ Update package lockfile with updated dependencies (#704)
+ Update stylelint to version 9.1.3 (#718)

### Documentation in 9.0.0

+ About dynamically sourcing `list-of-links` widget content (#717)

## 8.0.0 - 2018-01-08

### Breaking Changes

+ Moves the data object in messages out of the audience object and into a
  separate object. This will affect installations that have configured a
  messages.json file. (#649)
+ Removes a route formerly used to catch a localStorage error (#643)

+ To upgrade:
  + If your app's main.js file uses the `'/sorry-safari'` route, remove it
  + Also remove the corresponding url-pattern from your app's web.xml file

When upgrading a shared `messages.json` to use this new structure, all apps
sourcing that shared `messages.json` will need to be upgraded to this version
or later of the framework, in a coordinated manner.

Also, this release adds other features for sourcing some message content via
additional dynamic callback rather than statically in `messages.json`. Before
relying upon these features all apps sourcing a shared `messages.json` will
need to be upgraded to this version or later.

This release also fixes message filtering by date. Before relying upon this
feature all apps participating in a shared `messages.json` will need upgraded
to this release or later to avoid the not-yet-upgraded apps displaying premature
or expired messages.

### Added in 8.0.0

+ track clicks on sidenav footer links (#642)
+ add documentation clarifying major upgrades (#647)
+ add the ability to set message title via an external data source (#649)
+ add the ability to set a message more info button url via an external data
  source (#649)

### Changed in 8.0.0

+ update documentation to read more and state intent more clearly (#632)
+ update to latest version (2.0) of karma (#652)

### Fixed in 8.0.0

+ synch priority header with bell (#638)
+ filter messages where today is outside of start and end dates (#639)
+ allow priority notification buttons to display full button text (#640)
+ catch localStorage error with IE (#643)
+ implemented filter messages by date (#650)

### Build engineering in 8.0.0

+ add documentation stating intent to use Conventional commits and tips on how
  to comply (#634)
+ leverage commitlint travis helper (#621)
+ update to latest version (6.0.0) of lint-staged (#631)
+ move some git commit hooks to be optionally installed (#635)
+ suppress `eslint` on `docs/` when linting staged changes (#636)
+ require npm 5.6.0 or higher (#644)
+ resolved appveyor require.js flakiness (#645)

## 7.0.0 - 2017-11-30

### BREAKING CHANGES

Updates to the side navigation feature in this release introduce a hard
dependency on the `<frame-page>` directive for unbroken menu experience (#588).

**If upgrading from 6.1.0**
and the application already configures side navigation (by setting values for
either `appMenuTemplateURL` or `appMenuItems` in `override.js`), every main
view in the app must use the `<frame-page>` directive as its outermost container
element. Applications that have not previously configured side navigation and
do not begin using side navigation with this upgrade should not be affected by
this change.

There are also CSS changes to the layout container elements that precede the
`<ng-view>` element (where the app's on-page content is pulled in) to prefer a
flex-based layout (#588).

This may affect an application if:

+ It has a lot of elements with a defined `min-width` property
+ It is already using flex positioning but is not using `flex-wrap` on
  containers with a lot of content
+ It has many elements with `position: absolute` (may experience a minor

Examples of the kinds of downstream changes required:

+ uPortal-home [change to use `<frame-page>` in some views][uportal-home #739]
  and [in the rest of the views][uportal-home #742]
+ uPortal-home had to further adjust [to accommodate flex-based
  layout][uportal-home #747]
+ uPortal-home [updated the app directory entry details page with plain
  CSS][uportal-home #750] to cope with this change

Also, this release adds support for dynamic notification text sourced from a
JSON web service (#601). Before relying upon this feature in a shared
`messages.json` all participating apps must be first upgraded to use this
framework version or later, otherwise they will not reflect the new dynamic
notification content.

### Features in 7.0.0

+ Add on-page side navigation feature (#588) + To use: Set
  `APP_OPTIONS.enablePushContentMenu` to true in your override.js file
+ Add more Google Analytics around notifications (#598). Events for + rendering
  priority (banner across the top) notification + dismissing priority
  notification + rendering notification by opening the bell menu + clicks on
  mobile side-nav notification bell, with and without priority
  indicator + dismissing notification from the bell menu + dismissing or
  restoring notification from notifications page
+ Support dynamic notification text sourced from JSON web service (#601)

### Fixed in 7.0.0

+ Improves top bar accessibility (#594)
+ Fix the `search-with-links` widget type (#585)
+ Fix footer link style to avoid off-by-one-pixel misalignment (#586)
+ Fix separator character between footer links (#587, #590)
+ Clarify safety of `/settings` tooling to reset in-browser state. (#600)
+ Fix notification rendering robustness against duplicate ids (#602, #603)

### Refactor in 7.0.0

+ Use `moment.js` in `time-sensitive-content` widget type (#593)

### Build engineering in 7.0.0

+ Now runs `commitlint` on `travis-ci`, removing `precommit` hook that
  previously verified commit messages locally. (#581)
+ Now sets Java 8 rather than 7 as source and target version (#591)

Note that this project only incidentally uses Java and Maven. In the future
this front-end product may not use Java at all. (Server-side services uPortal
app framework relies upon might still use Java, of course.)

### Code style in 7.0.0

+ Fix a bunch of JSDoc warnings (#598)

## 6.1.0 - 2017-10-18

### Added in 6.1.0

+ Add filter to determine rel attribute on anchors (#569)
+ Add configurable side navigation (#561) - See
  [uportal-app-framework documentation][sidenav-documentation] of this new
  feature

### Changed in 6.1.0

+ Refactor theme names (#568)
+ Update to version 4.2.0 of config-angular (#578)
+ Pull UI Sortable from CDN (#579)

### Fixed in 6.1.0

+ Fix mismatch in portal theme key (#570)
+ Hides notification bell when on notification page (#572)
+ Update release documentation (#557)
+ Fix app hangs when promise returns undefined (#575)
+ Fix bug where notification bell still showed on notification page (#576)
+ Add error message when notifications fail (#577)
+ Fix spacing error if no configurable side navigation is used (#583)
+ Allow unbroken experience when opting-out of portal-wide notifications (#611)
+ Fix accessibility bug where screen reader/keyboard navigation couldn't access
  notifications/announcements (#613)
+ Clarify that side navigation subheader is not a link (#617)

## 6.0.3 - 2017-09-29

+ fix(messages): return nothing on filter fail (#554)

## 6.0.2 - 2017-09-29

BREAKING CHANGE: This release fixes priority notifications (#553). Before
relying upon fixed notifications in a shared messages source, all participating
apps must first be upgraded to this release or later to avoid improperly bound
URLs in priority notifications as presented in not-yet-upgraded apps.

+ Properly bind URLs in priority notifications (#553)
+ Eliminate gap between top bar on mobile (#552)
+ Add Google Analytics events to notifications (#550)
+ renaming angularjs-portal to uportal-home (#549)
+ correct references uportal app framework (#548)

## 6.0.1 - 2017-09-25

+ Cleaning up project name relics (#538, #539, #540, #541, #542)
+ Fix typo in time-sensitive widget (#537)

## 6.0.0 - 2017-09-22

+ Renaming project to uportal-app-framework

## 5.2.1 - 2017-09-21

+ Add time-sensitive-content widget type (#524)

## 5.2.0 - 2017-09-20

### Messages Enhancements in 5.2.0

+ Notifications may be non-dismissible (#521)
+ Add widget from mascot announcement (#526)

### Widget Enhancements in 5.2.0

+ Option-link widget evaluates target (#519)

### Configuration Change in 5.2.0

+ Default menu options to be null (#514)

### Maintenance in 5.2.0

+ Shore up licencing (#515) (#523) (#527)
+ Add a changelog (#513)
+ Release using Conventional Commits (#516)

## 5.1.0 - 2017-09-01

BREAKING CHANGES: This release adds a feature to mascot announcements for adding
a widget to home directly from the announcement. Before relying upon this
feature in a shared messages source, all participating applications must first
be upgraded to this framework version or later to avoid displaying broken
announcements in not-yet-upgraded applications.

### Messages Enhancements in 5.1.0

+ Adds actionbutton and more info button to features page and priority
  notifications (#504)
+ Adds 'addToHome' functionality directly from mascot announcement (#506)
  (#512)
+ Fixes bug with notification urls not being resolved correctly (#507)

### Code Maintenance and Enhancements in 5.1.0

+ Updates karma to latest version (#511)
+ Adopts Conventional Commits (#487)
+ Adds additional project status badges (#510)

## 5.0.0 - 2017-08-24

Version 5.0.0 of uPortal-App-Framework consists of 67 pull requests over more
than three months of work.

The major change featured in this release is the consolidation of notifications,
features, and announcements into the messages data model.
[Documentation for creating messages can be found here.](http://uportal-project.github.io/uportal-app-framework/messaging-implementation.html)

This release also features a new Action Items widget type, and added
functionality to the List of Links widget type. We've added support for a
generic uPortal theme, various usability enhancements, and the start of a more
personalized avatar space.

We've updated our documentation to keep up with our changes as well as welcomed
@ChristianMurphy as a new Committer. Christian has been instrumental in
upgrading our Continuous Integration process as well as adding a new Dependency
Management service to our repository.

While we're proud of what we've accomplished in this major release, we hope to
return to a faster paced release cycle in the future.

### Major Enhancements in 5.0.0

#### Messages!

+ [Simplify disparate forms of in-app messaging](https://github.com/uPortal-Project/uportal-app-framework/pull/484)

### Minor Enhancements in 5.0.0

#### Widget Types

+ [Action Items widget type](https://github.com/uPortal-Project/uportal-app-framework/pull/465)
+ [Add URL capability to list of links type](https://github.com/uPortal-Project/uportal-app-framework/pull/473)

#### UI Enhancements

+ [Add tooltips to header buttons a la Google apps](https://github.com/uPortal-Project/uportal-app-framework/pull/445)
+ [Improve usability for screen readers](https://github.com/uPortal-Project/uportal-app-framework/pull/448)
+ [Frame works withu portal master](https://github.com/uPortal-Project/uportal-app-framework/pull/451)
+ [Improve mascot announcements](https://github.com/uPortal-Project/uportal-app-framework/pull/456)
+ [Notifications](https://github.com/uPortal-Project/uportal-app-framework/pull/458)
+ [Improve appearance of features page](https://github.com/uPortal-Project/uportal-app-framework/pull/459)
+ [Show number of notifications/announcements in see all link](https://github.com/uPortal-Project/uportal-app-framework/pull/460)
+ [Opt out av](https://github.com/uPortal-Project/uportal-app-framework/pull/469)
+ [Display campus ID in username menu](https://github.com/uPortal-Project/uportal-app-framework/pull/470)
+ [Refactor app-header options](https://github.com/uPortal-Project/uportal-app-framework/pull/490)
+ [Speed up notifications bell (and other improvements)](https://github.com/uPortal-Project/uportal-app-framework/pull/502)

#### Configuration Changes

+ [pulling string into configuration](https://github.com/uPortal-Project/uportal-app-framework/pull/443)
+ [Enables notifications to work in static frame](https://github.com/uPortal-Project/uportal-app-framework/pull/453)
+ [Sets uPortal default theme as default](https://github.com/uPortal-Project/uportal-app-framework/pull/466)
+ [Uses aries proxy](https://github.com/uPortal-Project/uportal-app-framework/pull/475)
+ [MUMUP-2699 Adds ability for portal skin switching](https://github.com/uPortal-Project/uportal-app-framework/pull/483)
+ [MUMUP-2990 Use portal session rather than Shibboleth](https://github.com/uPortal-Project/uportal-app-framework/pull/491)

### Patch Enhancements in 5.0.0

#### Content Changes

+ [making the widget init function accessible via scope](https://github.com/uPortal-Project/uportal-app-framework/pull/444)
+ [Use sentence case in tooltips.](https://github.com/uPortal-Project/uportal-app-framework/pull/446)
+ [Animate priority notifications [nice-to-have]](https://github.com/uPortal-Project/uportal-app-framework/pull/499)

#### Documentation Improvements in 5.0.0

+ [Documentation Syntax Highlighting](https://github.com/uPortal-Project/uportal-app-framework/pull/431)
+ [Adds skinning exercise to docs folder](https://github.com/uPortal-Project/uportal-app-framework/pull/447)
+ [Fixes skinning.md lint errors](https://github.com/uPortal-Project/uportal-app-framework/pull/449)
+ [Expands the quickstart link text from the main README](https://github.com/uPortal-Project/uportal-app-framework/pull/452)
+ [Adds a notification user exercise](https://github.com/uPortal-Project/uportal-app-framework/pull/454)
+ [Adds a feature exercise](https://github.com/uPortal-Project/uportal-app-framework/pull/455)
+ [Acknowledge Apereo Welcoming Policy](https://github.com/uPortal-Project/uportal-app-framework/pull/461)
+ [Add Christian Murphy as committer](https://github.com/uPortal-Project/uportal-app-framework/pull/464)
+ [Move widget documentation from uportal-home](https://github.com/uPortal-Project/uportal-app-framework/pull/471)
+ [MUMUP-2932 Adds missing png files to docs](https://github.com/uPortal-Project/uportal-app-framework/pull/476)
+ [Remove Manifest group reference](https://github.com/uPortal-Project/uportal-app-framework/pull/477)
+ [Guide towards sentence case](https://github.com/uPortal-Project/uportal-app-framework/pull/478)
+ [docs(github): Add SUPPORT.md to guide questions to the mailing list](https://github.com/uPortal-Project/uportal-app-framework/pull/479)
+ [Acknowledge bundled dependencies and add NOTICE file](https://github.com/uPortal-Project/uportal-app-framework/pull/489)

#### Bug Fixes in 5.0.0

+ [Fix md-menu forcing scroll when priority notifications visible](https://github.com/uPortal-Project/uportal-app-framework/pull/428)
+ [Portal feature service flatten nested promises](https://github.com/uPortal-Project/uportal-app-framework/pull/438)
+ [fixing errors and not returning reasons](https://github.com/uPortal-Project/uportal-app-framework/pull/442)
+ [Announcement bug fix](https://github.com/uPortal-Project/uportal-app-framework/pull/450)
+ [Reverts groups url back to previous default state](https://github.com/uPortal-Project/uportal-app-framework/pull/457)
+ [error checking weather data response](https://github.com/uPortal-Project/uportal-app-framework/pull/468)
+ [using css for action-items, md-colors didn't work well with themes](https://github.com/uPortal-Project/uportal-app-framework/pull/472)
+ [Lower z-index of maintenance mode overlay](https://github.com/uPortal-Project/uportal-app-framework/pull/482)
+ [Fix sticky priority notifications](https://github.com/uPortal-Project/uportal-app-framework/pull/496)
+ [Fix dismiss/restore message state not persisting](https://github.com/uPortal-Project/uportal-app-framework/pull/497)
+ [upping the expiration on the mock session to be 8 hours](https://github.com/uPortal-Project/uportal-app-framework/pull/501)

#### Dependency Management in 5.0.0

+ [Remove less-1.6.2.js from source](https://github.com/uPortal-Project/uportal-app-framework/pull/439)
+ [Update dependencies to enable Greenkeeper](https://github.com/uPortal-Project/uportal-app-framework/pull/474)
+ [fix: Use only 4.1.x version of superstatic not 4.x](https://github.com/uPortal-Project/uportal-app-framework/pull/493)
+ [Update superstatic to the latest version](https://github.com/uPortal-Project/uportal-app-framework/pull/498)
+ [Update remark-validate-links to the latest version](https://github.com/uPortal-Project/uportal-app-framework/pull/500)

#### Continuous Integration in 5.0.0

+ [Fixing trivial ESLint checks](https://github.com/uPortal-Project/uportal-app-framework/pull/429)
+ [ESLint Refactor Integration](https://github.com/uPortal-Project/uportal-app-framework/pull/430)
+ [Eslint promise rule fixes](https://github.com/uPortal-Project/uportal-app-framework/pull/432)
+ [fixing eslint angular/typecheck rules](https://github.com/uPortal-Project/uportal-app-framework/pull/434)
+ [ESLint fix angular/no-private-call](https://github.com/uPortal-Project/uportal-app-framework/pull/435)
+ [ESLint angular/module rules](https://github.com/uPortal-Project/uportal-app-framework/pull/436)
+ [fixing eslint max-len](https://github.com/uPortal-Project/uportal-app-framework/pull/440)
+ [Test on headless Chrome](https://github.com/uPortal-Project/uportal-app-framework/pull/462)
+ [Add macOS environment to Travis CI](https://github.com/uPortal-Project/uportal-app-framework/pull/463)
+ [fix(ci): Update Travis CI script so greenkeeper works with the lockfile](https://github.com/uPortal-Project/uportal-app-framework/pull/480)
+ [style(less): Add Stylelint](https://github.com/uPortal-Project/uportal-app-framework/pull/485)
+ [style(md): Add Remarklint](https://github.com/uPortal-Project/uportal-app-framework/pull/486)

## 4.1.0 - 2017-05-04

### Code Cleanup in 4.1.0

[Removes unused sorting function](https://github.com/uPortal-Project/uportal-app-framework/pull/399)
[Adds local Jekyll files to gitignore](https://github.com/uPortal-Project/uportal-app-framework/pull/405)
[Replaces hard coded fa-icons with material icon equivalents](https://github.com/uPortal-Project/uportal-app-framework/pull/426)

### CI Enhancements in 4.1.0

[Tests against multiple jdks, improve build time](https://github.com/uPortal-Project/uportal-app-framework/pull/400)
[Tests against Windows OS](https://github.com/uPortal-Project/uportal-app-framework/pull/408)
[Fixes bug where local build wasn't working](https://github.com/uPortal-Project/uportal-app-framework/pull/421)

### Widget Enhancements in 4.1.0

[Fixes RSS widget display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/403)
[Fixes RSS widget display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/406)
[Fixes RSS widget date display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/409)
[Enables use of Material Icons for widgets](https://github.com/uPortal-Project/uportal-app-framework/pull/410)
[Standardizes launch button code and text across all widgets](https://github.com/uPortal-Project/uportal-app-framework/pull/411)
[Adds display error message when users try to render an unauthorized widget](https://github.com/uPortal-Project/uportal-app-framework/pull/419)
[Fixes display bug with error message for unauthorized widget](https://github.com/uPortal-Project/uportal-app-framework/pull/420)

### Apereo Incubation in 4.1.0

[Formally bootstraps initial committers](https://github.com/uPortal-Project/uportal-app-framework/pull/404)
[Acknowledges contributors](https://github.com/uPortal-Project/uportal-app-framework/pull/412)
[Formalizes release procedures](https://github.com/uPortal-Project/uportal-app-framework/pull/416)

### Header Enhancements in 4.1.0

[Replaces UW-Madison crest with higher resolution crest](https://github.com/uPortal-Project/uportal-app-framework/pull/413)
[Replaces name with an avatar](https://github.com/uPortal-Project/uportal-app-framework/pull/414)
[Fixes image display bug caused in](https://github.com/uPortal-Project/uportal-app-framework/pull/415)
[Fixes theme logo display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/417)
[Fixes display bug where drop down user menu covered user's avatar](https://github.com/uPortal-Project/uportal-app-framework/pull/422)
[Fixes display bug in user drop down menu](https://github.com/uPortal-Project/uportal-app-framework/pull/425)

## 4.0.3 - 2017-04-13

[Fixes a bug where rss widgets would always show an error](https://github.com/uPortal-Project/uportal-app-framework/pull/397)

## 4.0.2 - 2017-04-13

Bug fixes for a specific widget (leave balances) #395 #394

## 4.0.1 - 2017-04-13

This release has some code cleanup and some bug fixes. Upgrade from [v4.0.0](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.0.0) by only updating the dependency version.

[Cleans up the old beta header announcement](https://github.com/uPortal-Project/uportal-app-framework/pull/388/files). The hard coded announcement was before the feature of priority notifications.
[Ensures consistent behavior on hover](https://github.com/uPortal-Project/uportal-app-framework/pull/390)
[Ensures consistent link launch behavior in widgets](https://github.com/uPortal-Project/uportal-app-framework/pull/391)
[Fixes bug where icons weren't showing when using the widget directive](https://github.com/uPortal-Project/uportal-app-framework/pull/393)

## 4.0.0 - 2017-04-05

This release adds a widget directive to the app-framework, adds personalized
notifications, progresses [Apereo](https://www.apereo.org/)
[Incubation](https://www.apereo.org/incubation), and fixes a help url bug.

[Guides Contributors to Apereo CLA compliance](https://github.com/uPortal-Project/uportal-app-framework/pull/381)
[Changes help url for uw-system schools](https://github.com/uPortal-Project/uportal-app-framework/pull/382)
[Allows widgets to be embedded in frame apps](https://github.com/uPortal-Project/uportal-app-framework/pull/385)
[Adds widget directive documentation](https://github.com/uPortal-Project/uportal-app-framework/pull/384)
[Adds personalized notifications](https://github.com/uPortal-Project/uportal-app-framework/pull/386)
[Fixes bug in personalized notifications](https://github.com/uPortal-Project/uportal-app-framework/pull/387)

### How to Upgrade from version 3.X

+ Change dependency to version 4.0.0
+ For upgrading application consuming notifications programmatically: the
  [notification service api changed from `getNotificationsByGroups` to `getFilteredNotifications`](https://github.com/uPortal-Project/uportal-app-framework/pull/386/files#diff-9a244329b1c0f99008f0fb506d3b9c64L159). This will not be a concern for most (if not all) applications.
+ If the app had previously named services and directives with the word "widget"
  in the name, naming conflicts may arise due to the new Widget directives and
  services being added. [See the code for more details](https://github.com/uPortal-Project/uportal-app-framework/pull/385/files).
  This will not be a concern for most applications.

## 3.1.4 - 2017-03-20

Fixes a bug where text in a static portlet was hard to read (#380)

## 3.1.3 - 2017-03-09

Adds back in UW-Lacrosse theming

## 3.1.2 - 2017-03-09 \[Yanked]

Unreleased due to issues pushing to Maven Central.

## 3.1.1 - 2017-03-02

Increases Notification documentation #375
Adds more documentation about best practices for notifications #376
Adjusts link colors for themes #377

## 3.1.0 - 2017-02-21

### Uses GitHub Pages

[Adopts GitHub pages](https://github.com/uPortal-Project/uportal-app-framework/pull/361)
[Fixes documentation bugs](https://github.com/uPortal-Project/uportal-app-framework/pull/363)
[Normalizes headings in releasing.md](https://github.com/uPortal-Project/uportal-app-framework/pull/364)
[Continues documentation cleanup](https://github.com/uPortal-Project/uportal-app-framework/pull/366)
[Normalizes Jekyll theme to match uportal-home Jekyll Theme](https://github.com/uPortal-Project/uportal-app-framework/pull/368)
[Fixes documentation link bugs](https://github.com/uPortal-Project/uportal-app-framework/pull/369)

### Continue support of Windows build environments

[Adds Windows build support](https://github.com/uPortal-Project/uportal-app-framework/pull/360)
[Adds font-awesome into the Windows build](https://github.com/uPortal-Project/uportal-app-framework/pull/370)

### Removal of UW specific wording

[Removes hardcoding of UW instances](https://github.com/uPortal-Project/uportal-app-framework/pull/372)
[Removes the assumption that all helpdesks are in DoIT](https://github.com/uPortal-Project/uportal-app-framework/pull/374)

### Misc

[Modernize License declarations](https://github.com/uPortal-Project/uportal-app-framework/pull/365)
[Fixes launch button shadowing bug](https://github.com/uPortal-Project/uportal-app-framework/pull/362)
[Adds codeclimate badges](https://github.com/uPortal-Project/uportal-app-framework/pull/359)
[Adds dependenci badges](https://github.com/uPortal-Project/uportal-app-framework/pull/358)

## 3.0.3 - 2016-12-20

Patch release. Simply bump the app's dependency declaration from `uw-frame`
`3.0.2` to `3.0.3` to adopt this release.

+ Fixes Google Analytics usage ( #353 )
+ Documents source code whitespace conventions ( #356 )
+ Improves [documentation about releasing `uw-frame` itself](http://uportal-project.github.io/uportal-app-framework/v3.0.3/#/md/releasing)
  ( #355 )

See also

+ [the 3.0.3 milestone](https://github.com/uPortal-Project/uportal-app-framework/milestone/9?closed=1).
+ [release announcement](https://groups.google.com/forum/#!topic/myuw-developers/evV8Ie3AhfQ).

## 3.0.2 - 2016-12-14

Patch release. Trivial upgrade from `v3.0.1` (or even `v3.0.0`).

+ Username menu items are no longer redundantly duplicatively labeled ( #351 )
+ Circle buttons now maintain their circular shape even when their label text
  wraps ( #352 )

Supporting links:

+ [Documentation for this version specifically](http://uportal-project.github.io/uportal-app-framework/v3.0.2/).
+ [Release announcement on myuw-developers group](https://groups.google.com/d/topic/myuw-developers/tKOWjo8r96c/discussion)

## 3.0.1 - 2016-11-28 \[YANKED]

Unreleased due to issues pushing to Maven Central.

## 3.0.0 - 2016-11-28

### Major Version Upgrade

+ Upgrade angular-ui-bootstrap and angular libraries (#350) from 0.13.4 to 2.2.0

The `angular-ui-bootstrap` upgrade moves up 2 major versions and does
break compatibility with some older components. If the app used any
`angular-ui-bootstrap` components, it will need to begin prefixing them with
`uib-`. See `angular-ui-bootstrap` [Migration Guide for Prefixes](https://github.com/angular-ui/bootstrap/wiki/Migration-guide-for-prefixes).

### Build changes in 3.0.0

+ Add postcss/autoprefixer to uw-frame build (#345)
+ Remove dependency on Grunt (#335)
+ Break docs submodule dependency (#337)
+ Tweaked build.js (#348)

### Material in 3.0.0

+ Upgrade uw-frame to Angular Material 1.1 (#339)

### Miscellaneous fixes in 3.0.0

+ Fix for Safari private browsing bug (#347)
+ Added ability to have a name for the default theme (#336)
+ Fixed format for announcement end date (#332)

[uportal-home #739]: https://github.com/uPortal-Project/uportal-home/pull/739
[uportal-home #742]: https://github.com/uPortal-Project/uportal-home/pull/742
[uportal-home #747]: https://github.com/uPortal-Project/uportal-home/pull/747
[uportal-home #750]: https://github.com/uPortal-Project/uportal-home/pull/750
[uportal-home #795]: https://github.com/uPortal-Project/uportal-home/pull/795
[sidenav-documentation]: http://uportal-project.github.io/uportal-app-framework/configurable-menu.html

[#876]: https://github.com/uPortal-Project/uportal-app-framework/pull/876
[#904]: https://github.com/uPortal-Project/uportal-app-framework/pull/904
[#922]: https://github.com/uPortal-Project/uportal-app-framework/pull/922
[#925]: https://github.com/uPortal-Project/uportal-app-framework/pull/925
[#927]: https://github.com/uPortal-Project/uportal-app-framework/pull/927
[#929]: https://github.com/uPortal-Project/uportal-app-framework/pull/929
[#933]: https://github.com/uPortal-Project/uportal-app-framework/pull/933
[#941]: https://github.com/uPortal-Project/uportal-app-framework/pull/941
[#951]: https://github.com/uPortal-Project/uportal-app-framework/pull/951
[#952]: https://github.com/uPortal-Project/uportal-app-framework/pull/952
[#963]: https://github.com/uPortal-Project/uportal-app-framework/pull/963
[#964]: https://github.com/uPortal-Project/uportal-app-framework/pull/964
[#967]: https://github.com/uPortal-Project/uportal-app-framework/pull/967

[myuw-banner-message-backend]: https://git.doit.wisc.edu/myuw/myuw-banner-message-backend
