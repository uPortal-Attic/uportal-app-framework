MyUW is transitioning from Bootstrap to Angular Material, as an implementation of Google's [Material Design](https://www.google.com/design/spec/material-design/introduction.html).

The main reasons for doing this are:

+ to allow UX Designers to focus on UW-specific designs and problems rather than reinventing the wheel for simple components
+ to have a structured, unified design philosophy that works well together
+ to leverage complicated UI design elements and features for free (e.g. animations, toasts, trainstops, etc.)

This page will serve as a resource for Material documentation, and how MyUW uses it.

### Material Components in MyUW

+ **[Buttons](https://material.angularjs.org/latest/demo/button)**: Used throughout MyUW.
+ **[Cards](https://material.angularjs.org/latest/demo/card)**: Used for MyUW widgets, Note there are many parts to a card, including title, media, actions, and content. Use the Angular Material documentation to guide you.
+ **[Toolbar](https://material.angularjs.org/latest/demo/toolbar)**: Used for the MyUW header.
+ **[Menu](https://material.angularjs.org/latest/demo/menu)**: Used for MyUW's username, options, and mobile menus.
+ **[Input](https://material.angularjs.org/latest/demo/input)**: Bootstrap input components are being phased out in favor of Material input directives throughout MyUW.
+ **[Loading icon](https://material.angularjs.org/latest/demo/progressCircular)**: Use the Material Progress Circular directive for loading screens in MyUW. This can be colored according to the school's material theme.
+ **[Radio Buttons](https://material.angularjs.org/latest/demo/radioButton)**, **[Selects](https://material.angularjs.org/latest/demo/select)**, **[Checkboxes](https://material.angularjs.org/latest/demo/checkbox)**, and **[Switches](https://material.angularjs.org/latest/demo/switch)**: Material's input components are fantastic and should be used throughout MyUW.

Add other Material directives that are in use in MyUW to this list.

### Theming

See [the Material Theme section in the theming documentation](theming.md).
