# Widgets in uportal-app-framework

It's possible for uportal-app-framework apps to pull in the markup and configuration for widgets in the MyUW directory of apps.

You can experiment with widgets in the [Widget Creator][] (currently available in test tier only).

[Widget Creator]: https://test.my.wisc.edu/widget-creator

## Fetching MyUW app widget

If you're a uportal-app-framework developer and you want to include, for example, the Wiscard Balance widget in your app, you can do so by
using the `widget` directive, like so:


```html
<widget fname="wiscard-balance"></widget>
```

You **must** know the app's "`fname`" attribute to use this feature.

If you want to create a new widget to include in your frame app, follow the steps described in the [widget documentation](make-a-widget.md)
and then:

- [Contact your portal development team](mailto:uw-infra@office365.wisc.edu), OR
- See the [entities contribution guide](https://git.doit.wisc.edu/myuw-overlay/entities/blob/master/CONTRIBUTING.md) (UW-Madison only)
