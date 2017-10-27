# AngularJS directives in uportal-app-framework

## Frame page

Frame page should be used for all pages in a uportal-app-framework application. It comes with much of the rest of the framework's skeleton built in, including the app-header and main-menu directives. You should use it as the outermost element for
each of your application's main views.

**Example page**: see `/portal/main/partials/example-page.html`

### Template:

```html
<frame-page
  app-title="Hello World"
  app-icon="school"
  app-fname="hey-world-fname"
  app-show-add-to-home="false"
  white-background="true">
  <!-- includes app-header -->
  <!-- includes main-menu -->
  <!-- includes your content via ng-transclude -->
</frame-page>
```

### Params

_See `app-header`_

### Options

* **white-background**: A boolean when set to true with give you a white background.

## App header

If you don't want to use the frame page directive, you can still utilize the app-header as you would any other directive. It should be included in all pages of your app.

There is also a directive called `app-header-two-way-bind`. This has all the same features as `app-header` except all the scope attributes are passed in via `=` instead of `@`. This provides 2 way binding for your header. Research angular directives for more details.

### Template:

```html
<app-header
  app-title="Hello World"
  app-icon="email"
  app-fname="hey-world-fname"
  app-show-add-to-home="false"
></app-header>
```

### Params:

All params are prefixed with `app-`.

* **title**: The title that will be displayed in the app header
* **icon**: The icon to use as a prefix to the app title. You can use Font Awesome (i.e. "fa-envelope") or Material Icons (i.e. "email").
* **show-add-to-home**: If set to true, will include the add-to-home directive and its controller in the app header (used for apps that are part of the portal ecosystem).
* **fname**: If provided, it will be used in the add-to-home feature. If not, it'll try to use NAMES.fname constant.

## Main menu

Makes the side navigation menu available. If you have [configured](configuration.md) either the `appMenuTemplateURL` or `appMenuItems` option, you need to include this directive on every page where you want navigation. For this reason, using the frame-page directive for all your pages is recommended.

If you really want to build things your way, you can include the main menu by placing it in HTML as a sibling of your main content container. See the [app navigation doc](configurable-menu.md) for more information about using this feature.

_**Note**: If you choose to go this route, the `enablePageLevelSidenav` experimental configuration will not work for you._

### Template:

```html
<main-menu></main-menu>
```

## Circle button

Displays a flat, circular icon-button with a fa-icon in the middle, and a title below.

### Template:

```html
<circle-button
  data-href=''
  data-target=''
  data-fa-icon=''
  data-md-icon=''
  data-disabled='false'
  data-title=''>
</circle-button>
```

#### Params:

* **href**: Where you want them to go
* **target**: Open in new window, new tab, or the same tab (i.e. "\_self", "\_blank", etc.). If no target is set, it will default to the same tab.
* **md-icon**: The material icon to use. If a material icon is specific, it will be preferred over any fa-icon specified.
* **fa-icon**: The Font Awesome icon to use. Will not be used if a md-icon is specified.
* **disabled**: Button disabled or not (can be a variable)
* **title**: (optional) Title that is displayed under the circle
* **truncLen**: (optional) Length to truncate the title

<a href='#/demo' class='docs-button'>See Demo here</a>

## Launch button

Displays a launch button for portal widgets that fits their width and visual style

### Template:

```html
<launch-button
	data-href=""
	data-target=""
	data-button-text=""
	data-aria-label="">
</launch-button>
```

### Params:

* **href**: Where you want them to go
* **target**: Open in new window, new tab, or the same window
* **button-text**: Launch app text (e.g. "Launch App," "Go to \[your site]," etc. See our
[launch-button best practices](http://uportal-project.github.io/uportal-home/latest/#/md/widget-launch-button) to
learn how to make this text useful to your users.
* **aria-label**: (optional) Text for screen readers. Use this to clarify the context of the launch button, if necessary (e.g. "Launch Time and Absence app within MyUW")

## Loading gif

Shows loading gif when the length of given array is 0 and "empty" is not set.

### Params:

+ **object**: The scope array we are watching to show/hide gif
+ **empty**: The scope boolean flag that you set if the data came back and it was empty
+ **reuse**: (optional) If set to true, it won't destroy the loading gif, just hide it

<a href='#/demo' class='docs-button'>See Demo here</a>
