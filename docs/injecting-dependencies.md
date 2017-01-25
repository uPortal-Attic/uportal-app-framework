## How did we get marked content?

You may be wondering, "How did they inject `ngMarked` into uw-frame for this docs page, if it doesn't ship with frame?" Easy!

We add it to the RequireJS configuration for my-app, which gets merged into the base frame configuration at build time!

### : Paths and shims
Lets inject them into the `requirejs` configuration. We inject `marked` and `ngMarked` into this
project via the `/my-app/app-config.js`.

Here is the content of that file:
```
'use strict';
define([], function() {

  return {
    paths : {
      'marked'        : "path/or/uri/to/marked",
      'ngMarked'      : "path/or/uri/to/angular-marked"
    },

    shims : {
      'ngMarked'      : { deps: ['marked','angular']}
    }

  }
});
```

As you can see it just returns an object with paths and shims with the relative path (webapp being the working directory here) to the artifacts.
If you are curious to learn more, check out [/config.js](https://github.com/UW-Madison-DoIT/uw-frame/blob/master/uw-frame-components/config.js) in uw-frame's repository. Basically, it takes this returned object and merges it in with the frame configuration.

### Step 4: Injecting the angular module into your app

Now that require knows about the artifact, we can now use that module in our angular configuration. Checkout the `my-app/main.js`. As you can see we are injecting marked and ngMarked, then adding the `'hc.marked'` module.

And that should be it. Holler with questions or weird edge cases.
