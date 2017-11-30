# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][] (7.0.0?)

### BREAKING CHANGES

Updates to the side navigation feature in this release introduce a hard
dependency on the `<frame-page>` directive for unbroken menu experience (#588).
**If you're upgrading from 6.1.0**
and you have already configured side navigation (by setting values for either
`appMenuTemplateURL` or `appMenuItems` in your override.js file), you will need
to ensure that every main
view in your app uses the `<frame-page>` directive as its outermost container
element. If you don't want to use the side navigation and you have not
previously configured side navigation,
you should not be affected by this change.

There are also CSS changes to the layout container elements that precede the
`<ng-view>` element (where your app's on-page content is pulled in) to prefer a
flex-based layout (#588).
This may affect you if:

+ You have a lot of elements that have a defined `min-width` property
+ You're already using flex positioning but are not using `flex-wrap` on
containers with a lot of content
+ You have many elements with `position: absolute` (may experience a minor
shift in placement)

Examples of the kinds of downstream changes required:

+ uPortal-home [change to use `<frame-page>` in some views][uPortal-home #739]
and [in the rest of the views][uPortal-home #742]
+ uPortal-home had to further adjust [to accommodate flex-based
layout][uPortal-home #747]
+ uPortal-home [updated the app directory entry details page with plain
CSS][uPortal-home #750] to cope with this change

### Features

+ Add on-page side navigation feature (#588)
    + To use: Set `APP_OPTIONS.enablePushContentMenu` to true in your
override.js file
+ Add more Google Analytics around notifications (#598). Events for
    + rendering priority (banner across the top) notification
    + dismissing priority notification
    + rendering notification by opening the bell menu
    + clicks on mobile side-nav notification bell, with and without priority
indicator
    + dismissing notification from the bell menu
    + dismissing or restoring notification from notifications page
+ Support dynamic notification text sourced from JSON web service (#601)

### Fixed

+ Improves top bar accessibility (#594)
+ Fix the `search-with-links` widget type (#585)
+ Fix footer link style to avoid off-by-one-pixel misalignment (#586)
+ Fix separator character between footer links (#587, #590)
+ Clarify safety of `/settings` tooling to reset in-browser state. (#600)
+ Fix notification rendering robustness against duplicate ids (#602, #603)

### Refactor

+ Use `moment.js` in `time-sensitive-content` widget type (#593)

### Build engineering

+ Now runs `commitlint` on `travis-ci`, removing `precommit` hook that
previously verified commit messages locally. (#581)
+ Now sets Java 8 rather than 7 as source and target version (#591)

Note that this project only incidentally uses Java and Maven. In the future
this front-end product may not use Java at all. (Server-side services uPortal
app framework relies upon might still use Java, of course.)

### Code style

+ Fix a bunch of JSDoc warnings (#598)

## [6.1.0][] - 2017-10-18

### Added
+ Add filter to determine rel attribute on anchors (#569)
+ Add configurable side navigation (#561)
    - See [uportal-app-framework documentation][Sidenav-documentation] of this
new feature

### Changed
+ Refactor theme names (#568)
+ Update to version 4.2.0 of config-angular (#578)
+ Pull UI Sortable from CDN (#579)

### Fixed
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

## [6.0.3][] - 2017-09-29
+ fix(messages): return nothing on filter fail (#554)

## [6.0.2][] - 2017-09-29
+ Properly bind URLs in priority notifications (#553)
+ Eliminate gap between top bar on mobile (#552)
+ Add Google Analytics events to notifications (#550)
+ renaming angularjs-portal to uportal-home (#549)
+ correct references uportal app framework (#548)

## [6.0.1][] - 2017-09-25
+ Cleaning up project name relics (#538, #539, #540, #541, #542)
+ Fix typo in time-sensitive widget (#537)

## [6.0.0][] - 2017-09-22
+ Renaming project to uportal-app-framework

## [5.2.1][] - 2017-09-21
+ Add time-sensitive-content widget type (#524)

## [5.2.0][] - 2017-09-20

### Messages Enhancements
+ Notifications may be non-dismissible (#521)
+ Add widget from mascot announcement (#526)

### Widget Enhancements
+ Option-link widget evaluates target (#519)

### Configuration Change
+ Default menu options to be null (#514)

### Maintenance
+ Shore up licencing (#515) (#523) (#527)
+ Add a changelog (#513)
+ Release using Conventional Commits (#516)

## [5.1.0][] - 2017-09-01

### Messages Enhancements
+ Adds actionbutton and more info button to features page and priority
notifications (#504)
+ Adds 'addToHome' functionality directly from mascot announcement (#506)
(#512)
+ Fixes bug with notification urls not being resolved correctly (#507)

### Code Maintenance and Enhancements
+ Updates karma to latest version (#511)
+ Adopts Conventional Commits (#487)
+ Adds additional project status badges (#510)

## [5.0.0][] - 2017-08-24

Version 5.0.0 of uPortal-App-Framework consists of 67 pull requests over more than three months of work.

The major change featured in this release is the consolidation of notifications, features, and announcements into the messages data model.  [Documentation for creating messages can be found here.](http://uportal-project.github.io/uportal-app-framework/messaging-implementation.html)

This release also features a new Action Items widget type, and added functionality to the List of Links widget type. We've added support for a generic uPortal theme, various usability enhancements, and the start of a more personalized avatar space.

We've updated our documentation to keep up with our changes as well as welcomed @ChristianMurphy as a new Committer.  Christian has been instrumental in upgrading our Continuous Integration process as well as adding a new Dependency Management service to our repository.

While we're proud of what we've accomplished in this major release, we hope to return to a faster paced release cycle in the future.

### Major Enhancements
#### Messages!
+ [Simplify disparate forms of in-app messaging](https://github.com/uPortal-Project/uportal-app-framework/pull/484)

### Minor Enhancements
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


### Patch Enhancements
#### Content Changes
+ [making the widget init function accessible via scope](https://github.com/uPortal-Project/uportal-app-framework/pull/444)
+ [Use sentence case in tooltips.](https://github.com/uPortal-Project/uportal-app-framework/pull/446)
+ [Animate priority notifications [nice-to-have]](https://github.com/uPortal-Project/uportal-app-framework/pull/499)

#### Documentation Improvements
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

#### Bug Fixes
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

#### Dependency Management
+ [Remove less-1.6.2.js from source](https://github.com/uPortal-Project/uportal-app-framework/pull/439)
+ [Update dependencies to enable Greenkeeper](https://github.com/uPortal-Project/uportal-app-framework/pull/474)
+ [fix: Use only 4.1.x version of superstatic not 4.x](https://github.com/uPortal-Project/uportal-app-framework/pull/493)
+ [Update superstatic to the latest version](https://github.com/uPortal-Project/uportal-app-framework/pull/498)
+ [Update remark-validate-links to the latest version](https://github.com/uPortal-Project/uportal-app-framework/pull/500)

#### Continuous Integration
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

## [4.1.0][] - 2017-05-04

### Code Cleanup
[Removes unused sorting function](https://github.com/uPortal-Project/uportal-app-framework/pull/399)
[Adds local Jekyll files to gitignore](https://github.com/uPortal-Project/uportal-app-framework/pull/405)
[Replaces hard coded fa-icons with material icon equivalents](https://github.com/uPortal-Project/uportal-app-framework/pull/426)

### CI Enhancements
[Tests against multiple jdks, improve build time](https://github.com/uPortal-Project/uportal-app-framework/pull/400)
[Tests against Windows OS](https://github.com/uPortal-Project/uportal-app-framework/pull/408)
[Fixes bug where local build wasn't working](https://github.com/uPortal-Project/uportal-app-framework/pull/421)

### Widget Enhancements
[Fixes RSS widget display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/403)
[Fixes RSS widget display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/406)
[Fixes RSS widget date display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/409)
[Enables use of Material Icons for widgets](https://github.com/uPortal-Project/uportal-app-framework/pull/410)
[Standardizes launch button code and text across all widgets](https://github.com/uPortal-Project/uportal-app-framework/pull/411)
[Adds display error message when users try to render an unauthorized widget](https://github.com/uPortal-Project/uportal-app-framework/pull/419)
[Fixes display bug with error message for unauthorized widget](https://github.com/uPortal-Project/uportal-app-framework/pull/420)

### Apereo Incubation
[Formally bootstraps initial committers](https://github.com/uPortal-Project/uportal-app-framework/pull/404)
[Acknowledges contributors](https://github.com/uPortal-Project/uportal-app-framework/pull/412)
[Formalizes release procedures](https://github.com/uPortal-Project/uportal-app-framework/pull/416)

### Header Enhancements
[Replaces UW-Madison crest with higher resolution crest](https://github.com/uPortal-Project/uportal-app-framework/pull/413)
[Replaces name with an avatar](https://github.com/uPortal-Project/uportal-app-framework/pull/414)
[Fixes image display bug caused in](https://github.com/uPortal-Project/uportal-app-framework/pull/415)
[Fixes theme logo display bug](https://github.com/uPortal-Project/uportal-app-framework/pull/417)
[Fixes display bug where drop down user menu covered user's avatar](https://github.com/uPortal-Project/uportal-app-framework/pull/422)
[Fixes display bug in user drop down menu](https://github.com/uPortal-Project/uportal-app-framework/pull/425)

## [4.0.3][] - 2017-04-13

[Fixes a bug where rss widgets would always show an error](https://github.com/uPortal-Project/uportal-app-framework/pull/397)

## [4.0.2][] - 2017-04-13

Bug fixes for a specific widget (leave balances) #395 #394

## [4.0.1][] - 2017-04-13

This release has some code cleanup and some bug fixes.  Upgrade from [v4.0.0](https://github.com/uPortal-Project/uportal-app-framework/releases/tag/uw-frame-maven-4.0.0) by only updating the dependency version.

[Cleans up the old beta header announcement](https://github.com/uPortal-Project/uportal-app-framework/pull/388/files).  The hard coded announcement was before the feature of priority notifications.
[Ensures consistent behavior on hover](https://github.com/uPortal-Project/uportal-app-framework/pull/390)
[Ensures consistent link launch behavior in widgets](https://github.com/uPortal-Project/uportal-app-framework/pull/391)
[Fixes bug where icons weren't showing when using the widget directive](https://github.com/uPortal-Project/uportal-app-framework/pull/393)

## [4.0.0][] - 2017-04-05

This release adds a widget directive to the app-framework, adds personalized notifications, progresses [Apereo](https://www.apereo.org/) [Incubation](https://www.apereo.org/incubation), and fixes a help url bug.

[Guides Contributors to Apereo CLA compliance](https://github.com/uPortal-Project/uportal-app-framework/pull/381)
[Changes help url for uw-system schools](https://github.com/uPortal-Project/uportal-app-framework/pull/382)
[Allows widgets to be embedded in frame apps](https://github.com/uPortal-Project/uportal-app-framework/pull/385)
[Adds widget directive documentation](https://github.com/uPortal-Project/uportal-app-framework/pull/384)
[Adds personalized notifications](https://github.com/uPortal-Project/uportal-app-framework/pull/386)
[Fixes bug in personalized notifications](https://github.com/uPortal-Project/uportal-app-framework/pull/387)

### How to Upgrade from version 3.X
+ Change your dependency to version 4.0.0
+ If you were consuming notifications within the app, the [notification service api changed from `getNotificationsByGroups` to `getFilteredNotifications`](https://github.com/uPortal-Project/uportal-app-framework/pull/386/files#diff-9a244329b1c0f99008f0fb506d3b9c64L159).  This will not be a concern for most (if not all) applications.
+ If you had previously named services and directives in your MyUW app with the word widget in the name, you may run into some naming conflicts due to the new Widget directives and services being added.  [See the code for more details](https://github.com/uPortal-Project/uportal-app-framework/pull/385/files).  This will not be a concern for most applications.

## [3.1.4][] - 2017-03-20

Fixes a bug where text in a static portlet was hard to read (#380)

## [3.1.3][] - 2017-03-09

Adds back in UW-Lacrosse theming

## 3.1.2 - 2017-03-09 \[Yanked]

Unreleased due to issues pushing to Maven Central.

## [3.1.1][] - 2017-03-02

Increases Notification documentation #375
Adds more documentation about best practices for notifications #376
Adjusts link colors for themes #377

## [3.1.0][] - 2017-02-21

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

## [3.0.3][] - 2016-12-20

Patch release. Simply bump your app's dependency declaration from `uw-frame` `3.0.2` to `3.0.3` to adopt this release.
- Fixes Google Analytics usage ( #353 )
- Documents source code whitespace conventions ( #356 )
- Improves [documentation about releasing `uw-frame` itself](http://uportal-project.github.io/uportal-app-framework/v3.0.3/#/md/releasing) ( #355 )

See also
- [the 3.0.3 milestone](https://github.com/uPortal-Project/uportal-app-framework/milestone/9?closed=1).
- [release announcement](https://groups.google.com/forum/#!topic/myuw-developers/evV8Ie3AhfQ).

## [3.0.2][] - 2016-12-14

Patch release. Trivial upgrade from `v3.0.1` (or even `v3.0.0`).
- Username menu items are no longer redundantly duplicatively labeled ( #351 )
- Circle buttons now maintain their circular shape even when their label text wraps ( #352 )

Supporting links:
- [Documentation for this version specifically](http://uportal-project.github.io/uportal-app-framework/v3.0.2/).
- [Release announcement on myuw-developers group](https://groups.google.com/d/topic/myuw-developers/tKOWjo8r96c/discussion)

## 3.0.1 - 2016-11-28 \[YANKED]

Unreleased due to issues pushing to Maven Central.

## [3.0.0][] - 2016-11-28

### Major Version Upgrade
- Upgrade angular-ui-bootstrap and angular libraries (#350) from 0.13.4 to 2.2.0

The angular-ui-bootstrap upgrade moves up 2 major versions and does
break compatibility with some older components.  If you used any angular-ui-bootstrap components, you'll need to prefix them with "uib-".  See angular-ui-bootstrap [Migration Guide for Prefixes](https://github.com/angular-ui/bootstrap/wiki/Migration-guide-for-prefixes) for more information.

### Build changes
- Add postcss/autoprefixer to uw-frame build (#345)
- Remove dependency on Grunt (#335)
- Break docs submodule dependency (#337)
- Tweaked build.js (#348)

### Material
- Upgrade uw-frame to Angular Material 1.1 (#339)

### Miscellaneous fixes
- Fix for Safari private browsing bug (#347)
- Added ability to have a name for the default theme (#336)
- Fixed format for announcement end date (#332)

[Unreleased]: https://github.com/uPortal-Project/uportal-app-framework/compare/v6.1.0...HEAD
[6.1.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v6.0.3...v6.1.0
[6.0.3]: https://github.com/uPortal-Project/uportal-app-framework/compare/v6.0.2...v6.0.3
[6.0.2]: https://github.com/uPortal-Project/uportal-app-framework/compare/v6.0.1...v6.0.2
[6.0.1]: https://github.com/uPortal-Project/uportal-app-framework/compare/v6.0.0...v6.0.1
[6.0.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v5.2.1...v6.0.0
[5.2.1]: https://github.com/uPortal-Project/uportal-app-framework/compare/v5.2.0...v5.2.1
[5.2.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v5.1.0...v5.2.0
[5.1.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v5.0.0...v5.1.0
[5.0.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v4.1.0...v5.0.0
[4.1.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v4.0.3...v4.1.0
[4.0.3]: https://github.com/uPortal-Project/uportal-app-framework/compare/v4.0.2...v4.0.3
[4.0.2]: https://github.com/uPortal-Project/uportal-app-framework/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/uPortal-Project/uportal-app-framework/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.1.4...v4.0.0
[3.1.4]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.1.3...v3.1.4
[3.1.3]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.1.1...v3.1.3
[3.1.1]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.1.0...v3.1.1
[3.1.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.0.3...v3.1.0
[3.0.3]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.0.2...v3.0.3
[3.0.2]: https://github.com/uPortal-Project/uportal-app-framework/compare/v3.0.0...v3.0.2
[3.0.0]: https://github.com/uPortal-Project/uportal-app-framework/compare/v2.9.0...v3.0.0


[uPortal-home #739]: https://github.com/uPortal-Project/uportal-home/pull/739
[uPortal-home #742]: https://github.com/uPortal-Project/uportal-home/pull/742
[uPortal-home #747]: https://github.com/uPortal-Project/uportal-home/pull/747
[uPortal-home #750]: https://github.com/uPortal-Project/uportal-home/pull/750
[Sidenav-documentation]: http://uportal-project.github.io/uportal-app-framework/configurable-menu.html
