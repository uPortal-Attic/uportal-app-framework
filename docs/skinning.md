# Skinning Your uPortal-home #

_Prerequisites:_

_A working uPortal-app-framework application._

_A code editor._

For a more in-depth discussion of theming, see https://github.com/UW-Madison-DoIT/uw-frame/blob/master/docs/theming.md

1. Locate and open the frame-config.js file in your uw-frame-components/js/ directory.

2. Increment the themeVersion in line 9. 

3.  Add your theme to the themes array as shown below:

```javascript
define(['angular'], function(angular) {
  return angular.module('frame-config', [])
    .constant('THEMES',
      {
        /*
         * THOU SHALT INCREMENT THIS VERSION NUMBER
         * IF THOU CHANGEST ANY OF THE THEMES BELOW
         */
        'themeVersion': 1,
        'themes': [
            // Add your theme here
            {
              'name': '',
              'crest': 'img/uw-madison.png',
              'title': '',
              'subtitle': null,
              'ariaLabelTitle': '',
              'crestalt': '',
              'group': 'Everyone',
              'mascotImg': 'img/robot-taco.gif',
              'footerLinks': [
                {
                  'url': 'https://www.merriam-webster.com/dictionary/help',
                  'target': '_blank',
                  'title': 'Help',
                },
              ],
              'materialTheme': {
                'primary': 'red',
                'accent': 'blue',
                'warn': 'orange',
              },
            },
        ]});
        // End of themes
        // Rest of file truncated
      });
```
   Fill in the blank values to reflect your school. 
     * name: The name value you choose will become a filename in subsequent steps. The convention is all lower-case with no spaces.  
     * title: The display name of your frame.  
     * ariaLabelTitle: The aria label of your title.   
     * crestAlt: Used to place a small bit of text (e.g. "Beta") next to your school's crest.  
     

4. In the \/uw-frame-components/css/themes directory, add a <theme-name>.less file. The theme name corresponds to the name attribute you assigned in the step above. 

   Add the following imports:

```sass
@import "../angular.less"; // note: order is important here!
@import "common-variables.less";
@import "<your-schools-name>-variables.less";

```



5. Also in the /uw-frame-components/css/themes directory, add a <theme-name>-variables.less file. Copy and paste the following code into the file. These are the colors for UW-Madison. Feel free to use a color picker, such as http://www.designskilz.com/colors to generate your own colors, and experiment with the palette.

```sass

/* MyUW-Madison colors */
@color1: #c5050c;         // Badger Red
@color2: #9b0000;         // Medium Red
@color3: #660000;         // Dark Red
@color4: #F7F5E8;         // Cream
@link-color: #0479a8;     // wisc.edu blue

@state-info-bg: #E8E4D8;   // Olive Grey
@state-info-text: #000000; // Black

@portlet-titlebar-background-color: #E7D9C1;
@portlet-border-color: #E7D9C1;

@user-portal-logout-btn-text-color: #FFF; //White

@input-border-focus: @color1;

@username-menu-color: #fff;
@username-menu-bg: lighten(@color1, 30%);

```


6. Make your theme the default:

    In uw-frame-components/js, update the override.js with the following code.
    
```javascript
define(['angular'], function(angular) {
  /* Keep in sync with docs/markdown/configuration.md*/
  return angular.module('override', [])
    .constant('OVERRIDE', {
      // Add your defaultTheme configuration here
      'APP_FLAGS': {
        'defaultTheme': '<your-theme-name>',
      },
      // End defaultTheme configuration
    });
});
```


7. In your tools/uw-frame-static/build.js file, add your theme's name to the array of themes.

8. From a command line, navigate to your uw-frame-java directory, and run 
```sass
mvn clean package
```

9. Run
```sass
 npm run static:dev
 ```
 
...and view the results on browser pointed at localhost:3474



