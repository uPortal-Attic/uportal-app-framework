MyUW will soon make a transition from Bootstrap to Angular Material, as an implementation of Google's [Material Design](https://www.google.com/design/spec/material-design/introduction.html). The main reasons for doing this are:

+ To allow UX Designers to focus on UW-specific designs and problems rather than reinventing the wheel for simple components
+ To have a structured, unified design philosophy that works well together. The hope is that Material 'just works' for us.
+ Material gives several more complicated UI elements and features for free - animations, toasts, trainstops, etc.

This page will serve as a resource for Material documentation, and how MyUW uses it.

### Material Components in MyUW

+ **[Buttons](https://material.angularjs.org/latest/demo/button)**: Used throughout MyUW.
+ **[Cards](https://material.angularjs.org/latest/demo/card)**: Used for widgets, settings page, etc. Note there are many parts to a card, including title, media, actions, and content. Use the [official documentation](https://material.angularjs.org/latest/demo/card) to guide you.
+ **[Sidenav](https://material.angularjs.org/latest/demo/sidenav)**: For the sidebar.
+ **[Toolbar](https://material.angularjs.org/latest/demo/toolbar)**: Used for the MyUW header.
+ **[Input](https://material.angularjs.org/latest/demo/input)**: Bootstrap input components should be phased out in favor of Material input directives throughout MyUW.
+ **[Loading icon](https://material.angularjs.org/latest/demo/progressCircular)**: Use the Material Progress Circular directive for loading screens in MyUW. This can be colored according to the school.
+ **[Radio Buttons](https://material.angularjs.org/latest/demo/radioButton)**, **[Selects](https://material.angularjs.org/latest/demo/select)**, **[Checkboxes](https://material.angularjs.org/latest/demo/checkbox)**, and **[Switches](https://material.angularjs.org/latest/demo/switch)**: Material's input components are fantastic, exclusively use them throughout MyUW.

Add other Material directives that are in use in MyUW to this list.

### Theming

See [the Material Theme section in the theming documentation](#/md/theming).
