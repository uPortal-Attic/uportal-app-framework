# Using MyUW widgets in applications

uportal-app-framework apps can invoke widgets from MyUW's directory of widgets.

For example, to include the Wiscard Balance widget in an app,
use the `widget` directive, like so:

```html
<widget fname="wiscard-balance"></widget>
```

`fname` is required. This is the identifier for the content.
It's in the URL when viewing an app directory entry's page on MyUW and it's
in the entity XML file defining the content.

The `widget` directive has two optional attributes.

`fail-silently` (optional, defaults to `false`): set this to `true` to tell
the directive to render no markup rather than rendering a widget in an error
state, if the referenced widget would be in an error state, e.g. because the
requesting user does not have access to the content. This is a handy way to
define a relatively static page of widgets and let the directives gracefully
degrade down to the ones that are working and available to the viewing user.
The
[MyUW search results](https://my.wisc.edu/web/apps/search/results?q=results)
"other" tab uses this feature
( [source](https://github.com/uPortal-Project/uportal-home/blob/master/web/src/main/webapp/my-app/search/partials/search-results.html#L163) ).

`include-context-menu` (optional, defaults to `true`): include the upper right
vertical dots context menu on the widget, which typically links to the widget's
page in the MyUW app directory. Set this attribute to `false` to omit this menu.
