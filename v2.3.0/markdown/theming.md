The theming system is pretty straight forward. With minimal effort one could have there own skin in uw-frame. We extremely highly encourage you to contribute back your theme to this project so you don't have to manage an independent fork of uw-frame. Anyway, here are the steps to configure your theme:

+ Configure your entry in the `THEME` constant located in [`frame-config.js`](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/js/frame-config.js). It should look something like :

```javascript
{
  "name" : "uw-madison",
  "crest" : "img/uw-madison-52.png",
  "title" : "MyUW",
  "subtitle" : null,
  "ariaLabelTitle" : "My U W",
  "crestalt" : "UW Crest",
  "group" : "UW-Madison"
}
```
We recommend the crest image (in this example `img/uw-madison-52.png`) to be `52px` in height. Width doesn't really matter, but try to keep it under 100px for small screens.

+ Add in a <theme-name>.less file in the folder `/uw-frame-components/css/themes` that looks like this:

```less
@import "../angular.less"; //order is important here
@import "common-variables.less";
@import "uw-madison-variables.less";
```

In this example that is `uw-madison.less`. Notice I got the `uw-madison` from the name. That is important.

+ As you probably noticed above, you also will want to add in a `<theme>-variables.less` file in the same directory. This will be full of color variable declarations. Here is an example of that:

```
/* UW-Milwaukee colors */
@color1: #000000;         
@color2: lighten(@color1, 5%);
@color3: darken(@color1, 5%);
@color4: #E1DCCC;
@link-color: @color3;

@state-info-bg: #999999;   // Olive Grey
@state-info-text: #000000; // Black

@portlet-titlebar-background-color: #E7D9C1;
@portlet-border-color: #E7D9C1;

@user-portal-logout-btn-text-color: #FFF; //White

@input-border-focus: @color1;
```

`@color1` is your primary color, in uw-madison's case, this is Badger Red, but for UW-Milwaukee this is Black. Its used for the banner, primary color of buttons, etc... `@color2` is a slightly lighter. For simplicity you can just use the lighten function in less, or you can specific a specific color. This is used for various sub important things. `@color3`: This is always slightly darker than `@color1` and it is used for links.

+ The last step is setting a default theme in your `override.js`. For more information on that see the [configuration](#/md/configuration) section under `APP_FLAGS` there is a variable called `defaultTheme`.


### Testing
If you want to override your default theme just for testing or something we created an access point in the settings page. For the default frame we have that at `/settings`. There should be a drop down that has every theme listed in the `THEME` constant. Switch over and give it a whirl.

### More about multi-tenant themes
If you set `APP_FLAGS.defaultTheme` equal to `group` then on page load it will pull the list of groups your in (so make sure you set that service up), then it will try to match a group name with a theme's group variable. Case sensitive. First one found it caches that theme in session storage. On the next page refresh it checks the cache first, to avoid another group search.
