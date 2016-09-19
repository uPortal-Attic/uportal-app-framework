Buttons in uw-frame leverage [Angular Material buttons](https://material.angularjs.org/latest/demo/button), which conform to 
Google Material design practices and come with built-in UX enhancements. Use the `<md-button>` directive to create a material button. 

#### All buttons should have the following attributes:
+ The text should be sentence-case (e.g. "Reset announcements")
+ It should include an `aria-label` attribute that describes the action for screen readers
+ It should have either an `ng-click` or `ng-href` attribute for buttons and links, respectively
+ It should include a class for the desired color palette (i.e. `md-primary`, `md-accent`, `md-warn`, or `md-default`)

#### When to use certain button types:
+ Flat: Use for links and actions that do not need to have special attention called to them
+ Raised (`md-raised`): Use for primary actions or when your chosen palette (e.g. `md-accent`) does not have sufficient contrast with 
the background color of the button's containing element
+ FAB: Due to the complexity of uw-frame applications, it is best to avoid using FAB buttons
+ Icon button (`md-icon-button): Use on small screens when the button's action can be adequately expressed by an icon

#### When to use certain color palette classes:
+ `md-primary`: Use for primary actions
+ `md-accent`: Use for flat links (*only if your theme's accent color sufficiently contrasts with the background color*) and secondary actions 
+ `md-warn`: Use when the button's action should be used cautiously
