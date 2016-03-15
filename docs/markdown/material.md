### Material Design

MyUW will soon make a transition from Bootstrap to Angular Material, as an implementation of Google's [Material Design](https://www.google.com/design/spec/material-design/introduction.html). The main reasons for doing this are:

+ To allow UX Designers to focus on UW-specific designs and problems rather than reinventing the wheel for simple components
+ To have a structured, unified design philosophy that works well together. The hope is that Material 'just works' for us.
+ Material gives several more complicated UI elements and features for free - animations, toasts, trainstops, etc.

This page will serve as a resource for Material documentation, and how MyUW uses it.

#### Material Components in MyUW

+ **[Buttons](https://material.angularjs.org/latest/demo/button)**: Used throughout MyUW.
```
<md-button class="md-raised">Button</md-button>
<md-button class="md-raised md-primary">Primary</md-button>
<md-button ng-disabled="true" class="md-raised md-primary">Disabled</md-button>
<md-button class="md-raised md-warn">Warn</md-button>
```
+ **[Fab Buttons](https://material.angularjs.org/latest/demo/button)**: Used for links inside of widgets. 
```
<md-button class="md-fab md-mini md-primary" aria-label="Use Android">
  <md-icon md-svg-src="img/icons/android.svg" style="color: greenyellow;"></md-icon>
</md-button>
```
+ **[Cards](https://material.angularjs.org/latest/demo/card)**: Used for widgets, settings page, etc. Note there are many parts to a card, including title, media, actions, and content. Use the [official documentation](https://material.angularjs.org/latest/demo/card) to guide you.
+ **[Sidenav](https://material.angularjs.org/latest/demo/sidenav)**: For the sidebar.
+ **[Toolbar](https://material.angularjs.org/latest/demo/toolbar)**: Used for the MyUW header.
