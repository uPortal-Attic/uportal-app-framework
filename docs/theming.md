# Theming

The theming system is pretty straightforward. You can have your own skin in uw-frame with minimal effort. We highly
encourage you to contribute back your theme to this project so you don't have to manage an independent fork of uw-frame.

For a step-by-step exercise in setting up a theme, see [`skinning.md`](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/docs/theming.md).

## Configuring a theme

### 1. Add an entry to the THEME constant

Configure your entry in the `THEME` constant located in [`frame-config.js`](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/js/frame-config.js).
It should look something like :

<!-- eslint-disable no-unused-vars -->
```javascript
var example = {
  'name': 'uw-madison',
  'crest': 'img/uw-madison-56.png',
  'title': 'MyUW',
  'subtitle': null,
  'ariaLabelTitle': 'My U W',
  'crestalt': 'UW Crest',
  'group': 'UW-Madison',
  'mascotImg': 'img/bucky.gif',
  'profileUrl': '/profile/emergencyInfo',
  'footerLinks': [
    {
      'url': '/web/static/myuw-help',
      'target': '_blank',
      'title': 'Help',
    },
  ],
  'materialTheme': {
    'primary': 'red',
    'accent': 'blue',
    'warn': 'orange',
  },
};
```

**Explanation of JSON Attributes**

+ `name`: The system id of the theme. Make sure its unique.
+ `crest`: The relative URL to the crest image. **Crest image recommendations:**
    - **Height**: Crest image height should be either `56px` or `112px`. Crest images will be set to a max-height of 56px via CSS, but
      images with a height of 112px will look better on high resolution displays.
    - **Width**: Ideally, your crest image should be square. In the case of crests that are wider than they are tall, the images
      should be no wider than 1.5x their height. This means the maximum dimensions of your crest image should be either `56 x 84px` or `112 x 168px`.
      Wider images will cause display problems on some screen sizes.
+ `title`: The title that will be show in the upper left.
+ `subtitle` (optional): A subtitle that is shown as subtext for the app (e.g. "beta"). Subtitles should be no longer than 15 characters.
+ `ariaLabelTitle`: The aria label put in place of the theme title
+ `crestalt`: The crest alt text. This should be the name of your frame app (i.e. "MyUW Portal").
+ `group`: Groups this app should be enabled for automatically. Not sure? Ask the MyUW dev team: <myuw-infra@office365.wisc.edu>.
+ `mascotImg` (optional): See documentation about the mascot for announcements [here](announcements.md).
+ `profileUrl` (optional): Specify a URL for a "Profile" app/page, where users can view and/or update their personal information.
+ `footerLinks`: An array of links which appear in the footer -- typically contains links to the campus help desk and feedback portal.
+ `materialTheme`: [object or string] See the *Material Theme* section below.


### 2. Add a theme.less file

Add in a `<theme-name>.less` file in the folder `/uw-frame-components/css/themes` that looks like this:

**uw-madison.less**:

```less
@import "../angular.less"; // note: order is important here!
@import "common-variables.less";
@import "uw-madison-variables.less";
```

In this example, the file name is is `uw-madison.less`. The "uw-madison" comes from the app's `name` attribute. That is important.


### 3. Add a theme-variables.less file

As you probably noticed above, you also will want to add in a `<theme>-variables.less` file in the same directory. This
will be full of color variable declarations. Here is an example of that:

```less
/* UW-Madison colors */
@color1: #c5050c;
@color2: lighten(@color1, 10%);
@color3: #0479a8;
@link-color: @color3;

@state-info-bg: #999999;
@state-info-text: #000000;

@portlet-titlebar-background-color: @color1;
@portlet-border-color: darken(@color1, 15%);

@user-portal-logout-btn-text-color: #FFF;

@input-border-focus: @color3;
```

  - `@color1` is your primary brand color. In uw-madison's case, this is Badger Red, but for UW-Milwaukee this is Black.
  - `@color2` is a slightly lighter. For simplicity you can just use the lighten function in less, or you can specify a color.
  - `@color3` is your accent color. If you're using a material theme, this should be the base (500) color of your accent palette.

### 4. Set a default theme

The last step is setting a default theme in your `override.js`. For more information on that see the [configuration](configuration.md)
section. Under `APP_FLAGS` there is a variable called `defaultTheme`.

## Material theme

Each theme can have a material theme. If it doesn't, it will use the Google default color selection for `primary`, `accent`, and `warn` palettes.
Palette information can be found on the [angular material site](https://material.angularjs.org/latest/Theming/01_introduction).
The `materialTheme` object has 3 attributes: `primary`, `accent`, and `warn`. Each attribute can be a string or an object.

If it is a string it will assume it is a pre-created palette color, and will look to [angular material](https://material.angularjs.org/latest/Theming/01_introduction)
for created palettes.

e.g.:

<!-- eslint-disable no-unused-vars -->
```javascript
var example = {
  'materialTheme': {
    'primary': 'red',
    'accent': 'blue',
    'warn': 'orange',
  },
};
```

If it is an object it will assume that it is a custom palette definition. e.g.:

<!-- eslint-disable no-unused-vars -->
```javascript
var example = {
  'materialTheme': {
    'primary': {
      '50': 'FED5D7',
      '100': 'FC8B8F',
      '200': 'FB545A',
      '300': 'F90E17',
      '400': 'E3060E',
      '500': 'C5050C', // the base color for this palette
      '600': 'A7040A',
      '700': '890308',
      '800': '6B0307',
      '900': '4E0205',
      'A100': 'FED5D7',
      'A200': 'FC8B8F',
      'A400': 'E3060E',
      'A700': '890308',
      // default text (contrast) on this palette should be light or dark
      'contrastDefaultColor': 'light',
      // hues on which text should be dark by default
      'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100', 'A200'],
      // only needed if default color is 'dark'
      'contrastLightColors': undefined,
    },
    'accent': {
      '50': 'B8E9FD',
      '100': '6DD3FC',
      '200': '36C2FA',
      '300': '05A4E4',
      '400': '058FC6',
      '500': '0479A8', // the base color for this palette
      '600': '03638A',
      '700': '034E6C',
      '800': '02384E',
      '900': '012330',
      'A100': 'B8E9FD',
      'A200': '0479A8',
      'A400': '058FC6',
      'A700': '034E6C',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
    },
    'warn': {
      '50': 'FFFFFF',
      '100': 'F9E7D7',
      '200': 'F2C9A6',
      '300': 'EAA368',
      '400': 'E6934D',
      '500': 'E28332', // the base color for this palette
      '600': 'D7731E',
      '700': 'BC651B',
      '800': 'A15717',
      '900': '874813',
      'A100': 'FFFFFF',
      'A200': 'F9E7D7',
      'A400': 'E6934D',
      'A700': 'BC651B',
      'contrastDefaultColor': 'dark',
      'contrastLightColors': ['500', '600', '700', '800', '900', 'A700'],
    },
  },
};
```

## Theme guidance

If you are defining a custom material theme, follow these guidelines when choosing the base colors of your palette:

+ Each palette should consists of hues/shades of a single base color (the '500' color). You can use a [material palette generator](https://angular-md-color.com/#/)
 to help you create palettes, or you can define them yourself.
+ Your `primary` palette should be based on your brand's primary color. For UW-Madison, this color is [c5050c](http://www.color-hex.com/color/c5050c).
	**Primary palette usage in uw-frame:**
    - Top bar background color
    - Any compatible angular material component with the "md-primary" class
+ Your `accent` palette should be based on a color that plays well with your primary color, but is distinct. For UW-Madison, this is [0479A8](http://www.color-hex.com/color/0479a8).
	**Accent palette usage in uw-frame:**
    - Some link colors
    - Any compatible angular material component with the "md-accent" class
+ Your `warn` palette should be based on a color that is complementary to your primary color, but is distinct and eye-catching.
	**Warn palette usage in uw-frame:**
    - As yet unused. Add the "md-warn" class to any compatible angular material component to use this palette

Generally, you should avoid using an excessively light or dark color as the base color for any palette. In some cases, like UW-Milwaukee's black and yellow, this is unavoidable. If you *must* use a
very light or dark color, use good judgment when selecting whether to use it for the primary palette or accent palette. In UW-Milwaukee's case, it is better to use black as the
primary color and yellow (which is used sparingly) as the accent color.

## Testing

If you want to override your default theme just for testing or something we created an access point in the settings page.
For the default frame we have that at `/settings`. There should be a drop down that has every theme listed in the `THEME`
constant. Switch over and give it a whirl.

## More about multi-tenant themes

If you set `APP_FLAGS.defaultTheme` equal to `group` then on page load it will pull the list of groups your in (so make
sure you set that service up), then it will try to match a group name with a theme's group variable. Case sensitive. First
one found it caches that theme in session storage. On the next page refresh it checks the cache first, to avoid another group search.
