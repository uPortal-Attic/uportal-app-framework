### Introduction

[www.google.com/analytics](www.google.com/analytics) (GA for short) is a great (and free) way to see how many people are hitting your site. By default uw-frame disables GA. However, if you follow the config setup below, you will get reporting.

### Basic Configuration
Add in a `/js/config.js` file that will overwrite the `uw-frame-components/js/config.js`.
```javascript
var config = {
  gaID : 'UA-########-##'
}
```

### Site search
GA has a great feature called site search. It collects information about what people are searching for on your site. To configure it in uw-frame is a couple steps.

1) Follow steps in [the GA docs](https://support.google.com/analytics/answer/1012264?hl=en) titled "Set up Site Search". The Query Parameter field is q by default. To overwrite that see step 4.

2) When setting up your route for your search result page pass the search term in as a path variable
e.g.:
```javascript
when('/features/search/:searchTerm', features.search)
```

3) In the route(s).js for that when, add in the variable 'searchParam' with the value of the path parameter (e.g.: searchParam : 'searchTerm').

You should end up with something like this:
```javascript
define(['require'], function(require){
  return {
    search : {
      templateUrl: require.toUrl('./partials/features.html'),
      controller: "PortalFeaturesController",
      searchParam : "searchTerm"
    }
  }
});

```

4) (optional) you can overwrite what variable it gets set to in the search param. See [configuration->APP_FLAGS.gaSearchParam](#/md/configuration) By default it is q.
