# Skinning Your uPortal-home #

_Prerequisites:_

_A working uPortal-app-framework application._

_A code editor._

For a more in-depth discussion of theming, see https://github.com/UW-Madison-DoIT/uw-frame/blob/master/docs/theming.md

1. Locate and open the frame-config.js file in your uw-frame-components/js/ directory.


2. Increment the themeVersion in line 9. 

3.  Add the following json to the themes array:


```
{
  'name': 'your-schools-name',
  'crest': 'img/uw-madison.png',
  'title': 'TITLE',
  'subtitle': null,
  'ariaLabelTitle': 'aria-title>',
  'crestalt': 'alt-text',
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

```
   Change the italicized values to reflect your school. The name value you choose will be a key you will use in subsequent steps. 

4. In the \/uw-frame-components/css/themes directory, add a <theme-name>.less file. The theme name corresponds to the name attribute you assigned in the step above. 

   Add the following imports:

```
@import "../angular.less"; // note: order is important here!
@import "common-variables.less";
@import "<your-schools-name>-variables.less";

```



5. Also in the /uw-frame-components/css/themes directory, add a <theme-name>-variables.less file. Copy and paste the following code into the file. These are the colors for UW-Madison. Feel free to use a color picker, such as http://www.designskilz.com/colors to generate your own colors, and experiment with the palette.

```

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
```
.value('APP_FLAGS', {
            'defaultTheme': <your-theme-name>,
                   })
```


7. In your tools/uw-frame-static/build.js file, add your theme’s name to the array of themes.

8. From a command line, navigate to your uw-frame-java directory, and run 
```
mvn clean package
```

9. Run
```
 npm run static:dev
 ```
 
 … and view the results on browser pointed at localhost:3474



