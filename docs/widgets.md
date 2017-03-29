# Widgets in uw-frame

It's possible for uw-frame apps to pull in the markup and configuration for widgets in the MyUW "marketplace" of apps.

For information about widget types and how to create new widgets, see angularjs-portal's [widget documentation][].

You can experiment with widgets in the [Widget Creator][].

[Widget Creator]: https://public.my.wisc.edu/web/widget-creator
[widget documentation]: http://uw-madison-doit.github.io/angularjs-portal/widgets.html

## Fetching MyUW app widget

If you're a uw-frame developer and you want to include, for example, the Wiscard Balance widget in your app, you can do so by
using the `widget` directive, like so:


```html
<widget fname="wiscard-balance"></widget>
```

You **must** know the app's "`fname`" attribute to use this feature.

If you want to create a new widget to include in your frame app, follow the steps described in [widget documentation][]
and then:

- [Contact your portal development team](mailto:uw-infra@office365.wisc.edu), OR
- See the [entities contribution guide](https://git.doit.wisc.edu/myuw-overlay/entities/blob/master/CONTRIBUTING.md) (UW-Madison only)
