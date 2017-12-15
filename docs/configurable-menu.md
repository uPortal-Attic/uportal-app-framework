# Main Menu

uPortal-app-framework applications can use the configurable side navigation for
in-app navigation and app-wide functionality.

Users open the main menu using the hamburger icon in the top left corner of the
app. On medium and large screens, the menu includes only the content configured
for this specific application. On mobile, the menu includes a top bar with
portal-wide components like the notifications bell, username menu, and new
features button.

Applications that do not configure the menu will not display the hamburger icon
and side navigation and will display the portal-wide content in the top bar on
small screens.

Basic configuration occurs in `override.js`. See the [configuration
doc](configuration.md) for an example.

**Important:** Side navigation depends on the `<frame-page>` directive. Use the
`<frame-page>` directive as the outermost containing element for app view(s).
See the [frame-page partial][] to understand how this is constructed.

## How to use

Two levels of complexity are available for configuring the menu contents.

1. [Simple](#simple-configuration): Menu options with a text label, a url,
and an optional material icon (i.e. basic links)
2. [Custom template](#custom-menu-template): Varied menu options, some of which
may be tied to an angular controller and affect functionality of the app (e.g.
a theme-switching toggle)

Thirdly, there is an _**experimental**_ [push-content
feature](#push-content-navigation) to default the side navigation to open upon
page load and appear as part of the page content. The side nav will push
content when opened and give up the space when closed.

## Simple configuration

In `override.js` file, add an array of menu item objects to the
**appMenuItems** attribute using this format.

```js
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
});
```

#### Explanation of attributes

- **appMenuItems**: An array of menu item objects. This is where the app will look to fill in the menu items.
- **label**: The text displayed for this menu item.
- **icon**: _(optional)_ An material icon to enhance the appearance and context of the menu item. See [material icons](https://material.io/icons/) to see the icons available.
- **url**: The value that should be in the `href` attribute for this menu item.

When both the complex and simple configuration approaches are present, the
complex configuration controls.


## Custom menu template

1. Create an HTML template for the menu items somewhere in the project
2. Add the path to that template as the value to the **appMenuTemplateURL** key in `override.js`
3. Hook up a custom `ng-controller` or whatever other functionality the menu should actuate

Example `override.js` file:

```js
.constant('OVERRIDE', {
  'APP_OPTIONS': {
    'appMenuTemplateURL': '/your-app/menu/menu-items.html'
  },
});
```

#### Best practices

The HTML from the template will be injected into a `<md-menu-content>` element
from the AngularJS Material library. Therefore, follow the [AngularJS Material
guidelines][] for constructing an `md-menu`.

Specifically, the hierarchy of menu items in the custom template should look
like this:

```html
<md-menu-item>
  <md-button>
    <!-- button text -->
  </md-button>
</md-menu-item>
```

This will ensure that menu items look great and perform consistently.

Additionally, each of the buttons should call `vm.closeMainMenu()` on click (in
addition to anything else those buttons do on click). This function looks to
the parent controller within uPortal-app-framework and closes the menu when the
item is clicked.
This means that any Angular controller connected to menu items should not use
`vm` if using angular's `controllerAs` syntax.

Alternatively, access the `closeMainMenu()` function in the custom controller
by calling `$scope.$parent.closeMainMenu()`.

This is the easiest way to configure the menu to ensure it behaves consistently
with other frame apps.

Menu content presentation is customizable with custom CSS, but introducing
custom CSS will add friction on upgrades in porting forward that custom CSS.


**Full example menu template:**

```html
<div ng-controller="MyCustomController as customCtrl">
  <md-menu-item ng-repeat="item in customCtrl.menuItems">
    <md-button ng-href="{{ item.url }}" ng-click="item.onClick();vm.closeMainMenu();">
      {{ item.buttonText }}
    </md-button>
  </md-menu-item>
</div>
```

## Push content navigation

[![push content navigation example](./img/push-content-nav.png)](img/push-content-nav.png)

1. In `override.js`, set **APP_OPTIONS.enablePushContent** to true
2. Use the `<frame-page>` directive as the outermost containing element for
app view(s). See the [frame-page partial][] to understand how this is
constructed.
3. Be aware that the content within `<frame-page>` is a child of
flex-positioned HTML elements. Custom CSS may be needed to nuance the way this
content presents.
4. Be aware that this is an experimental feature. Please raise [issue
reports](https://github.com/uPortal-Project/uportal-app-framework/issues) as
you encounter problems.

Example `override.js` file:

```js
.constant('OVERRIDE', {
  'APP_OPTIONS': {
    'appMenuTemplateURL': '/your-app/menu/menu-items.html'
    'enablePushContent': true
  },
});
```

[frame-page partial]: https://github.com/uPortal-Project/uportal-app-framework/blob/master/components/portal/misc/partials/frame-page.html
[AngularJS Material guidelines]: https://material.angularjs.org/latest/demo/menu
